import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { getCouponCodes } from "../apis/apisList/paymentApi";
import { usedCoupons } from "../apis/apisList/paymentApi";
import { useApp } from "../Context/AppContext";

const CouponCode = ({
  cartTotal,
  setCartTotal,
  appliedCoupon,
  setAppliedCoupon,
}) => {
  const [couponCode, setCouponCode] = useState("");
  // const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { userDetails } = useApp();
  //sending the coupon details to backend side through this couponUsed post api method..
  const checkUsedCoupon = async () => {
    try {
      const response = await usedCoupons({
        user_id: userDetails.user_id,
        email: userDetails.email,
        coupon_code: couponCode.toLowerCase(),
      });
      return response;
    } catch (error) {
      console.log("error message", error);
    }
  };

  const handleApplyCoupon = async () => {
    setError("");
    setSuccessMessage("");

    try {
      const coupons = await getCouponCodes();
      if (!coupons || coupons.length === 0) {
        setError("No coupons available.");
        return;
      }
      // checking the coupon is valid means it exists on backend side or not ...
      const validCoupon = coupons.find(
        (coupon) => coupon.code.toLowerCase() === couponCode.toLowerCase()
      );
      console.log("valid coupon", validCoupon);
      if (!validCoupon) {
        setError("Invalid coupon code.");
        return;
      }

      const checkApplied = await checkUsedCoupon();
      console.log("applied coupon", checkApplied);
      // check whether the coupon code is already used earlier...
      if (checkApplied?.orders_found) {
        if (couponCode.toLowerCase() === "new2025") {
          setError("Coupon is not applicable as it has been used earlier.");
          return;
        }
      }
      // Check minimum amount condition
      if (
        validCoupon.minimum_amount &&
        parseFloat(cartTotal) < parseFloat(validCoupon.minimum_amount)
      ) {
        setError(
          `This coupon requires a minimum cart total of £${validCoupon.minimum_amount}.`
        );
        return;
      }

      // Calculate discount
      let discountAmount = 0;
      if (validCoupon.discount_type === "percent") {
        discountAmount =
          (parseFloat(validCoupon.amount) / 100) * parseFloat(cartTotal);
      } else if (validCoupon.discount_type === "fixed_cart") {
        discountAmount = parseFloat(validCoupon.amount);
      }

      // Ensure discount does not exceed cart total
      discountAmount = Math.min(discountAmount, cartTotal);

      // Update cart total
      const newTotal = (cartTotal - discountAmount).toFixed(2);
      setCartTotal(newTotal);
      setDiscount(discountAmount.toFixed(2));
      setAppliedCoupon({ ...validCoupon, discount: discountAmount.toFixed(2) });
      setSuccessMessage(
        `Coupon applied successfully! You saved £${discountAmount.toFixed(2)}.`
      );
      setCouponCode(""); // Clear the input field
    } catch (error) {
      console.error("Error applying coupon:", error);
      setError("Failed to apply coupon. Please try again later.");
    }
  };

  const handleRemoveCoupon = () => {
    if (appliedCoupon) {
      // Revert the cart total by adding back the discount
      const revertedTotal = (
        parseFloat(cartTotal) + parseFloat(discount)
      ).toFixed(2);
      setCartTotal(revertedTotal);
      setDiscount(0);
      setAppliedCoupon(null);
      setSuccessMessage("");
      setError("");
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid #d1cbcb",
        padding: "20px",
        borderRadius: "10px",
        width: "100%",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "10px" }}>
        Apply Coupon Code
      </Typography>
      {!appliedCoupon ? (
        <>
          <Box display="flex" gap={2} alignItems="center">
            <TextField
              label="Coupon Code"
              variant="outlined"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyCoupon}
              disabled={!couponCode}
            >
              Apply
            </Button>
          </Box>
          {error && (
            <Typography color="error" sx={{ marginTop: "10px" }}>
              {error}
            </Typography>
          )}
        </>
      ) : (
        <>
          <Typography sx={{ marginBottom: "10px" }}>
            Applied Coupon: <strong>{appliedCoupon.code}</strong>
          </Typography>
          <Typography sx={{ marginBottom: "10px" }}>
            Discount: £{discount}
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </Button>
        </>
      )}
      {successMessage && (
        <Typography color="success.main" sx={{ marginTop: "10px" }}>
          {successMessage}
        </Typography>
      )}
    </Box>
  );
};

export default CouponCode;
