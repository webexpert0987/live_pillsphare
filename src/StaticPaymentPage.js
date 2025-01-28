import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Container, Typography, Button, CircularProgress, Box } from '@mui/material'; // Import Material UI components

// Load Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51Qhr9OHPGZo76VQZgXLDbiGwAwEwOQqAAGc3y3aDrGM3TJpU0igPpwbcCbUB3D1AST5tBTDfUrFzF9n3iQ5cvY1x00wI6UDnsh'); // Replace with your Stripe publishable key

const StaticPaymentPage = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentStatus, setPaymentStatus] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setPaymentStatus('Card details are incomplete.');
            return;
        }

        setIsProcessing(true);
        setPaymentStatus(''); // Clear previous messages

        try {
            // Call the backend to create the PaymentIntent and get the client secret
            const response = await fetch('https://admin.pillsphere.com/wp-json/wp/v2/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 1000,  // Replace with your amount (in cents)
                }),
            });

            const data = await response.json();

            if (data.status === '200') {
                const clientSecret = data.clientSecret;

                // Confirm the card payment using the client secret
                const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                    },
                });

                if (error) {
                    setPaymentStatus('Payment failed: ' + error.message);
                } else if (paymentIntent.status === 'succeeded') {
                    setPaymentStatus('Payment successful!');
                  
                }
            } else {
                setPaymentStatus('Error creating payment intent.');
            }
        } catch (error) {
            setPaymentStatus('There was a problem with the payment process.');
        }

        setIsProcessing(false);
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h4" gutterBottom>
                Payment Page
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Card Details Section */}
                <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <CardElement />
                </div>

                {/* Payment Button */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    disabled={!stripe || isProcessing}
                    onClick={handleSubmit}
                    sx={{ marginTop: 2 }}
                >
                    {isProcessing ? <CircularProgress size={24} color="inherit" /> : 'Pay'}
                </Button>
                
                {/* Payment Status Message */}
                {paymentStatus && (
                    <Typography variant="body2" color={paymentStatus.includes('failed') ? 'error' : 'primary'} sx={{ marginTop: 2 }}>
                        {paymentStatus}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default StaticPaymentPage;
