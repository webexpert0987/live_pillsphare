import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select, FormHelperText, Divider, CircularProgress } from "@mui/material";
import { Formik, Form, } from 'formik';
import * as Yup from 'yup';
import { useMessage } from '../../Context/MessageContext';
import Stack from '@mui/material/Stack';
import { useApp } from '../../Context/AppContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from "../../apis/apisList/paymentApi";
import { createOrder } from "../../apis/apisList/orderApi";


const Text = styled(Typography)(({ theme }) => ({
    color: '#333333', textDecoration: 'none', fontWeight: 600, fontSize: theme.typography.h4.fontSize
}));

const classes = {
    paper: {
        display: "flex",
        flexDirection: "column",
        aligns: "center"
    },
    avatar: {
        backgroundColor: 'secondary.main'
    },
    form: {
        width: "100%",
    }
};

const validationSchema = Yup.object({
    first_name: Yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters'),
    last_name: Yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email format')
        .test('is-valid-domain', 'Email must have a valid domain', (value) => {
            const domainPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return domainPattern.test(value);
        }),
    // company: Yup.string()
    //     .required('Company is required'),
    // .min(2, 'Company must be at least 2 characters'),
    address_1: Yup.string()
        .required('Address is required')
        .min(2, 'Address must be at least 10 characters'),
    address_2: Yup.string()
        .required('Address 2 is required')
        .min(2, 'Address 2 must be at least 10 characters'),
    city: Yup.string()
        .required('City is required'),
    // .min(2, 'Last name must be at least 2 characters'),
    state: Yup.string()
        .required('State is required'),
    // .min(2, 'Last name must be at least 2 characters'),
    postcode: Yup.string()
        .required('Postcode is required'),
    // .min(2, 'Last name must be at least 2 characters'),
    country: Yup.string()
        .required('Country is required'),
    // .min(2, 'Last name must be at least 2 characters'),
    phone: Yup.string()
        .matches(/^\d+$/, 'Phone must contain only numbers')
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number cannot exceed 15 digits')
        .required('Phone is required')
});


