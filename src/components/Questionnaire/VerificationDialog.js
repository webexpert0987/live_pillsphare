import { useState, useRef, Fragment } from "react";
import {
  Box,
  Button,
  Dialog,
  Typography,
  TextField,
  IconButton,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import { useMessage } from "../../Context/MessageContext";
import { useApp } from "../../Context/AppContext";
import { verifyOtp, loginUser } from "../../apis/apisList/userApi";

const OtpInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#e0e0e0" },
    "&:hover fieldset": { borderColor: "#bdbdbd" },
    "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
  },
  "& .MuiOutlinedInput-input": {
    textAlign: "center",
    fontSize: "1.5rem",
    padding: "10px",
    width: "40px",
    height: "40px",
    appearance: "textfield",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
      width: "35px",
      height: "35px",
      padding: "8px",
    },
  },
}));

export default function VerificationDialog({ open, setOpen, formData }) {
  const { login, setSelectedTab } = useApp();
  // const { showMessage } = useMessage();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0];
    setOtp(newOtp);

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
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
    if (!formData) {
      return;
    }
    setError("");
    setIsSubmitting(true);

    const OTP = otp.join("");

    if (!OTP) {
      setError("OTP is required");
      setIsSubmitting(false);
      return;
    }

    try {
      let verify = await verifyOtp({
        email: formData.email,
        otp: OTP,
      });

      if (verify.status === 200) {
        const response = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        const { status, message, ...userData } = response;
        login(userData);
        const data = localStorage.getItem("questionnaire_info");
        let parsedData = {};
        if (data) {
          parsedData = JSON.parse(data);
        }
        localStorage.setItem(
          "questionnaire_info",
          JSON.stringify({
            ...parsedData,
            user: formData,
          })
        );
        setSelectedTab(1);
        setOpen(false);
        setTimeout(() => {
          window.scrollTo({
            top: 600,
            left: 0,
            behavior: "smooth",
          });
        }, 100);
      }
    } catch (error) {
      setError(
        error?.response?.data?.error ||
          "Failed to verify OTP. Please try again later.",
        error
      );
      setIsSubmitting(false);
      return;
    }
  };

  return (
    <Fragment>
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
          <Typography
            variant={isSmallScreen ? "h5" : "h4"}
            fontWeight="600"
            mb={2}
            textAlign="center"
          >
            Email Verification
          </Typography>
          <Typography mb={2} textAlign="center">
            Enter the 6-digit code sent to your email
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            gap={isSmallScreen ? 1 : 2}
            mb={2}
            onPaste={handlePaste}
            style={{
              width: isSmallScreen ? "100%" : "80%",
              maxWidth: 350,
            }}
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
            sx={{ mt: 2, py: 1.5 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </Button>
        </Box>
      </Dialog>
    </Fragment>
  );
}
