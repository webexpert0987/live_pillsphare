import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
  Box,
  Slide,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { verifyPayment } from "../../apis/apisList/opayoPaymentApi";
import { useNavigate, useLocation } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OrderStatusDialog = ({ open, orderId, onSuccess, onError }) => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!orderId || !open) return;

    const timeout = setTimeout(() => {
      const checkStatus = async () => {
        try {
          setLoading(true);
          const res = await verifyPayment({ paymentId: orderId });
          if (res.data.success) {
            setStatus("success");
            setTimeout(() => onSuccess(res.data), 1000);
          } else {
            setStatus("error");
            setErrorMsg(res.data.message || "Payment failed");
            onError?.(res.data);
          }
        } catch (error) {
          setStatus("error");
          setErrorMsg(
            error?.response?.data?.message || "Internal server error"
          );
          onError?.(error);
        } finally {
          setLoading(false);
        }
      };

      checkStatus();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [orderId, open]);

  const handleOk = () => {
    // remove query params and keep path
    navigate(location.pathname, { replace: true });
    // Optionally reset state or inform parent to close the dialog
    setStatus(null);
    setLoading(true);
    setErrorMsg("");
    onSuccess?.({ dialogClosed: true });
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 3,
          py: 2,
          px: 3,
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>
        Verifying Your Payment
      </DialogTitle>

      <DialogContent>
        {loading ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={4}
          >
            <CircularProgress color="primary" />
            <Typography mt={3} variant="body2" color="text.secondary">
              Please wait while we confirm your payment...
            </Typography>
          </Box>
        ) : status === "success" ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={3}
          >
            <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
            <Typography mt={2} variant="h6" color="success.main">
              Payment Successful!
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              You can now proceed.
            </Typography>
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={3}
          >
            <ErrorIcon color="error" sx={{ fontSize: 60 }} />
            <Typography mt={2} variant="h6" color="error">
              Payment Failed
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              {errorMsg}
            </Typography>
          </Box>
        )}
      </DialogContent>

      {!loading && (
        <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2 }}>
          <Button
            onClick={handleOk}
            variant="contained"
            color="primary"
            sx={{ minWidth: 100 }}
          >
            OK
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default OrderStatusDialog;
