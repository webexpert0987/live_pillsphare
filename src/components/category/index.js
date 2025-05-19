import { useState, useEffect, useRef } from "react";
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
    // width: "70%",
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
    setPage,
    // categoryRef,
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
  const getGrandSubCategories = (subCategoryId) =>
    (shopCategories || []).filter((cat) => cat?.parent === subCategoryId);
  // console.log('subcategory ',getSubcategories(110));
  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };
  // console.log('setpage 2',typeof setPage);
  useEffect(() => {
    for (let id of selectedCategories) {
      const newData = shopCategories.find((cat) => cat.id === id);
      if (newData && newData.parent) {
        setExpandedCategories({
          ...expandedCategories,
          [newData?.parent]: true,
        });
      }
    }
    setPage(1);
  }, [selectedCategories, shopCategories]);
  return (
    <Box
      // ref={categoryRef}
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
      <Box
        // style={sidebarStyles.borderBoxSide}
        sx={{
          width: "100%",
          ...sidebarStyles.borderBoxSide,
          "@media (max-width:960px)": {
            width: "100%",
          },
        }}
      >
        {/* Categories Filter */}
        <Box mb={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginRight={0}
          >
            <Typography style={sidebarStyles.sideTitle}>Categories</Typography>
            <Button
              // display="flex"
              // justifyContent="end"
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      "@media (min-width:1080px) and (max-width:1300px)": {
                        maxWidth: "260px",
                      },
                    }}
                    className="categoriesTitleIconBox"
                  >
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
                      // sx={{
                      //   textTransform: "capitalize",
                      //   flex: 1,
                      //   whiteSpace: "nowrap",
                      // }}
                      sx={{
                        flex: 1,
                        "& .MuiFormControlLabel-label": {
                          textTransform: "capitalize",
                          whiteSpace: {
                            xs: "wrap",
                            sm: "nowrap",
                          },
                          fontSize: {
                            xs: "1rem",
                            sm: "unset",
                          },
                          fontWeight: {
                            xs: "unset",
                          },
                          lineHeight: {
                            xs: "unset",
                          },
                        },
                      }}
                    />
                    {/* Showing the arrow down icon for the nested categories */}
                    {getSubcategories(category.id).length > 0 && (
                      <IconButton
                        size="small"
                        sx={{ ml: 0 }}
                        // style={{paddingRight:"30px",marginRight:"auto"}}
                        className="subCategoriesIndexToggleIcon"
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
                  {/* Getting Nested Subcategories */}
                  <Collapse in={expandedCategories[category.id]}>
                    {/* categories */}
                    <Box
                      sx={{
                        pl: 1,
                      }}
                    >
                      {getSubcategories(category.id).map((subCategory) => (
                        <Box key={subCategory.id}>
                          {/* Subcategory Checkbox */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              "@media (min-width:1080px) and (max-width:1300px)":
                                {
                                  maxWidth: "220px",
                                },
                            }}
                          >
                            <FormControlLabel
                              ////////
                              control={
                                <Checkbox
                                  checked={selectedCategories.includes(
                                    subCategory.id
                                  )}
                                  onChange={(e) =>
                                    setSelectedCategories(
                                      e.target.checked
                                        ? [
                                            ...selectedCategories,
                                            subCategory.id,
                                          ]
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
                                flex: 1,
                                whiteSpace: "no-wrap",
                                // wordBreak:"break-word",
                                "@media (max-width:455px)": {
                                  whiteSpace: "wrap",
                                },
                              }}
                            />
                            {getGrandSubCategories(subCategory.id).length >
                              0 && (
                              <IconButton
                                size="small"
                                sx={{ ml: "-15px" }}
                                onClick={() => toggleCategory(subCategory.id)}
                              >
                                {expandedCategories[subCategory.id] ? (
                                  <ExpandLessSharpIcon fontSize="small" />
                                ) : (
                                  <ExpandMoreSharpIcon fontSize="small" />
                                )}
                              </IconButton>
                            )}
                          </Box>
                          {/* Display Grand-Subcategories if any */}
                          {getGrandSubCategories(subCategory.id).length > 0 && (
                            <>
                              {/* <IconButton
                                  size="small"
                                  sx={{ ml: 0 }} 
                                  onClick={() => toggleCategory(subCategory.id)}
                                >
                                  {expandedCategories[subCategory.id] ? (
                                    <ExpandLessSharpIcon fontSize="small" />
                                  ) : (
                                    <ExpandMoreSharpIcon fontSize="small" />
                                  )}
                                </IconButton>  */}
                              <Collapse in={expandedCategories[subCategory.id]}>
                                <Box sx={{ pl: 1 }}>
                                  {getGrandSubCategories(subCategory.id).map(
                                    (grandSub) => (
                                      <FormControlLabel
                                        key={grandSub.id}
                                        control={
                                          <Checkbox
                                            checked={selectedCategories.includes(
                                              grandSub.id
                                            )}
                                            onChange={(e) =>
                                              setSelectedCategories(
                                                e.target.checked
                                                  ? [
                                                      ...selectedCategories,
                                                      grandSub.id,
                                                    ]
                                                  : selectedCategories.filter(
                                                      (id) => id !== grandSub.id
                                                    )
                                              )
                                            }
                                          />
                                        }
                                        label={grandSub.name}
                                        sx={{
                                          textTransform: "capitalize",
                                          display: "block",
                                        }}
                                      />
                                    )
                                  )}
                                </Box>
                              </Collapse>
                            </>
                          )}
                        </Box>
                        // </Box>
                      ))}
                    </Box>
                  </Collapse>
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

export default function CategoryPage({
  products,
  page,
  setPage = () => {},
  handlePageChange = () => {},
  searchValue,
}) {
  const isMobile = useMediaQuery("(max-width: 960px)");
  const { setFilteredProducts, sortOption } = useApp();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([1, 1000]);
  const [shopCategories, setShopCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const { slug } = useParams();
  const categoryRef = useRef(null);
  const toggleDrawer = (newOpen) => () => setOpen(newOpen);
  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([1, 1000]);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      // handlePageChange(null, 1);
      const cachedCategories = localStorage.getItem("shopCategories");
      if (cachedCategories) {
        try {
          setPage(1);
          setShopCategories(JSON.parse(cachedCategories));
          return;
        } catch {
          localStorage.removeItem("shopCategories");
        }
      }
      const response = await getShopCategories();
      if (Array.isArray(response)) {
        setPage(1);
        setShopCategories(response);
        localStorage.setItem("shopCategories", JSON.stringify(response));
      }
    };
    setPage(1);
    fetchCategories();
  }, []);

  useEffect(() => {
    let filteredProducts = [...products];
    // handlePageChange(null, 1);
    // ✅ Search filtering on the basis on search keyword
    if (
      searchValue &&
      typeof searchValue === "string" &&
      searchValue.trim() !== ""
    ) {
      const searchTerm = searchValue.trim().toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filtering
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.categories.some((category) =>
          selectedCategories.includes(category.id)
        )
      );
      // console.log('filteredproducts',filteredProducts);
    }

    // Apply price range filtering
    filteredProducts = filteredProducts.filter(
      (product) =>
        (product.sale_price || product.price) >= priceRange[0] &&
        (product.sale_price || product.price) <= priceRange[1]
    );

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

    setFilteredProducts(filteredProducts);
    setPage(1);
  }, [products, sortOption, priceRange, selectedCategories, searchValue]);

  useEffect(() => {
    if (!slug) return;
    const fetchCategory = async () => {
      handlePageChange(null, 1);
      try {
        const response = await getCategoryBySlug(slug);

        if (response.success) {
          setPage(1);
          setSelectedCategories((prev) => [response.category_id]);
        } else {
        }
      } catch (error) {
        console.error("Category not found:", error);
      } finally {
        setPage(1);
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
        setPage, // passed the setpage function here also
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
        setPage,
        // categoryRef,
      }}
    />
  );
}
