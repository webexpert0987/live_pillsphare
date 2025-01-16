import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, Container, Typography, Rating,IconButton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from '@iconify/react';
import CustomButton from "../../Button/button";
import { getProducts } from "../../../apis/apisList/productApi";

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
  const [products, setProducts] = useState([]);

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

    fetchProducts();
  }, []);

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
            <Typography variant="body1" sx={{ marginTop: "1rem" }}>
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
            <img style={{ padding:'10px 10px 0px 10px' }} src="/images/featuredProduct.png" />
          </Box>
        </Box>
        <Container sx={{ width: { md: '740px', lg: '1030px'}, paddingLeft: '10px' }}>
          <Slider
            {...settings}
            prevArrow={<CustomLeftArrow />}
            nextArrow={<CustomRightArrow />}
          >
            {products.map((product, index) => (
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
                  // style={{ width: "100%", height: "auto", borderRadius: "8px 8px 0 0" }}
                  />
                  <CardContent sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '100%'
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
                          {product.price}
                        </Typography>
                        <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>
                          {product.originalPrice}
                        </Typography>
                      </Box>
                      {
                        product.reviews && <Box display="flex" alignItems="center" gap="0.5rem" sx={{ mt: 1 }}>
                          {/* <StarIcon color="warning" fontSize="small" /> */}
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
                      }
                    </Box>
                    <Button
                      variant="contained"
                      sx={{ mt: 2, backgroundColor: "primary.main", width: "100%", borderRadius: '50px', padding: '10px' }}
                    >
                      Add to Cart &nbsp;<Icon icon="solar:arrow-right-broken" color="primary.main" width="24" height="24" />
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
        </Container>
      </Box>
    </Container>
  )
}

export default FeaturedProducts;
