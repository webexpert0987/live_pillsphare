import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMessage } from "../../Context/MessageContext";
import Stack from "@mui/material/Stack";
import { useApp } from "../../Context/AppContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../apis/apisList/paymentApi";
import { createOrder, orderEligibility } from "../../apis/apisList/orderApi";
import useIpAddress from "../../hooks/ipAddressHook";
import CouponCode from "../CouponCode";

const Text = styled(Typography)(({ theme }) => ({
  color: "#333333",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: theme.typography.h4.fontSize,
}));

const classes = {
  paper: {
    display: "flex",
    flexDirection: "column",
    aligns: "center",
  },
  avatar: {
    backgroundColor: "secondary.main",
  },
  form: {
    width: "100%",
  },
};

const validationSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  last_name: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format")
    .test("is-valid-domain", "Email must have a valid domain", (value) => {
      const domainPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return domainPattern.test(value);
    }),
  // company: Yup.string()
  //     .required('Company is required'),
  // .min(2, 'Company must be at least 2 characters'),
  address_1: Yup.string()
    .required("Address is required")
    .min(2, "Address must be at least 10 characters"),
  address_2: Yup.string()
    .required("Address 2 is required")
    .min(2, "Address 2 must be at least 10 characters"),
  city: Yup.string().required("City is required"),
  // .min(2, 'Last name must be at least 2 characters'),
  state: Yup.string().required("State is required"),
  // .min(2, 'Last name must be at least 2 characters'),
  postcode: Yup.string().required("Postcode is required"),
  // .min(2, 'Last name must be at least 2 characters'),
  country: Yup.string().required("Country is required"),
  // .min(2, 'Last name must be at least 2 characters'),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone must contain only numbers")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .required("Phone is required"),
});

