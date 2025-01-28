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

const CategoryPage = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedBrands, setSelectedBrands] = useState({});
  const [priceRange, setPriceRange] = useState([20, 100]);
  const [sizeRange, setSizeRange] = useState([5, 15]);

  const clearFilters = () => {
    setSelectedCategories({});
    setSelectedRating("");
    setSelectedBrands({});
    setPriceRange([0, 500]);
    setSizeRange([0, 50]);
  };

  const renderRatingLabel = (value, count) => (
    <Box display="flex" alignItems="center">
      <Rating value={value} precision={0.5} readOnly size="small" />
      <Typography variant="body2" ml={1}>
        & up ({count})
      </Typography>
    </Box>
  );

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

  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryBySlug(slug);

        if (response.success) {
          setCategory(response); // Set the category data directly from the response
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
          <Box display="flex" style={shopStyle.Wrapper}>
            {/* Left Column */}
            <Box width="27%" p={2} style={sidebar.leftColParent}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Typography style={sidebar.filterTitle} variant="h6">
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
               

                {/* Rating Filter */}
                <Box style={sidebar.sideToggleCat} mb={2}>
                  <Box
                    style={sidebar.sideToggle}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography style={sidebar.sideTitle} variant="subtitle1">
                      Rating
                    </Typography>
                    <Button
                      style={sidebar.toggleBtn}
                      size="small"
                      onClick={() => setRatingOpen(!ratingOpen)}
                    >
                      {ratingOpen ? (
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
                  <Collapse in={ratingOpen}>
                    <RadioGroup
                      value={selectedRating}
                      onChange={(e) => setSelectedRating(e.target.value)}
                    >
                      <FormControlLabel
                        value="4.5"
                        control={<Radio />}
                        label={renderRatingLabel(4.5, 1991)}
                      />
                      <FormControlLabel
                        value="4.0"
                        control={<Radio />}
                        label={renderRatingLabel(4.0, 200)}
                      />
                      <FormControlLabel
                        value="3.5"
                        control={<Radio />}
                        label={renderRatingLabel(3.5, 300)}
                      />
                      <FormControlLabel
                        value="3.0"
                        control={<Radio />}
                        label={renderRatingLabel(3.0, 500)}
                      />
                    </RadioGroup>
                  </Collapse>
                </Box>

                {/* Brand Filter */}
                <Box style={sidebar.sideToggleCat} mb={2}>
                  <Box
                    style={sidebar.sideToggle}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography style={sidebar.sideTitle} variant="subtitle1">
                      Brand
                    </Typography>
                    <Button
                      style={sidebar.toggleBtn}
                      size="small"
                      onClick={() => setBrandOpen(!brandOpen)}
                    >
                      {brandOpen ? (
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
                  <Collapse in={brandOpen}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedBrands["Brand 1"] || false}
                            onChange={(e) =>
                              setSelectedBrands({
                                ...selectedBrands,
                                "Brand 1": e.target.checked,
                              })
                            }
                          />
                        }
                        label="Brand 1"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedBrands["Brand 2"] || false}
                            onChange={(e) =>
                              setSelectedBrands({
                                ...selectedBrands,
                                "Brand 2": e.target.checked,
                              })
                            }
                          />
                        }
                        label="Brand 2"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedBrands["Brand 3"] || false}
                            onChange={(e) =>
                              setSelectedBrands({
                                ...selectedBrands,
                                "Brand 3": e.target.checked,
                              })
                            }
                          />
                        }
                        label="Brand 3"
                      />
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
                      max={500}
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

                {/* Size Range Filter */}
                <Box>
                  <Box
                    style={sidebar.sideToggle}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography style={sidebar.sideTitle} variant="subtitle1">
                      Size Range
                    </Typography>
                    <Button
                      style={sidebar.toggleBtn}
                      size="small"
                      onClick={() => setSizeOpen(!sizeOpen)}
                    >
                      {sizeOpen ? (
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
                  <Collapse in={sizeOpen}>
                    <Slider
                      value={sizeRange}
                      onChange={(e, newValue) => setSizeRange(newValue)}
                      valueLabelDisplay="auto"
                      min={0}
                      max={50}
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
                    <Box display="flex" gap={2} mt={1}>
                      <TextField
                        label="Min"
                        type="number"
                        size="small"
                        value={sizeRange[0]}
                        onChange={(e) =>
                          setSizeRange([+e.target.value, sizeRange[1]])
                        }
                        fullWidth
                      />
                      <TextField
                        label="Max"
                        type="number"
                        size="small"
                        value={sizeRange[1]}
                        onChange={(e) =>
                          setSizeRange([sizeRange[0], +e.target.value])
                        }
                        fullWidth
                      />
                    </Box>
                  </Collapse>
                </Box>
              </Box>
            </Box>

            {/* Right Column */}
            <Box width="73%" style={shop3Grid.rightColParent}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Typography style={shop3Grid.resultNum} variant="body1">
                  Showing 12 Results from total 230
                </Typography>
                <Select
                  style={shop3Grid.sortingBox}
                  size="small"
                  defaultValue="relevance"
                >
                  <MenuItem value="relevance">Relevance</MenuItem>
                  <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
                  <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                </Select>
              </Box>

              <Grid2 container spacing={4}>
                {[1, 2, 3, 4, 5, 6].map((product) => (
                  <Grid2
                    style={shop3Grid.shopProductBox}
                    size={{ xs: 12, sm: 6, md: 4 }}
                    spacing={2}
                    key={product}
                  >
                    <Card style={shop3Grid.shopinBox}>
                      <Box position="relative">
                        <CardMedia
                          style={shop3Grid.productThumb}
                          component="img"
                          height="235"
                          //image={`https://via.placeholder.com/300x140?text=Product+${product}`}
                          image={`https://admin.pillsphere.com/wp-content/uploads/2025/01/unnamed.png`}
                          alt={`Product ${product}`}
                        />
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
                          20% OFF
                        </Box>
                      </Box>
                      <CardContent style={shop3Grid.titlePriceBox}>
                        <Typography style={shop3Grid.prodTitle} variant="h6">
                          Microlife B2 Basic Blood Pressure Monitor {product}
                        </Typography>
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
                              $100
                            </Typography>
                            <Typography
                              style={shop3Grid.proPriceCross}
                              variant="body1"
                            >
                              $120
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Rating
                              style={shop3Grid.proRating}
                              value={4}
                              readOnly
                              size="small"
                            />
                            <Typography
                              style={shop3Grid.ratingCount}
                              variant="body2"
                              color="textSecondary"
                            >
                              (123)
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
                          Add to Cart
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
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid2>
                ))}
              </Grid2>
            </Box>
          </Box>
        </Container>
    </>
  );
};

export default CategoryPage;
