import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Typography } from "@mui/material";
import { Icon } from '@iconify/react';
import theme from "../../../Theme/theme";

const Carousel = () => {
  const sliderRef = useRef(null); // Create a ref for the slider
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, text: "Save $20 on all doses of weight loss medication", img: "/carousel/Rectangle 3.png" },
    { id: 2, text: "Extra Savings: 20% Off on Tablets", img: "/carousel/Rectangle 3.png" },
    { id: 3, text: "New Arrivals: Check out the latest products", img: "/carousel/Rectangle 3.png" },
    { id: 4, text: "Limited Offer: Buy 2 Get 1 Free", img: "/carousel/Rectangle 3.png" },
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
          <Box key={slide.id} textAlign="center" position={'relative'}>
            <img src={slide.img} alt={slide.text} style={{ width: "100%", height: "auto"}} />
            <Typography sx={{fontSize: '45px', position: 'absolute', top: '50%', left: '10%', color: '#fff'}}>{slide.text}</Typography>
            <Button sx={{backgroundColor: 'tertiary.main', color:'#fff', position: 'absolute', top: '66%', left: '10%', color: '#fff'}}>Shop Now</Button>
          </Box>
        ))}
      </Slider>

      {/* Custom Navigation */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={2} sx={{position: 'absolute', right: '60px', bottom: '60px'}}>
        {/* <Button onClick={() => sliderRef.current.slickPrev()} color="#fff"><Icon color="#fff" icon="solar:arrow-left-broken" width="24" height="24" /></Button> */}
        {slides.map((_, index) => (
          <Typography
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
