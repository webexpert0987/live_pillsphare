import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCategoryBySlug } from "../apis/apisList/productApi";

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
import FilterPage from "../components/category";
import { useApp } from "../Context/AppContext";
import PaginationComponent from "../components/PaginationComponent";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const { filteredProducts, setSortOption } = useApp();

  const [page, setPage] = useState(1);
  const handlePageChange = (e, value) => {
    setPage(value);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate pagination values
  const productsPerPage = 9;
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryBySlug(slug);

        if (response.success) {
          setCategory(response);

          setCategoryId(response.category_id);
        } else {
          setNotFound(true); // If not found, show 404
        }

        setLoading(false);
      } catch (error) {
        console.error("Category not found:", error);
        setNotFound(true);
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!categoryId) return; // ✅ Ensure categoryId is set before proceeding

        // Check if products are already in localStorage
        const cachedProducts = localStorage.getItem("products");
        let productsData = cachedProducts ? JSON.parse(cachedProducts) : null;

        if (!productsData) {
          const data = await getProducts();
          productsData = data.products;
          localStorage.setItem("products", JSON.stringify(productsData)); // Cache the products
        }

        // ✅ Set products normally, without using a separate filteredProducts variable
        setProducts(
          productsData.filter(
            (product) =>
              product.categories.some((category) => category.id === categoryId) // ✅ Filter by categoryId
          )
        );
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [categoryId]); // ✅ Runs when categoryId changes
  console.log('current products',products);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (notFound) {
    return (
      <>
        <div>
          <h1>404 - Category Not Found</h1>
          <p>The category you're looking for does not exist.</p>
          <Link to="/" className="btn-home">
            Go to Home Page
          </Link>
        </div>
      </>
    );
  }
  return (
    <>
      <Box>
        <HeroSection catName={category.category_name} />
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

          <FilterPage products={products} />

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
              {currentProducts.map((product) => (
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
                            objectFit: "contain",
                          }}
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
                      <CardContent
                        style={shop3Grid.titlePriceBox}
                        sx={{
                          flexGrow: 1, // Ensures the content expands evenly
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: "180px", // Ensures all cards are equal height
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: { xs: "14px", sm: "16px", md: "20px" },
                            fontWeight: { xs: "600", sm: "600", md: "700" },
                            color: "#333333",
                            lineHeight: "1.3em",
                          }}
                        >
                          {product.name}
                        </Typography>

                        {/* Product Categories */}
                        {product.categories?.length > 0 && (
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
                                  fontWeight: "500",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {category.name}
                              </Typography>
                            ))}
                          </Box>
                        )}

                        {/* Price Section Sticks at the Bottom */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start", // Keeps price left-aligned
                            alignItems: "center",
                            gap: "10px",
                            minHeight: "40px", // Ensures height is uniform
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: "18px",
                              fontWeight: "800",
                              color: "#FD6400",
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
                                fontSize: "16px",
                                fontWeight: "500",
                              }}
                            >
                              £{product.regular_price}
                            </Typography>
                          )}
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
            {/* Add pagination at the bottom */}
            {!loading && filteredProducts.length > 0 && (
              <PaginationComponent
                page={page}
                onChange={handlePageChange}
                count={totalPages}
              />
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CategoryPage;
