import React, { useState } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown, KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';

const ImageGallery = () => {
    const images = [
        "https://dummyimage.com/300.png/09f/fff",
        "https://dummyimage.com/300.png/09f/000",
        "https://dummyimage.com/300.png/09f/asdf",
        "https://dummyimage.com/300.png/09f/f44",
        "https://dummyimage.com/300.png/09f/g46",
    ];
  const [selectedImage, setSelectedImage] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleScroll = (direction) => {
    if (direction === 'up') {
      setSelectedImage(Math.max(selectedImage - 1, 0));
    } else {
      setSelectedImage(Math.min(selectedImage + 1, images.length - 1));
    }
  };

  return (
    <Box display={"flex"} flexDirection={{xs: 'column', md: 'row'}} alignItems="center" gap={isMobile ? 1 : 2}>
      {/* Left Slider */}
      {!isMobile && <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={1}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      >
        {/* Scroll Up Button */}
        <IconButton
          onClick={() => handleScroll('up')}
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
              width: {xs : 70, md: 90},
              height: {xs : 70, md: 90},
              border: index === selectedImage ? '2px solid #000' : '1px solid #ccc',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          />
        ))}

        {/* Scroll Down Button */}
        <IconButton
          onClick={() => handleScroll('down')}
          disabled={selectedImage === images.length - 1}
          size="small"
        >
          <KeyboardArrowDown />
        </IconButton>
      </Box>}

      {/* Main Selected Image */}
      <Box
        sx={{
          width: { xs: '50%', sm: '50%', md: '550px' },
          '& > img': {
            width: '100%',
            borderRadius: '8px',
            border: '1px solid #ccc',
          },
        }}
      >
        <img
          src={images[selectedImage]}
          alt="Selected"
        />
      </Box>
      
        {isMobile && <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={1}
            sx={{ display: { xs: 'flex', sm: 'flex' } }}
        >
            <IconButton
            onClick={() => handleScroll('up')}
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
                width: {xs : 40, sm: 75, md: 90},
                height: {xs : 40, sm: 75, md: 90},
                border: index === selectedImage ? '2px solid #000' : '1px solid #ccc',
                borderRadius: '8px',
                cursor: 'pointer',
                }}
            />
            ))}

            <IconButton
            onClick={() => handleScroll('down')}
            disabled={selectedImage === images.length - 1}
            size="small"
            >
            <KeyboardArrowRight />
            </IconButton>
        </Box>}
    </Box>
  );
};

export default ImageGallery;
// import React, { useState } from "react";
// import { Box, IconButton } from "@mui/material";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// const VerticalImageSlider = () => {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const images = [
//     "https://dummyimage.com/300.png/09f/fff",
//     "https://dummyimage.com/300.png/09f/000",
//     "https://dummyimage.com/300.png/09f/asdf",
//     "https://dummyimage.com/300.png/09f/f44",
//     "https://dummyimage.com/300.png/09f/g46",
//   ];

//   const handleImageClick = (index) => {
//     setSelectedImage(index);
//   };

//   const handleScroll = (direction) => {
//     if (direction === "up" && selectedImage > 0) {
//       setSelectedImage(selectedImage - 1);
//     } else if (direction === "down" && selectedImage < images.length - 1) {
//       setSelectedImage(selectedImage + 1);
//     }
//   };

//   return (
//     <Box display="flex" alignItems="center" gap={2}>
//       {/* Left Slider */}
//       <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
//         {/* Scroll Up Button */}
//         <IconButton
//           onClick={() => handleScroll("up")}
//           disabled={selectedImage === 0}
//           size="small"
//         >
//           <KeyboardArrowUpIcon />
//         </IconButton>

//         {/* Thumbnails */}
//         {images.map((img, index) => (
//           <Box
//             key={index}
//             component="img"
//             src={img}
//             alt={`Thumbnail ${index}`}
//             onClick={() => handleImageClick(index)}
//             sx={{
//               width: 90,
//               height: 90,
//               border: index === selectedImage ? "2px solid #000" : "1px solid #ccc",
//               borderRadius: "8px",
//               cursor: "pointer",
//             }}
//           />
//         ))}

//         {/* Scroll Down Button */}
//         <IconButton
//           onClick={() => handleScroll("down")}
//           disabled={selectedImage === images.length - 1}
//           size="small"
//         >
//           <KeyboardArrowDownIcon />
//         </IconButton>
//       </Box>

//       {/* Main Selected Image */}
//       <Box>
//         <img
//           src={images[selectedImage]}
//           alt="Selected"
//           style={{
//             width: "550px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default VerticalImageSlider;
