import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import theme from "../../Theme/theme";
import { reviewProductData } from "../../apis/apisList/orderApi";
import { rateProduct } from "../../apis/apisList/orderApi";

const ReviewsDisplayPage = ({ product }) => {
  const [review, setReview] = useState([]);
  useEffect(() => {
    if (!product || !product.id) return;
    console.log("Review displaying useeffect");
    const getData = async () => {
      try {
        console.log("try block 01");
        const response = await reviewProductData({
          product_id: product.id,
        });
        console.log("Full response from reviewProductData Api:", response);
        setReview(response.reviews || []);
      } catch (error) {
        console.error("Error fetching review:", {
          message: error.message,
          response: error.respoonce,
          full: error,
        });
      }
    };

    if (product.id) {
      getData();
    }
  }, [product.id]);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "auto",
        flexDirection: "column",
        marginTop: "18px",
      }}
    >
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "22px", sm: "28px", md: "32px" },
            color: "#37373F",
            fontWeight: "700",
            borderBottom: "1px solid #D3D6D9",
            paddingBottom: { xs: "15px", sm: "15px", md: "20px" },
            marginBottom: { xs: "15px", sm: "15px", md: "25px" },
            paddingTop: { xs: "10px", sm: "10px", md: "15px" },
          }}
        >
          Rating & Reviews
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          gap: 5,
          padding: "12px",
        }}
      >
        {review && review.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              width: "100%",
              flexDirection: "column",
              gap: 3,
              gridTemplateColumns: "repeat(3, 1fr)",
              gridAutoRows: "auto",
              overflowY: "auto",
              "@media (max-width: 568px)": {
                gridTemplateColumns: "repeat(2, 1fr)",
              },
            }}
          >
            {review.map((reviewItem, index) => (
              <Card
                sx={{
                  backgroundColor: "rgba(247, 247, 247, 0.97)",
                  boxShadow: "none",
                  border: "0.3px solid rgba(218, 218, 218, 0.7)",
                  borderRadius: "4px",
                  width: "85%",
                  "@media (max-width: 568px)": {
                    width: "100%",
                  },
                }}
              >
                <CardActionArea
                  sx={{
                    height: "100%",
                    "&[data-active]": {
                      backgroundColor: "none",
                      "&:hover": {
                        backgroundColor: "none",
                      },
                    },
                  }}
                >
                  <CardContent sx={{ height: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="h3"
                        component="div"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          // gap: "5px",
                          fontSize: "1.25rem",
                          fontWeight: "500",
                          lineHeight: "1.5",
                          color: "rgb(51, 51, 51)",
                        }}
                      >
                        Rating
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <Typography variant="h3" component="div">
                          {reviewItem.rating}
                        </Typography>
                        <StarIcon
                          sx={{
                            backgroundColor: "green",
                            color: "white",
                            fontSize: "1.2rem",
                            borderRadius: "2px",
                            padding: "1px",
                            width: "18px",
                            height: "18px",
                          }}
                        />
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        marginTop: "2px",
                        fontSize: "0.9rem",
                        fontWeight: "400",
                        lineHeight: "1.3",
                        // marginRight:"7px",
                        color: "rgb(51, 51, 51)",
                      }}
                    >
                      {reviewItem.comment}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography>No reviews available for this product.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ReviewsDisplayPage;
