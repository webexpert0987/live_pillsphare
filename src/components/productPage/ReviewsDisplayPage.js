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
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import theme from "../../Theme/theme"; // Make sure to import your theme if needed
import { reviewProductData } from "../../apis/apisList/orderApi";
import { rateProduct } from "../../apis/apisList/orderApi";

const ReviewsDisplayPage = ({ product }) => {
  const [review, setReview] = useState([]);
  useEffect(() => {
    if (!product || !product.id) return;
    console.log("Review displaying useeffect");
    const getData = async () => {
      try {
        console.log("try block");
        const response = await reviewProductData({
          product_id: product.id,
        });
        console.log("Full response from reviewProductData API:", response);
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
  console.log("reviews dataa", review);
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
          height: "auto",
          flexDirection: "column",
          gap: 5,
          padding: "12px",
        }}
      >
        {review && review.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "auto",
              flexDirection: "column",
              gap: 5,
              padding: "12px",
            }}
          >
            {review.map((reviewItem, index) => (
              <Box
                key={index}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                 <Box style={{display:"flex",flexDirection:"row",gap: "20px"}}>
                <Typography variant="subtitle1" style={{ display:"flex", flexDirection:"row", gap:"8px" , alignItems:"center",fontSize:"18px",fontWeight:"600",lineHeight:"1.7"}}>
                   {/* <span style={{backgroundColor:"green",color: "white"}}>{reviewItem.rating}⭐</span>  */}
                 Rating :  {reviewItem.rating}<StarIcon sx={{backgroundColor:"green", color: "white", fontSize: "1.3rem", borderRadius:"2px",padding:"1px",width :"20px",height:"22px"}} /> 
                </Typography>
                </Box>
                <Typography variant="subtitle1" style={{fontSize:"18px",fontWeight:"600",lineHeight:"1.7"}}>
                 Comment : <span style={{fontSize:"17px",color:"black", fontWeight: "500",lineHeight:"1.5"}}>{reviewItem.comment}</span>
                </Typography>  
                {/* <Box
                  style={{ display: "flex", flexDirection: "row", gap: "20px" }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      alignItems: "center",
                      fontSize: "18px", // Keep the title size intact
                      fontWeight: "600", // Keep the title weight intact
                      lineHeight: "1.7",
                      color: "black", // Set color to black
                      marginLeft: "0", // Ensure equal start
                    }}
                  >
                    Rating :
                    <span
                      style={{
                        paddingLeft:"20px",
                        fontSize: "14px", // Reduced font size for the dynamic rating value
                        fontWeight: "400", // Reduced weight for the rating data
                      }}
                    >
                      {reviewItem.rating}
                    </span>
                    <StarIcon
                      sx={{
                        backgroundColor: "green",
                        color: "white",
                        fontSize: "1.3rem",
                        borderRadius: "2px",
                        padding: "1px",
                        width: "20px",
                        height: "22px",
                      }}
                    />
                  </Typography>
                </Box> */}

                {/* <Typography
                  variant="subtitle1"
                  style={{
                    fontSize: "18px", // Keep the title size intact
                    fontWeight: "600", // Keep the title weight intact
                    lineHeight: "1.7",
                    color: "black", // Set color to black
                    marginLeft: "0", // Ensure equal start
                  }}
                >
                  Comment :
                  <span
                    style={{
                      fontSize: "14px", // Reduced font size for the dynamic comment text
                      fontWeight: "400", // Reduced weight for the comment text
                      lineHeight: "1.7",
                    }}
                  >
                    {reviewItem.comment}
                  </span>
                </Typography> */}
              </Box>
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
