import React, { useState } from "react";
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
  Container,
  colors,
} from "@mui/material";

const products = [
  {
    id: 1,
    title: "Wegovy® (Semaglutide) - Weekly Weight Loss Injection",
    price: "$50",
    image:
      "https://admin.pillsphere.com/wp-content/uploads/2025/01/Chlorphenamine.png",
  },
  {
    id: 2,
    title: "Wegovy® (Semaglutide) - Weekly Weight Loss Injection",
    price: "$75",
    image:
      "https://admin.pillsphere.com/wp-content/uploads/2025/01/Chlorphenamine.png",
  },
  {
    id: 3,
    title: "Wegovy® (Semaglutide) - Weekly Weight Loss Injection",
    price: "$100",
    image:
      "https://admin.pillsphere.com/wp-content/uploads/2025/01/Chlorphenamine.png",
  },
  {
    id: 4,
    title: "Wegovy® (Semaglutide) - Weekly Weight Loss Injection",
    price: "$125",
    image:
      "https://admin.pillsphere.com/wp-content/uploads/2025/01/Chlorphenamine.png",
  },
  {
    id: 5,
    title: "Wegovy® (Semaglutide) - Weekly Weight Loss Injection",
    price: "$150",
    image:
      "https://admin.pillsphere.com/wp-content/uploads/2025/01/Chlorphenamine.png",
  },
  {
    id: 6,
    title: "Wegovy® (Semaglutide) - Weekly Weight Loss Injection",
    price: "$175",
    image:
      "https://admin.pillsphere.com/wp-content/uploads/2025/01/Chlorphenamine.png",
  },
  {
    id: 7,
    title: "Wegovy® (Semaglutide) - Weekly Weight Loss Injection",
    price: "$200",
    image:
      "https://admin.pillsphere.com/wp-content/uploads/2025/01/Chlorphenamine.png",
  },
  {
    id: 8,
    title: "Wegovy® (Semaglutide) - Weekly Weight Loss Injection",
    price: "$225",
    image:
      "https://admin.pillsphere.com/wp-content/uploads/2025/01/Chlorphenamine.png",
  },
];

const TreatmentRecommendation = () => {
  const [visibleProducts, setVisibleProducts] = useState(4); // Start by showing 4 products
  const [dosingSchedule, setDosingSchedule] = useState("");
  const [doseStrength, setDoseStrength] = useState("");
  const [sharpsBin, setSharpsBin] = useState("");

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

  const treatmentStyle = {
    Title: {
      fontSize: "32px",
      fontWeight: "700",
      letterSpacing: "-0.5px",
      color: "#333",
      marginBottom: "10px",
    },
    paragraph: {
      fontSize: "18px",
      fontWeight: "500",
      color: "#747474",
      lineHeight: "1.4",
      margin: "10px 0 15px 0",
    },
    proCard: {
        boxShadow: "none",
        backgroundColor: "#FAFAFA",
        border: "1px solid #EEEEEE",
        borderRadius: "10px"
    },
    prodBtn: {
        fontSize: "14px",
        fontWeight: "600",
        lineHeight: "1.4",
        backgroundColor: "#104239",
        color: "#FFF",
        borderRadius: "50px",
        border: "none",
        padding: "12px 25px",
        width: "100%",
        boxShadow: "none",
        textTransform: "capitalize"
    },
    prodDrop: {
        padding: "0 5px",
        borderRadius: "50px",
        fontSize: "15x",
        color: "#747474",
        fontWeight: "500",
    },
    loadMoreBtn: {
        fontSize: "17px",
        fontWeight: "600",
        lineHeight: "1.4",
        backgroundColor: "#FD6400",
        color: "#FFF",
        borderRadius: "50px",
        border: "none",
        padding: "15px 35px",
        boxShadow: "none",
        textTransform: "uppercase"
    }
  };

  return (
    <Box>
      <Typography style={treatmentStyle.Title} variant="h5" gutterBottom>
        Treatment Recommendation and Preference
      </Typography>
      <Typography style={treatmentStyle.paragraph} variant="body1" gutterBottom>
        Based on the answers you have provided, our clinical team may offer the
        treatments shown below. If you have a treatment preference, you can
        select it here. Whilst your preference will be taken into consideration,
        our team will recommend the treatment which is most suitable for you.
      </Typography>

      <Grid2 container spacing={4} mt={4}>
        {products.slice(0, visibleProducts).map((product) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }} key={product.id}>
            <Card style={treatmentStyle.proCard}>
              <CardMedia style={treatmentStyle.prodImg}
                component="img"
                height="250"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography style={treatmentStyle.prodTitle} variant="h6">{product.title}</Typography>
                  <Typography style={treatmentStyle.prodPrice} variant="body1" color="textSecondary">
                    {product.price}
                  </Typography>
                </Box>

                <Select style={treatmentStyle.prodDrop}
                  fullWidth
                  value={dosingSchedule}
                  onChange={handleDosingScheduleChange}
                  displayEmpty
                  variant="outlined"
                  sx={{ mt: 2 }}
                >
                  <MenuItem value="" disabled>
                    Where are you in your dosing schedule
                  </MenuItem>
                  <MenuItem value="start">Starting</MenuItem>
                  <MenuItem value="mid">Mid-Cycle</MenuItem>
                  <MenuItem value="end">End of Cycle</MenuItem>
                </Select>

                <Box display="flex" gap={2} sx={{ mt: 2 }}>
                  <Select style={treatmentStyle.prodDrop}
                    fullWidth
                    value={doseStrength}
                    onChange={handleDoseStrengthChange}
                    displayEmpty
                    variant="outlined"
                  >
                    <MenuItem value="" disabled>
                      Dose Strength
                    </MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                  <Select style={treatmentStyle.prodDrop}
                    fullWidth
                    value={sharpsBin}
                    onChange={handleSharpsBinChange}
                    displayEmpty
                    variant="outlined"
                  >
                    <MenuItem value="" disabled>
                      Sharps Bin
                    </MenuItem>
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </Box>

                <Button style={treatmentStyle.prodBtn} variant="contained" fullWidth sx={{ mt: 2 }}>
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
        <Box textAlign="center" sx={{ mt: 5 }}>
          <Button style={treatmentStyle.loadMoreBtn} variant="outlined" onClick={loadMore}>
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
