import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, Container, Typography, Rating,IconButton, Select, MenuItem } from "@mui/material";
import { Icon } from '@iconify/react';
import { getProducts } from "../../apis/apisList/productApi";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../Context/AppContext";
import theme from "../../Theme/theme";
import LoginRequiredPopup from "../../components/loginRequiredPopup/LoginRequiredPopup";

const productArray = [
    {
        "id": 358,
        "name": "Cetirizine Dihydrochloride Film Coated Tablets 10mg",
        "price": "1.99",
        "regular_price": "",
        "sale_price": "",
        "sku": "",
        "stock_status": "instock",
        "in_stock": "Yes",
        "description": "",
        "short_description": "",
        "link": "https://admin.pillsphere.com/product/cetirizine-dihydrochloride-film-coated-tablets-10mg/",
        "image": "https://admin.pillsphere.com/wp-content/uploads/2025/01/Cetirizine.jpg",
        "categories": [
            "Acid Reflux."
        ],
        "variations": [
            {
                "variation_id": 362,
                "sku": "",
                "price": "1.99",
                "stock_status": "instock",
                "in_stock": "Yes",
                "attributes": {
                    "tablets": "30 Tablets"
                }
            },
            {
                "variation_id": 363,
                "sku": "",
                "price": "2.99",
                "stock_status": "instock",
                "in_stock": "Yes",
                "attributes": {
                    "tablets": "60 Tablets"
                }
            },
            {
                "variation_id": 364,
                "sku": "",
                "price": "3.49",
                "stock_status": "instock",
                "in_stock": "Yes",
                "attributes": {
                    "tablets": "90 Tablets"
                }
            },
            {
                "variation_id": 365,
                "sku": "",
                "price": "5.49",
                "stock_status": "instock",
                "in_stock": "Yes",
                "attributes": {
                    "tablets": "180 Tablets"
                }
            },
            {
                "variation_id": 366,
                "sku": "",
                "price": "9.99",
                "stock_status": "instock",
                "in_stock": "Yes",
                "attributes": {
                    "tablets": "360 Tablets"
                }
            }
        ]
    },
    {
        "id": 354,
        "name": "Famotidine Tablets 20mg",
        "price": "29.99",
        "regular_price": "",
        "sale_price": "",
        "sku": "",
        "stock_status": "instock",
        "in_stock": "Yes",
        "description": "",
        "short_description": "",
        "link": "https://admin.pillsphere.com/product/famotidine-tablets-20mg/",
        "image": "https://admin.pillsphere.com/wp-content/uploads/2025/01/Famotidine.png",
        "categories": [
            "Acid Reflux."
        ],
        "variations": [
            {
                "variation_id": 355,
                "sku": "",
                "price": "29.99",
                "stock_status": "instock",
                "in_stock": "Yes",
                "attributes": {
                    "tablets": "28 Tablets"
                }
            },
            {
                "variation_id": 356,
                "sku": "",
                "price": "59.98",
                "stock_status": "instock",
                "in_stock": "Yes",
                "attributes": {
                    "tablets": "56 Tablets"
                }
            }
        ]
    },
    {
        "id": 351,
        "name": "Nexium Esomeprazole Tablets 40mg",
        "price": "39.99",
        "regular_price": "",
        "sale_price": "",
        "sku": "",
        "stock_status": "instock",
        "in_stock": "Yes",
        "description": "",
        "short_description": "",
        "link": "https://admin.pillsphere.com/product/nexium-esomeprazole-tablets-40mg/",
        "image": "https://admin.pillsphere.com/wp-content/uploads/2025/01/Nexium-esomeprazole.jpg",
        "categories": [
            "Acid Reflux."
        ],
        "variations": [
            {
                "variation_id": 352,
                "sku": "",
                "price": "39.99",
                "stock_status": "instock",
                "in_stock": "Yes",
                "attributes": {
                    "tablets": "28 Tablets"
                }
            },
            {
                "variation_id": 353,
                "sku": "",
                "price": "65.99",
                "stock_status": "instock",
                "in_stock": "Yes",
                "attributes": {
                    "tablets": "56 Tablets"
                }
            }
        ]
    },
    {
        "id": 347,
        "name": "Nexium Esomeprazole Tablets 20mg",
        "price": "26.59",
        "regular_price": "",
        "sale_price": "",
        "sku": "",
        "stock_status": "instock",
        "in_stock": "Yes",
        "description": "",
        "short_description": "",
        "link": "https://admin.pillsphere.com/product/nexium-esomeprazole-tablets-20mg/",
        "image": "https://admin.pillsphere.com/wp-content/uploads/2025/01/Nexium-esomeprazole.jpg",
        "categories": [
            "Acid Reflux."
        ],
        "variations": [
            {
                "variation_id": 348,
                "sku": "",
                "price": "26.59",
                "stock_status": "instock",
                "in_stock": "Yes",
                "attributes": {
                    "tablets": "28 Tablets"
                }
            },
            {
                "variation_id": 349,
                "sku": "",
                "price": "39.99",
                "stock_status": "instock",
                "in_stock": "Yes",
                "attributes": {
                    "tablets": "56 Tablets"
                }
            }
        ]
    },
]

