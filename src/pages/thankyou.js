import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate, useLocation } from "react-router-dom";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [transactionId, setTransactionId] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("GBP");

  useEffect(() => {
    // Parse query params from URL
    const params = new URLSearchParams(location.search);
    const txnId = params.get("transactionId") || "";
    const amt = parseFloat(params.get("amount")) || 0;
    const curr = params.get("currency") || "GBP";

    setTransactionId(txnId);
    setAmount(amt);
    setCurrency(curr);

    window.scrollTo({ top: 0 });

    // Send conversion event to Google Analytics
    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-17019417995/vXFyCKDt7NMaEIvrvrM_",
        value: amt,
        currency: curr,
        transaction_id: txnId,
      });
    }
  }, [location.search]);

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", my: 8 }}>
      {/* Success Icon */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
      </Box>

      {/* Thank You Message */}
      <Typography variant="h2" fontWeight={600} mb={1}>
        Payment Successful!
      </Typography>
      <Typography variant="h3" sx={{ mb: 4 }} fontWeight={500}>
        Thank you for your purchase. Your order has been processed successfully.
      </Typography>

      {/* Quick Invoice Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, textAlign: "left" }}>
        <Typography variant="body1">
          <strong>Transaction ID:</strong> {transactionId || "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>Amount:</strong> {amount.toFixed(2)} {currency}
        </Typography>
      </Paper>

      {/* Button to Navigate */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleContinueShopping}
        sx={{ textTransform: "none" }}
      >
        Continue Shopping
      </Button>
    </Container>
  );
};

export default ThankYouPage;
