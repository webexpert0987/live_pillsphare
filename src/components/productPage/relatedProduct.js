import React from "react";
import Slider from "react-slick";
import { Box, Typography, Button, Container, Rating } from "@mui/material";
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

const isMobile = window.innerWidth < 767; // Adjust breakpoint as needed

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

const RelatedProductSlider = () => {
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
        backgroundColor: "#104239",
        position: "relative",
        padding: { xs: "40px 0", sm: "60px 0", md: "80px 0" },
      }}
    >
      <Container
        sx={{
          display: "flex",
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
              color: "#FFF",
              fontWeight: "700",
              margin: "0 0 10px 0",
            }}
          >
            Related Product
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: { xs: "15px", sm: "16px", md: "18px" },
              color: "#FFF",
              fontWeight: "500",
            }}
          >
            Weight Loss Treatments: Tailored Solutions for a Healthier You.
          </Typography>
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
                <Box
                  sx={{
                    backgroundColor: "#FFF",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "12px 12px 0 0",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{
                        height: isMobile ? "150px" : "220px",
                        objectFit: "contain",
                        maxheight: "100%",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "#FAFAFA",
                      padding: "20px 22px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "15px", sm: "17px", md: "19px" },
                        fontWeight: "700",
                        lineHeight: "1.3",
                        marginBottom: { xs: "5px", sm: "10px", md: "10px" },
                      }}
                    >
                      {product.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: {
                          xs: "column-reverse",
                          sm: "inherit",
                          md: "inherit",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: { xs: "16px", sm: "17px", md: "18px" },
                            fontWeight: "800",
                            color: "#FD6400",
                            marginTop: {
                              xs: "15px",
                              sm: "10px",
                              md: "10px",
                            },
                          }}
                        >
                          $55.96
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            textDecoration: "line-through",
                            color: "#A7A7A7",
                            marginLeft: "11px",
                            fontSize: { xs: "16px", sm: "17px", md: "18px" },
                            fontWeight: "500",
                            marginTop: {
                              xs: "15px",
                              sm: "10px",
                              md: "10px",
                            },
                          }}
                        >
                          $69.95
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        sx={{
                          marginTop: {
                            xs: "10px",
                            sm: "10px",
                            md: "10px",
                          },
                        }}
                      >
                        <Rating
                          value={4} // Replace with actual rating if available
                          readOnly
                          size="small"
                        />
                        <Typography variant="body2" color="textSecondary">
                          (123){" "}
                          {/* Replace with actual review count if available */}
                        </Typography>
                      </Box>
                    </Box>

                    <Box textAlign="center" mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          fontSize: { xs: "13px", sm: "15px", md: "15px" },
                          fontWeight: "600",
                          lineHeight: "1.4",
                          backgroundColor: "#FD6400",
                          color: "#FFF",
                          borderRadius: "50px",
                          border: "none",
                          textTransform: "inherit",
                          padding: {
                            xs: "10px 10px",
                            sm: "12px 15px",
                            md: "12px 20px",
                          },
                          width: "100%",
                          marginTop: { xs: "0px", sm: "15px", md: "15px" },
                          boxShadow: "none",
                        }}
                      >
                        Add to Cart
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

export default RelatedProductSlider;
