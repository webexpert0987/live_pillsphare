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
  Button,
} from "@mui/material";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]); // State to hold the orders data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser ? storedUser.user_id : null;

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
    return <Typography variant="h6">Loading...</Typography>; // Loading state
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
                  <TableRow key={index}>
                    <TableCell>{item.product_name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      £{Number(item.subtotal).toFixed(2)}
                    </TableCell>{" "}
                    {/* Convert to number */}
                    <TableCell>£{Number(item.total).toFixed(2)}</TableCell>{" "}
                    {/* Convert to number */}
                  </TableRow>
                ))}
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
