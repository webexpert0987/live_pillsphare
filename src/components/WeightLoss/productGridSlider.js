import React from "react";
import Slider from "react-slick";
import { Box, Typography, Button, Container } from "@mui/material";
import ProDefaultImg from "../../pages/images/how-it-works.jpg"; // The same image for all products

// Import arrow images
import PrevArrowImg from "../../pages/images/prev-arrow.svg"; // Replace with actual image path
import NextArrowImg from "../../pages/images/next-arrow.svg"; // Replace with actual image path

// Dummy Product Data
const products = [
  {
    id: 1,
    image: ProDefaultImg,
    title: "Wegovy® (Semaglutide) - Weekly Weight Loss Injection",
  },
  {
    id: 2,
    image: ProDefaultImg,
    title: "Beforeyouspeak Coffee Collagen Coffee Mocha",
  },
  {
    id: 3,
    image: ProDefaultImg,
    title: "Microlife B2 Basic Blood Pressure Monitor",
  },
  {
    id: 4,
    image: ProDefaultImg,
    title: "Cetaphil Moisturising Lotion 1 Litre",
  },
  {
    id: 5,
    image: ProDefaultImg,
    title: "Wegovy® (Semaglutide) - Weekly Weight Loss Injection",
  },
  {
    id: 6,
    image: ProDefaultImg,
    title: "Beforeyouspeak Coffee Collagen Coffee Mocha",
  },
  {
    id: 7,
    image: ProDefaultImg,
    title: "Microlife B2 Basic Blood Pressure Monitor",
  },
  {
    id: 8,
    image: ProDefaultImg,
    title: "Cetaphil Moisturising Lotion 1 Litre",
  },
];

// **Custom Previous Arrow Component**
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        left: "-10px",
        top: "45%",
        transform: "translateY(-50%)",
        zIndex: 10,
        cursor: "pointer",
      }}
    >
      <img
        src={PrevArrowImg}
        alt="Previous"
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};

// **Custom Next Arrow Component**
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        right: "-10px",
        top: "45%",
        transform: "translateY(-50%)",
        zIndex: 10,
        cursor: "pointer",
      }}
    >
      <img
        src={NextArrowImg}
        alt="Next"
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};

const ProductCarousel = () => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <Box
      id="ViewTreatments"
      sx={{
        backgroundColor: "#F6EFDF",
        position: "relative",
        padding: { xs: "30px 0", sm: "50px 0", md: "80px 0" },
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          marginBottom: { xs: "30px", sm: "40px", md: "50px" },
          flexWrap: "wrap"
        }}
      >
        <Box sx={{
          width: {xs: "100%", sm: "60%", md: "70%"}
        }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "22px", sm: "28px", md: "32px" },
              color: "#333",
              fontWeight: "700",
              margin: "0 0 10px 0",
            }}
          >
            Weight loss treatments
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: { xs: "15px", sm: "16px", md: "18px" },
              color: "#333",
              fontWeight: "500",
            }}
          >
            Weight Loss Treatments: Tailored Solutions for a Healthier You.
          </Typography>
        </Box>
        <Box sx={{
          width: {xs: "100%", sm: "40%", md: "30%"},
          display: "flex",
          justifyContent: {xs: "left", sm: "right", md: "right"},
        }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => (window.location.href = "/category/weight-loss")}
            sx={{
              fontSize: {xs: "15px", sm: "16px", md: "18px"},
              fontWeight: "600",
              lineHeight: "1.4",
              backgroundColor: "#104239",
              color: "#FFF",
              borderRadius: "50px",
              border: "none",
              textTransform: "inherit",
              padding: "12px 20px",
              width: "auto",
              marginTop: "15px",
              boxShadow: "none",
            }}
          >
            View All
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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </Box>
      </Container>
      <Container sx={{ maxWidth: "1460px !important" }}>
        <Box sx={{ width: "100%" }}>
          <Slider {...settings}>
            {products.map((product) => (
              <Box
                key={product.id}
                sx={{ 
                  padding: { xs: "5px", sm: "10px", md: "15px" },
                  position: "relative" }}
              >
                <Box
                  sx={{
                    backgroundColor: "#FFF",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: "100%",
                      borderRadius: "12px 12px 0 0",
                      height: "auto",
                    }}
                  />
                  <Box
                    sx={{
                      backgroundColor: "#FAFAFA",
                      padding: "20px 22px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: {xs: "15px", sm: "17px", md: "18px"},
                        fontWeight: "700",
                        lineHeight: "1.3",
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Box textAlign="center" mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          fontSize: {xs: "13px", sm: "15px", md: "15px"},
                          fontWeight: "600",
                          lineHeight: "1.4",
                          backgroundColor: "#FD6400",
                          color: "#FFF",
                          borderRadius: "50px",
                          border: "none",
                          textTransform: "inherit",
                          padding: {xs: "10px 10px", sm: "12px 15px", md: "12px 20px"},
                          width: "100%",
                          marginTop: {xs: "0px", sm: "15px", md: "15px"},
                          boxShadow: "none",
                        }}
                      >
                        Learn More
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
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductCarousel;
