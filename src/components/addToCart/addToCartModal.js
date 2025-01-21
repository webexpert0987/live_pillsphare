import React, { useState } from 'react';
import { Modal, Box, Typography, RadioGroup, Radio, FormControlLabel, Button, Select, MenuItem } from '@mui/material';
import { useApp } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';


const AddToCartModal = ({ open, onClose }) => {
    const navigate= useNavigate();
    const [selectedVariant, setSelectedVariant] = useState({});
    const { cart, updateVariant, calculateTotal, updateVariantInCart } = useApp();

    const handleVariantChange = (productId, selectedVariantId) => {
        const product = cart.find((item) => item.product.id === productId)?.product;
        const newVariant = product.variations.find(
            (variant) => variant.variation_id === parseInt(selectedVariantId, 10)
        );

        if (newVariant) {
            updateVariantInCart(productId, newVariant.variation_id, 1);
        }
    };

    // Handle variant selection
    //   const handleVariantChange = (event) => {
    //     const variantId = parseInt(event.target.value, 10);
    //     const variant = product.variations.find((v) => v.variation_id === variantId);
    //     setSelectedVariant(variant);
    //   };

    const handleVariantSelect = (product, variantId) => {
        updateVariant(product, variantId);
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: '80%',
                    bgcolor: 'background.paper',
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 24,
                    mx: 'auto',
                    mt: 10,
                    height: '630px',
                    // overflow: 'scroll'
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">Cart</Typography>
                    <Button onClick={onClose} size="small" color="error">
                        Close
                    </Button>
                </Box>

                {cart.length > 0 ? (
                    <Box height={'400px'} overflow={'scroll'}>
                        {cart.map((item, index) => (
                            <>
                                <Box display={'flex'} gap={15} key={item.id}>
                                    <Box mb={2} textAlign="center">
                                        <img src={item.image} alt={item.name} style={{ width: '300px' }} />
                                    </Box>
                                    <Box width={'30%'}>
                                        <Typography>{item.name}</Typography>
                                        <Typography variant="subtitle1" mb={1}>
                                            Choose Variant:
                                        </Typography>
                                        <Select
                                            value={item.selectedVariant}
                                            onChange={(e)=>handleVariantSelect(item, e.target.value)}
                                            fullWidth
                                        >
                                            {item.variations.map((variant) => (
                                                <MenuItem key={variant.variation_id} value={variant.variation_id}>
                                                    {`${variant.attributes.tablets} `}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                        <Typography variant="h5" mt={2} mb={2}>
                                            Price: ${item.selectedVariantPrice}
                                        </Typography>
                                    </Box>
                                </Box>
                            </>

                        ))}
                    </Box>
                ) : (
                    <p>Your cart is empty.</p>
                )}

                {/* <Typography variant="subtitle1" mb={1}>
          Choose Variant:
        </Typography>
        <Select
            value={selectedVariant.variation_id.toString()}
            onChange={(event) => {
                const variantId = parseInt(event.target.value, 10);
                const variant = product.variations.find((v) => v.variation_id === variantId);
                setSelectedVariant(variant);
            }}
            fullWidth
        >
            {product.variations.map((variant) => (
                <MenuItem key={variant.variation_id} value={variant.variation_id.toString()}>
                    {`${variant.attributes.tablets} - $${variant.price}`}
                </MenuItem>
            ))}
        </Select>

        <Typography variant="h5" mt={2} mb={2}>
          Price: ${selectedVariant.price}
        </Typography> */}
                <Typography textAlign={'right'} my={3} mr={5} variant='h2'>Total Amount: ${calculateTotal()}</Typography>


                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                        console.log(`Added variant ${selectedVariant.variation_id} to cart`);
                        navigate('/checkout')
                        onClose();
                    }}
                >
                    Checkout
                </Button>
            </Box>
        </Modal>
    );
};

export default AddToCartModal;
