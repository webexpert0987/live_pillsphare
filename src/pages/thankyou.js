import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
    const navigate = useNavigate();
    const handleContinueShopping = () => {
        navigate('/')
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', my: 8 }}>
            {/* Success Icon */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
            </Box>

            {/* Thank You Message */}
            <Typography variant="h2" fontWeight={600} mb={1}>
                Payment Successful!
            </Typography>
            <Typography variant="h3" sx={{ mb: 4 }} fontWeight={500}>
                Thank you for your purchase. Your order has been processed successfully.
            </Typography>

            {/* Button to Navigate */}
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleContinueShopping}
                sx={{ textTransform: 'none' }}
            >
                Continue Shopping
            </Button>
        </Container>
    );
};

export default ThankYouPage;