export default function Checkout() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { showMessage } = useMessage();
    const { userDetails, cart, calculateTotal, variantIds, setVariantIds, setCart, cartEmpty } = useApp();
    const stripe = useStripe();
    const elements = useElements();
    const [paymentStatus, setPaymentStatus] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCheckout, setIsCheckout] = useState (false);
    const [billingDetails, setBillingDetails] = useState({
        user_id: userDetails.user_id,
        token: userDetails.token,
        variation_ids: variantIds,
        payment_intent_id: '',
        billing_address: {
            first_name: userDetails.first_name,
            last_name: userDetails.last_name,
            company: '',
            address_1: '',
            address_2: '',
            city: '',
            state: '',
            postcode: '',
            country: '',
            email: '',
            phone: ''
        },
        shipping_address: {
            first_name: userDetails.first_name,
            last_name: userDetails.last_name,
            company: '',
            address_1: '',
            address_2: '',
            city: '',
            state: '',
            postcode: '',
            country: '',
            email: '',
            phone: ''
        }
    });
    const [cardError, setCardError] = useState('');
    const [isCardEpmty, setIsCardEpmty] = useState(false);
    const [isDetailComplete, setIsDetailComplete] = useState(true);
    const [canPay, setCanPay] = useState(false)
   
    const handleSubmit = async (e) => {
        // e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const cardValidation = cardElement._empty;

        if (cardValidation) {
            setCardError('Card is empty.');
            setIsCardEpmty(true);
            setIsDetailComplete(false)
        } else {
            setIsCardEpmty(false);
            setCardError('');
        }

        cardElement.addEventListener('change', async (event) => {

            if (event.error) {
                console.error('[error]', event.error.message);
                setCardError(event.error.message)
                setIsCardEpmty(true);
                setIsDetailComplete(false)
            } else {
                console.log('[success]', event);
                if(event.complete){
                    setCardError('')
                    setIsCardEpmty(false);
                    setIsDetailComplete(true)
                    setCanPay(true)
                } else {
                    setCardError(event.error)
                    setIsCardEpmty(true);
                    setIsDetailComplete(false)
                }
            }
        });

        if(canPay){
            // if (!cardElement) {
            //     setPaymentStatus('Card details are incomplete.');
            //     return;
            // }
    
            setIsProcessing(true);
            setPaymentStatus('');
            
            try {
                const response = await createPaymentIntent({ amount: calculateTotal() })
                const data = response;
    
                if (data.status === '200') {
                    const clientSecret = data.clientSecret;
    
                    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                        payment_method: {
                            card: cardElement,
                        },
                    });
    
                    if (error) {
                        // setPaymentStatus('Payment failed: ' + error.message);
                        showMessage(error.message, 'error');
                    } else if (paymentIntent.status === 'succeeded') {
                        
                        setPaymentStatus('Payment successful!');
                        showMessage('Payment successful!', 'success');
                        // console.log('PaymentIntent ID:', paymentIntent.id);
                        console.log('billingDetails', billingDetails)
                        console.log('userDetails', userDetails)
                        const ordInfo = {
                            user_id: userDetails.user_id,
                            token: userDetails.token,
                            variation_ids: variantIds,
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
                              phone: billingDetails.billing_address.phone
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
                              phone: billingDetails.billing_address.phone
                            }
                        }
                          
                        const orderResponse = await createOrder(ordInfo);
                        // console.log('orderResponse', orderResponse);
                        if(orderResponse.status == "Order created successfully.") {
                            setCanPay(false);
                            setCart([]);
                            setVariantIds([]);
                            cartEmpty();
                            navigate('/thankyou')
                        }
                    }
                } else {
                    // setPaymentStatus('Error creating payment intent.');
                    showMessage('Error creating payment intent.', 'error');
                }
            } catch (error) {
                console.log('error', error)
                showMessage('There was a problem with the payment process.', 'error');
                // setPaymentStatus('There was a problem with the payment process.');
            }
    
            setIsProcessing(false);
        }
    };

    const handleCheckoutSubmit = async () => {
        if (cart.length == 0) {
            navigate('/');
            showMessage('Your cart is empty! Add some products before checking out.', 'error')
        } 

        console.log('values',)
        // setBillingDetails(values);
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
            phone: billingDetails.billing_address.phone
        }
        try{
            await validationSchema.validate(formDetail, { abortEarly: false })
            handleSubmit();
            // setIsCheckout(true);
        } catch (err) {
            console.log('validation error', err)
            showMessage('Please complete all required fields to continue.', 'error')
        }
    };

    const handleFieldOnChange = (e) =>{
       
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
    }
    
    return (
        <>
            <Box sx={{ margin: '20px' }}>
                <Grid container spacing={{ xs: 2, md: 2 }} columns={12} direction={{ xs: 'column-reverse', md: 'row' }}>
                    <Grid size={{ xs: 12, sm: 12, md: 8, lg: 9 }} sx={{
                        border: '1px solid #d1cbcb',
                        padding: '30px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    }}>
                        <Box sx={classes.paper}>
                            {/* {isCheckout ?
                            <Typography variant="h2" sx={{ textAlign: 'center', marginBottom: '30px', fontWeight: '600' }}>
                                Pay Now
                            </Typography>
                            : */}
                            <Typography variant="h2" sx={{ textAlign: 'center', marginBottom: '30px', fontWeight: '600' }}>
                                Checkout
                            </Typography>
                            {/* } */}

                            <Box sx={{ width: '100%' }} noValidate display={'flex'}>
                                {
                                    <Formik
                                        initialValues={{
                                            first_name: '',
                                            last_name: '',
                                            company: '',
                                            address_1: '',
                                            address_2: '',
                                            city: '',
                                            state: '',
                                            postcode: '',
                                            country: '',
                                            email: '',
                                            phone: '',
                                        }}
                                        validationSchema={validationSchema}
                                        // onSubmit={handleCheckoutSubmit}
                                    >
                                        {({ values, touched, errors, handleChange, handleBlur, isSubmitting }) => (
                                            <Form>
                                                <Grid container spacing={3.5} sx={{ marginBottom: '30px' }}>
                                                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                        <TextField
                                                            autoComplete="fname"
                                                            name="first_name"
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            id="firstName"
                                                            label="First Name"
                                                            autoFocus
                                                            onChange={(e)=>{handleChange(e); handleFieldOnChange(e)}}
                                                            onBlur={handleBlur}
                                                            error={touched.first_name && Boolean(errors.first_name)}
                                                            helperText={touched.first_name && errors.first_name}
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
                                                            autoComplete="lname"
                                                            onChange={(e)=>{handleChange(e); handleFieldOnChange(e)}}
                                                            onBlur={handleBlur}
                                                            error={touched.last_name && Boolean(errors.last_name)}
                                                            helperText={touched.last_name && errors.last_name}
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
                                                            autoComplete="email"
                                                            onChange={(e)=>{handleChange(e); handleFieldOnChange(e)}}
                                                            onBlur={handleBlur}
                                                            error={touched.email && Boolean(errors.email)}
                                                            helperText={touched.email && errors.email}
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
                                                            autoComplete="company"
                                                            onChange={(e)=>{handleChange(e); handleFieldOnChange(e)}}
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
                                                            autoComplete="address_1"
                                                            onChange={(e)=>{handleChange(e); handleFieldOnChange(e)}}
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
                                                            autoComplete="address_2"
                                                            onChange={(e)=>{handleChange(e); handleFieldOnChange(e)}}
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
                                                            autoComplete="city"
                                                            onChange={(e)=>{handleChange(e); handleFieldOnChange(e)}}
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
                                                            autoComplete="state"
                                                            onChange={(e)=>{handleChange(e); handleFieldOnChange(e)}}
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
                                                            autoComplete="postcode"
                                                            onChange={(e)=>{handleChange(e); handleFieldOnChange(e)}}
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
                                                            autoComplete="country"
                                                            onChange={(e)=>{handleChange(e); handleFieldOnChange(e)}}
                                                            onBlur={handleBlur}
                                                            error={touched.country && Boolean(errors.country)}
                                                            helperText={touched.country && errors.country}
                                                        />
                                                    </Grid>
                                                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                        <TextField
                                                            variant="outlined"
                                                            type="number"
                                                            required
                                                            fullWidth
                                                            id="phone"
                                                            label="Phone"
                                                            name="phone"
                                                            autoComplete="phone"
                                                            onChange={(e)=>{handleChange(e); handleFieldOnChange(e)}}
                                                            onBlur={handleBlur}
                                                            error={touched.phone && Boolean(errors.phone)}
                                                            helperText={touched.phone && errors.phone}
                                                        />
                                                    </Grid>
                                                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                        <Box sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px' }}>
                                                            <CardElement />
                                                        </Box>
                                                        {isCardEpmty && <Typography color={'error'}>{cardError}</Typography>}
                                                    </Grid>
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
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    // sx={{ margin: '30px 0px 10px 0px' }}
                                                    // disabled={isSubmitting}
                                                    disabled={!stripe || isProcessing || !isDetailComplete}
                                                    onClick={handleCheckoutSubmit}
                                                    sx={{ marginTop: 2 }}
                                                >
                                                    {isProcessing ? <CircularProgress size={24} color="inherit" /> : 'Checkout & Pay'}
                                                </Button>
                                                <Typography variant="body2" color={paymentStatus.includes('failed') ? 'error' : 'primary'} sx={{ marginTop: 2 }}>
                                                    {paymentStatus}
                                                </Typography>
                                                {error && <Typography color="red">{error}</Typography>}
                                            </Form>
                                        )}
                                    </Formik>
                                }
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 4, lg: 3 }} sx={{
                        border: '1px solid #d1cbcb',
                        padding: '5px',
                        paddingRight: '10px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    }}>
                        <Box sx={classes.paper}>
                            <Typography variant="h2" sx={{ marginBottom: '30px', fontWeight: '600', p: 1 }}>
                                Order Summary
                            </Typography>

                            <Box sx={{ width: '100%' }} noValidate display={'flex'}>
                                <Box>
                                    {
                                        cart.length > 0 ? (
                                            <>
                                                <Stack spacing={2} sx={{
                                                    maxHeight: '530px',
                                                    overflowY: 'auto',
                                                    padding: 2,
                                                }}>
                                                    {cart.map((item) => (
                                                        <>
                                                            <Box key={item.id} sx={{ display: 'flex' }} gap={1} alignItems={'center'}>
                                                                <Box>
                                                                    <img src={item.image} alt={item.name} style={{ width: '160px' }} />
                                                                </Box>
                                                                <Box width={'100%'} display={'flex'} justifyContent={'space-between'}>
                                                                    <Box width={'100%'}>
                                                                        <Text   > {item.name}</Text>
                                                                        {
                                                                            item.variations.map((variant) => {
                                                                                // Conditional rendering
                                                                                if (variant.variation_id === item.selectedVariant) {
                                                                                    return (
                                                                                        <Typography key={variant.id}>{variant.attributes.tablets}</Typography>
                                                                                    );
                                                                                }
                                                                                return null;
                                                                            })
                                                                        }
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography variant="h4" fontWeight={600}>£{item.selectedVariantPrice}</Typography>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                            <Divider/>
                                                        </>
                                                    )
                                                    )}
                                                </Stack>
                                                <Divider sx={{ borderWidth: '1px', borderColor: '#333333' }}></Divider>
                                                <Typography variant="h2" textAlign={'right'} marginTop={1}>Total: £{calculateTotal()}</Typography>
                                            </>
                                        )
                                            :
                                            (
                                                <Box padding={1}>
                                                    <Typography variant="h4">
                                                        Cart is empty...!!
                                                    </Typography>
                                                </Box>
                                            )
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                {
                    isCheckout && cart.length > 0 && 
                    <>
                        <Box sx={{
                            border: '1px solid #d1cbcb',
                            padding: '30px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                            marginY:'50px',
                            marginX: 'auto',
                            width: {xs: '100%', md: '50%'}
                        }}>
                            <Typography variant="h2" sx={{ textAlign: 'center', marginBottom: '30px', fontWeight: '600' }}>
                                Pay Now
                            </Typography>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {/* Card Details Section */}
                                <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px' }}>
                                    <CardElement />
                                </div>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    // sx={{ margin: '30px 0px 10px 0px' }}
                                    // disabled={isSubmitting}
                                    disabled={!stripe || isProcessing}
                                    onClick={handleSubmit}
                                    sx={{ marginTop: 2 }}
                                >
                                    {isProcessing ? <CircularProgress size={24} color="inherit" /> : 'Pay'}
                                </Button>
                                {/* <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    // sx={{ margin: '30px 0px 10px 0px' }}
                                    // disabled={isSubmitting}
                                    disabled={!stripe || isProcessing}
                                    onClick={() => { setIsCheckout(false) }}
                                    sx={{ marginTop: 2 }}
                                >
                                    
                                    Back
                                </Button> */}

                                {/* Payment Status Message */}
                                {paymentStatus && (
                                    <Typography variant="body2" color={paymentStatus.includes('failed') ? 'error' : 'primary'} sx={{ marginTop: 2 }}>
                                        {paymentStatus}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </>
                }
            </Box>
        </>
    );
}


// import React, {useState, useEffect} from 'react';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { Container, Typography, Button, CircularProgress, Box } from '@mui/material';

// const CheckoutForm = ({amount}) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [paymentStatus, setPaymentStatus] = useState('');
//     const [isProcessing, setIsProcessing] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         const cardElement = elements.getElement(CardElement);

//         if (!cardElement) {
//             setPaymentStatus('Card details are incomplete.');
//             return;
//         }

//         setIsProcessing(true);
//         setPaymentStatus(''); // Clear previous messages

//         try {
//             // Call the backend to create the PaymentIntent and get the client secret
//             const response = await fetch('http://admin.pillsphere.com/wp-json/wp/v2/create-payment-intent', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     amount: amount,
//                 }),
//             });

//             const data = await response.json();

//             if (data.status === '200') {
//                 const clientSecret = data.clientSecret;

//                 // Confirm the card payment using the client secret
//                 const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//                     payment_method: {
//                         card: cardElement,
//                     },
//                 });

//                 if (error) {
//                     setPaymentStatus('Payment failed: ' + error.message);
//                 } else if (paymentIntent.status === 'succeeded') {
//                     setPaymentStatus('Payment successful!');
//                     console.log('PaymentIntent ID:', paymentIntent.id); // Log the paymentIntent.id
//                 }
//             } else {
//                 setPaymentStatus('Error creating payment intent.');
//             }
//         } catch (error) {
//             setPaymentStatus('There was a problem with the payment process.');
//         }

//         setIsProcessing(false);
//     };

//     return (
//         <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//             <Typography variant="h4" gutterBottom>
//                 Payment Page
//             </Typography>
//             <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
//                 {/* Card Details Section */}
//                 <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px' }}>
//                     <CardElement />
//                 </div>

//                 <Button
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     type="submit"
//                     disabled={!stripe || isProcessing}
//                     onClick={handleSubmit}
//                     sx={{ marginTop: 2 }}
//                 >
//                     {isProcessing ? <CircularProgress size={24} color="inherit" /> : 'Pay'}
//                 </Button>
                
//                 {/* Payment Status Message */}
//                 {paymentStatus && (
//                     <Typography variant="body2" color={paymentStatus.includes('failed') ? 'error' : 'primary'} sx={{ marginTop: 2 }}>
//                         {paymentStatus}
//                     </Typography>
//                 )}
//             </Box>
//         </Container>
//     );
// };

// export default CheckoutForm;