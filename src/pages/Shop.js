import React, { useState } from "react";
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


const ProductListingPage = () => {
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
    borderBoxSide: {
      border: '1px solid #F3F3F3',
      padding: '18px',
      borderRadius: '10px'
    },
    sideTitle: {
      fontSize: '20px',
      color: '#333',
      fontWeight: '700'
    },
    sideToggle: {
      marginBottom: '15px'
    },
    sideToggleCat: {
      borderBottom: '1px solid #DDDDDD',
      paddingBottom: '20px',
      marginBottom: '20px'
    },
    filterTitle: {
      fontSize: '24px',
      color: '#333',
      fontWeight: '700'
    },
    clearDataBtn: {
      fontSize: '16px',
      color: '#726C6C',
      fontWeight: '500',
      border: '1px solid #E4E4E4',
      borderRadius: '50px',
      padding: '7px 17px',
    textTransform: 'capitalize'
    }
};
  

  return (
    <Container>
      <Box display="flex" p={3}>
        {/* Left Column */}
        <Box width="27%" p={2} style={sidebar.leftColParent}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography style={sidebar.filterTitle} variant="h6">Filters</Typography>
            <Button style={sidebar.clearDataBtn} variant="outlined" size="small" onClick={clearFilters}>
              Clear All
            </Button>
          </Box>

          <Box style={sidebar.borderBoxSide}>

          {/* Categories Filter */}
          <Box style={sidebar.sideToggleCat} mb={2}>
            <Box style={sidebar.sideToggle}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography style={sidebar.sideTitle} variant="subtitle1">Categories</Typography>
              <Button
                size="small"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
              >
                {categoriesOpen ? "Hide" : "Show"}
              </Button>
            </Box>
            <Collapse in={categoriesOpen}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories["Category 1"] || false}
                      onChange={(e) =>
                        setSelectedCategories({
                          ...selectedCategories,
                          "Category 1": e.target.checked,
                        })
                      }
                    />
                  }
                  label="Category 1"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories["Category 2"] || false}
                      onChange={(e) =>
                        setSelectedCategories({
                          ...selectedCategories,
                          "Category 2": e.target.checked,
                        })
                      }
                    />
                  }
                  label="Category 2"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories["Category 3"] || false}
                      onChange={(e) =>
                        setSelectedCategories({
                          ...selectedCategories,
                          "Category 3": e.target.checked,
                        })
                      }
                    />
                  }
                  label="Category 3"
                />
              </FormGroup>
            </Collapse>
          </Box>

          {/* Rating Filter */}
          <Box style={sidebar.sideToggleCat} mb={2}>
            <Box style={sidebar.sideToggle}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography style={sidebar.sideTitle} variant="subtitle1">Rating</Typography>
              <Button size="small" onClick={() => setRatingOpen(!ratingOpen)}>
                {ratingOpen ? "Hide" : "Show"}
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
            <Box style={sidebar.sideToggle}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography style={sidebar.sideTitle} variant="subtitle1">Brand</Typography>
              <Button size="small" onClick={() => setBrandOpen(!brandOpen)}>
                {brandOpen ? "Hide" : "Show"}
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
            <Box style={sidebar.sideToggle}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography style={sidebar.sideTitle} variant="subtitle1">Price Range</Typography>
              <Button size="small" onClick={() => setPriceOpen(!priceOpen)}>
                {priceOpen ? "Hide" : "Show"}
              </Button>
            </Box>
            <Collapse in={priceOpen}>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={500}
              />
              <Box display="flex" gap={2} mt={1}>
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
          <Box style={sidebar.sideToggleCat}>
            <Box style={sidebar.sideToggle}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography style={sidebar.sideTitle} variant="subtitle1">Size Range</Typography>
              <Button size="small" onClick={() => setSizeOpen(!sizeOpen)}>
                {sizeOpen ? "Hide" : "Show"}
              </Button>
            </Box>
            <Collapse in={sizeOpen}>
              <Slider
                value={sizeRange}
                onChange={(e, newValue) => setSizeRange(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={50}
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
        <Box width="73%" p={2}>
          <Box 
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="body1">
              Showing 12 Results from total 230
            </Typography>
            <Select size="small" defaultValue="relevance">
              <MenuItem value="relevance">Relevance</MenuItem>
              <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
              <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>
          </Box>

          <Grid2 container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((product) => (
              <Grid2 size={{xs: 12, sm: 6, md: 4}} spacing={2} key={product} className="shopProductBox">
                <Card>
                  <Box position="relative">
                    <CardMedia
                      component="img"
                      height="140"
                      //image={`https://via.placeholder.com/300x140?text=Product+${product}`}
                      image={`https://admin.pillsphere.com/wp-content/uploads/2025/01/unnamed.png`}
                      alt={`Product ${product}`}
                    />
                    <Box
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
                  <CardContent>
                    <Typography variant="h6">Product {product}</Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="body1">$100</Typography>
                      <Rating value={4} readOnly size="small" />
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button variant="outlined" fullWidth>
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductListingPage; 
