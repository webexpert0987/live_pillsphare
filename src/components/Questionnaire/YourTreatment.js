import React, { useState, useEffect } from "react";
import {
  Grid2,
  Card,
  CardContent,
  CardMedia,
  Typography,
  MenuItem,
  Select,
  Button,
  Box,
} from "@mui/material";
import { useApp } from "../../Context/AppContext";
import { getProductByCategory } from "../../apis/apisList/productApi";
import { useSearchParams } from "react-router-dom";

const TreatmentRecommendation = () => {
  const [visibleProducts, setVisibleProducts] = useState(4); // Start by showing 4 products
  const [dosingSchedule, setDosingSchedule] = useState("");
  const [doseStrength, setDoseStrength] = useState("");
  const [sharpsBin, setSharpsBin] = useState("");
  const [products, setProducts] = useState([]);
  const { setSelectedTab, userDetails, setQaCart } = useApp();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category"); // Get the "category" query param

  const loadMore = () => {
    setVisibleProducts((prev) => prev + 4); // Load 4 more products each time
  };

  const handleDosingScheduleChange = (event) => {
    setDosingSchedule(event.target.value);
  };

  const handleDoseStrengthChange = (event) => {
    setDoseStrength(event.target.value);
  };

  const handleSharpsBinChange = (event) => {
    setSharpsBin(event.target.value);
  };

  const handleSubmit = (product) => {
    setQaCart([product]);
    setSelectedTab(3);
  };
  const handleVariantSelect = (product, variantId) => {
    const variantDetail = product?.variations?.find(
      (item) => item.id == variantId
    );

    const updatedProduct = {
      ...product,
      selectedVariant: variantDetail,
    };

    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === product.id ? updatedProduct : p))
    );
  };

  useEffect(() => {
    if (category) {
      async function getProducts() {
        try {
          const response = await getProductByCategory(category);
          const result = response.map((product) => ({
            ...product,
            selectedVariant: product.variations[0],
          }));
          setProducts(result);
        } catch (error) {
          console.log(error);
        }
      }
      getProducts();
    }
  }, []);

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: "20px", sm: "26px", md: "32px" },
          fontWeight: "700",
          letterSpacing: "-0.5px",
          color: "#333",
          marginBottom: "10px",
        }}
      >
        Treatment Recommendation and Preference
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "16px", sm: "16px", md: "18px" },
          fontWeight: "500",
          color: "#747474",
          lineHeight: "1.4",
          margin: "10px 0 15px 0",
        }}
      >
        Based on the answers you have provided, our clinical team may offer the
        treatments shown below. If you have a treatment preference, you can
        select it here. Whilst your preference will be taken into consideration,
        our team will recommend the treatment which is most suitable for you.
      </Typography>

      <Grid2 container spacing={{ xs: 1, sm: 3, md: 4 }} mt={4}>
        {products.slice(0, visibleProducts).map((product, index) => (
          <Grid2 size={{ xs: 6, sm: 6, md: 6 }} key={index}>
            <Card
              sx={{
                boxShadow: "none",
                backgroundColor: "#FAFAFA",
                border: "1px solid #EEEEEE",
                borderRadius: "10px",
              }}
            >
              <CardMedia
                component="img"
                height={{ xs: 100, sm: 200, md: 250 }}
                image={product.image}
                alt={product.name}
              />
              <CardContent
                sx={{ padding: { xs: "15px", sm: "18px", md: "20px" } }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    flexWrap: { xs: "wrap", sm: "nowrap", md: "nowrap" },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: "15px", sm: "18px", md: "20px" },
                      fontWeight: { xs: "600", sm: "600", md: "700" },
                      lineHeight: "1.3",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "20px", sm: "22px", md: "24px" },
                      fontWeight: "800",
                      color: "#FD6400",
                      padding: {
                        xs: "10px 0 0 0",
                        sm: "0 0 0 10px",
                        md: "0 0 0 15px",
                      },
                    }}
                  >
                    ${product.price}
                  </Typography>
                </Box>

                <Select
                  fullWidth
                  value={dosingSchedule}
                  onChange={handleDosingScheduleChange}
                  displayEmpty
                  variant="outlined"
                  sx={{
                    mt: 2,
                    padding: "0 5px",
                    borderRadius: "50px",
                    fontSize: { xs: "13px", sm: "14px", md: "15px" },
                    color: "#747474",
                    fontWeight: "500",
                    maxHeight: "40px",
                    backgroundColor: "#FFF",
                  }}
                >
                  <MenuItem value="" disabled>
                    Where are you in your dosing schedule
                  </MenuItem>
                  <MenuItem value="start">Starting</MenuItem>
                  <MenuItem value="mid">Mid-Cycle</MenuItem>
                  <MenuItem value="end">End of Cycle</MenuItem>
                </Select>
                <Box
                  display="flex"
                  gap={2}
                  sx={{
                    mt: 2,
                    flexWrap: { xs: "wrap", sm: "nowrap", md: "nowrap" },
                  }}
                >
                  <Select
                    fullWidth
                    value={doseStrength}
                    onChange={handleDoseStrengthChange}
                    displayEmpty
                    variant="outlined"
                    sx={{
                      padding: "0 5px",
                      borderRadius: "50px",
                      fontSize: { xs: "13px", sm: "14px", md: "15px" },
                      color: "#747474",
                      fontWeight: "500",
                      maxHeight: "40px",
                      backgroundColor: "#FFF",
                    }}
                  >
                    <MenuItem value="" disabled>
                      Dose Strength
                    </MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                  <Select
                    fullWidth
                    value={sharpsBin}
                    onChange={handleSharpsBinChange}
                    displayEmpty
                    variant="outlined"
                    sx={{
                      padding: "0 5px",
                      borderRadius: "50px",
                      fontSize: { xs: "13px", sm: "14px", md: "15px" },
                      color: "#747474",
                      fontWeight: "500",
                      maxHeight: "40px",
                      backgroundColor: "#FFF",
                    }}
                  >
                    <MenuItem value="" disabled>
                      Sharps Bin
                    </MenuItem>
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </Box>
                <Box
                  display="flex"
                  gap={2}
                  sx={{
                    mt: 2,
                    flexWrap: { xs: "wrap", sm: "nowrap", md: "nowrap" },
                  }}
                >
                  {product?.variations?.length > 0 && (
                    <Select
                      value={
                        product.selectedVariant
                          ? product.selectedVariant.id
                          : product?.variations?.[0].id
                      }
                      onChange={(e) =>
                        handleVariantSelect(product, e.target.value)
                      }
                      fullWidth
                      variant="outlined"
                      sx={{
                        padding: "0 5px",
                        borderRadius: "50px",
                        fontSize: { xs: "13px", sm: "14px", md: "15px" },
                        color: "#747474",
                        fontWeight: "500",
                        maxHeight: "40px",
                        backgroundColor: "#FFF",
                      }}
                    >
                      {product?.variations?.map((variant) => (
                        <MenuItem key={variant.id} value={variant.id}>
                          {`${variant.attributes.attribute_tablets} `}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    fontSize: { xs: "13px", sm: "13px", md: "14px" },
                    fontWeight: "600",
                    lineHeight: "1.4",
                    backgroundColor: "#104239",
                    color: "#FFF",
                    borderRadius: "50px",
                    border: "none",
                    padding: {
                      xs: "10px 10px",
                      sm: "11px 20px",
                      md: "12px 25px",
                    },
                    width: "100%",
                    boxShadow: "none",
                    textTransform: "capitalize",
                  }}
                  onClick={() => handleSubmit(product)}
                >
                  Select Treatment{" "}
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
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {visibleProducts < products.length && (
        <Box
          textAlign="center"
          sx={{ marginTop: { xs: "20px", sm: "30px", md: "40px" } }}
        >
          <Button
            variant="outlined"
            onClick={loadMore}
            sx={{
              fontSize: { xs: "14px", sm: "15px", md: "17px" },
              fontWeight: "600",
              lineHeight: "1.4",
              backgroundColor: "#FD6400",
              color: "#FFF",
              borderRadius: "50px",
              border: "none",
              padding: "15px 35px",
              boxShadow: "none",
              textTransform: "uppercase",
            }}
          >
            Load More{" "}
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
        </Box>
      )}
    </Box>
  );
};

export default TreatmentRecommendation;
