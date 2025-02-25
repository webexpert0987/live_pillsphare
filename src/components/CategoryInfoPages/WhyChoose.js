import { Box, Container, Typography } from "@mui/material";
import React from "react";

// Sample data for the why choose section
const whyChooseData = [
  {
    id: 1,
    image: require("../../pages/images/Info-Images/icon01.png"),
    title: "Trusted UK Pharmacy",
    description: "Fully regulated and compliant with MHRA and GPhC guidelines.",
  },
  {
    id: 2,
    image: require("../../pages/images/Info-Images/icon02.png"),
    title: "Discreet Service",
    description: "Confidential consultations and packaging.",
  },
  {
    id: 3,
    image: require("../../pages/images/Info-Images/icon03.png"),
    title: "Expert Support",
    description:
      "Access to qualified pharmacists and healthcare professionals.",
  },
  {
    id: 4,
    image: require("../../pages/images/Info-Images/icon04.png"),
    title: "Fast Delivery",
    description: "Reliable and timely delivery across the UK.",
  },
];

function WhyChoosePills() {
  return (
    <Box
      sx={{
        padding: { xs: "35px 0", sm: "40px 0", md: "80px 0" },
        backgroundColor: "#104239",
      }}
    >
      <Container>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "22px", sm: "30px", md: "38px" },
            fontWeight: "700",
            color: "#FFF",
            lineHeight: "1.3",
            marginBottom: "20px",
            textAlign: "center",
            marginBottom: { xs: "25px", sm: "35px", md: "50px" },
          }}
        >
          Why Choose Pill Sphere?
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: { xs: "30px", sm: "30px", md: "50px" },
            textAlign: "center",
          }}
        >
          {whyChooseData.map((item) => (
            <Box key={item.id}>
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{
                  width: "130px",
                  height: "130px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "20px", sm: "22px", md: "26px" },
                  fontWeight: "600",
                  color: "#FFF",
                  marginBottom: "10px",
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "16px",
                  color: "#FFF",
                  fontWeight: "400",
                  letterSpacing: "0.2px",
                }}
              >
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default WhyChoosePills;
