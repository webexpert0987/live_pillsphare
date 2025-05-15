import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMessage } from "../../Context/MessageContext";
import Stack from "@mui/material/Stack";
import { useApp } from "../../Context/AppContext";
import CouponCode from "../CouponCode";
import ShippingMethodSelector from "./ShippingMethodSelector";
import CardInputForm from "./CardInputForm";
import { orderEligibility } from "../../apis/apisList/orderApi";
import useIpAddress from "../../hooks/ipAddressHook";
import { questionsMap } from "../../lib/questions";
import { createPayment } from "../../apis/apisList/opayoPaymentApi";

const Text = styled(Typography)(({ theme }) => ({
  color: "#333333",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: theme.typography.h4.fontSize,
}));

const validationSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  last_name: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  address_1: Yup.string()
    .required("Address is required")
    .min(2, "Address must be at least 10 characters"),
  address_2: Yup.string()
    .required("Address 2 is required")
    .min(2, "Address 2 must be at least 10 characters"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postcode: Yup.string().required("Postcode is required"),
  country: Yup.string().required("Country is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone must contain only numbers")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .required("Phone is required"),
});

const cardValidation = (values) => {
  const errors = {};
  const now = new Date();
  const currentYear = now.getFullYear() % 100; // last two digits
  const currentMonth = now.getMonth() + 1;

  if (!values.cardholderName)
    errors.cardholderName = "Cardholder name is required";
  if (!values.cardNumber) errors.cardNumber = "Card number is required";
  if (!values.expiryDate || !/^\d{2}\/\d{2}$/.test(values.expiryDate)) {
    errors.expiryDate = "Expiry date is required (MM/YY)";
  } else {
    const [mm, yy] = values.expiryDate.split("/").map(Number);
    if (mm < 1 || mm > 12) {
      errors.expiryDate = "Invalid month in expiry date";
    } else if (yy < currentYear || (yy === currentYear && mm < currentMonth)) {
      errors.expiryDate = "Card has expired";
    }
  }
  if (!values.securityCode || values.securityCode.length !== 3)
    errors.securityCode = "CVC is required and must be 3 digits";
  return errors;
};

