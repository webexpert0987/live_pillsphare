import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Divider,
  Stack,
  Container,
  Select,
  MenuItem,
  CardContent,
} from "@mui/material";
import VerticalImageSlider from "../components/productSlider/ProductSlider";
import { useApp } from "../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  getProductBySlug,
  getRelatedProduct,
} from "../apis/apisList/productApi";
import { useMessage } from "../Context/MessageContext";
import theme from "../Theme/theme";
import { Icon } from "@iconify/react";
import ProductOverview from "../components/productPage/productOverview";
import RelatedProduct from "../components/productPage/relatedProduct";
import LoginRequiredPopup from "../components/loginRequiredPopup/LoginRequiredPopup";
import BreadcrumbBar from "../components/Header/BreadcrumbBar";
import ReviewDisplayPage from "../components/productPage/ReviewsDisplayPage";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { TextField } from "@mui/material";

const Product = () => {
  const { slug } = useParams(); //getting the slug value from url here
  const location = useLocation();
  const { showMessage } = useMessage();
  const { addToCart, userDetails } = useApp();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mocked login state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [questionAnswers, setQuestionAnswers] = useState({
    who: "",
    symptoms: "",
    duration: "",
    action: "",
    medication: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    who: "",
    symptoms: "",
    duration: "",
    action: "",
    medication: "",
  });
  const [currentProduct, setCurrentProduct] = useState(null);
  // console.log('slug',slug);
  const [consultationLink, setConsultationLink] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductBySlug(slug);
        setProduct(response.product);

        if (response.product?.id) {
          fetchRelatedProducts(response.product.id);
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Failed to fetch product",
          "error"
        );
      }
    };

    const fetchRelatedProducts = async (productId) => {
      try {
        const relatedResponse = await getRelatedProduct(productId);
        setRelatedProducts(relatedResponse.related_products);
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Failed to fetch related products",
          "error"
        );
      }
    };

    fetchProduct();
  }, [slug]);

  const handleVariantSelect = (product, variantId) => {
    const variantDetail = product.variations.find((item) => {
      if (item.variation_id == variantId) {
        return item;
      }
    });

    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        selectedVariant: variantId,
        selectedVariantInfo: variantDetail,
        selectedVariantPrice: prevProduct.variations.find(
          (variant) => variant.variation_id === variantId
        )?.price,
      };
    });
    // updateVariant(product, variantId);
  };
  const handleAddProduct = (product, selectedVariant) => {
    const test = process.env.REACT_TEST_MODE || 1; //always 0 for production 
    if (test == 0) {
      // Show the error message
      showMessage(
        "Sorry, this product is currently out of stock. Please check back later.",
        "error"
      );
      return; // Prevent further actions
    }
    if (product.product_type === "Recommended Products Based on Consultation") {
      showMessage(
        "Sorry, this product can be buy ony via Consultation",
        "error"
      );
    }
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else if (product.product_type === "Products with Questions") {
      setCurrentProduct({ product, selectedVariant });
      setIsQuestionModalOpen(true);
    } else {
      product.quantity = quantity;
      addToCart(product, selectedVariant);
    }
  };

  const handleQuestionSubmit = () => {
    // Check if all fields are filled
    const isValid = Object.values(questionAnswers).every(
      (answer) => answer.trim() !== ""
    );

    if (!isValid) {
      // Update the error state for each field
      setFieldErrors({
        who: !questionAnswers.who ? "This field is required" : "",
        symptoms: !questionAnswers.symptoms ? "This field is required" : "",
        duration: !questionAnswers.duration ? "This field is required" : "",
        action: !questionAnswers.action ? "This field is required" : "",
        medication: !questionAnswers.medication ? "This field is required" : "",
      });
      return; // Prevent submission if validation fails
    }

    if (currentProduct) {
      // Store the answers in local storage
      localStorage.setItem(
        `product-questions-${currentProduct.product.id}`,
        JSON.stringify(questionAnswers)
      );
      currentProduct.product.quantity = quantity;
      // Add product to cart after saving answers
      addToCart(currentProduct.product, currentProduct.selectedVariant);
    }

    // Close modal and reset state
    setIsQuestionModalOpen(false);
    setQuestionAnswers({
      who: "",
      symptoms: "",
      duration: "",
      action: "",
      medication: "",
    });
    setFieldErrors({}); // Clear errors after successful submission
  };

  const handleQuantity = (e) => {
    let value = Number(e.target.value);
    if (value < 1 || isNaN(value)) {
      value = 1; // Minimum value
    } else if (value > 10) {
      value = 10; // Maximum value
    }

    setQuantity(value);
  };

  useEffect(() => {
    if (userDetails) {
      setIsLoggedIn(true);
    }
  }, [userDetails]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    if (!product) return;
    // console.log('product detail',product);
    const { categories, product_type } = product;
    if (product_type === "Recommended Products Based on Consultation") {
      const QuestionForm = {
        "weight-loss": "/online-clinic/weight-loss",
        "acid-reflux": "/online-clinic/acid-reflux",
        contraceptives: "/online-clinic/contraceptives",
        cystitis: "/online-clinic/cystitis",
        "erectile-dysfunction": "/online-clinic/erectile-dysfunction",
        "hair-loss": "/online-clinic/hair-loss",
        hayfever: "/online-clinic/hayfever",
        migraine: "/online-clinic/migraine",
        "period-delay": "/online-clinic/period-delay",
        "period-pain": "/online-clinic/period-pain",
        "premature-ejaculation": "/online-clinic/premature-ejaculation",
        "stop-smoking": "/online-clinic/stop-smoking",
      };

      for (let category of categories) {
        const formatted = category.name.toLowerCase().replace(/\s+/g, "-");

        if (QuestionForm.hasOwnProperty(formatted)) {
          setConsultationLink(QuestionForm[formatted]);
          break; // Exit the loop once a match is found
        }
      }
    }
  }, [product]);
  // console.log('ALl Products ', product);
  // console.log('Estimated delivery content : ',product.estimated_delivery,product.name);
  return (
    <>
      <BreadcrumbBar
        productName={product?.name}
        categoryName={product?.categories?.[0]?.name}
      />
      <Container
        sx={{
          paddingY: "50px",
        }}
      >
        <Box
          display={{ xs: "block", sm: "flex", md: "flex" }}
          justifyContent="center"
          alignItems="flex-start"
          sx={{
            flexWrap: { xs: "wrap", sm: "wrap", md: "wrap" },
          }}
        >
          {/************ Product Grid Left *************/}
          <Box
            sx={{
              width: { xs: "100%", sm: "54%", md: "54%" },
              paddingRight: { xs: "0", sm: "10px", md: "10px" },
            }}
          >
            <VerticalImageSlider id={product.id} />
          </Box>
          {/************ Product Detail Right *************/}
          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            sx={{
              borderRadius: "8px",
              width: { xs: "100%", sm: "46%", md: "46%" },
              paddingLeft: { xs: "0", sm: "30px", md: "45px" },
              paddingRight: { xs: "0", sm: "7%", md: "10%" },
            }}
          >
            <Box>
              {/* Product Title */}
              {/*<Typography variant="h4" fontWeight="bold">
                                AOSEPT PLUS
                            </Typography>*/}
              {/* Product Title */}
              <Typography
                variant="body5"
                sx={{
                  fontSize: { xs: "20px", sm: "22px", md: "24px" },
                  fontWeight: "700",
                  color: "#3A3D40",
                  marginTop: { xs: "25px ", sm: "0", md: "0" },
                  display: { xs: "block ", sm: "block", md: "block" },
                }}
              >
                {product?.name}
              </Typography>
            </Box>

            {/* Price Section */}
            <Stack direction="row" alignItems="center" gap={2}>
              <Typography variant="body4" color="tertiary" fontWeight={600}>
                £
                {product.selectedVariantPrice
                  ? product?.selectedVariantPrice
                  : product?.price || 0}
              </Typography>
              {/* <Typography
                                variant="body1"
                                sx={{ textDecoration: "line-through", color: "#999" }}
                            >
                                RRP $59.95
                            </Typography> */}
            </Stack>

            <Stack
              direction={{ xs: "column", md: "row" }}
              gap={3}
              sx={{
                display: "block",
              }}
            >
              <Box>
                {/* <Typography variant="subtitle1" mb={1}>
                                Choose Variant:
                                </Typography> */}
                {product &&
                  product.price &&
                  product?.variations?.length > 0 &&
                  !consultationLink && (
                    <Select
                      value={
                        product.selectedVariant
                          ? product.selectedVariant
                          : product?.variations?.[0].variation_id
                      }
                      // value={product.variations[0].variation_id}
                      onChange={(e) =>
                        handleVariantSelect(product, e.target.value)
                      }
                      fullWidth
                      sx={{
                        ".MuiSelect-select": {
                          padding: "12.5px 30px",
                        },
                      }}
                    >
                      {product?.variations?.map((variant) => {
                        const attributes = variant.attributes;
                        const attributeKey = Object.keys(attributes)[0]; // Get the first available key
                        const attributeValue = attributes[attributeKey]; // Get the corresponding value

                        return (
                          <MenuItem
                            key={variant.variation_id}
                            value={variant.variation_id}
                          >
                            {attributeKey === "tablets"
                              ? `${attributeValue}`
                              : `${attributeKey}: ${attributeValue}`}{" "}
                            {/* Show key: value if not 'tablets' */}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
              </Box>
              {/* Quantity */}

              {product?.variations?.length === 0 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginTop: "10px",
                    marginBottom: "20px",
                    flexWrap: "nowrap",
                    gap: "20px",
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Quantity
                  </Typography>
                  <TextField
                    value={quantity}
                    onChange={handleQuantity}
                    type="number"
                    variant="outlined"
                    sx={{ maxWidth: "100px" }}
                    inputProps={{ min: 1, max: 10 }}
                    InputProps={{
                      sx: {
                        height: "40px",
                        width: "95px",
                        // padding: "2 8px",
                      },
                    }}
                  />
                </Box>
              )}

              <Box>
                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "tertiary.main",
                    borderRadius: "50px",
                    padding: "12px",
                    maxWidth: { xs: "100%", md: "250px" },
                    width: { xs: "100%", md: "250px" },
                    marginTop: "20px",
                    boxShadow: "none",
                  }}
                  // onClick={()=>handleAddProduct(product, product.variations[0])}
                  onClick={() => {
                    if (consultationLink) {
                      navigate(consultationLink);
                      return;
                    }
                    handleAddProduct(
                      product,
                      product?.selectedVariantInfo
                        ? product?.selectedVariantInfo
                        : product?.variations?.length
                        ? product?.variations?.[0]
                        : []
                    );
                  }}
                >
                  {consultationLink ? (
                    "Start consultation"
                  ) : (
                    <>
                      Add To Cart &nbsp;
                      <Icon
                        icon="solar:arrow-right-broken"
                        color="primary.main"
                        width="24"
                        height="24"
                      />
                    </>
                  )}
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
        {/******** Delivery Info Row ********/}
        <Box>
          <CardContent
            sx={{
              backgroundColor: "#F7F7F7",
              border: "1px solid #D7D7D7",
              borderRadius: "10px",
              display: "flex",
              flexWrap: "wrap",
              padding: { xs: "15px 15px", sm: "25px 20px", md: "30px 25px" },
              marginY: { xs: "30px", sm: "30px", md: "50px" },
            }}
          >
            {/******** 01. Delivery Info Row ********/}
            <Box
              sx={{
                paddingRight: { xs: "0", sm: "40px", md: "45px" },
                marginRight: { xs: "0", sm: "40px", md: "45px" },
                borderWidth: { xs: "0", sm: "1px", md: "1px" },
                borderColor: "#DDDDDD",
                borderRightStyle: "solid",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "17px", sm: "17px", md: "18px" },
                  fontWeight: "700",
                }}
              >
                Delivery Options
              </Typography>
              <Stack direction={"row"} alignItems={"center"} gap={1} my={1.8}>
                <Box sx={{display:"flex",alignItems:"center"}}>
                  <Icon
                    icon="material-symbols:circle"
                    width="20"
                    height="20"
                    style={{ color: "#FF0000" }}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: "15px", sm: "16px", md: "16px" },
                      fontWeight: "500",
                      lineHeight: "1.5",
                    }}
                  >
                    <strong>Out of Stock</strong>
                  </Typography>
                </Box>
              </Stack>
            </Box>
            {/******** 02. Estimated Delivery ********/}
            <Box>
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Box
                  sx={{
                    marginTop: "0px",
                    display:"flex",
                    alignItems:"center",
                  }}
                >
                  <Icon
                    icon="hugeicons:delivery-truck-02"
                    width="35"
                    height="35"
                  />
                </Box>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: "17px", sm: "17px", md: "18px" },
                      fontWeight: "700",
                    }}
                  >
                    Estimated Delivery
                  </Typography>
                </Box>
              </Stack>
              <Typography
                variant="h4"
                width={"75%"}
                color="#333333"
                sx={{
                  fontSize: { xs: "15px", sm: "16px", md: "16px" },
                  fontWeight: "500",
                  lineHeight: "1.5",
                }}
              >
                {product?.estimated_delivery ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product?.estimated_delivery,
                    }}
                  />
                ) : (
                  <div>
                    Order in the next <strong>00:35:06</strong> to get
                    it tomorrow* using Express 1-2 Days (Royal Mail Tracked 24)
                  </div>
                )}
              </Typography>
            </Box>
            {/******** 03. What out expert says ********/}
            <Box
              sx={{
                borderTop: "1px solid #DDDDDD",
                paddingTop: { xs: "15px", sm: "25px", md: "30px" },
                marginTop: { xs: "15px", sm: "25px", md: "30px" },
              }}
            >
              <Typography
                variant="h3"
                fontWeight="700"
                sx={{
                  fontSize: { xs: "20px", sm: "22px", md: "24px" },
                  fontWeight: "700",
                }}
              >
                What out expert says
              </Typography>
              <Stack direction={"row"} alignItems={"center"} gap={2} my={1.8}>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: "15px", sm: "16px", md: "16px" },
                      fontWeight: "500",
                      lineHeight: "1.5",
                    }}
                  >
                    {product?.description}
                  </Typography>
                </Box>
              </Stack>
            </Box>
            {/********* End **********/}
          </CardContent>
        </Box>
        {/********* Product Overview **********/}
        <Box>
          <ProductOverview product={product} />
        </Box>
        {/********* Product Review Details Section **********/}
        <Box>
          <ReviewDisplayPage product={product} />
        </Box>
        {/********* Product Overview End **********/}
      </Container>
      {relatedProducts.length===0 ? (<div>
      </div>) : (
      <Box backgroundColor={theme.palette.primary.main}>
        <RelatedProduct relatedProducts={relatedProducts} />
      </Box>)}
      {isQuestionModalOpen && (
        <Dialog
          open={isQuestionModalOpen}
          onClose={() => setIsQuestionModalOpen(false)}
        >
          <DialogTitle>Answer the following questions</DialogTitle>
          <DialogContent>
            <TextField
              label="Who is the medicine for?"
              fullWidth
              margin="dense"
              required
              value={questionAnswers.who}
              onChange={(e) =>
                setQuestionAnswers({ ...questionAnswers, who: e.target.value })
              }
              error={!!fieldErrors.who}
              helperText={fieldErrors.who}
            />
            <TextField
              label="What are the symptoms?"
              fullWidth
              margin="dense"
              required
              value={questionAnswers.symptoms}
              onChange={(e) =>
                setQuestionAnswers({
                  ...questionAnswers,
                  symptoms: e.target.value,
                })
              }
              error={!!fieldErrors.symptoms}
              helperText={fieldErrors.symptoms}
            />
            <TextField
              label="How long have you had the symptoms?"
              fullWidth
              margin="dense"
              required
              value={questionAnswers.duration}
              onChange={(e) =>
                setQuestionAnswers({
                  ...questionAnswers,
                  duration: e.target.value,
                })
              }
              error={!!fieldErrors.duration}
              helperText={fieldErrors.duration}
            />
            <TextField
              label="What action has been taken?"
              fullWidth
              margin="dense"
              required
              value={questionAnswers.action}
              onChange={(e) =>
                setQuestionAnswers({
                  ...questionAnswers,
                  action: e.target.value,
                })
              }
              error={!!fieldErrors.action}
              helperText={fieldErrors.action}
            />
            <TextField
              label="Are you taking any other medication?"
              fullWidth
              margin="dense"
              required
              value={questionAnswers.medication}
              onChange={(e) =>
                setQuestionAnswers({
                  ...questionAnswers,
                  medication: e.target.value,
                })
              }
              error={!!fieldErrors.medication}
              helperText={fieldErrors.medication}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsQuestionModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleQuestionSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <LoginRequiredPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        redirectPath={location.pathname}
      />
    </>
  );
};

export default Product;
