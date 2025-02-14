import React, { useEffect, useState } from "react";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  KeyboardArrowRight,
  KeyboardArrowLeft,
} from "@mui/icons-material";
import { getProductImages } from "../../apis/apisList/productApi";

const ImageGallery = ({ id }) => {
  const [allimages, setAllImages] = useState([]); // Set to an empty array by default
  const [selectedImage, setSelectedImage] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Check if the images for the given id are cached in localStorage
        const cachedImages = localStorage.getItem(`product-images-${id}`);

        if (cachedImages) {
          setAllImages(JSON.parse(cachedImages)); // Use cached images
        } else {
          const response = await getProductImages(id);
          setAllImages(response); // Assuming API returns an array of image URLs
          localStorage.setItem(
            `product-images-${id}`,
            JSON.stringify(response)
          ); // Cache the images
        }
      } catch (error) {
        setAllImages([]); // Fallback to an empty array if the API call fails
      }
    };

    if (id) {
      fetchImages();
    }
  }, [id]); // Re-run the effect when the `id` changes

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleScroll = (direction) => {
    if (direction === "up") {
      setSelectedImage(Math.max(selectedImage - 1, 0));
    } else {
      setSelectedImage(Math.min(selectedImage + 1, allimages.length - 1));
    }
  };

  // Use allimages array once it's populated from API
  const images =
    allimages.length > 0
      ? allimages
      : [
          "https://www.fraction9coffee.com/cdn/shop/t/23/assets/placeholder_600x.png?v=113555733946226816651714543406",
        ];

  return (
    <Box
      display={"flex"}
      flexDirection={{ xs: "column", md: "row" }}
      alignItems="center"
      gap={isMobile ? 1 : 2}
    >
      {/* Left Slider */}
      {!isMobile && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={1}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          {/* Scroll Up Button */}
          <IconButton
            onClick={() => handleScroll("up")}
            disabled={selectedImage === 0}
            size="small"
          >
            <KeyboardArrowUp />
          </IconButton>

          {/* Thumbnails */}
          {images.map((img, index) => (
            <Box
              key={index}
              component="img"
              src={img}
              alt={`Thumbnail ${index}`}
              onClick={() => handleImageClick(index)}
              sx={{
                width: { xs: 70, md: 90 },
                height: { xs: 70, md: 90 },
                border:
                  index === selectedImage ? "2px solid #000" : "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            />
          ))}

          {/* Scroll Down Button */}
          <IconButton
            onClick={() => handleScroll("down")}
            disabled={selectedImage === images.length - 1}
            size="small"
          >
            <KeyboardArrowDown />
          </IconButton>
        </Box>
      )}

      {/* Main Selected Image */}
      <Box
        sx={{
          width: { xs: "100%", sm: "80%", md: "100%" },
          "& > img": {
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #ccc",
          },
        }}
      >
        <img src={images[selectedImage]} alt="Selected" />
      </Box>

      {isMobile && (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={1}
          sx={{ display: { xs: "flex", sm: "flex" } }}
        >
          <IconButton
            onClick={() => handleScroll("up")}
            disabled={selectedImage === 0}
            size="small"
          >
            <KeyboardArrowLeft />
          </IconButton>

          {images.map((img, index) => (
            <Box
              key={index}
              component="img"
              src={img}
              alt={`Thumbnail ${index}`}
              onClick={() => handleImageClick(index)}
              sx={{
                width: { xs: 40, sm: 75, md: 90 },
                height: { xs: 40, sm: 75, md: 90 },
                border:
                  index === selectedImage ? "2px solid #000" : "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            />
          ))}

          <IconButton
            onClick={() => handleScroll("down")}
            disabled={selectedImage === images.length - 1}
            size="small"
          >
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ImageGallery;
