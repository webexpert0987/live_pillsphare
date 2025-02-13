import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Rating,
  IconButton,
  Select,
  MenuItem,
  Grid2,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from "@iconify/react";
import CustomButton from "../../Button/button";
import { getProducts } from "../../../apis/apisList/productApi";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../../Context/AppContext";
import LoginRequiredPopup from "../../loginRequiredPopup/LoginRequiredPopup";
import { useMessage } from "../../../Context/MessageContext";


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
        top: { xs: "40%", sm: "40%", md: "50%" },
        left: "0",
        width: { xs: "30px", sm: "40px", md: "50px" },
        height: { xs: "30px", sm: "40px", md: "50px" },
        transform: "translateY(-50%)",
        zIndex: 10,
        padding: "15px 15px 10px 15px",
        backgroundColor: "secondary.main",
        color: "tertiary.main",
        "&:hover": {
          backgroundColor: "secondary.main",
        },
      }}
    >
      <Box>
        {/* <ArrowBackIosNewIcon color="tertiary.main"/> */}
        <Icon icon="solar:arrow-left-linear" width="25" height="25" />
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
        top: { xs: "40%", sm: "40%", md: "50%" },
        right: { xs: "0px", sm: "-20px", md: "-30px" },
        width: { xs: "30px", sm: "40px", md: "50px" },
        height: { xs: "30px", sm: "40px", md: "50px" },
        transform: "translateY(-50%)",
        zIndex: 10,
        padding: "15px 15px 10px 15px",
        backgroundColor: "secondary.main",
        color: "tertiary.main",
        "&:hover": {
          backgroundColor: "secondary.main",
        },
      }}
    >
      <Box>
        <Icon icon="solar:arrow-right-outline" width="25" height="25" />
      </Box>
    </IconButton>
  );
}

const homeFeatured = {
  imageBox: {
    borderRadius: "12px !important",
    overflow: "hidden !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageSource: {
    borderRadius: "0",
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
  },
};

