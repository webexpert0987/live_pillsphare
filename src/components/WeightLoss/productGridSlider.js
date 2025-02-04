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
        left: "-20px",
        top: "50%",
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
        right: "-20px",
        top: "50%",
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
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const gridSlider = {
    gridInfo: {
      backgroundColor: "#FAFAFA",
      padding: "20px 22px",
    },
    proTitle: {
      fontSize: "18px",
      fontWeight: "700",
      lineHeight: "1.4",
    },
    proLearnBtn: {
      fontSize: "15px",
      fontWeight: "600",
      lineHeight: "1.4",
      backgroundColor: "#FD6400",
      color: "#FFF",
      borderRadius: "50px",
      border: "none",
      textTransform: "inherit",
      padding: "12px 20px",
      width: "100%",
      marginTop: "15px",
      boxShadow: "none",
    },
    rowInfoWapp: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "end",
      marginBottom: "50px"
    },
    sectionTitle: {
      fontSize: "32px",
      color: "#333",
      fontWeight: "700",
      margin: "0 0 10px 0"
    },
    introPara: {
      fontSize: "18px",
      color: "#333",
      fontWeight: "500"
    },
    viewAllBtn: {
      fontSize: "18px",
      fontWeight: "600",
      lineHeight: "1.4",
      backgroundColor: "#104239",
      color: "#FFF",
      borderRadius: "50px",
      border: "none",
      textTransform: "inherit",
      padding: "12px 20px",
      width: "100%",
      marginTop: "15px",
      boxShadow: "none",
    },
  };

  return (
    <Box id="ViewTreatments" style={{ backgroundColor: "#F6EFDF", position: "relative", padding: "80px 0" }}>
      <Container style={gridSlider.rowInfoWapp}>
        <Box>
          <Typography variant="h2" style={gridSlider.sectionTitle}>
            Weight loss treatments
          </Typography>
          <Typography variant="p" style={gridSlider.introPara}>
            Weight Loss Treatments: Tailored Solutions for a Healthier You.
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            style={gridSlider.viewAllBtn}
            onClick={() => (window.location.href = "/category/weight-loss")}
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
                sx={{ padding: "15px", position: "relative" }}
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
                  <Box style={gridSlider.gridInfo}>
                    <Typography variant="h6" style={gridSlider.proTitle}>
                      {product.title}
                    </Typography>
                    <Box textAlign="center" mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        style={gridSlider.proLearnBtn}
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
