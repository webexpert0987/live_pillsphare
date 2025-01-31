import React from "react";
import Slider from "react-slick";
import { Box, Typography, Button, Container } from "@mui/material";
import ProDefaultImg from "../../pages/images/how-it-works.jpg"; // The same image for all products
import { styled } from "@mui/material/styles"; // Add the missing styled import

// Import arrow images
import PrevArrowImg from "../../pages/images/prev-arrow2.svg"; // Replace with actual image path
import NextArrowImg from "../../pages/images/next-arrow2.svg"; // Replace with actual image path

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

// Styled component for ImgParent
const ImgParent = styled(Box)(({ theme }) => ({
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(0deg, #104239 0%, rgba(148, 148, 148, 0.00) 65.5%)",
    zIndex: 1, // Lower than image, to be behind the image
  },
  "& img": {
    zIndex: 2, // Ensures the image appears above the ::before
  },
}));

const RelatedArticleSlider = () => {
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
    rowInfoWapp: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "end",
      marginBottom: "50px",
    },
    sectionTitle: {
      fontSize: "32px",
      color: "#333",
      fontWeight: "700",
      margin: "0 0 10px 0",
    },
    introPara: {
      fontSize: "18px",
      color: "#333",
      fontWeight: "500",
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
    gridProImg: {
      width: "100%",
      borderRadius: "12px 12px 0 0",
      height: "420px",
      objectFit: "cover",
    },
    ImgParent: {
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#333",
        zIndex: 9,
      },
    },
    gridInfo: {
      backgroundColor: "none",
      position: "relative",
    },
    IngridInfo: {
      padding: "20px 22px",
      position: "absolute",
      width: "100%",
      bottom: "0",
      left: "0",
      zIndex: "3",
    },
    proTitle: {
      fontSize: "18px",
      fontWeight: "700",
      lineHeight: "1.4",
      color: "#FFF",
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
      padding: "12px 25px",
      marginTop: "15px",
      boxShadow: "none",
    },
  };

  return (
    <Box
      style={{
        backgroundColor: "#FFF",
        position: "relative",
        padding: "80px 0",
      }}
    >
      <Container style={gridSlider.rowInfoWapp}>
        <Box>
          <Typography variant="h2" style={gridSlider.sectionTitle}>
            Related article
          </Typography>
          <Typography variant="p" style={gridSlider.introPara}>
            Online platforms offer convenient and personalized solutions for
            weight loss.
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            style={gridSlider.viewAllBtn}
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
                <ImgParent
                  sx={{
                    backgroundColor: "#FFF",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    style={gridSlider.gridProImg}
                    src={product.image}
                    alt={product.title}
                  />
                  <Box style={gridSlider.gridInfo}>
                    <Box style={gridSlider.IngridInfo}>
                      <Typography variant="h6" style={gridSlider.proTitle}>
                        {product.title}
                      </Typography>
                      <Box textAlign="" mt={2}>
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
                </ImgParent>
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default RelatedArticleSlider;