function FeaturedProducts() {
  const { addToCart } = useApp();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { cart, updateVariant, calculateTotal, removeFromCart, variantIds } =
    useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {showMessage} = useMessage();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Check if products are already in localStorage
        const cachedProducts = localStorage.getItem("products");

        if (cachedProducts) {
          setProducts(JSON.parse(cachedProducts)); // Use cached products
        } else {
          const data = await getProducts();
          setProducts(data.products);
          localStorage.setItem("products", JSON.stringify(data.products)); // Cache the products in localStorage
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
    }

    fetchProducts();
  }, []);

  const handleAddProduct = (product, selectedVariant) => {
    // navigate(`/product/${id}`)
    const test = 0;
    if (test == 0) {
        // Show the error message
        showMessage('Sorry, this product is currently out of stock. Please check back later.', 'error');
        return; // Prevent further actions
    }
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      addToCart(product, selectedVariant);
    }
  };

  const handleVariantSelect = (product, variantId) => {
    const variantDetail = product.variations.find((item) => {
      if (item.variation_id == variantId) {
        return item;
      }
    });

    setProducts((prevCart) =>
      prevCart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            selectedVariant: variantId,
            selectedVariantInfo: variantDetail,
            selectedVariantPrice: item.variations.find(
              (variant) => variant.variation_id === variantId
            )?.price,
          };
        } else {
          return item;
        }
      })
    );
    // updateVariant(product, variantId);
  };

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
    <Container
      sx={{
        marginY: { xs: "0px", sm: "40px", md: "80px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: { xs: "wrap", sm: "nowrap", md: "nowrap" },
          flexDirection: "row",
        }}
      >
        {/* Column Left */}
        <Box
          sx={{
            width: { xs: "100%", sm: "30%", md: "25%" },
            paddingRight: { xs: "0", sm: "10px", md: "10px" },
            height: "100%",
            flex: "1",
          }}
        >
          <Box
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              padding: {
                xs: "2rem 1rem 0rem 2rem",
                sm: "1.2rem 1rem 0rem 1rem",
              },
              borderRadius: "12px",
              position: "relative",
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Featured Product
              </Typography>
              <Typography variant="h4" sx={{ 
                marginTop: "1rem", 
                fontSize: { xs: "15px", md: "16px"},
                }}>
                Changes to diet and exercise are often combined with this
                medication.
              </Typography>
              {/* <Button
              variant="contained"
              sx={{ backgroundColor: "#FD6400", marginTop: "1.5rem", fontSize: '18px', borderRadius: '50px', padding: '10px 20px', textTransform: 'capitalize' }}
            >
              View All &nbsp; <Icon icon="solar:arrow-right-broken" color="primary.main" width="22" height="22" />
            </Button> */}
              <CustomButton
                bgColor={"tertiary.main"}
                txColor={"primary.main"}
                text="View All"
                style={{ width: "auto" }}
              />
            </Box>
            <Box
              sx={{
                textAlign: "center",
                bottom: "-7px",
                position: { xs: "relative" },
                right: "0px",
                width: "100%",
              }}
            >
              {/* <img style={{ width: '260px' }} src="/images/featuredProduct.png" /> */}
              <img
                style={{ padding: "30px 10px 0px 10px", maxWidth: "100%" }}
                src="/images/featuredProduct.png"
                alt="product image"
              />
            </Box>
          </Box>
        </Box>

        {/* Column Right */}
        <Box
          sx={{
            width: { xs: "100%", sm: "70%", md: "75%" },
            marginTop: { xs: "30px", sm: "0", md: "0" },
          }}
        >
          <Slider
            {...settings}
            prevArrow={<CustomLeftArrow />}
            nextArrow={<CustomRightArrow />}
          >
            {Array.isArray(products) &&
              products.length > 0 &&
              products.map((product, index) => (
                <Box
                  sx={{
                    padding: { xs: "0", sm: "0 0 0 30px", md: "0 0 0 30px" },
                  }}
                  key={index}
                >
                  <Card
                    sx={{
                      boxShadow: "none",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      borderRadius: "12px",
                      border: "1px solid #eee",
                    }}
                  >
                    <Box
                      style={homeFeatured.imageBox}
                      sx={{
                        height: { xs: "180px", sm: "220px", md: "280px" },
                      }}
                    >
                      <img
                        style={homeFeatured.imageSource}
                        src={product.image}
                        alt={product.name}
                        // style={{ width: "100%", height: "auto", borderRadius: "8px 8px 0 0" }}
                      />
                    </Box>
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        width: "100%",
                        maxHeight: "230px",
                        backgroundColor: "#FAFAFA",
                        borderRadius: "0 0 12px 12px",
                      }}
                    >
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
                        sx={{
                          mt: 1,
                          fontSize: {
                            xs: "16px",
                            md: "1.25rem",
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => {
                          navigate(`/product/${product.slug}`);
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Box
                        marginTop={3}
                        display={"flex"}
                        gap={6}
                        sx={{
                          justifyContent: "space-between",
                        }}
                      >
                        <Box display="flex" gap="1rem" alignItems="center">
                          <Typography
                            variant="h6"
                            color="#FD6400"
                            fontWeight="800"
                            sx={{
                              fontSize: {
                                xs: "18px",
                                md: "18px",
                                cursor: "pointer",
                              },
                            }}
                          >
                            £{product.price}
                          </Typography>
                          {/* <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>
                          {product.originalPrice}
                        </Typography> */}
                        </Box>
                        {/** 
                        <Box>
                          <Select
                            value={
                              product.selectedVariant
                                ? product.selectedVariant
                                : product?.variations?.[0].variation_id
                            }
                            onChange={(e) =>
                              handleVariantSelect(product, e.target.value)
                            }
                            fullWidth
                            sx={{
                              ".MuiSelect-select": {
                                padding: "7.5px 14px",
                                maxWidth: "150px",
                              },
                            }}
                          >
                            {product?.variations?.map((variant) => (
                              <MenuItem
                                key={variant.variation_id}
                                value={variant.variation_id}
                              >
                                {`${variant.attributes.tablets} `}
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>*/}
                        {product.reviews && (
                          <Box
                            display="flex"
                            alignItems="center"
                            gap="0.5rem"
                            sx={{ mt: 1 }}
                          >
                            {product.rating && (
                              <Typography variant="body2">
                                <Rating
                                  name="read-only"
                                  value={product.rating}
                                  readOnly
                                  precision={0.5}
                                  size="small"
                                />
                              </Typography>
                            )}
                            ({product.reviews})
                          </Box>
                        )}
                      </Box>
                      <Button
                        variant="contained"
                        sx={{
                          mt: 2,
                          backgroundColor: "primary.main",
                          width: "100%",
                          borderRadius: "50px",
                          padding: "10px",
                          boxShadow: "none",
                          fontSize: "14px",
                          fontWeight: "600",
                          textTransform: "none",
                        }}
                        // onClick={()=>handleAddProduct(product, product.variations[0])}
                        onClick={() =>
                          handleAddProduct(
                            product,
                            product.selectedVariantInfo
                              ? product.selectedVariantInfo
                              : product.variations[0]
                          )
                        }
                      >
                        Add to Cart &nbsp;
                        <Icon
                          icon="solar:arrow-right-broken"
                          color="primary.main"
                          width="24"
                          height="24"
                        />
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              ))}
          </Slider>
        </Box>
        <LoginRequiredPopup
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Box>
    </Container>
  );
}

export default FeaturedProducts;
