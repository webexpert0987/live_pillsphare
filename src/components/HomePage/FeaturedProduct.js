import React from "react";
import { Box, Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const products = [
  {
    image: "/images/Mask-group.png",
    title: "Beforeyouspeak Coffee Collagen Coffee Mocha",
    price: "$55.96",
    originalPrice: "$69.95",
    discount: "20% OFF RRP",
    rating: 4.5,
    reviews: 121,
  },
  {
    image: "/images/December-Co-Op_Capilano-Manuka 1.png",
    title: "Microlife B2 Basic Blood Pressure Monitor",
    price: "$55.96",
    originalPrice: "$69.95",
    discount: "40% OFF RRP",
    rating: 4.5,
    reviews: 121,
  },
  {
    image: "/images/naturesown-ostelin-cenovis-Co-Op 1.png",
    title: "Cetaphil Moisturising Lotion 1 Litre",
    price: "$55.96",
    originalPrice: "$69.95",
    discount: "20% OFF RRP",
    rating: 4.5,
    reviews: 121,
  },
];

function FeaturedProducts() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
  return (
    <Container >
            <Box>
                <Box
                    sx={{
                    backgroundColor: "#004225",
                    color: "white",
                    padding: "2rem",
                    borderRadius: "8px",
                    textAlign: "center",
                    }}
                >
                    <Typography variant="h5" fontWeight="bold">
                    Featured Product
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: "1rem" }}>
                    Changes to diet and exercise are often combined with this medication.
                    </Typography>
                    <Button
                    variant="contained"
                    sx={{ backgroundColor: "#FD6400", marginTop: "1.5rem", width: "100%" }}
                    >
                    View All →
                    </Button>
                </Box>
                <Box sx={{ padding: "2rem" }}>
                    <Slider {...settings}>
                        {products.map((product, index) => (
                            <Box key={index} sx={{ px: 1 }}>
                                <Card sx={{ borderRadius: "16px" }}>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        style={{ width: "100%", height: "auto", borderRadius: "8px 8px 0 0" }}
                                    />
                                    <CardContent>
                                        <Typography variant="subtitle2" color="error" fontWeight="bold">
                                            {product.discount}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            sx={{ mt: 1, fontSize: { xs: "1rem", md: "1.25rem" } }}
                                        >
                                            {product.title}
                                        </Typography>
                                        <Box display="flex" gap="1rem" alignItems="center">
                                            <Typography variant="h6" color="primary.main" fontWeight="bold">
                                                {product.price}
                                            </Typography>
                                            <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>
                                                {product.originalPrice}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" gap="0.5rem" sx={{ mt: 1 }}>
                                            <StarIcon color="warning" fontSize="small" />
                                            <Typography variant="body2">
                                                {product.rating} ({product.reviews})
                                            </Typography>
                                        </Box>
                                        <Button
                                            variant="contained"
                                            sx={{ mt: 2, backgroundColor: "#004225", width: "100%" }}
                                        >
                                            Add to Cart →
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Slider>
                </Box>
            </Box>
    </Container>
  );
}

export default FeaturedProducts;
