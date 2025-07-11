import React, { useState, useRef } from "react";
import { Button, TextField, Typography, Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { loginUser, loginVerify, verifyOtp } from "../apis/apisList/userApi";
import { useApp } from "../Context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useMessage } from "../Context/MessageContext";

const OtpInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#e0e0e0" },
    "&:hover fieldset": { borderColor: "#bdbdbd" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
  },
  "& .MuiOutlinedInput-input": {
    textAlign: "center",
    fontSize: "1.5rem",
    padding: "20px",
    appearance: "textfield",
    [theme.breakpoints.down("sm")]: {
      padding: "0", // Remove padding on small devices
    },
  },
}));
const VerificationPage = () => {
  const { login } = useApp();
  const { showMessage } = useMessage();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  //receiving the url slug value here
  // const redirectSlug = location.state?.redirectSlug;
  const redirectPath = location.state?.redirectPath || "/";
  const isTwoFactor = location.state?.isTwoFactor || false;

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0]; // Only allow one digit
    setOtp(newOtp);

    // Move to next input if value is entered
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // Clear current field
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move focus to previous input
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");
    if (pastedData.length > 0) {
      setOtp([...pastedData, ...Array(6 - pastedData.length).fill("")]);
      inputRefs.current[pastedData.length - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    setError("");
    setIsSubmitting(true);

    const key = isTwoFactor ? "verify_2fa" : "verify_user";
    const user = JSON.parse(localStorage.getItem(key) || "{}");

    if (!user?.email) {
      setError("User not found");
      return;
    }

    try {
      if (isTwoFactor) {
        await loginVerify({ email: user.email, otp: otp.join("") });
      } else {
        await verifyOtp({ email: user.email, otp: otp.join("") });
      }
      const response = await loginUser(user);
      // const response = await res.json();
      if (response.status == 200) {
        let userInfo = {
          first_name: response.first_name,
          last_name: response.last_name,
          user_id: response.user_id,
          token: response.token,
          email: response.email,
        };
        login(userInfo);
        showMessage("Login successful", "success");
        localStorage.removeItem("verify_user");
        setIsSubmitting(false);
        if (redirectPath) {
          navigate(redirectPath);
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Internal issue";
      setError(message);
      setIsSubmitting(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={4}
        sx={{
          border: "1px solid #d1cbcb",
          p: 3,
          m: 2,
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" fontWeight="600" mb={2} textAlign="center">
            {isTwoFactor ? "Two Factor Authentication" : "Verification"}
          </Typography>
          <Typography mb={2} textAlign="center">
            Enter the 6-digit code sent to your email
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            mb={2}
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <OtpInput
                key={index}
                inputRef={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputProps={{
                  maxLength: 1,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                type="text"
              />
            ))}
          </Box>
          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default VerificationPage;
