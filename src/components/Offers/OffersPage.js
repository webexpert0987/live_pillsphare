import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Slider,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Collapse,
  Select,
  MenuItem,
  Container,
  Grid2,
} from "@mui/material";
import { Rating } from "@mui/material";
import ExpandLessSharpIcon from "@mui/icons-material/ExpandLessSharp";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import OfferHero from "../../components/Offers/OfferHero";
import TrustBar from "../../pages/Trustbar";
import { getProducts } from "../../apis/apisList/productApi";
import { Link } from "react-router-dom";
import { getShopCategories } from "../../apis/apisList/productApi";
import CategoryPage from "../../components/category";
import { useApp } from "../../Context/AppContext";

const OffersPage = () => {
  const [products, setProducts] = useState([]);
  const {
    filteredProducts,
    sortOption,
    setSortOption,
    searchProducts,
    searchValue,
  } = useApp();

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

    fetchProducts();
  }, []);

  useEffect(() => {
    searchProducts(products);
  }, [searchValue]);

  const sidebar = {
    leftColParent: {
      padding: "0 15px 0 0",
    },
    borderBoxSide: {
      border: "1px solid #F3F3F3",
      padding: "18px 18px 30px 18px",
      borderRadius: "10px",
    },
    sideTitle: {
      fontSize: "20px",
      color: "#333",
      fontWeight: "700",
    },
    sideToggle: {
      marginBottom: "15px",
    },
    sideToggleCat: {
      borderBottom: "1px solid #DDDDDD",
      paddingBottom: "20px",
      marginBottom: "20px",
    },
    filterTitle: {
      fontSize: "24px",
      color: "#333",
      fontWeight: "700",
    },
    clearDataBtn: {
      fontSize: "16px",
      color: "#726C6C",
      fontWeight: "500",
      border: "1px solid #E4E4E4",
      borderRadius: "50px",
      padding: "7px 17px",
      textTransform: "capitalize",
    },
    toggleBtn: {
      padding: "0",
      backgroundColor: "none",
      display: "flex",
      justifyContent: "right",
      "&:hover": {
        backgroundColor: "none", // Replace with your desired hover color
      },
    },
  };

  const shop3Grid = {
    rightColParent: {
      padding: "0 0 0 15px",
    },
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
      position: "absolute",
      top: "0",
      padding: "4px",
    },
    titlePriceBox: {
      padding: "17px 20px 0 20px",
    },
    prodTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#333333",
      lineHeight: "1.3em",
      margin: "0 0 32px 0",
    },
    priceBox: {
      display: "flex",
    },
    proPrice: {
      fontSize: "18px",
      fontWeight: "800",
      color: "#FD6400",
    },
    proPriceCross: {
      textDecoration: "line-through",
      color: "#A7A7A7",
      marginLeft: "11px",
      fontSize: "18px",
      fontWeight: "500",
    },
    ratingCount: {
      fontSize: "14px",
      color: "#98A2B3",
      fontWeight: "400",
    },
    divCart: {
      padding: "20px 20px 25px 20px",
    },
    proCartBtn: {
      fontSize: "15px",
      fontWeight: "600",
      lineHeight: "1.4",
      backgroundColor: "#FD6400",
      color: "#FFF",
      borderRadius: "50px",
      border: "none",
      textTransform: "inherit",
      padding: "12px 20px",
    },
    resultNum: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#333333",
    },
    sortingBox: {
      borderRadius: "50px",
      fontSize: "16px",
      fontWeight: "600",
      color: "#333333",
      padding: "2px 5px",
    },
  };

  const shopStyle = {
    Wrapper: {
      padding: "50px 0",
    },
  };

  return (
    <>
      <Box>
        <OfferHero />
        <TrustBar />
      </Box>
      <Container>
        <Box
          display="flex"
          style={shopStyle.Wrapper}
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "start" },
          }}
        >
          {/* Left Column */}
          <CategoryPage products={products} />

          {/* Right Column */}
          <Box width="73%" style={shop3Grid.rightColParent}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography style={shop3Grid.resultNum} variant="body1">
                Showing Results from total {filteredProducts.length}
              </Typography>
              <Select
                style={shop3Grid.sortingBox}
                size="small"
                defaultValue="relevance"
                onChange={(e) => setSortOption(e.target.value)}
              >
                <MenuItem value="relevance">Relevance</MenuItem>
                <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
                <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
              </Select>
            </Box>

            <Grid2 container spacing={4}>
              {filteredProducts.map((product) => (
                <Grid2
                  style={shop3Grid.shopProductBox}
                  size={{ xs: 12, sm: 6, md: 4 }}
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
                      <Box position="relative">
                        <CardMedia
                          style={shop3Grid.productThumb}
                          component="img"
                          height="235"
                          image={
                            product.image ||
                            "https://admin.pillsphere.com/wp-content/uploads/2025/01/unnamed.png"
                          } // Use product.image if available
                          alt={product.name}
                          sx={{
                            height: { xs: "150px", sm: "200px", md: "235px" },
                            objectFit: "contain",
                          }}
                        />
                        <Typography style={shop3Grid.offerTag}>
                          Save 24%
                        </Typography>
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
                      <CardContent
                        style={shop3Grid.titlePriceBox}
                        sx={{ flexGrow: 1 }}
                      >
                        <Typography style={shop3Grid.prodTitle} variant="h6">
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
                                >
                                  {category.name} {/* Display category name */}
                                </Typography>
                              ))}
                            </Box>
                          )}

                        <Box
                          style={shop3Grid.proPriceRating}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box style={shop3Grid.priceBox}>
                            <Typography
                              style={shop3Grid.proPrice}
                              variant="body1"
                            >
                              £ {product.sale_price || product.price || 0}
                            </Typography>
                            {product.sale_price && (
                              <Typography
                                style={shop3Grid.proPriceCross}
                                variant="body1"
                              >
                                ${product.regular_price}
                              </Typography>
                            )}
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
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
                      <CardActions style={shop3Grid.divCart}>
                        <Button
                          style={shop3Grid.proCartBtn}
                          variant="outlined"
                          fullWidth
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
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default OffersPage;
