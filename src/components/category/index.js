import { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import {
  Typography,
  Box,
  Button,
  Slider,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Collapse,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import ExpandLessSharpIcon from "@mui/icons-material/ExpandLessSharp";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import {
  getCategoryBySlug,
  getShopCategories,
} from "../../apis/apisList/productApi";
import { useApp } from "../../Context/AppContext";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";

const sidebarStyles = {
  borderBoxSide: {
    border: "1px solid #F3F3F3",
    padding: "18px",
    borderRadius: "10px",
  },
  sideTitle: { fontSize: "20px", color: "#333", fontWeight: "700" },
  clearDataBtn: {
    fontSize: "16px",
    color: "#726C6C",
    fontWeight: "500",
    border: "1px solid #E4E4E4",
    borderRadius: "50px",
    padding: "7px 17px",
    textTransform: "capitalize",
  },
};

function MobileCategory({ open, toggleDrawer, ...props }) {
  return (
    <div
      style={{
        width: "100%",
        height: "50px",
      }}
    >
      <Button
        onClick={toggleDrawer(true)}
        variant="outlined"
        sx={{
          borderRadius: "50px",
          fontSize: { xs: "14px", sm: "15px", md: "16px" },
          fontWeight: "600",
          color: "#333333",
          padding: "5px 10px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        Filter <FilterAltIcon />
      </Button>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "80vw",
            maxWidth: "400px",
            padding: "15px",
          },
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <Category {...props} />
      </Drawer>
    </div>
  );
}

function Category(props) {
  const {
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    shopCategories,
    clearFilters,
  } = props;
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({
    // 35: true,
    // 37: true,
    // 38: true,
  });

  // Group categories by parent
  const topCategories = shopCategories.filter((cat) => cat.parent === 0);
  const getSubcategories = (parentId) =>
    shopCategories.filter((cat) => cat.parent === parentId);
  // const getGrandSubcategories = (subCategory.parentId) =>
  //   shopCategories.filter((cat) => cat.parent === parentId);

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  useEffect(() => {
    for (let id of selectedCategories) {
      const newData = shopCategories.find((cat) => cat.id == id);
      if (newData.parent) {
        setExpandedCategories({
          ...expandedCategories,
          [newData.parent]: true,
        });
      }
    }
  }, [selectedCategories]);
// console.log('products1',categoriesOpen);
// console.log('products2',expandedCategories);
// console.log('categories',selectedCategories);
  return (
    <Box
      p={2}
      sx={{ width: { xs: "100%", md: "27%" }, padding: { md: "0 15px 0 0" } }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography  
          variant="h6"
          sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: "700" }}
        >
          Filters
        </Typography>
        <Button
          style={sidebarStyles.clearDataBtn}
          variant="outlined"
          size="small"
          onClick={clearFilters}
        >
          Clear All
        </Button>
      </Box>

      <Box style={sidebarStyles.borderBoxSide}>
        {/* Categories Filter */}
        <Box mb={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography style={sidebarStyles.sideTitle}>Categories</Typography>
            <Button
              size="small"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              {categoriesOpen ? (
                <ExpandLessSharpIcon />
              ) : (
                <ExpandMoreSharpIcon />
              )}
            </Button>
          </Box>

          <Collapse in={categoriesOpen}>
            <FormGroup>
              {topCategories.map((category) => (
                <Box key={category.id}>
                  {/* Main Category */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedCategories.includes(category.id)}
                          onChange={(e) =>
                            setSelectedCategories(
                              e.target.checked
                                ? [...selectedCategories, category.id]
                                : selectedCategories.filter(
                                    (id) => id !== category.id
                                  )
                            )
                          }
                        />
                      }
                      label={category.name}
                      sx={{
                        textTransform: "capitalize",
                        flex: 1,
                        whiteSpace: "nowrap",
                      }}
                    />
                    {getSubcategories(category.id).length > 0 && (
                      <IconButton
                        size="small"
                        onClick={() => toggleCategory(category.id)}
                      >
                        {expandedCategories[category.id] ? (
                          <ExpandLessSharpIcon fontSize="small" />
                        ) : (
                          <ExpandMoreSharpIcon fontSize="small" />
                        )}
                      </IconButton>
                    )}
                  </Box>
                  {/* Subcategories */}
                  <Collapse in={expandedCategories[category.id]}>
                    <Box sx={{ pl: 3 }}>
                      {getSubcategories(category.id).map((subCategory) => (
                        <FormControlLabel
                          key={subCategory.id}
                          control={
                            <Checkbox
                              checked={selectedCategories.includes(
                                subCategory.id
                              )}
                              onChange={(e) =>
                                setSelectedCategories(
                                  e.target.checked
                                    ? [...selectedCategories, subCategory.id]
                                    : selectedCategories.filter(
                                        (id) => id !== subCategory.id
                                      )
                                )
                              }
                            />
                          }
                          label={subCategory.name}
                          sx={{
                            textTransform: "capitalize",
                            display: "block",
                          }}
                        />
                      ))}
                    </Box>
                  </Collapse>
                  {/* getGrandSubcategories */}
                  {/* <Collapse in={expandedCategories[category.id]}>
                    <Box sx={{ pl: 3 }}>
                      {getSubcategories(category.id).map((subCategory) => (
                        <FormControlLabel
                          key={subCategory.id}
                          control={
                            <Checkbox
                              checked={selectedCategories.includes(
                                subCategory.id
                              )}
                              onChange={(e) =>
                                setSelectedCategories(
                                  e.target.checked
                                    ? [...selectedCategories, subCategory.id]
                                    : selectedCategories.filter(
                                        (id) => id !== subCategory.id
                                      )
                                )
                              }
                            />
                          }
                          label={subCategory.name}
                          sx={{
                            textTransform: "capitalize",
                            display: "block",
                          }}
                        />
                      ))}
                    </Box>
                  </Collapse> */}
                  {/* ////////// */}
                </Box>
              ))}
            </FormGroup>
          </Collapse>
        </Box>
        {/* Price Range Filter */}
        <Box mb={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography style={sidebarStyles.sideTitle}>Price Range</Typography>
            <Button size="small" onClick={() => setPriceOpen(!priceOpen)}>
              {priceOpen ? (
                <ExpandLessSharpIcon fontSize="medium" />
              ) : (
                <ExpandMoreSharpIcon fontSize="medium" />
              )}
            </Button>
          </Box>
          <Collapse in={priceOpen}>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={1}
              max={1000}
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
                inputProps={{ min: 1 }}
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
  );
}

export default function CategoryPage({ products }) {
  const isMobile = useMediaQuery("(max-width: 960px)");
  const { setFilteredProducts, sortOption } = useApp();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([1, 1000]);
  const [shopCategories, setShopCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const { slug } = useParams();

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([1, 1000]);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const cachedCategories = localStorage.getItem("shopCategories");
      if (cachedCategories) {
        try {
          setShopCategories(JSON.parse(cachedCategories));
          return;
        } catch {
          localStorage.removeItem("shopCategories");
        }
      }
      const response = await getShopCategories();
      if (Array.isArray(response)) {
        setShopCategories(response);
        localStorage.setItem("shopCategories", JSON.stringify(response));
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    let filteredProducts = [...products];
    // Apply category filtering
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.categories.some((category) =>
          selectedCategories.includes(category.id)
        )
      );
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

  useEffect(() => {
    if (!slug) return;
    const fetchCategory = async () => {
      try {
        const response = await getCategoryBySlug(slug);

        if (response.success) {
          setSelectedCategories((prev) => [...prev, response.category_id]);
        } else {
        }
      } catch (error) {
        console.error("Category not found:", error);
      }
    };

    fetchCategory();
  }, [slug]);

  return isMobile ? (
    <MobileCategory
      open={open}
      toggleDrawer={toggleDrawer}
      {...{
        selectedCategories,
        setSelectedCategories,
        priceRange,
        setPriceRange,
        shopCategories,
        clearFilters,
      }}
    />
  ) : (
    <Category
      {...{
        selectedCategories,
        setSelectedCategories,
        priceRange,
        setPriceRange,
        shopCategories,
        clearFilters,
      }}
    />
  );
}
