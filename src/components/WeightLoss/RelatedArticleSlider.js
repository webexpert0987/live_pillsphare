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
        left: "-10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        cursor: "pointer",
      }}
    >
      <img
        src={PrevArrowImg}
        alt="Previous"
        style={{
          width: window.innerWidth <= 768 ? "35px" : "50px", // Adjust width for mobile
          height: window.innerWidth <= 768 ? "35px" : "50px", // Adjust height for mobile
        }}
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
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        cursor: "pointer",
      }}
    >
      <img
        src={NextArrowImg}
        alt="Next"
        style={{
          width: window.innerWidth <= 768 ? "35px" : "50px", // Adjust width for mobile
          height: window.innerWidth <= 768 ? "35px" : "50px", // Adjust height for mobile
        }}
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
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  

  const isMobile = window.innerWidth < 767; // Adjust breakpoint as needed

  return (
    <Box
      sx={{
        position: "relative",
        padding: { xs: "40px 0", sm: "60px 0", md: "80px 0" },
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexWrap: { xs: "wrap", sm: "nowrap", md: "nowrap" },
          justifyContent: "space-between",
          alignItems: "end",
          marginBottom: "20px",
        }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "22px", sm: "28px", md: "32px" },
              color: "#333333",
              fontWeight: "700",
              margin: "0 0 10px 0",
            }}
          >
            Related article
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: { xs: "15px", sm: "16px", md: "18px" },
              color: "#333333",
              fontWeight: "500",
            }}
          >
            Online platforms offer convenient and personalized solutions for
            weight loss.
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: { xs: "15px", sm: "0", md: "0" },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: { xs: "14px", sm: "17px", md: "18px" },
              fontWeight: "600",
              lineHeight: "1.4",
              backgroundColor: "#104239",
              color: "#FFF",
              borderRadius: "50px",
              border: "none",
              textTransform: "inherit",
              padding: "12px 25px",
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
                  position: "relative",
                }}
              >
                <ImgParent
                  sx={{
                    backgroundColor: "#FFF",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      borderRadius: "12px 12px 0 0",
                      height: isMobile ? "280px" : "420px",
                      objectFit: "cover",
                    }}
                    src={product.image}
                    alt={product.title}
                  />
                  <Box
                    sx={{
                      backgroundColor: "none",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        padding: {
                          xs: "12px 15px",
                          sm: "18px 20px",
                          md: "20px 22px",
                        },
                        position: "absolute",
                        width: "100%",
                        bottom: "0",
                        left: "0",
                        zIndex: "3",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: { xs: "15px", sm: "17px", md: "18px" },
                          fontWeight: "700",
                          lineHeight: "1.4",
                          marginBottom: { xs: "5px", sm: "10px", md: "10px" },
                          color: "#FFF",
                        }}
                      >
                        {product.title}
                      </Typography>
                      <Box textAlign="" mt={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{
                            fontSize: { xs: "13px", sm: "14px", md: "15px" },
                            fontWeight: "600",
                            lineHeight: "1.4",
                            backgroundColor: "#FD6400",
                            color: "#FFF",
                            borderRadius: "50px",
                            border: "none",
                            textTransform: "inherit",
                            padding: {
                              xs: "11px 15px",
                              sm: "12px 20px",
                              md: "12px 25px",
                            },
                            marginTop: "15px",
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
