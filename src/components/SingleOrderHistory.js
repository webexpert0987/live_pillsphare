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
  item,
  order,
  ratingProductId,
  setRatingProductID,
  open,
  setOpen,
}) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser ? storedUser.user_id : null;
  const [userReview, setUserReview] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        // console.log("Sending to API:", { userId, product_id:item.product_id });
        const response = await reviewProductData({
          userId,
          product_id: item.product_id,
        });
        console.log("rate data", response);
        const reviewsData = response?.reviews;
        if (reviewsData && reviewsData.length > 0) {
          // assuming one review per user-product pair
          const review = reviewsData[0];
          setUserReview(review);
          console.log("Review by user:", review);
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

  console.log("userReview",userReview)

//   if(order.order_status !== "completed"){
//     return
//   }

  return (
    <TableRow sx={{ borderTop: "0", marginTop: 0 }}>
      <TableCell>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <span
            style={{
              flex: 1,
            }}
          >
            {item.product_name}
          </span>
          {/* ////// */}

          {userReview ? (
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
              {order.order_status === "pending" && (
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
                    width: "130px",
                    borderRadius: "20px",
                    padding: "6px 9px",
                    textTransform: "none",
                    fontSize: "13px",
                    fontWeight: "500",
                    lineHeight: "1.75",
                    margin: 0,
                    "&:hover": {
                      backgroundColor: "rgb(230, 90, 0)", // better hover color
                      boxShadow: "none",
                    },
                  }}
                >
                  Write Review
                </Button>
              )}
              </Box>
            
          )}
        </div>
      </TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>£{Number(item.subtotal).toFixed(2)}</TableCell>{" "}
      {/* Convert to number */}
      <TableCell>£{Number(item.total).toFixed(2)}</TableCell>{" "}
      {/* Convert to number */}
    </TableRow>
  );
};
export default SingleOrderHistory;
