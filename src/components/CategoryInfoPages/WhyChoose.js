import { Box, Container, Typography } from "@mui/material";
import React from "react";

// Sample data for the why choose section
const whyChooseData = [
  {
    id: 1,
    image: require("../../pages/images/Info-Images/icon01.png"),
    title: "GPhC-Registered Pharmacy",
    description: "All services meet strict regulatory standards.",
  },
  {
    id: 2,
    image: require("../../pages/images/Info-Images/icon02.png"),
    title: "MHRA-Approved Medications",
    description: "Safe, genuine, and effective treatments.",
  },
  {
    id: 3,
    image: require("../../pages/images/Info-Images/icon03.png"),
    title: "Private Consultations",
    description: "Convenient online access to healthcare professionals.",
  },
  {
    id: 4,
    image: require("../../pages/images/Info-Images/icon04.png"),
    title: "Expert Advice",
    description: "Support from qualified pharmacists and doctors.",
  },
  {
    id: 5,
    image: require("../../pages/images/Info-Images/icon04.png"),
    title: "Fast, Discreet Delivery",
    description: "Your medications delivered to your doorstep.",
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
            // marginBottom: "20px",
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
              md: "repeat(5, 1fr)",
            },
            gap: { xs: "30px", sm: "25px", md: "35px" },
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
                  fontSize: { xs: "18px", sm: "20px", md: "22px" },
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
                  fontSize: { xs: "15px", sm: "16px", md: "16px" },
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
