import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Snackbar,
  Alert,
} from "@mui/material";
import { rateProduct } from "../apis/apisList/orderApi";
import { toast } from "react-toastify";
import { useMessage } from "../Context/MessageContext";
import { reviewProductData } from "../apis/apisList/orderApi";

const SingleOrderHistory = ({
  index,
  item,
  order,
  ratingProductId,
  setRatingProductID,
  open,
  setOpen,
}) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser ? storedUser.user_id : null;
console.log('user-id ',userId);
  const [userReview, setUserReview] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        // console.log("Sending to API:", { userId, product_id:item.product_id });
        const response = await reviewProductData({
          userId,
          product_id: item.product_id,
          // variation_id: item.variation_id,
        });
        console.log("current rating data ", response);
        const reviewsData = response?.reviews;
        if (reviewsData && reviewsData.length > 0){
          // assuming one review per user-product pair
          const review = reviewsData[0];
          console.log('Reviewww data ',reviewsData);
          setUserReview(review);
          console.log("Review by user:", review);
          // console.log('other review product details ',reviewProductData[1]);
        } else {
          setUserReview(null);
          console.log("No review found");
        }
      } catch (error) {
        console.log("Some review error", error);
        console.error(
          "Some review error:",
          error?.response || error.message || error
        );
      }
    };
    getData();
  }, [userId, ratingProductId]);

  console.log("userReviews",userReview?.user_id,userId);
// console.log("userReviews data",userReview);
//   if(order.order_status !== "completed"){
//     return
//   }
  return (
    <TableRow key={index} sx={{ borderTop: "0",  }}>
      <TableCell>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        > */}
        <Box display="flex" flexDirection="column" gap={1}>

          <Typography
            style={{
              flex: 1,
            }}
          >
            {item.product_name}
          </Typography>
          {/* ////// */}
          {/* {((userReview) && (userId === userReview?.user_id))? ( */}
          {userReview && userReview?.user_id === userId ? (
            <Box>
              <Typography variant="subtitle2">
                Your Rating: {userReview.rating} ⭐
              </Typography>
              <Typography variant="body2">
                Comment: {userReview.comment}
              </Typography>
            </Box>
          ) : (
              <Box>
              {(order.order_status === "completed") && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    setRatingProductID(item.product_id);
                    setOpen(true);
                  }}
                  sx={{
                    backgroundColor: "rgb(253, 100, 0)",
                    color: "#fff",
                    width: "110px",
                    borderRadius: "20px",
                    padding: "6px 8px",
                    textTransform: "none",
                    fontSize: "13px",
                    fontWeight: "500",
                    lineHeight: "1.75",
                    margin:0,
                    transform:"none",
                    transition:"none",
                    boxShadow: "none",
                    outline: "none",
                    "&:hover": {
                      backgroundColor: "rgb(253, 100, 0)", // better hover color
                      boxShadow: "none",
                      outline: "none",
                      textTransform:"none",
                      transition:"none"
                    },
                  }}
                >
                  Write Review
                </Button>
              )}
              </Box>
            
          )}
        </Box>
      </TableCell>
      <TableCell  sx={{ verticalAlign: "top" }}>{item.quantity}</TableCell>
      <TableCell  sx={{ verticalAlign: "top" }}>£{Number(item.subtotal).toFixed(2)}</TableCell>{" "}
      {/* Convert to number */}
      <TableCell  sx={{ verticalAlign: "top" }}>£{Number(item.total).toFixed(2)}</TableCell>{" "}
      {/* Convert to number */}
    </TableRow>
  );
};
export default SingleOrderHistory;
