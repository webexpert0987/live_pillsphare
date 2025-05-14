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
  CircularProgress,
  Alert,
} from "@mui/material";
import { rateProduct } from "../apis/apisList/orderApi";
import { toast } from "react-toastify";
import { useMessage } from "../Context/MessageContext";
import SingleOrderHistory from "../components/SingleOrderHistory";
const OrderHistory = () => {
  const [orders, setOrders] = useState([]); // State to hold the orders data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [success, setSuccess] = useState(null); // State for error handling
  const [open, setOpen] = useState(false); // State for dialog handling
  const [rating, setRating] = useState(0); // State for rating handling
  const [comment, setComment] = useState(""); // State for comment handling
  const [ratingError, setRatingError] = useState(""); // State for error handling
  const [ratingProductID, setRatingProductID] = useState(0); // State for error handling

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser ? storedUser.user_id : null;

  const { showMessage } = useMessage();
  /////
  const handleSubmit = async () => {
    if (!rating) {
      setRatingError("Please provide rating.");
      return;
    }
    const userProductRatingDetails = {
      product_id: ratingProductID,
      userId: userId,
      rating: rating,
      comment: comment.trim(),
    };
    try {
      await rateProduct(userProductRatingDetails);
      console.log("user rate", userProductRatingDetails);
      setRating(0);
      setComment("");
      setOpen(false);
      setRatingError("");
      showMessage("Rating Successful", "success");
    } catch (error) {
      // toast.error('Some toast error');
      showMessage(error.response.data.message, "error");
      setOpen(false);
      // setRatingError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  // Fetch orders only if userId is available
  useEffect(() => {
    if (!userId) {
      return; // No need to fetch data if user is not logged in
    }
    const fetchOrdersData = async () => {
      try {
        const response = await fetch(
          `https://admin.pillsphere.com/wp-json/wp/v2/orders/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Parse the JSON response
        setOrders(data); // Set the fetched orders data to state
        setLoading(false); // Stop loading
      } catch (err) {
        setError("Error fetching orders data: " + err.message); // Handle error
        setLoading(false); // Stop loading
      }
    };

    fetchOrdersData(); // Fetch the data
  }, [userId]); // The hook runs whenever `userId` changes

  if (!userId) {
    return (
      <Container maxWidth="md" style={{ marginTop: "20px" }}>
        <Typography
          variant="h4"
          style={{
            color: "rgb(16, 66, 57)",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Order History
        </Typography>
        <Typography variant="h6">
          You need to log in to view your order history.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
          href="/login" // Replace with your actual login URL
        >
          Click here to log in
        </Button>
      </Container>
    );
  }

  if (loading) {
    return (
      <Box
        height="70vh"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        textAlign="center"
      >
        <CircularProgress />
        <Typography mt={2}>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" style={{ marginTop: "20px", height: "40vh" }}>
        <Typography variant="h6">
          It looks like you haven't placed any orders yet. Start shopping today,
          and your order history will be displayed here!
        </Typography>
      </Container>
    ); // Error state
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography
        variant="h4"
        style={{
          color: "rgb(16, 66, 57)",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Order History
      </Typography>
      {/* <Snackbar
        open={success}
        onClose={() => setSuccess(false)}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
         "Your review was submitted successfully!
        </Alert>
      </Snackbar> */}
      {orders.map((order) => (
        <Card
          key={order.order_id}
          style={{
            marginBottom: "20px",
            backgroundColor: "rgb(16, 66, 57)",
            color: "white",
          }}
        >
          <CardContent>
            <Typography variant="h6">Order #{order.order_id}</Typography>
            <Typography variant="body2">
              Date: {order.order_date} | Status: {order.order_status}
            </Typography>
            <Table style={{ marginTop: "10px", backgroundColor: "white" }}>
              <TableHead>
                <TableRow style={{ backgroundColor: "rgb(253, 100, 0)" }}>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    Product
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    Quantity
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    Subtotal
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.line_items.map((item, index) => (
                  // <div key={index} style={{display:"flex",width:"100%"}}>
                  <SingleOrderHistory
                    index={index}
                    item={item}
                    order={order}
                    ratingProductID={ratingProductID}
                    setRatingProductID={setRatingProductID}
                    open={open}
                    setOpen={setOpen}
                  />
                  // </div>
                ))}
                <Dialog
                  open={open}
                  onClose={() => setOpen(false)}
                  BackdropProps={{
                    style: { backgroundColor: "transparent" },
                  }}
                  PaperProps={{
                    sx: {
                      // boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)',
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
                      borderRadius: 1,
                    },
                  }}
                >
                  <DialogTitle>Write a Review</DialogTitle>
                  {ratingError && (
                    <Box sx={{ color: "red", ml: 3, fontSize: "11px" }}>
                      {ratingError}
                    </Box>
                  )}
                  <DialogContent sx={{ pt: 1 }}>
                    <Rating
                      name="rating"
                      value={rating}
                      onChange={(e, newValue) => setRating(newValue)}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      label="Comment"
                      fullWidth
                      multiline
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      sx={{
                        backgroundColor: "rgb(253, 100, 0)",
                        color: "#fff",
                        minWidth: "75px",
                        borderRadius: "50px",
                        padding: "9px 18px",
                        textTransform: "none",
                        fontSize: "13px",
                        fontWeight: "500",
                        lineHeight: "1.70",
                        marginRight: "16px",
                        "&:hover": {
                          backgroundColor: "none",
                          boxShadow: "none",
                          outlilne: "none",
                          border: "none",
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableBody>
            </Table>
            <Typography
              variant="h6"
              style={{ marginTop: "10px", color: "rgb(253, 100, 0)" }}
            >
              Order Total: £{Number(order.order_total).toFixed(2)}{" "}
              {/* Convert to number */}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default OrderHistory;