export default function Checkout() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { showMessage } = useMessage();
  const {
    cart,
    calculateTotal,
    variantIds,
    setVariantIds,
    setCart,
    cartEmpty,
  } = useApp();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [questionAnswersdata, setquestionAnswersdata] = useState();
  const [userDetails, setUserDetails] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const [billingDetails, setBillingDetails] = useState({
    user_id: userDetails.user_id,
    token: userDetails.token,
    variation_ids: variantIds,
    payment_intent_id: "",
    billing_address: {
      first_name: userDetails.first_name,
      last_name: userDetails.last_name,
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      email: userDetails.email,
      phone: "",
    },
    shipping_address: {
      first_name: userDetails.first_name,
      last_name: userDetails.last_name,
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      email: userDetails.email,
      phone: "",
    },
  });
  const [cardError, setCardError] = useState("");
  const [isCardEpmty, setIsCardEpmty] = useState(false);
  const [isDetailComplete, setIsDetailComplete] = useState(true);
  const [canPay, setCanPay] = useState(false);
  const [makePayment, setMakePayment] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [cartTotal, setCartTotal] = useState("0.00");
  const ipAddress = useIpAddress();
  let cardElement;

  useEffect(() => {
    if (stripe && elements) {
      cardElement = elements.getElement(CardElement);
      handleCardValidation();
    }
  }, [stripe, elements]);

  const handleCardValidation = async (e) => {
    // e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // const cardElement = elements.getElement(CardElement);

    // const cardValidation = cardElement._empty;

    // if (cardValidation) {
    //     setCardError('Card is empty.');
    //     setIsCardEpmty(true);
    //     setIsDetailComplete(false)
    // } else {
    //     setIsCardEpmty(false);
    //     setCardError('');
    // }

    cardElement.addEventListener("change", async (event) => {
      if (event.error) {
        setCardError(event.error.message);
        setIsCardEpmty(true);
        setIsDetailComplete(false);
        setCanPay(false);
      } else {
        if (event.complete) {
          if (event.value.postalCode == "") {
            setCardError("Enter postal code");
            setIsCardEpmty(true);
            setIsDetailComplete(false);
            setCanPay(false);
          } else {
            setCardError("");
            setIsCardEpmty(false);
            setIsDetailComplete(true);
            setCanPay(true);
          }
        } else {
          setCardError(event.error);
          setIsCardEpmty(true);
          setIsDetailComplete(false);
          setCanPay(false);
        }
      }
    });
  };

  const checkOrderEligibility = async (productId) => {
    try {
      const { shipping_address, billing_address } = billingDetails;
      const response = await orderEligibility({
        product_id: productId,
        billing_address: shipping_address.address_1,
        shipping_address: billing_address.address_1,
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

  useEffect(() => {
    if (canPay) {
      setIsDetailComplete(true);
    }
  }, [canPay]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : {};
    setUserDetails(user);
    setCartTotal(calculateTotal());
  }, [cart]);

  useEffect(() => {
    const questionAnswersMap = {};

    // Loop through each product in the cart
    cart.forEach((item) => {
      const productId = item.id;

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

  useEffect(() => {
    async function payment() {
      if (makePayment) {
        setIsProcessing(true);
        setPaymentStatus("");

        try {
          for (let item of cart) {
            const { status, message } = await checkOrderEligibility(item.id);
            if (status === false) {
              showMessage(
                `${message} Please remove the product ${item?.name} from your cart and try again`,
                "error"
              );
              setIsProcessing(false);
              setMakePayment(false);
              setIsDetailComplete(false);
              return;
            }
          }

          const response = await createPaymentIntent({
            amount: calculateTotal(),
          });
          const data = response;

          if (data.status === "200") {
            const clientSecret = data.clientSecret;
            console.log("payment intent success");

            cardElement = elements.getElement(CardElement);

            const { error, paymentIntent } = await stripe.confirmCardPayment(
              clientSecret,
              {
                payment_method: {
                  card: cardElement,
                },
              }
            );

            if (error) {
              // setPaymentStatus('Payment failed: ' + error.message);
              showMessage(error.message, "error");
            } else if (paymentIntent.status === "succeeded") {
              setPaymentStatus("Payment successful!");
              showMessage("Payment successful!", "success");

              const variants = [];
              const products = [];

              for (let item of cart) {
                if (item.selectedVariant) {
                  variants.push({
                    variantId: item.selectedVariant,
                    qty: item.quantity,
                  });
                } else {
                  products.push({
                    productId: item.id,
                    qty: item.quantity,
                  });
                }
              }

              const ordInfo = {
                user_id: userDetails.user_id,
                token: userDetails.token,
                variation_ids: variants,
                product_ids: products,
                questionAnswers_data: JSON.stringify(questionAnswersdata),
                payment_intent_id: paymentIntent.id,
                billing_address: {
                  first_name: billingDetails.billing_address.first_name,
                  last_name: billingDetails.billing_address.last_name,
                  company: billingDetails.billing_address.company,
                  address_1: billingDetails.billing_address.address_1,
                  address_2: billingDetails.billing_address.address_2,
                  city: billingDetails.billing_address.city,
                  state: billingDetails.billing_address.state,
                  postcode: billingDetails.billing_address.postcode,
                  country: billingDetails.billing_address.country,
                  email: billingDetails.billing_address.email,
                  phone: billingDetails.billing_address.phone,
                },
                shipping_address: {
                  first_name: billingDetails.billing_address.first_name,
                  last_name: billingDetails.billing_address.last_name,
                  company: billingDetails.billing_address.company,
                  address_1: billingDetails.billing_address.address_1,
                  address_2: billingDetails.billing_address.address_2,
                  city: billingDetails.billing_address.city,
                  state: billingDetails.billing_address.state,
                  postcode: billingDetails.billing_address.postcode,
                  country: billingDetails.billing_address.country,
                  email: billingDetails.billing_address.email,
                  phone: billingDetails.billing_address.phone,
                },
                ip: ipAddress,
                amount: cartTotal,
                actual_amount: calculateTotal(),
                appliedCoupon: appliedCoupon || null,
              };

              const orderResponse = await createOrder(ordInfo);

              if (orderResponse.status == "Order created successfully.") {
                setMakePayment(false);
                setCanPay(false);
                setCart([]);
                setVariantIds([]);
                cartEmpty();
                navigate("/thankyou");
              }
            }
          } else {
            // setPaymentStatus('Error creating payment intent.');
            showMessage("Error creating payment intent.", "error");
          }
        } catch (error) {
          console.log(">>>>>", error);
          showMessage("There was a problem with the payment process.", "error");
          // setPaymentStatus('There was a problem with the payment process.');
        }

        setIsProcessing(false);
      } else {
        setMakePayment(false);
        setIsDetailComplete(false);
      }
    }
    payment();
  }, [makePayment]);

  const handleCheckoutSubmit = async () => {
    if (cart.length == 0) {
      navigate("/");
      showMessage(
        "Your cart is empty! Add some products before checking out.",
        "error"
      );
    }

    let formDetail = {
      first_name: billingDetails.billing_address.first_name,
      last_name: billingDetails.billing_address.last_name,
      company: billingDetails.billing_address.company,
      address_1: billingDetails.billing_address.address_1,
      address_2: billingDetails.billing_address.address_2,
      city: billingDetails.billing_address.city,
      state: billingDetails.billing_address.state,
      postcode: billingDetails.billing_address.postcode,
      country: billingDetails.billing_address.country,
      email: billingDetails.billing_address.email,
      phone: billingDetails.billing_address.phone,
    };

    try {
      await validationSchema.validate(formDetail, { abortEarly: false });
      // setIsCheckout(true);
      if (isDetailComplete && canPay) {
        setMakePayment(true);
        // handlePayment();
      } else {
        setIsDetailComplete(false);
        setMakePayment(false);
        if (!canPay) {
          setCardError("Enter card details");
          setIsCardEpmty(true);
        }
      }
    } catch (err) {
      showMessage("Please complete all required fields to continue.", "error");
    }
  };

  const handleFieldOnChange = (e) => {
    const { name, value } = e.target;

    setBillingDetails((prev) => ({
      ...prev,
      billing_address: {
        ...prev.billing_address,
        [name]: value,
      },
      shipping_address: {
        ...prev.shipping_address,
        [name]: value,
      },
    }));
  };

  if (!userDetails) {
    return <>Loading...</>;
  }
  return (
    <>
      <Box sx={{ margin: "20px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={12}
          direction={{ xs: "column-reverse", md: "row" }}
        >
          <Grid
            size={{ xs: 12, sm: 12, md: 8, lg: 9 }}
            sx={{
              border: "1px solid #d1cbcb",
              padding: "30px",
              borderRadius: "10px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Box sx={classes.paper}>
              {/* {isCheckout ?
                            <Typography variant="h2" sx={{ textAlign: 'center', marginBottom: '30px', fontWeight: '600' }}>
                                Pay Now
                            </Typography>
                            : */}
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
              {/* } */}

              <Box sx={{ width: "100%" }} noValidate display={"flex"}>
                {
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
                    // onSubmit={handleCheckoutSubmit}
                  >
                    {({
                      values,
                      touched,
                      errors,
                      handleChange,
                      handleBlur,
                      validateField,
                      isSubmitting,
                    }) => {
                      return (
                        <Form>
                          <Grid
                            container
                            spacing={3.5}
                            sx={{ marginBottom: "30px" }}
                          >
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                              <TextField
                                name="first_name"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={(e) => {
                                  handleChange(e);
                                  handleFieldOnChange(e);
                                }}
                                onBlur={handleBlur}
                                error={
                                  touched.first_name &&
                                  Boolean(errors.first_name)
                                }
                                helperText={
                                  touched.first_name && errors.first_name
                                }
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
                                onChange={(e) => {
                                  handleChange(e);
                                  handleFieldOnChange(e);
                                }}
                                onBlur={handleBlur}
                                error={
                                  touched.last_name && Boolean(errors.last_name)
                                }
                                helperText={
                                  touched.last_name && errors.last_name
                                }
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
                                onChange={(e) => {
                                  handleChange(e);
                                  handleFieldOnChange(e);
                                }}
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
                                // required
                                fullWidth
                                id="company"
                                label="Company"
                                name="company"
                                onChange={(e) => {
                                  handleChange(e);
                                  handleFieldOnChange(e);
                                }}
                                onBlur={handleBlur}
                                error={
                                  touched.company && Boolean(errors.company)
                                }
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
                                onChange={(e) => {
                                  handleChange(e);
                                  handleFieldOnChange(e);
                                }}
                                onBlur={handleBlur}
                                error={
                                  touched.address_1 && Boolean(errors.address_1)
                                }
                                helperText={
                                  touched.address_1 && errors.address_1
                                }
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
                                onChange={(e) => {
                                  handleChange(e);
                                  handleFieldOnChange(e);
                                }}
                                onBlur={handleBlur}
                                error={
                                  touched.address_2 && Boolean(errors.address_2)
                                }
                                helperText={
                                  touched.address_2 && errors.address_2
                                }
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
                                onChange={(e) => {
                                  handleChange(e);
                                  handleFieldOnChange(e);
                                }}
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
                                onChange={(e) => {
                                  handleChange(e);
                                  handleFieldOnChange(e);
                                }}
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
                                onChange={(e) => {
                                  handleChange(e);
                                  handleFieldOnChange(e);
                                }}
                                onBlur={handleBlur}
                                error={
                                  touched.postcode && Boolean(errors.postcode)
                                }
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
                                onChange={(e) => {
                                  handleChange(e);
                                  handleFieldOnChange(e);
                                }}
                                onBlur={handleBlur}
                                error={
                                  touched.country && Boolean(errors.country)
                                }
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
                                autocomplete="off"
                                onChange={(e) => {
                                  e.target.value = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
                                  handleChange(e);
                                  handleFieldOnChange(e);
                                }}
                                onBlur={handleBlur}
                                error={touched.phone && Boolean(errors.phone)}
                                helperText={touched.phone && errors.phone}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                              <Box
                                sx={{
                                  padding: "16px",
                                  border: "1px solid #ccc",
                                  borderRadius: "4px",
                                }}
                              >
                                <CardElement />
                              </Box>
                              {isCardEpmty && (
                                <Typography color={"error"}>
                                  {cardError}
                                </Typography>
                              )}
                            </Grid>
                            <CouponCode
                              cartTotal={cartTotal}
                              setCartTotal={setCartTotal}
                              appliedCoupon={appliedCoupon}
                              setAppliedCoupon={setAppliedCoupon}
                            />
                            <Typography variant="h6">
                              Final Total: £{cartTotal}
                            </Typography>
                          </Grid>
                          {/* <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    sx={{ margin: '30px 0px 10px 0px' }}
                                                    // disabled={isSubmitting}
                                                    onClick={handleCheckoutSubmit}
                                                >
                                                    Checkout & Pay
                                                </Button> */}
                          <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            // sx={{ margin: '30px 0px 10px 0px' }}
                            // disabled={isSubmitting}
                            disabled={
                              !stripe || isProcessing || !isDetailComplete
                            }
                            onClick={handleCheckoutSubmit}
                            sx={{ marginTop: 2 }}
                          >
                            {isProcessing ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              "Checkout & Pay"
                            )}
                          </Button>
                          <Typography
                            variant="body2"
                            color={
                              paymentStatus.includes("failed")
                                ? "error"
                                : "primary"
                            }
                            sx={{ marginTop: 2 }}
                          >
                            {paymentStatus}
                          </Typography>
                          {error && (
                            <Typography color="red">{error}</Typography>
                          )}
                        </Form>
                      );
                    }}
                  </Formik>
                }
              </Box>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 4, lg: 3 }}
            sx={{
              border: "1px solid #d1cbcb",
              padding: "5px",
              paddingRight: "10px",
              borderRadius: "10px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Box sx={classes.paper}>
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
                        sx={{
                          maxHeight: "530px",
                          overflowY: "auto",
                          padding: 2,
                        }}
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

                                  {item.variations.map((variant) => {
                                    // Conditional rendering
                                    if (
                                      variant.variation_id ===
                                      item.selectedVariant
                                    ) {
                                      const attributes = variant.attributes;
                                      const attributeKey =
                                        Object.keys(attributes)[0]; // Get the first available key
                                      const attributeValue =
                                        attributes[attributeKey]; // Get the corresponding value
                                      return (
                                        <Typography key={variant.id}>
                                          {attributeKey === "tablets"
                                            ? `${attributeValue}`
                                            : `${attributeKey}: ${attributeValue}`}{" "}
                                          {/* Show key: value if not 'tablets' */}
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
                                    {item.selectedVariantPrice ||
                                      item?.price ||
                                      0}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Divider />
                          </>
                        ))}
                      </Stack>
                      <Divider
                        sx={{ borderWidth: "1px", borderColor: "#333333" }}
                      ></Divider>
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        px={2}
                      >
                        <Typography variant="body3" marginTop={1}>
                          Total:
                        </Typography>
                        <Typography variant="body3" marginTop={1}>
                          £{calculateTotal()}
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
    </>
  );
}
