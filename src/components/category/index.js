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
import { getShopCategories } from "../../apis/apisList/productApi";
import { useApp } from "../../Context/AppContext";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

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
    <div>
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
                />
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
              min={0}
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
  const isMobile = useMediaQuery("(max-width:600px)");
  const { setFilteredProducts } = useApp();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [shopCategories, setShopCategories] = useState([]);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
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
    const filteredProducts = products.filter(
      (product) =>
        (selectedCategories.length === 0 ||
          product.categories.some((category) =>
            selectedCategories.includes(category.id)
          )) &&
        (product.sale_price || product.price) >= priceRange[0] &&
        (product.sale_price || product.price) <= priceRange[1]
    );
    setFilteredProducts(filteredProducts);
  }, [products, selectedCategories, priceRange]);

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
