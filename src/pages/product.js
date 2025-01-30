import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Divider,
  Stack,
  Container,
  Select,
  MenuItem,
  CardContent
} from "@mui/material";
import VerticalImageSlider from "../components/productSlider/ProductSlider";
import { useApp } from "../Context/AppContext";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../apis/apisList/productApi";
import { useMessage } from "../Context/MessageContext";
import theme from "../Theme/theme"
import { Icon } from '@iconify/react';
import ProductOverview from "../components/productPage/productOverview";
import RelatedProduct from "../components/productPage/relatedProduct";
import LoginRequiredPopup from "../components/loginRequiredPopup/LoginRequiredPopup";


const Product = () =>{
    const {slug} = useParams();
    
    const {showMessage} = useMessage();
    const {addToCart} = useApp();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Mocked login state
    const [isModalOpen, setIsModalOpen] = useState(false);
 

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            // Check if the product is cached in localStorage
            const cachedProduct = localStorage.getItem(`product-${slug}`);
            
            if (cachedProduct) {
              setProduct(JSON.parse(cachedProduct)); // Use cached product
            } else {
              const response = await getProductBySlug(slug);
              setProduct(response.product);
              localStorage.setItem(`product-${slug}`, JSON.stringify(response.product)); // Cache the product
            }
          } catch (error) {
            showMessage(error.response?.data?.message || 'Failed to fetch product', 'error');
          }
        };
      
        // Check if user is logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setIsLoggedIn(true);
        }
      
        fetchProduct();
        window.scrollTo(0, 0);
      }, [slug]);

   

    const handleVariantSelect = (product, variantId) => {
        const variantDetail = product.variations.find((item)=>{
          if(item.variation_id == variantId){
            return item
          }
        })
        
        setProduct((prevProduct) => {
            return {
                ...prevProduct,
                selectedVariant: variantId,
                selectedVariantInfo: variantDetail,
                selectedVariantPrice: prevProduct.variations.find(
                    (variant) => variant.variation_id === variantId
                )?.price
            }
        });
        // updateVariant(product, variantId);
    }

    const handleAddProduct = (product, selectedVariant)=>{
        // navigate(`/product/${id}`)
        if (!isLoggedIn) {
          setIsModalOpen(true);
        } else {
          
          addToCart(product, selectedVariant);
        }
    }

    return (
        <>
            <Container>
                <Box
                    display={{xs: 'block', md:"flex"}}
                    justifyContent="center"
                    alignItems="flex-start"
                    padding={4}
                    gap={4}
                >
                   <VerticalImageSlider id={product.id} />
                    <Box
                        width="100%"
                        display="flex"
                        flexDirection="column"
                        gap={3}
                        padding={2}
                        sx={{
                            borderRadius: "8px",
                        }}
                    >   
                        <Box>
                            {/* Product Title */}
                            {/*<Typography variant="h4" fontWeight="bold">
                                AOSEPT PLUS
                            </Typography>*/}
                            {/* Product Title */}
                            <Typography variant="body5" fontWeight="bold">
                                {product?.name}
                            </Typography>
                        </Box>

                        {/* Price Section */}
                        <Stack direction="row" alignItems="center" gap={2}>
                            <Typography variant="body4" color="tertiary" fontWeight={600}>
                                £{product.selectedVariantPrice ? product?.selectedVariantPrice: product?.price}
                            </Typography>
                            {/* <Typography
                                variant="body1"
                                sx={{ textDecoration: "line-through", color: "#999" }}
                            >
                                RRP $59.95
                            </Typography> */}
                        </Stack>

                        <Stack direction={{xs: 'column', md: 'row'}} gap={4}>
                            <Box>
                                {/* <Typography variant="subtitle1" mb={1}>
                                Choose Variant:
                                </Typography> */}
                                {
                                    product && product.price &&
                                    <Select
                                        value={(product.selectedVariant ? product.selectedVariant : product?.variations?.[0].variation_id)}
                                        // value={product.variations[0].variation_id}
                                        onChange={(e) => handleVariantSelect(product, e.target.value)}
                                        fullWidth
                                        sx={{
                                            '.MuiSelect-select': {
                                                padding: '12.5px 30px',
                                            },
                                        }}
                                    >
                                        {product?.variations?.map((variant) => (
                                            <MenuItem key={variant.variation_id} value={variant.variation_id}>
                                                {`${variant.attributes.tablets} `}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                }
                            </Box>
                            <Box>
                                {/* Add to Cart Button */}
                                <Button
                                    variant="contained"
                                    sx={{ mt: 2, backgroundColor: "tertiary.main", borderRadius: '50px', padding: '12px', maxWidth: { xs:'100%', md: '250px'}, width: {xs: '100%', md: '250px'}, marginTop: '0px' }}
                                    // onClick={()=>handleAddProduct(product, product.variations[0])}
                                    onClick={() => handleAddProduct(product, product.selectedVariantInfo ? product.selectedVariantInfo : product.variations[0])}
                                >
                                    Add To Cart &nbsp;<Icon icon="solar:arrow-right-broken" color="primary.main" width="24" height="24" />
                                </Button>
                            </Box>
                        </Stack>
                        <Divider />
                        <Box>
                            <CardContent sx={{border: '1px solid #D3D3D3', borderRadius: '10px'}}>
                                <Box mb={1}>
                                    <Typography variant="h3" fontWeight="700">
                                        Delivery Options
                                    </Typography>
                                    <Stack direction={'row'} alignItems={'center'} gap={2} my={1.8}>
                                        <Box>
                                            <Icon icon="material-symbols:circle" width="20" height="20"  style={{color: '#57ac4f'}} />
                                        </Box>
                                        <Box>
                                            <Typography variant="h4" >
                                                <strong>In Stock</strong> for Sydney, 2000
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                                <Divider/>
                                <Box mt={2}>
                                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                                        <Box>
                                            <Icon icon="hugeicons:delivery-truck-02" width="35" height="35" />
                                        </Box>
                                        <Box>
                                            <Typography variant="h3" fontWeight="700">
                                                Estimated Delivery
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Typography variant="h4" width={'75%'} pl={3} color="#333333">
                                        Order in the next <strong>00:35:06</strong> to get it tomorrow* using Express 1-2 Days (Royal Mail Tracked 24)
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Box>
                    </Box>
                </Box>
                <Box backgroundColor={'#F6EFDF'} p={5} borderRadius={'10px'} my={8}>
                    <Typography variant="h1" fontSize={'24px'} color="#836D3C" fontWeight={700} mb={2}>What out expert says</Typography>
                    <Typography variant="h4" color="#836D3C" fontWeight={500}>
                        Need an extra boost of energy? Vitabiotics Wellman Energy are effervescent tablets for men that dissolve into a tasty orange-flavoured drink.
                        Whether you’re dealing with a hectic life, late nights or travel,
                        these tablets provide a welcome nutritional boost with vitamin C, B1, B6, biotin, iron, magnesium and selenium.
                    </Typography>
                </Box>
                <Box>
                    <ProductOverview/>
                </Box>
            </Container>
            <Box backgroundColor={theme.palette.primary.main}>
                <RelatedProduct/>
            </Box>
            <LoginRequiredPopup
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}

export default Product;