import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { getCouponCodes } from "../apis/apisList/paymentApi";

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

  const handleApplyCoupon = async () => {
    setError("");
    setSuccessMessage("");

    try {
      const coupons = await getCouponCodes();
      if (!coupons || coupons.length === 0) {
        setError("No coupons available.");
        return;
      }
      const validCoupon = coupons.find(
        (coupon) => coupon.code.toLowerCase() === couponCode.toLowerCase()
      );

      if (!validCoupon) {
        setError("Invalid coupon code.");
        return;
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
      setAppliedCoupon(validCoupon);
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
