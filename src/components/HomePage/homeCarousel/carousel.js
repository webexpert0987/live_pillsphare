import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";
import CustomButton from "../../Button/button";
import { Link } from "react-router-dom";

const Carousel = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      text: "The website is currently under construction and is live only for the Gphc to review the application for new premises.",
      img: "/carousel/Rectangle.png",
    },
    {
      id: 2,
      text: "The website is currently under construction and is live only for the Gphc to review the application for new premises.",
      img: "/carousel/Rectangle.png",
    },
    {
      id: 3,
      text: "The website is currently under construction and is live only for the Gphc to review the application for new premises.",
      img: "/carousel/Rectangle.png",
    },
    {
      id: 4,
      text: "The website is currently under construction and is live only for the Gphc to review the application for new premises.",
      img: "/carousel/Rectangle.png",
    },
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <Box position="relative" width="100%">
      <Slider {...settings} ref={sliderRef}>
        {slides.map((slide) => (
          <Box key={slide.id} textAlign="center" position={"relative"}>
            <Box>
              <img
                src={slide.img}
                alt={slide.text}
                style={{ width: "100%", minHeight: "280px", height: "auto", minWidth: "950px", maxWWidth: "100%" }}
              />
            </Box>
            {/*<Box sx={{position: 'absolute', top: '15%', left: {xs: '8.5%', lg: '13.5%'}, width: {sm:'90%', md:'450px'}, textAlign: 'left'}}>
              </Box></Box><Box width={{xs: '85%', lg: '530px'}}>*/}
            <Box
              sx={{
                position: "absolute",
                top: "15%",
                left: { xs: "0", lg: "13.5%" },
                width: { sm: "90%", md: "90%" },
                textAlign: "left",
                paddingLeft: { xs: "20px" },
                paddingRight: { xs: "20px" },
              }}
            >
              <Box width={{ xs: "100%", lg: "90%" }}>
                <Box marginBottom={2}>
                  <Typography
                    sx={{
                      fontSize: { sm: "22px", md: "30px", lg: "45px" },
                      color: "#fff",
                      fontWeight: 700,
                      lineHeight: "1.2",
                      whiteSpace: "break-spaces",
                    }}
                  >
                    {slide.text}
                  </Typography>
                </Box>
                {/* <Box>
                  <Typography
                    variant="h3"
                    sx={{ lineHeight: "1.2", color: "#fff" }}
                  >
                    Use code PILLSMED at checkout. Discount code excludes
                    Saxenda and weight loss bundles.
                  </Typography>
                </Box> */}
                <Box>
                <Link to="/shop" style={{ textDecoration: "none" }}>
                  <CustomButton
                    bgColor="tertiary.main"
                    txColor="#fff"
                    text="Shop Now"
                  />
                  </Link>
                </Box>
              </Box>
            </Box>
            {/* <Box sx={{position: 'absolute', top: '66%', left: '10%', width: '450px'}}>
              Use code PILLSMED at checkout. Discount code excludes Saxenda and weight loss bundles.
            </Box>
            <Box sx={{position: 'absolute', top: '66%', left: '10%', width: '450px'}}>
              <CustomButton bgColor="tertiary.main" txColor="#fff" text='Shop Now' />
            </Box> */}
          </Box>
        ))}
      </Slider>

      {/* Custom Navigation */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={2}
        sx={{
          position: "absolute",
          right: { xs: "20px", md: "60px" },
          bottom: { xs: "20px", md: "40px" },
        }}
      >
        {/* <Button onClick={() => sliderRef.current.slickPrev()} color="#fff"><Icon color="#fff" icon="solar:arrow-left-broken" width="24" height="24" /></Button> */}
        {slides.map((_, index) => (
          <Typography
            variant="h3"
            key={index}
            mx={1}
            color="#fff"
            sx={{
              cursor: "pointer",
              fontWeight: currentSlide === index ? "bold" : "normal",
              color: currentSlide === index ? "tertiary.main" : "#fff",
            }}
            onClick={() => sliderRef.current.slickGoTo(index)}
          >
            {index + 1}
          </Typography>
        ))}
        {/* <Button onClick={() => sliderRef.current.slickNext()} color="#fff"><Icon icon="solar:arrow-right-broken" color="#fff" width="24" height="24" /></Button> */}
        {/* <Button onClick={() => sliderRef.current.slickNext()}>-&gt;</Button> */}
      </Box>
    </Box>
  );
};

export default Carousel;