const RelatedProduct = ({})=>{
    const {addToCart, userDetails} = useApp();
    const [productList, setProductList] = useState(productArray);
      const navigate = useNavigate();
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [isModalOpen, setIsModalOpen] = useState(false);
    
   

        useEffect(()=>{
            const storedUser = localStorage.getItem('user');
            if(storedUser){
                setIsLoggedIn(true);
            }
        }, [])
    
      const handleAddProduct = (product, selectedVariant)=>{
        // navigate(`/product/${id}`)
       
        if (!isLoggedIn) {
          setIsModalOpen(true);
        } else {
         
          addToCart(product, selectedVariant);
        }
      }
    
      const handleVariantSelect = (product, variantId) => {
       
        const variantDetail = product.variations.find((item)=>{
          if(item.variation_id == variantId){
            return item
          }
        })
        
        setProductList((prevCart) =>
          prevCart.map((item) => {
            if (item.id === product.id) {
              return {
                ...item,
                selectedVariant: variantId,
                selectedVariantInfo: variantDetail,
                selectedVariantPrice: item.variations.find(
                  (variant) => variant.variation_id === variantId
                )?.price
              }
            } else {
              return item
            }
          }
          )
        );
        // updateVariant(product, variantId);
    }
    

    return (
        <Container>
            <Box py={8}>
                <Box mb={6}>
                    <Typography variant="h2" fontWeight={600} color="#fff">Related Product</Typography>
                    <Typography variant="h4" color="#fff">Weight Loss Treatment: Tailored Solution for a healthier You</Typography>
                </Box>
                <Box display={'flex'} flexDirection={{xs:'column', md: 'row'}} gap={4}>
                    {productList.length > 0 && productList.map((product, index)=>(
                        <Box key={index} sx={{ height: { sm: '535.26px'}, maxWidth: '320px' }}>
                            <Card sx={{
                                borderRadius: "16px", boxShadow: 'none', minHeight: '413px', display: "flex",
                                flexDirection: "column",
                                flexWrap: 'wrap',
                                justifyContent: "space-between",
                                height: "100%",
                            }}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{maxHeight: '300px', objectFit: 'cover'}}
                            />
                            <CardContent sx={{
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                width: '100%',
                                maxHeight: '230px'
                            }}>
                                {/* <Typography variant="subtitle2" color="error" fontWeight="bold" sx={{
                                position: 'absolute',
                                top: '20px',
                                background: '#fff',
                                border: '1px solid #000',
                                borderRadius: '5px',
                                padding: '0px 10px',
                                fontSize: '12px',
                                }}>
                                {product.discount}
                                </Typography> */}
                                <Typography
                                variant="h4"
                                fontWeight="bold"
                                sx={{ mt: 1, fontSize: { xs: "14px", md: "1.25rem" } }}
                                >
                                {product.name}
                                </Typography>
                                <Box marginTop={3} display={'flex'} gap={6}>
                                <Box display="flex" gap="1rem" alignItems="center">
                                    <Typography variant="h6" color="primary.main" fontWeight="bold">
                                    £{product?.selectedVariantPrice? product?.selectedVariantPrice: product.price}
                                    </Typography>
                                    {/* <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>
                                    {product.originalPrice}
                                    </Typography> */}
                                </Box>

                                <Box>
                                    
                                    <Select
                                    value={product.selectedVariant? product.selectedVariant: product?.variations?.[0].variation_id}
                                    onChange={(e) => handleVariantSelect(product, e.target.value)}
                                    fullWidth
                                    sx={{'.MuiSelect-select': {
                                        padding: '7.5px 14px',
                                        },}}
                                    >
                                    {product?.variations?.map((variant) => (
                                        <MenuItem key={variant.variation_id} value={variant.variation_id}>
                                        {`${variant.attributes.tablets} `}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </Box>
                                {/* {
                                    product.reviews && <Box display="flex" alignItems="center" gap="0.5rem" sx={{ mt: 1 }}>
                                    {
                                        product.rating &&
                                        <Typography variant="body2">
                                        <Rating
                                            name="read-only"
                                            value={product.rating}
                                            readOnly
                                            precision={0.5}
                                            size="small"
                                        />
                                        </Typography>
                                    }
                                    ({product.reviews})
                                    </Box>
                                } */}
                                </Box>
                                <Button
                                variant="contained"
                                sx={{ mt: 2, backgroundColor: "primary.main", width: "100%", borderRadius: '50px', padding: '10px' }}
                                // onClick={()=>handleAddProduct(product, product.variations[0])}
                                onClick={()=>handleAddProduct(product, product.selectedVariantInfo? product.selectedVariantInfo: product.variations[0])}
                                >
                                    Add To Cart &nbsp;<Icon icon="solar:arrow-right-broken" color="primary.main" width="24" height="24" />
                                </Button>
                            </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Box>
            <LoginRequiredPopup
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </Container>
    )
}

export default RelatedProduct