export default function UnifiedCheckoutPage({ isFromQA = false }) {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const {
    cart: cartData,
    calculateTotal: calTotal,
    setCart,
    cartEmpty,
    qaCart,
    setQaCart,
  } = useApp();
  const [userDetails, setUserDetails] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  });
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [cartTotal, setCartTotal] = useState("0.00");
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardValues, setCardValues] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    securityCode: "",
  });
  const [cardErrors, setCardErrors] = useState({});
  const [questionAnswersdata, setquestionAnswersdata] = useState(null);
  const ipAddress = useIpAddress();

  const cart = isFromQA ? qaCart : cartData;

  const calculateQATotal = () => {
    try {
      const cartPrice = cart[0]?.selectedVariant?.price || cart?.[0]?.price;
      // console.log('cart price ',cartPrice);
      const price = parseFloat(cartPrice) * cart[0]?.quantity || 0;
      // console.log('price ',price);
      return price.toFixed(2);
    } catch (error) {
      return "0.00";
    }
  };

  const calculateTotal = isFromQA ? calculateQATotal : calTotal;

  useEffect(() => {
    setCartTotal(calculateTotal());
    const questionAnswersMap = {};

    // Loop through each product in the cart
    cart.forEach((item) => {
      const productId = item?.id;

      // Fetch the question answers from localStorage using the product ID
      const storedAnswers = localStorage.getItem(
        `product-questions-${productId}`
      );

      // If answers exist, parse and store them in the map
      if (storedAnswers) {
        questionAnswersMap[productId] = JSON.parse(storedAnswers);
      }
    });

    // Set the state with the gathered data
    setquestionAnswersdata(questionAnswersMap);
  }, [cart]);

  const handleShippingMethodSelect = (method) => {
    setSelectedShippingMethod(method);
    setShippingCost(parseFloat(method?.price) || 0);
  };

  const calculateTotalWithShipping = () => {
    const subtotal = cartTotal;
    const finalPrice = parseFloat(subtotal) + shippingCost;
    return finalPrice.toFixed(2);
  };
  const checkOrderEligibility = async (productId, billingDetails) => {
    try {
      const response = await orderEligibility({
        product_id: productId,
        billing_address: billingDetails.address1,
        shipping_address: billingDetails.address1,
        ip_address: ipAddress,
      });

      const { status, message } = response;

      return {
        status,
        message,
      };
    } catch (error) {
      console.log("Error checking order eligibility:", error);
      return {
        status: false,
        message: "An error occurred while checking order eligibility.",
      };
    }
  };
  const formatQuestionData = (data) => {
    const { category, answers } = data;
    const questions = questionsMap[category];

    if (questions && answers) {
      let answersData = {};

      Object.entries(answers).forEach(([key, value]) => {
        if (questions[key] !== undefined) {
          // Ensure the question exists
          answersData[questions[key]] = value;
        }
      });

      return Object.keys(answersData).length ? answersData : null;
    }
  };
  const handleSubmit = async (values) => {
    setIsProcessing(true);
    setCardErrors({});
    const cardErrs = cardValidation(cardValues);
    if (Object.keys(cardErrs).length > 0) {
      setCardErrors(cardErrs);
      setIsProcessing(false);
      showMessage("Please enter valid card details.", "error");
      return;
    }
    if (cart.length === 0) {
      navigate("/");
      showMessage(
        "Your cart is empty! Add some products before checking out.",
        "error"
      );
      setIsProcessing(false);
      return;
    }

    if (!selectedShippingMethod) {
      showMessage(
        "Please select a shipping option to proceed with the payment.",
        "error"
      );
      setIsProcessing(false);
      return;
    }
    // Build API payload

    try {
      const addressData = {
        address1: values.address_1,
        address2: values.address_2,
        address3: "",
        city: values.city,
        country: /* values.country */ "GB",
        postalCode: values.postcode,
      };
      //check order eligibility
      for (let item of cart) {
        const { status, message } = await checkOrderEligibility(
          item.id,
          addressData
        );
        if (status === false) {
          const test = process.env.REACT_TEST_MODE || 1; //always 0 for production
          if (test == 0) {
            showMessage(
              `${message} Please remove the product ${item?.name} from your cart and try again`,
              "error"
            );
            setIsProcessing(false);
            return;
          }
        }
      }

      const variants = [];
      const products = [];
      let questionAnswers_data = null;
      let parsedData = {};

      for (let item of cart) {
        if (item.selectedVariant) {
          let id = item?.selectedVariant?.id;
          if (typeof item.selectedVariant !== "object") {
            id = item.selectedVariant;
          }
          variants.push({
            variantId: id,
            qty: item.quantity,
          });
        } else {
          products.push({
            productId: item.id,
            qty: item.quantity,
          });
        }
      }

      if (isFromQA) {
        const qaData = localStorage.getItem("questionnaire_info");

        if (qaData) {
          parsedData = JSON.parse(qaData);
          const answers = formatQuestionData(parsedData);
          answers.gpResult = parsedData.answers.gpResult;
          questionAnswers_data = {
            answers: answers || null,
            category: parsedData.category || "",
            bmiData: parsedData.bmiData || null,
          };
        }
      }

      const getUser = localStorage.getItem("user") || "{}";
      const userInfo = JSON.parse(getUser);

      const payload = {
        amount: calculateTotalWithShipping(),
        currency: "GBP",
        customer: {
          firstName: values.first_name,
          lastName: values.last_name,
          email: values.email,
          phone: values.phone,
        },
        billingAddress: addressData,
        shippingAddress: addressData,
        cardDetails: {
          cardholderName: cardValues.cardholderName,
          cardNumber: cardValues.cardNumber.replace(/\s/g, ""),
          expiryDate: cardValues.expiryDate.replace("/", ""),
          securityCode: cardValues.securityCode,
        },
        additionalData: {
          user_id: userInfo.user_id,
          token: userInfo.token,
          variation_ids: variants,
          product_ids: products,
          questionAnswers_data: questionAnswersdata
            ? JSON.stringify(questionAnswersdata)
            : "",
          questionnaire_info: questionAnswers_data
            ? JSON.stringify(questionAnswers_data)
            : "",
          consultation: isFromQA ? 1 : 0,
          ip: ipAddress,
          actual_amount: calculateTotal(),
          appliedCoupon: appliedCoupon || null,
          shipping_method: selectedShippingMethod,
          photoId:
            parsedData.answers?.photoId || parsedData.answers?.photoID || null,
          bodyPhoto: parsedData.answers?.bodyPhoto || null,
        },
      };

      await createPayment(payload);
      showMessage(
        "Thank you! Your payment was successful and your order is being processed.",
        "success"
      );
      if (isFromQA) {
        setQaCart([]);
      } else {
        setCart([]);
      }
      cartEmpty();
      localStorage.removeItem("questionnaire_info");
      navigate("/thankyou");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "There was a problem with the payment process.";
      showMessage(message, "error");
    }
    setIsProcessing(false);
  };

  if (!userDetails) return <>Loading...</>;

  return (
    <Box sx={{ margin: "20px" }}>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={12}
        direction={
          isFromQA ? "column-reverse" : { xs: "column-reverse", md: "row" }
        }
        alignItems={isFromQA ? "center" : ""}
      >
        <Grid
          size={
            isFromQA
              ? { xs: 12, sm: 12, md: 12, lg: 12 }
              : { xs: 12, sm: 12, md: 8, lg: 9 }
          }
          sx={{
            border: "1px solid #d1cbcb",
            padding: "30px",
            borderRadius: "10px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Box>
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                marginBottom: "30px",
                fontWeight: "600",
              }}
            >
              Checkout
            </Typography>
            <Box sx={{ width: "100%" }} noValidate display={"flex"}>
              <Formik
                initialValues={{
                  first_name: userDetails.first_name || "",
                  last_name: userDetails.last_name || "",
                  company: "",
                  address_1: "",
                  address_2: "",
                  city: "",
                  state: "",
                  postcode: "",
                  country: "",
                  email: userDetails.email || "",
                  phone: "",
                }}
                validationSchema={validationSchema}
                validateOnBlur={true}
                onSubmit={handleSubmit}
                validateOnChange={true}
              >
                {({
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                }) => (
                  <Form>
                    <Grid container spacing={3.5} sx={{ marginBottom: "30px" }}>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <TextField
                          name="first_name"
                          variant="outlined"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.first_name && Boolean(errors.first_name)
                          }
                          helperText={touched.first_name && errors.first_name}
                          value={values.first_name}
                          disabled
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="last_name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.last_name && Boolean(errors.last_name)}
                          helperText={touched.last_name && errors.last_name}
                          value={values.last_name}
                          disabled
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          value={values.email}
                          disabled
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="company"
                          label="Company"
                          name="company"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.company && Boolean(errors.company)}
                          helperText={touched.company && errors.company}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="address_1"
                          label="Address 1"
                          name="address_1"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.address_1 && Boolean(errors.address_1)}
                          helperText={touched.address_1 && errors.address_1}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="address_2"
                          label="Address 2"
                          name="address_2"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.address_2 && Boolean(errors.address_2)}
                          helperText={touched.address_2 && errors.address_2}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="city"
                          label="City"
                          name="city"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.city && Boolean(errors.city)}
                          helperText={touched.city && errors.city}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="state"
                          label="State"
                          name="state"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.state && Boolean(errors.state)}
                          helperText={touched.state && errors.state}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="postcode"
                          label="Postcode"
                          name="postcode"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.postcode && Boolean(errors.postcode)}
                          helperText={touched.postcode && errors.postcode}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="country"
                          label="Country"
                          name="country"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.country && Boolean(errors.country)}
                          helperText={touched.country && errors.country}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <TextField
                          variant="outlined"
                          type="text"
                          required
                          fullWidth
                          id="phone"
                          label="Phone"
                          name="phone"
                          autoComplete="off"
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          error={touched.phone && Boolean(errors.phone)}
                          helperText={touched.phone && errors.phone}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                        <CardInputForm
                          values={cardValues}
                          setValues={setCardValues}
                          errors={cardErrors}
                          setErrors={setCardErrors}
                          cardValidation={cardValidation}
                        />
                      </Grid>
                      <CouponCode
                        cartTotal={cartTotal}
                        setCartTotal={setCartTotal}
                        appliedCoupon={appliedCoupon}
                        setAppliedCoupon={setAppliedCoupon}
                      />
                      <div style={{ width: "100%" }}>
                        <ShippingMethodSelector
                          selectedMethod={selectedShippingMethod}
                          onMethodSelect={handleShippingMethodSelect}
                        />
                        <Typography variant="h6">
                          Final Total: £{calculateTotalWithShipping()}
                        </Typography>
                      </div>
                    </Grid>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={isProcessing}
                      type="submit"
                      sx={{ marginTop: 2 }}
                    >
                      {isProcessing ? "Processing..." : "Checkout & Pay"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Grid>
        <Grid
          size={
            isFromQA
              ? { xs: 12, sm: 12, md: 12, lg: 12 }
              : { xs: 12, sm: 12, md: 4, lg: 3 }
          }
          sx={{
            border: "1px solid #d1cbcb",
            padding: "5px",
            paddingRight: "10px",
            borderRadius: "10px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Box>
            <Typography
              variant="h2"
              sx={{ marginBottom: "30px", fontWeight: "600", p: 1 }}
            >
              Order Summary
            </Typography>
            <Box sx={{ width: "100%" }} noValidate display={"flex"}>
              <Box>
                {cart.length > 0 ? (
                  <>
                    <Stack
                      spacing={2}
                      sx={{ maxHeight: "530px", overflowY: "auto", padding: 2 }}
                    >
                      {cart.map((item) => (
                        <>
                          <Box
                            key={item.id}
                            sx={{ display: "flex" }}
                            gap={1}
                            alignItems={"center"}
                          >
                            <Box>
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: "160px" }}
                              />
                            </Box>
                            <Box
                              width={"100%"}
                              display={"flex"}
                              justifyContent={"space-between"}
                              gap={"10px"}
                            >
                              <Box width={"100%"}>
                                <Text> {item.name}</Text>
                                {item.variations &&
                                  item.variations.map((variant) => {
                                    if (
                                      variant.variation_id ===
                                        item.selectedVariant ||
                                      variant.id === item.selectedVariant.id
                                    ) {
                                      const attributes = variant.attributes;
                                      const attributeKey =
                                        Object.keys(attributes)[0];

                                      const attributeValue =
                                        attributes[attributeKey];

                                      if (attributeKey === "quantity") {
                                        return null;
                                      }

                                      return (
                                        <Typography key={variant.id}>
                                          {attributeKey === "tablets" ||
                                          attributeKey === "attribute_tablets"
                                            ? `${attributeValue}`
                                            : `${attributeKey}: ${attributeValue}`}
                                        </Typography>
                                      );
                                    }
                                    return null;
                                  })}
                                <Box>
                                  <Typography variant="h4" fontWeight={600}>
                                    Quantity: {item.quantity}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box>
                                <Typography variant="h4" fontWeight={600}>
                                  £
                                  {item?.selectedVariantPrice ||
                                    item?.selectedVariant?.price ||
                                    item?.price ||
                                    0}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <hr />
                        </>
                      ))}
                    </Stack>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      px={2}
                    >
                      <Typography variant="body3" marginTop={1}>
                        Subtotal:
                      </Typography>
                      <Typography variant="body3" marginTop={1}>
                        £{calculateTotal()}
                      </Typography>
                    </Box>
                    {appliedCoupon && (
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        px={2}
                      >
                        <Typography
                          variant="body3"
                          marginTop={1}
                          sx={{
                            color: "green",
                          }}
                        >
                          Discount:
                        </Typography>
                        <Typography
                          variant="body3"
                          marginTop={1}
                          sx={{
                            color: "green",
                          }}
                        >
                          £{appliedCoupon.discount}
                        </Typography>
                      </Box>
                    )}

                    {shippingCost > 0 && (
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        px={2}
                      >
                        <Typography variant="body3" marginTop={1}>
                          Shipping:
                        </Typography>
                        <Typography variant="body3" marginTop={1}>
                          £{shippingCost.toFixed(2)}
                        </Typography>
                      </Box>
                    )}
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      px={2}
                      mt={2}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        Total:
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        £{calculateTotalWithShipping()}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <Box padding={1}>
                    <Typography variant="h4">Cart is empty...!!</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
