import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Dialog, IconButton, InputAdornment, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMessage } from "../Context/MessageContext";
import { resetPassword, sendOtp, verifyOtp } from "../apis/apisList/userApi";
import EyeButton from "../components/Button/eyeButton";
function VerificationDialog({ open, setOpen, formData }) {
  const { showMessage } = useMessage();
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const validate = () => {
    let tempErrors = {};
    if (!otp) tempErrors.otp = "OTP is required";
    else if (!/^[0-9]{6}$/.test(otp))
      tempErrors.otp = "OTP must be a 6-digit number";
    if (!password) tempErrors.password = "Password is required";
    if (password !== confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await resetPassword({
        email: formData.email,
        otp: otp,
        password,
      });
      showMessage("Password reset successfully", "success");
      setOtp("");
      setPassword("");
      setConfirmPassword("");
      setOpen(false);
      navigate("/login");
    } catch (error) {
      showMessage("Failed to verify OTP. Please try again.", "error");
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={5}
        width="100%"
      >
        <Typography variant="h5" fontWeight="600" mb={2} textAlign="center">
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            fullWidth
            label="OTP"
            variant="outlined"
            margin="normal"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 6) setOtp(value);
            }}
            error={!!errors.otp}
            helperText={errors.otp}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              autoComplete: "one-time-code",
            }}
          />
          <TextField
            fullWidth
            label="New Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              autoComplete: "new-password",
              endAdornment: (
                <InputAdornment position="end">
                  <EyeButton show={showPassword} setShow={setShowPassword} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              autoComplete: "new-password",
              endAdornment: (
                <InputAdornment position="end">
                  <EyeButton
                    show={showConfPassword}
                    setShow={setShowConfPassword}
                  />
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Box>
    </Dialog>
  );
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Please enter a valid email");
      return;
    }
    try {
      await sendOtp({ email });
      showMessage("OTP sent successfully. Please check your email.", "success");
      setEmailError("");
      setOpenDialog(true);
    } catch (error) {
      showMessage("Failed to send OTP. Please try again.", "error");
    }
  };

  return (
    <Box
      // style={{
      //   height: "50vh",
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
      sx={{
        minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      <Grid container justifyContent="center">
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          lg={4}
          sx={{
            border: "1px solid #d1cbcb",
            padding: "30px",
            margin: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Forgot Password
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </form>
          </Box>
          <Link to="/login">
            <Button variant="outlined" sx={{ mt: 2 }}>
              Back to Login
            </Button>
          </Link>
        </Grid>
      </Grid>
      <VerificationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        formData={{ email }}
      />
    </Box>
  );
};

export default ForgotPassword;
