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
  Radio,
  RadioGroup,
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
import HeroSection from "./ShopHero";
import TrustBar from "./Trustbar";
import { getProducts } from "../apis/apisList/productApi";
import { Link } from "react-router-dom";
import { getShopCategories } from "../apis/apisList/productApi";

const ProductListingPage = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState("relevance");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [shopCategories, setShopCategories] = useState([]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Check if categories exist in localStorage
        const cachedCategories = localStorage.getItem("shopCategories");

        if (cachedCategories) {
          try {
            const parsedCategories = JSON.parse(cachedCategories);
            if (Array.isArray(parsedCategories)) {
              setShopCategories(parsedCategories);
              return; // Stop execution, use cached data
            }
          } catch (parseError) {
            console.warn("Failed to parse cached categories, refetching...");
            localStorage.removeItem("shopCategories"); // Clear invalid cache
          }
        }

        // If no valid cache, fetch from API
        const response = await getShopCategories();
        if (!response || !Array.isArray(response)) {
          throw new Error("Invalid API response"); // Ensure response is valid
        }

        const parentCategories = response;
        setShopCategories(parentCategories);

        // Save to localStorage
        localStorage.setItem(
          "shopCategories",
          JSON.stringify(parentCategories)
        );
      } catch (error) {
        console.error("Error fetching shop categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Check if products are already in localStorage
        const cachedProducts = localStorage.getItem("products");

        // if (cachedProducts) {
        //   setProducts(JSON.parse(cachedProducts)); // Use cached products
        // } else {
          const data = await getProducts();
          setProducts(data.products);
          localStorage.setItem("products", JSON.stringify(data.products)); // Cache the products in localStorage
        // }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filteredProducts = [...products];

    // Apply category filtering
    if (selectedCategories.length > 0) {
      // ✅ Check if array has items

      filteredProducts = filteredProducts.filter((product) =>
        product.categories.some(
          (category) => selectedCategories.includes(category.id) // ✅ Directly check if the ID exists in array
        )
      );
    } else {
      filteredProducts = [...products]; // ✅ Reset when no category is selected
    }

    // Apply sorting and price range filtering
    if (sortOption === "priceLowHigh") {
      filteredProducts.sort(
        (a, b) => (a.sale_price || a.price) - (b.sale_price || b.price)
      );
    } else if (sortOption === "priceHighLow") {
      filteredProducts.sort(
        (a, b) => (b.sale_price || b.price) - (a.sale_price || a.price)
      );
    }

    // Apply price range filtering
    filteredProducts = filteredProducts.filter(
      (product) =>
        (product.sale_price || product.price) >= priceRange[0] &&
        (product.sale_price || product.price) <= priceRange[1]
    );

    setFilteredProducts(filteredProducts);
  }, [products, sortOption, priceRange, selectedCategories]);

  const sidebar = {
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
          <Box
            p={2}
            sx={{
              width: { xs: "100%", sm: "100%", md: "27%" },
              padding: { xs: "0", sm: "0", md: "0 15px 0 0" },
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "20px", sm: "22px", md: "24px" },
                  color: "#333",
                  fontWeight: "700",
                }}
              >
                Filters
              </Typography>
              <Button
                style={sidebar.clearDataBtn}
                variant="outlined"
                size="small"
                onClick={clearFilters}
              >
                Clear All
              </Button>
            </Box>

            <Box style={sidebar.borderBoxSide}>
              {/* Categories Filter */}

              <Box style={sidebar.sideToggleCat} mb={2}>
                <Box
                  style={sidebar.sideToggle}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography style={sidebar.sideTitle} variant="subtitle1">
                    Categories
                  </Typography>
                  <Button
                    style={sidebar.toggleBtn}
                    size="small"
                    onClick={() => setCategoriesOpen(!categoriesOpen)}
                  >
                    {categoriesOpen ? (
                      <ExpandLessSharpIcon fontSize="medium" />
                    ) : (
                      <ExpandMoreSharpIcon fontSize="medium" />
                    )}
                  </Button>
                </Box>

                <Collapse in={categoriesOpen}>
                  <FormGroup>
                    {shopCategories.map((category) => (
                      <FormControlLabel
                        key={category.id}
                        control={
                          <Checkbox
                            checked={selectedCategories.includes(category.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories([
                                  ...selectedCategories,
                                  category.id,
                                ]); // Add ID
                              } else {
                                setSelectedCategories(
                                  selectedCategories.filter(
                                    (id) => id !== category.id
                                  )
                                ); // Remove ID
                              }
                            }}
                          />
                        }
                        label={category.name}
                      />
                    ))}
                  </FormGroup>
                </Collapse>
              </Box>

              {/* Price Range Filter */}
              <Box style={sidebar.sideToggleCat} mb={2}>
                <Box
                  style={sidebar.sideToggle}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography style={sidebar.sideTitle} variant="subtitle1">
                    Price Range
                  </Typography>
                  <Button
                    style={sidebar.toggleBtn}
                    size="small"
                    onClick={() => setPriceOpen(!priceOpen)}
                  >
                    {priceOpen ? (
                      <>
                        <ExpandLessSharpIcon fontSize="medium" />
                      </>
                    ) : (
                      <>
                        <ExpandMoreSharpIcon fontSize="medium" />
                      </>
                    )}
                  </Button>
                </Box>
                <Collapse in={priceOpen}>
                  <Slider
                    value={priceRange}
                    onChange={(e, newValue) => setPriceRange(newValue)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    sx={{
                      "& .MuiSlider-rail": {
                        backgroundColor: "#EDEEF3",
                        height: 5, // Adjust the height of the rail
                      },
                      "& .MuiSlider-track": {
                        backgroundColor: "#FD6400",
                        border: "none",
                        height: 5, // Adjust the height of the rail
                      },
                      "& .MuiSlider-thumb": {
                        border: "2px solid #104239",
                        "&::before": {
                          position: "absolute",
                          content: '""',
                          borderRadius: "inherit",
                          width: "16px",
                          height: "16px",
                          background: "#104239",
                          border: "4px solid #FFF",
                          boxShadow: `0px 3px 1px -2px rgba(0, 0, 0, 0.2), 
                        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 
                        0px 1px 5px 0px rgba(0, 0, 0, 0.12)`,
                        },
                      },
                    }}
                  />
                  <Box display="flex" gap={2} mt={1} mb={1}>
                    <TextField
                      label="Min"
                      type="number"
                      size="small"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([+e.target.value, priceRange[1]])
                      }
                      fullWidth
                    />
                    <TextField
                      label="Max"
                      type="number"
                      size="small"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], +e.target.value])
                      }
                      fullWidth
                    />
                  </Box>
                </Collapse>
              </Box>
            </Box>
          </Box>

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
                    <Card style={shop3Grid.shopinBox}>
                    <Box
                        position="relative"
                        sx={{
                          backgroundColor: "#FFF",
                        }}
                      >
                        <CardMedia
                          style={shop3Grid.productThumb}
                          component="img"
                          sx={{
                            height: { xs: "150px", sm: "200px", md: "235px" },
                            objectFit: {
                              xs: "contain",
                              sm: "contain",
                              md: "contain",
                            },
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
                      <CardContent style={shop3Grid.titlePriceBox}>
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
                                  {category.name} {/* Display category name */}
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
                              ${product.sale_price || product.price}
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
                                ${product.regular_price}
                              </Typography>
                            )}
                          </Box>
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            sx={{
                              marginTop: {
                                xs: "15px",
                                sm: "10px",
                                md: "10px",
                              },
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
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ProductListingPage;
