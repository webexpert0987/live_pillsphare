import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, Container, Typography, Rating,IconButton, Select, MenuItem } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from '@iconify/react';
import CustomButton from "../../Button/button";
import { getProducts } from "../../../apis/apisList/productApi";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../../Context/AppContext";
import LoginRequiredPopup from "../../loginRequiredPopup/LoginRequiredPopup";

// const products = [
//   {
//     image: "/images/Mask-group.png",
//     title: "Beforeyouspeak Coffee Collagen Coffee Mocha asdf asdf asdf asdf asdf asd fasdf  asdf",
//     price: "$55.96",
//     originalPrice: "$69.95",
//     discount: "20% OFF RRP",
//     rating: 4.5,
//     reviews: 121,
//   },
//   {
//     image: "/images/December-Co-Op_Capilano-Manuka 1.png",
//     title: "Microlife B2 Basic Blood Pressure Monitor",
//     price: "$55.96",
//     originalPrice: "$69.95",
//     discount: "40% OFF RRP",
//     rating: 4.5,
//     reviews: 121,
//   },
//   {
//     image: "/images/December-Co-Op_Nicorette 1.png",
//     title: "Cetaphil Moisturising Lotion 1 Litre",
//     price: "$55.96",
//     originalPrice: "$69.95",
//     discount: "20% OFF RRP",
//     rating: 4.5,
//     reviews: 121,
//   },
// ];

function CustomLeftArrow({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        left: "-25px",
        transform: "translateY(-50%)",
        zIndex: 10,
        padding: '15px 15px 10px 15px',
        backgroundColor: "secondary.main",
        color: "tertiary.main",
        "&:hover": {
          backgroundColor: "secondary.main",
        },
      }}
    >
      <Box>
        {/* <ArrowBackIosNewIcon color="tertiary.main"/> */}
        <Icon icon="solar:arrow-left-linear" width="30" height="30" />
      </Box>
    </IconButton>
  );
}

function CustomRightArrow({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        right: "-25px",
        transform: "translateY(-50%)",
        zIndex: 10,
        padding: '15px',
        backgroundColor: "secondary.main",
        color: "tertiary.main",
        "&:hover": {
          backgroundColor: "secondary.main",
        },
      }}
    >
      <Icon icon="solar:arrow-right-outline" width="30" height="30" />
    </IconButton>
  );
}

function FeaturedProducts() {
  const {addToCart} = useApp();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { cart, updateVariant, calculateTotal, removeFromCart, variantIds } = useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        console.log('product data', data.products);
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
    }
    fetchProducts();
  }, []);

  const handleAddProduct = (product, selectedVariant)=>{
    // navigate(`/product/${id}`)
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      console.log('selectedVariant', selectedVariant)
      addToCart(product, selectedVariant);
    }
  }

  const handleVariantSelect = (product, variantId) => {
    console.log('product', product);
    const variantDetail = product.variations.find((item)=>{
      if(item.variation_id == variantId){
        return item
      }
    })
    console.log('variantDetail', variantDetail)
    setProducts((prevCart) =>
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 788,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Container sx={{ marginY: '50px' }}>
      <Box sx={{ display: 'flex', flexDirection: {xs:'column', md:'row'}, gap: {xs:'30px', lg:  '30px'} }}>
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            padding: "2rem 1rem 0rem 2rem",
            borderRadius: "8px",
            position: 'relative',
            minWidth: '310px',
            maxWidth: {xs: '100%', md: '310px'}
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Featured Product
            </Typography>
            <Typography variant="h4" sx={{ marginTop: "1rem" }}>
              Changes to diet and exercise are often combined with this medication.
            </Typography>
            {/* <Button
              variant="contained"
              sx={{ backgroundColor: "#FD6400", marginTop: "1.5rem", fontSize: '18px', borderRadius: '50px', padding: '10px 20px', textTransform: 'capitalize' }}
            >
              View All &nbsp; <Icon icon="solar:arrow-right-broken" color="primary.main" width="22" height="22" />
            </Button> */}
            <CustomButton bgColor={"tertiary.main"} txColor={"primary.main"} text="View All" style={{width: '100%'}}/>
          </Box>
          <Box sx={{
            textAlign: 'center',
            bottom: '-7px',
            position: {xs: 'relative', md:'absolute'},
            right: '0px',
            width: '100%',
          }}>
            {/* <img style={{ width: '260px' }} src="/images/featuredProduct.png" /> */}
            <img style={{ padding:'10px 10px 0px 10px' }} src="/images/featuredProduct.png"  alt="product image"/>
          </Box>
        </Box>
        <Container sx={{ width: { md: '740px', lg: '1030px'}, paddingLeft: '10px'}}>
          <Slider
            {...settings}
            prevArrow={<CustomLeftArrow />}
            nextArrow={<CustomRightArrow />}
          >
            {Array.isArray(products) && products.length > 0 && products.map((product, index) => (
              <Box key={index} sx={{ px: 1, height: { sm: '535.26px'} }}>
                <Card sx={{
                  borderRadius: "16px", boxShadow: 'none', minHeight: '413px', display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{maxHeight: '300px'}}
                  // style={{ width: "100%", height: "auto", borderRadius: "8px 8px 0 0" }}
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
                      sx={{ mt: 1, fontSize: { xs: "14px", md: "1.25rem", cursor: 'pointer' } }}
                      onClick={()=>{navigate(`/product/${product.id}`)}}
                    >
                      {product.name}
                    </Typography>
                    <Box marginTop={3} display={'flex'} gap={6}>
                      <Box display="flex" gap="1rem" alignItems="center">
                        <Typography variant="h6" color="primary.main" fontWeight="bold">
                          £{product.price}
                        </Typography>
                        {/* <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>
                          {product.originalPrice}
                        </Typography> */}
                      </Box>

                      <Box>
                        {/* <Typography variant="subtitle1" mb={1}>
                          Choose Variant:
                        </Typography> */}
                        <Select
                          value={product.selectedVariant? product.selectedVariant: product?.variations?.[0].variation_id}
                          onChange={(e) => handleVariantSelect(product, e.target.value)}
                          fullWidth
                          sx={{'.MuiSelect-select': {
                              padding: '7.5px 14px',
                              maxWidth: '150px'
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
          </Slider>
        </Container>
        <LoginRequiredPopup
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Box>
    </Container>
  )
}

export default FeaturedProducts;
