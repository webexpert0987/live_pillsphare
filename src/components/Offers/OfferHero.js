// HeroSection.js
import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";

const heroShop = {
  contentColumn: {
    width: "550px",
    maxWidth: "100%",
    paddingTop: "50px",
    paddingBottom: "50px",
  },
  catTitle: {
    fontSize: "45px",
    letterSpacing: "-0.5px",
    fontWeight: "800",
    lineHeight: "1.3",
  },
  catDescription: {
    fontSize: "18px",
    letterSpacing: "0px",
    fontWeight: "500",
    lineHeight: "1.4",
  },
  heroList: {
    margin: "8px 0 8px 0",
  },
  heroListTxt: {
    fontSize: "18px",
    letterSpacing: "0px",
    fontWeight: "600",
    lineHeight: "1.3",
  },
  primaryBtn: {
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "1.4",
    backgroundColor: "#FD6400",
    color: "#FFF",
    borderRadius: "50px",
    border: "none",
    textTransform: "inherit",
    padding: "12px 25px",
  },
  secondryBtn: {
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "1.4",
    backgroundColor: "#104239",
    color: "#FFF",
    borderRadius: "50px",
    border: "none",
    textTransform: "inherit",
    padding: "12px 25px",
  },
};

const OfferHero = ({
  title = "Pill Sphere ",
  defultTitle = "Offers",
  description = "Our wide range of offers updates each month - shop now so you don't miss out. One of our core values is striving to offer excellent value and low prices across a variety of products and brands. ",
  points = [
    "Lose up to 20% of body weight",
    "Support from UK clinicians",
    "Online prescriptions with discreet delivery",
  ], // Default 3 points
  button1Text = "Start Your Consultation Today",
  button2Text = "View Treatment",
  bgHeroUrl = "https://admin.pillsphere.com/wp-content/uploads/2025/01/categoryHeroImage.jpg",
  catName,
}) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bgHeroUrl})`, // Dynamically set background image
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "450px", // Adjust height as needed
        color: "#333333", // Text color for visibility on dark images
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Box style={heroShop.contentColumn} textAlign="">
          {/* Page Title */}
          <Typography style={heroShop.catTitle} variant="h3" gutterBottom>
            {catName ? `${catName}  ${title}` : defultTitle}
          </Typography>

          {/* Short Description */}
          <Typography style={heroShop.catDescription} variant="body1" paragraph>
            {description}
          </Typography>

          {/* List of 3 Points as Bullet Points 
          <Box>
            {Array.isArray(points) && points.length > 0 ? (
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "20px",
                  marginTop: "25px",
                  marginBottom: "20px",
                }}
              >
                {points.map((point, index) => (
                  <li style={heroShop.heroList} key={index}>
                    <Typography style={heroShop.heroListTxt} variant="body2">
                      {point}
                    </Typography>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body2">No points available.</Typography>
            )}
          </Box>*/}

          {/* Two Buttons 
          <Box mt={4} display="flex" gap={2}>
            <Button style={heroShop.primaryBtn} variant="contained">
              {button1Text}{" "}
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
            <Button style={heroShop.secondryBtn} variant="outlined">
              {button2Text}{" "}
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
          </Box>*/}
        </Box>
      </Container>
    </Box>
  );
};

export default OfferHero;
