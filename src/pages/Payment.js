import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { Container, Typography, Button, CircularProgress, Box } from '@mui/material';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';
// Load Stripe with your publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};



export default Payment;
