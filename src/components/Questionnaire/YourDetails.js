import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid2 } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"; // Import DesktopDatePicker
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // Named import for AdapterDateFns
import { Link } from "react-router-dom";

function YourDetailForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    dob: null,
    password: "",
    confirmPassword: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    city: "",
    country: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    dob: "",
    password: "",
    confirmPassword: "",
    addressLine1: "",
    postalCode: "",
    city: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      dob: newDate,
    });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Check for required fields and basic validation
    if (!formData.firstName) {
      newErrors.firstName = "First Name is required.";
      isValid = false;
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required.";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email Address is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid.";
      isValid = false;
    }
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact Number is required.";
      isValid = false;
    }
    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required.";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }
    if (!formData.addressLine1) {
      newErrors.addressLine1 = "Address Line 1 is required.";
      isValid = false;
    }
    if (!formData.postalCode) {
      newErrors.postalCode = "Postal Code is required.";
      isValid = false;
    }
    if (!formData.city) {
      newErrors.city = "City is required.";
      isValid = false;
    }
    if (!formData.country) {
      newErrors.country = "Country is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed with form submission logic
      console.log("Form submitted successfully:", formData);
    }
  };

  const detailStyle = {
    title: {
      fontSize: "32px",
      color: "#333333",
      lineHeight: "1.3",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "18px",
      color: "#747474",
      lineHeight: "1.3",
    },
    signinLink: {
      fontSize: "18px",
      color: "#333333",
      lineHeight: "1.3",
      fontWeight: "600",
    },
    FormRow: {
      marginTop: "30px",
    },
    fieldDesign: {
      borderRadius: "50px",
    },
    textField: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "50px",
      },
    },
    labelstyle: {
      fontSize: "18px",
      color: "#333333",
      lineHeight: "1.3",
      fontWeight: "700",
      marginBottom: "10px",
    },
    startBtn: {
      fontSize: "18px",
      fontWeight: "600",
      lineHeight: "1.4",
      backgroundColor: "#FD6400",
      color: "#FFF",
      borderRadius: "50px",
      border: "none",
      textTransform: "inherit",
      padding: "12px 30px",
      marginTop: "30px",
      marginBottom: "20px",
      boxShadow: "none",
    },
    noteMsg: {
      backgroundColor: "#E2F6F9",
      border: "1px solid #C0E8FF",
      padding: "15px",
      marginTop: "20px",
      marginBottom: "10px",
      borderRadius: "10px",
      fontSize: "15px",
    },
    noteMsgTxt: {
      fontSize: "15px",
      color: "#3E858F",
      fontWeight: "500",
    },
  };
  

  return (
    <LocalizationProvider
      style={detailStyle.wrapperBox}
      dateAdapter={AdapterDateFns}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <Typography style={detailStyle.title} variant="h4" fontWeight="bold">
          Your Details
        </Typography>
        <Typography style={detailStyle.subtitle} variant="body1" gutterBottom>
          Please complete the below details to create your account and continue
          your consultation.
        </Typography>
        <Typography
          style={detailStyle.signinLink}
          variant="h6"
          fontWeight="bold"
        >
          Already have an account?{" "}
          <Link
            to="/signin"
            style={{ textDecoration: "none", color: "#FD6400" }}
          >
            Sign In
          </Link>
        </Typography>
        <Grid2 style={detailStyle.FormRow} container spacing={3}>
          {/* First Name and Last Name */}
          <Grid2
            style={detailStyle.fieldDesign}
            size={{ xs: 12, sm: 6, md: 6 }}
            spacing={2}
          >
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              sx={detailStyle.textField}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }} spacing={2}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              sx={detailStyle.textField}
            />
          </Grid2>

          {/* Email and Contact Number */}
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }} spacing={2}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={detailStyle.textField}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }} spacing={2}>
            <TextField
              fullWidth
              label="Contact Number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              error={!!errors.contactNumber}
              helperText={errors.contactNumber}
              sx={detailStyle.textField}
            />
          </Grid2>

          {/* Date of Birth */}
          <Grid2 size={{ xs: 12, sm: 12, md: 12 }} spacing={2}>
            <Typography style={detailStyle.labelstyle} variant="h5">
              Date of Birth
            </Typography>
            <DesktopDatePicker
            label="Date Of Birth"
            inputFormat="MM/dd/yyyy"
            value={formData.dob}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth error={!!errors.dob} helperText={errors.dob} />}
          />

          </Grid2>

          {/* Password and Confirm Password */}
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }} spacing={2}>
            <TextField
              fullWidth
              label="Set Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              sx={detailStyle.textField}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }} spacing={2}>
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={detailStyle.textField}
            />
          </Grid2>

          {/* Note Box */}
          <Box style={detailStyle.noteMsg}>
            <Typography style={detailStyle.noteMsgTxt} variant="body2">
              We need to verify your identity before providing treatments.
              Please use your home address below. You can add a different
              shipping address at the checkout.
            </Typography>
          </Box>

          {/* Address Fields */}
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }} spacing={2}>
            <TextField
              fullWidth
              label="Address Line 1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              error={!!errors.addressLine1}
              helperText={errors.addressLine1}
              sx={detailStyle.textField}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }} spacing={2}>
            <TextField
              fullWidth
              label="Address Line 2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              sx={detailStyle.textField}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 4 }} spacing={2}>
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              error={!!errors.postalCode}
              helperText={errors.postalCode}
              sx={detailStyle.textField}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 4 }} spacing={2}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
              sx={detailStyle.textField}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 4 }} spacing={2}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              error={!!errors.country}
              helperText={errors.country}
              sx={detailStyle.textField}
            />
          </Grid2>
        </Grid2>

        {/* Submit Button */}
        <Box sx={{ marginTop: "20px", textAlign: "center" }}>
          <Button
            style={detailStyle.startBtn}
            variant="contained"
            type="submit"
          >
            Start Consultation{" "}
            <svg
              style={{ marginLeft: "10px" }}
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 7L11 1M17 7L11 13M17 7L6.5 7M1 7L3.5 7"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default YourDetailForm;
