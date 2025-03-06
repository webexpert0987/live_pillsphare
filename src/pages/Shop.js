import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Select,
  MenuItem,
  Container,
  Grid2,
  CircularProgress,
} from "@mui/material";
import { Rating } from "@mui/material";
import HeroSection from "./ShopHero";
import TrustBar from "./Trustbar";
import { getProducts } from "../apis/apisList/productApi";
import { Link } from "react-router-dom";
import CategoryPage from "../components/category";
import { useApp } from "../Context/AppContext";
import PaginationComponent from "../components/PaginationComponent";
const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const { filteredProducts, setSortOption } = useApp();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const handlePageChange = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Check if products are already in localStorage
        const cachedProducts = localStorage.getItem("products");

        // if (cachedProducts) {
        //   setProducts(JSON.parse(cachedProducts)); // Use cached products
        // } else {
        const data = await getProducts();
        setProducts(data.products);
        localStorage.setItem("products", JSON.stringify(data.products)); // Cache the products in localStorage
        setLoading(false);
        // }
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const shop3Grid = {
    shopProductBox: {
      backgroundColor: "#FFF",
      border: "none",
    },
    shopinBox: {
      backgroundColor: "#FAFAFA",
      border: "none",
      boxShadow: "0 0 6px rgba(0,0,0,0.10)",
      borderRadius: "12px",
      overflow: "hidden",
    },
    offerTag: {
      color: "#DE0000",
      textTransform: "uppercase",
      backgroundColor: "#FFFFFF",
      borderRadius: "4px",
      border: "1px solid #DE0000",
      fontSize: "12px",
      fontWeight: "700",
      lineHeight: "1.2",
      margin: "17px 0 0 15px",
    },
    titlePriceBox: {
      padding: "17px 20px 0 20px",
    },
    priceBox: {
      display: "flex",
    },
    ratingCount: {
      fontSize: "14px",
      color: "#98A2B3",
      fontWeight: "400",
    },
    divCart: {
      padding: "20px 20px 25px 20px",
    },
  };

  return (
    <>
      <Box>
        <HeroSection />
        <TrustBar />
      </Box>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap" },
            padding: { xs: "30px 0", sm: "40px 0", md: "50px 0" },
          }}
        >
          {/* Left Column */}
          <CategoryPage products={products} />

          {/* Right Column */}
          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: "73%" },
              padding: { xs: "30px 0 0 0", sm: "0", md: "0 0 0 15px" },
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "14px", sm: "15px", md: "16px" },
                  fontWeight: "700",
                  color: "#333333",
                }}
              >
                Showing Results from total {filteredProducts.length}
              </Typography>
              <Select
                size="small"
                defaultValue="relevance"
                onChange={(e) => setSortOption(e.target.value)}
                sx={{
                  borderRadius: "50px",
                  fontSize: { xs: "14px", sm: "15px", md: "16px" },
                  fontWeight: "600",
                  color: "#333333",
                  padding: "2px 5px",
                }}
              >
                <MenuItem value="relevance">Relevance</MenuItem>
                <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
                <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
              </Select>
            </Box>
            {loading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            )}
            <Grid2 container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {filteredProducts.map((product) => (
                <Grid2
                  style={shop3Grid.shopProductBox}
                  size={{ xs: 6, sm: 4, md: 4 }}
                  spacing={2}
                  key={product.id} // Use a unique key like `product.id`
                >
                  <Link
                    to={`/product/${product.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      style={{
                        ...shop3Grid.shopinBox,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%", // Ensure all cards have the same height
                      }}
                    >
                      <Box position="relative" sx={{ backgroundColor: "#FFF" }}>
                        <CardMedia
                          style={shop3Grid.productThumb}
                          component="img"
                          sx={{
                            height: { xs: "150px", sm: "200px", md: "235px" },
                            objectFit: "contain",
                          }}
                          image={
                            product.image ||
                            "https://admin.pillsphere.com/wp-content/uploads/2025/01/unnamed.png"
                          } // Use product.image if available
                          alt={product.name}
                        />
                        {product.sale_price && (
                          <Box
                            style={shop3Grid.offerTag}
                            position="absolute"
                            top={0}
                            left={0}
                            bgcolor="red"
                            color="white"
                            px={1}
                            py={0.5}
                            fontSize="0.8rem"
                          >
                            {Math.round(
                              ((product.regular_price - product.sale_price) /
                                product.regular_price) *
                                100
                            )}
                            % OFF
                          </Box>
                        )}
                      </Box>

                      {/* Ensure CardContent expands to push the button down */}
                      <CardContent
                        style={shop3Grid.titlePriceBox}
                        sx={{ flexGrow: 1 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: { xs: "14px", sm: "16px", md: "20px" },
                            fontWeight: { xs: "600", sm: "600", md: "700" },
                            color: "#333333",
                            lineHeight: "1.3em",
                            margin: {
                              xs: "0 0 10px 0",
                              sm: "0 0 25px 0",
                              md: "0 0 32px 0",
                            },
                          }}
                        >
                          {product.name}
                        </Typography>

                        {/* Display product categories */}
                        {product.categories &&
                          product.categories.length > 0 && (
                            <Box>
                              {product.categories.map((category) => (
                                <Typography
                                  key={category.id}
                                  variant="body2"
                                  color="textSecondary"
                                  sx={{
                                    fontSize: {
                                      xs: "13px",
                                      sm: "14px",
                                      md: "16px",
                                    },
                                    fontWeight: {
                                      xs: "600",
                                      sm: "400",
                                      md: "500",
                                    },
                                  }}
                                >
                                  {category.name}
                                </Typography>
                              ))}
                            </Box>
                          )}

                        <Box
                          style={shop3Grid.proPriceRating}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: {
                              xs: "column-reverse",
                              sm: "inherit",
                              md: "inherit",
                            },
                          }}
                        >
                          <Box style={shop3Grid.priceBox}>
                            <Typography
                              variant="body1"
                              sx={{
                                fontSize: "18px",
                                fontWeight: "800",
                                color: "#FD6400",
                                marginTop: {
                                  xs: "15px",
                                  sm: "10px",
                                  md: "10px",
                                },
                              }}
                            >
                              £ {product.sale_price || product.price || 0}
                            </Typography>
                            {product.sale_price && (
                              <Typography
                                variant="body1"
                                sx={{
                                  textDecoration: "line-through",
                                  color: "#A7A7A7",
                                  marginLeft: "11px",
                                  fontSize: "18px",
                                  fontWeight: "500",
                                  marginTop: {
                                    xs: "15px",
                                    sm: "10px",
                                    md: "10px",
                                  },
                                }}
                              >
                                £{product.regular_price}
                              </Typography>
                            )}
                          </Box>
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            sx={{
                              marginTop: { xs: "15px", sm: "10px", md: "10px" },
                            }}
                          >
                            <Rating
                              style={shop3Grid.proRating}
                              value={4} // Replace with actual rating if available
                              readOnly
                              size="small"
                            />
                            <Typography
                              style={shop3Grid.ratingCount}
                              variant="body2"
                              color="textSecondary"
                            >
                              (123){" "}
                              {/* Replace with actual review count if available */}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>

                      {/* Ensure CardActions stays at the bottom */}
                      <CardActions style={shop3Grid.divCart}>
                        <Button
                          style={shop3Grid.proCartBtn}
                          variant="outlined"
                          fullWidth
                          sx={{
                            fontSize: { xs: "14px", sm: "14px", md: "14px" },
                            fontWeight: "600",
                            lineHeight: "1.4",
                            backgroundColor: "#FD6400",
                            color: "#FFF",
                            borderRadius: "50px",
                            border: "none",
                            textTransform: "inherit",
                            padding: {
                              xs: "12px 15px",
                              sm: "12px 15px",
                              md: "12px 20px",
                            },
                          }}
                        >
                          View
                          <svg
                            style={{ marginLeft: "10px" }}
                            width="18"
                            height="14"
                            viewBox="0 0 18 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17 7L11 1M17 7L11 13M17 7L6.5 7M1 7L3.5 7"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Button>
                      </CardActions>
                    </Card>
                  </Link>
                </Grid2>
              ))}
            </Grid2>
            <PaginationComponent
              count={20}
              page={page}
              setPage={setPage}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ProductListingPage;
