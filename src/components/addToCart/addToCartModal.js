import React, { useState } from 'react';
import { Modal, Box, Typography, RadioGroup, Radio, FormControlLabel, Button, Select, MenuItem, Divider } from '@mui/material';
import { useApp } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';


const AddToCartModal = ({ open, onClose }) => {
    const navigate= useNavigate();
    const [selectedVariant, setSelectedVariant] = useState({});
    const { cart, updateVariant, calculateTotal, updateVariantInCart, removeFromCart, variantIds } = useApp();
    console.log('variantIds', variantIds)
    console.log('cart', cart)

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
                    height: cart.length > 0 ? '630px': 'auto',
                    // overflow: 'scroll'
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">Cart</Typography>
                    <Button onClick={onClose} size="small" color="error">
                        <CloseIcon />
                    </Button>
                </Box>
                <Divider/>
                {cart.length > 0 ? (
                    <Box height={'400px'} sx={{overflowY: 'scroll'}}>
                        {cart.map((item, index) => (
                            <>
                                <Box display={'flex'} gap={15} key={item.id} alignItems={'center'} justifyContent={'space-evenly'}>
                                    <Box >
                                        <DeleteOutlineIcon color='error' onClick={()=>{removeFromCart(item)}}/>
                                    </Box>
                                    <Box mb={2} textAlign="center">
                                        <img src={item.image} alt={item.name} style={{ width: '160px' }} />
                                    </Box>
                                    <Box width={'30%'}>
                                        <Typography variant='h3'>{item.name}</Typography>
                                        {
                                            item.stock_status == 'instock' ?
                                            <Typography variant='h4' color='success'>{item.stock_status}</Typography>
                                            : 
                                            <Typography variant='h4' color='error'>{item.stock_status}</Typography>
                                        }
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1" mb={1}>
                                            Choose Variant:
                                        </Typography>
                                        <Select
                                            value={item.selectedVariant}
                                            onChange={(e) => handleVariantSelect(item, e.target.value)}
                                            fullWidth
                                            sx={{'.MuiSelect-select': {
                                                padding: '7.5px 14px',
                                              },}}
                                        >
                                            {item.variations.map((variant) => (
                                                <MenuItem key={variant.variation_id} value={variant.variation_id}>
                                                    {`${variant.attributes.tablets} `}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Box>
                                    <Box>
                                        <Typography variant="h5" mt={2} mb={2}>
                                            £{item.selectedVariantPrice}
                                        </Typography>
                                    </Box>
                                    
                                </Box>
                                <Divider/>
                            </>

                        ))}
                    </Box>
                ) : (
                    <Typography variant='h2' textAlign={'center'} my={10}>Your cart is empty.</Typography>
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
                {cart.length > 0 && <Typography textAlign={'right'} my={3} mr={5} variant='h2'>Total Amount: £{calculateTotal()}</Typography>}


                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                        console.log(`Added variant ${selectedVariant.variation_id} to cart`);
                        navigate('/payment');
                        onClose();
                    }}
                    disabled={cart.length > 0 ? false: true}
                >
                    Checkout
                </Button>
            </Box>
        </Modal>
    );
};

export default AddToCartModal;
