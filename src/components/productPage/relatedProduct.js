import {React , useEffect} from "react";
import Slider from "react-slick";
import { Box, Typography, Button, Container, Rating } from "@mui/material";
import PrevArrowImg from "../../pages/images/prev-arrow.svg";
import NextArrowImg from "../../pages/images/next-arrow.svg";
import { Link } from "react-router-dom";

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

const RelatedProductSlider = ({ relatedProducts }) => {
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100); 
  }, []);
  const settings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    lazyLoad: "ondemand", // added to load the slide
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };
  // if (!relatedProducts.length) {
  //   return null;
  // }
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
          {/* <Typography
            variant="p"
            sx={{
              fontSize: { xs: "15px", sm: "16px", md: "18px" },
              color: "#FFF",
              fontWeight: "500",
            }}
          >
            Weight Loss Treatments: Tailored Solutions for a Healthier You.
          </Typography> */}
        </Box>
      </Container>
      <Container sx={{ maxWidth: "1460px !important" }}>
        <Box sx={{ width: "100%" }}>
          <Slider {...settings}>
            {relatedProducts.map((product) => (
              <Box
                key={product.id}
                sx={{
                  padding: { xs: "5px", sm: "10px", md: "15px" },
                  position: "relative",
                  // width: { xs: "100%", sm: "250px", md: "300px" }, 
                  height: "450px", // Set a fixed height
                }}
              >
                <Link
                  to={`/product/${product.slug}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#FFF",
                      borderRadius: "12px",
                      overflow: "hidden",
                      height: "100%", // Ensure the inner box takes full height
                      display: "flex",
                      flexDirection: "column",
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
                        height: "220px", // Fixed height for the image container
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{
                          height: "220px",
                          objectFit: "contain",
                          maxHeight: "100%",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "#FAFAFA",
                        padding: "20px 22px",
                        flexGrow: 1, // Allow content to grow and fill space
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
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
                        {product.name}
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
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: { xs: "16px", sm: "17px", md: "18px" },
                              fontWeight: "800",
                              color: "#FD6400",
                              marginTop: { xs: "15px", sm: "10px", md: "10px" },
                            }}
                          >
                            £{product.price}
                          </Typography>
                          {product.regular_price&& <Typography
                            variant="body1"
                            sx={{
                              textDecoration: "line-through",
                              color: "#A7A7A7",
                              marginLeft: "11px",
                              fontSize: { xs: "16px", sm: "17px", md: "18px" },
                              fontWeight: "500",
                              marginTop: { xs: "15px", sm: "10px", md: "10px" },
                            }}
                          >
                            £{product.regular_price}
                          </Typography> }
                         
                        </Box>
                        {/* <Box
                          display="flex"
                          alignItems="center"
                          gap={1}
                          sx={{
                            marginTop: { xs: "10px", sm: "10px", md: "10px" },
                          }}
                        >
                          <Rating value={4} readOnly size="small" />
                          <Typography variant="body2" color="textSecondary">
                            (123)
                          </Typography>
                        </Box> */}
                      </Box>
                      <Box textAlign="center" mt={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{
                            fontSize: { xs: "13px", sm: "15px", md: "15px" },
                            fontWeight: "600",
                            backgroundColor: "#FD6400",
                            color: "#FFF",
                            borderRadius: "50px",
                            padding: {
                              xs: "10px 10px",
                              sm: "12px 15px",
                              md: "12px 20px",
                            },
                            width: "100%",
                            marginTop: { xs: "0px", sm: "15px", md: "15px" },
                            boxShadow: "none",
                            display: "flex",
                          }}
                        >
                          View
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default RelatedProductSlider;
