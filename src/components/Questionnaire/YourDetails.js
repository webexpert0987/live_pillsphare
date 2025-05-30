import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid2,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  // InputLabel,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../../Context/AppContext";
import VerificationDialog from "./VerificationDialog";
import { registerUser /*loginUser*/ } from "../../apis/apisList/userApi";
import { useMessage } from "../../Context/MessageContext";
import AddressSearch from "../AddressSearch";

function YourDetailForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    day: "",
    month: "",
    year: "",
    password: "",
    confirmPassword: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    city: "",
    country: "",
    gender: "",
  });
  const location = useLocation();
  const currentPath = location.pathname + location.search;
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    day: "",
    month: "",
    year: "",
    password: "",
    confirmPassword: "",
    addressLine1: "",
    postalCode: "",
    city: "",
    country: "",
    gender: "",
  });
  const { setSelectedTab, userDetails } = useApp();
  const { showMessage } = useMessage();
  const [isVerify, setIsVerify] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressSelect = (address) => {
    setFormData((prev) => ({
      ...prev,
      addressLine1: address.line1,
      addressLine2: address.line2 || "",
      postalCode: address.postcode,
      city: address.city,
      country: address.country,
    }));
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
    } else if (!/^[+]?[0-9]{9,11}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact Number is not valid";
      isValid = false;
    }
    if (!formData.day) {
      newErrors.day = "Date is required.";
      isValid = false;
    }
    if (!formData.month) {
      newErrors.month = "Month is required.";
      isValid = false;
    }
    if (!formData.year) {
      newErrors.year = "Year is required.";
      isValid = false;
    }
    if (!formData.password && !userDetails) {
      newErrors.password = "Password is required.";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword && !userDetails) {
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
    if (!formData.gender) {
      newErrors.gender = "Gender is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  function calculateAge() {
    const { day, month, year } = formData;

    // Create birthdate object (JS months are 0-based, so subtract 1)
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (!userDetails) {
        const userData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          gender: formData.gender,
          age: calculateAge(),
          password: formData.password,
        };

        try {
          setLoading(true);
          const registerRes = await registerUser(userData);
          if (registerRes.status === "200") {
            setLoading(false);
            showMessage("Otp sent to your email", "success");
            setIsVerify(true);
            return;
          }
        } catch (error) {
          setLoading(false);
          showMessage(
            error?.response?.data?.message || "Error registering user",
            "error"
          );
          console.error("Error:", error);
          return;
        }
      } else {
        // Proceed with form submission logic
        // console.log("Form submitted successfully:", formData);
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
        setTimeout(() => {
          window.scrollTo({
            top: 600,
            left: 0,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  };

  const detailStyle = {
    textField: {
      "& .MuiOutlinedInput-root": {
        border: "50px",
        borderRadius: "50px",
        overflow: "hidden",
      },
    },
    labelstyle: {
      fontSize: "18px",
      color: "#333333",
      lineHeight: "1.3",
      fontWeight: "700",
      marginBottom: "10px",
    },
    fieldInput: {
      backgroundColor: "#FAFAFA",
      border: "1px solid #EDEDED",
      borderRadius: "50px",
      // overflow: "hidden",
      boxShadow: "none",
      margin: "0 0 5px 0",
      overflow: "visible",
      "& .MuiInputBase-input": {
        padding: "13px 26px",
      },
      // "& .MuiOutlinedInput-notchedOutline": {
      //   border: "none",
      //   borderRadius: "50px",
      //   overflow: "hidden",
      //   borderWidth: "0px !important",
      // },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
        borderRadius: "50px",
        overflow: "hidden",
        borderWidth: "0px !important",
        minHeight: "auto",
      },
      "& .MuiFormHelperText-root.Mui-error": {
        color: "red", // Change text color
        fontSize: "13px", // Adjust font size
        fontWeight: "500", // Make text bold
        marginTop: "0", // Adjust spacing
        position: "absolute",
        bottom: "-25px",
        left: "12px",
      },
    },
  };

  useEffect(() => {
    const qaData = JSON.parse(
      localStorage.getItem("questionnaire_info") || "{}"
    );
    const { user } = qaData;
    if (user) {
      setFormData(user);
    } else {
      if (userDetails) {
        const {
          first_name,
          last_name,
          gender,
          phone_number,
          dob,
          billing_address,
        } = userDetails;
        const data = {
          ...formData,
          firstName: first_name || "",
          lastName: last_name || "",
          email: userDetails.email || "",
          gender: gender || "",
          contactNumber: phone_number || "",
          day: new Date(dob).getDate() || "",
          month: new Date(dob).getMonth() + 1 || "",
          year: new Date(dob).getFullYear() || "",
          addressLine1: billing_address?.address_1 || "",
          addressLine2: billing_address?.address_2 || "",
          postalCode: billing_address?.postcode || "",
          city: billing_address?.city || "",
          country: billing_address?.country || "",
        };
        setFormData(data);
      }
    }
  }, [userDetails]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "22px", sm: "28px", md: "32px" },
            color: "#333333",
            lineHeight: "1.3",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          Your Details
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "15px", sm: "16px", md: "18px" },
            color: "#747474",
            lineHeight: "1.3",
          }}
        >
          Please complete the below details to create your account and continue
          your consultation.
        </Typography>
        {!userDetails && (
          <Typography
            sx={{
              fontSize: { xs: "15px", sm: "16px", md: "18px" },
              color: "#333333",
              lineHeight: "1.3",
              fontWeight: "600",
              marginTop: { xs: "10px", sm: "5px", md: "5px" },
            }}
            variant="h6"
            fontWeight="bold"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              state={{ redirectPath: currentPath }}
              style={{ textDecoration: "none", color: "#FD6400" }}
            >
              Sign In
            </Link>
          </Typography>
        )}

        <Grid2
          container
          spacing={{ xs: 2, sm: 2, md: 3 }}
          sx={{
            marginTop: { xs: "15px", sm: "20px", md: "30px" },
          }}
        >
          {/* First Name and Last Name */}
          <Grid2 size={{ xs: 12, sm: 12, md: 12 }} container spacing={2}>
            <Grid2
              size={{ xs: 12, sm: 4, md: 4 }}
              spacing={2}
              sx={{
                borderRadius: "50px",
                border: "none",
              }}
            >
              <TextField
                fullWidth
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                sx={detailStyle.fieldInput}
                disabled={!!userDetails}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4, md: 4 }} spacing={2}>
              <TextField
                fullWidth
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                sx={detailStyle.fieldInput}
                disabled={!!userDetails}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4, md: 4 }} spacing={2}>
              <FormControl fullWidth error={!!errors.gender}>
                <Select
                  name="gender"
                  displayEmpty
                  onChange={handleChange}
                  value={formData.gender}
                  sx={detailStyle.fieldInput}
                >
                  <MenuItem value="" disabled>
                    Select Gender
                  </MenuItem>
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
                {errors.gender && (
                  <FormHelperText
                    sx={{
                      fontWeight: "500 !important", // Make text bold
                      color: "red !important",
                    }}
                  >
                    {errors.gender}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid2>
          </Grid2>

          {/* Email and Contact Number */}
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }} spacing={2}>
            <TextField
              fullWidth
              placeholder="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={detailStyle.fieldInput}
              disabled={!!userDetails}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }} spacing={2}>
            <TextField
              fullWidth
              placeholder="Contact Number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              error={!!errors.contactNumber}
              helperText={errors.contactNumber}
              sx={detailStyle.fieldInput}
            />
          </Grid2>

          {/* Date of Birth */}
          <Grid2 size={{ xs: 12, sm: 12, md: 12 }} spacing={2}>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "16px", sm: "17px", md: "18px" },
                color: "#333333",
                lineHeight: "1.3",
                fontWeight: "700",
                marginBottom: "10px",
                paddingLeft: { xs: "20px", sm: "10px", md: "0px" },
              }}
            >
              Date of Birth
            </Typography>

            <Grid2 size={{ xs: 12, sm: 12, md: 12 }} container spacing={2}>
              <Grid2 size={{ xs: 12, sm: 4, md: 4 }} spacing={2}>
                <FormControl fullWidth error={!!errors.day}>
                  <Select
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                    displayEmpty
                    sx={detailStyle.fieldInput}
                  >
                    <MenuItem value="" disabled>
                      Select Day
                    </MenuItem>
                    {[...Array(31)].map((_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.day && (
                    <FormHelperText
                      sx={{
                        fontWeight: "500 !important", // Make text bold
                        color: "red !important",
                      }}
                    >
                      {errors.day}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4, md: 4 }} spacing={2}>
                <FormControl fullWidth error={!!errors.month}>
                  <Select
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    displayEmpty
                    sx={detailStyle.fieldInput}
                  >
                    <MenuItem value="" disabled>
                      Select Month
                    </MenuItem>{" "}
                    {/* Placeholder */}
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.month && (
                    <FormHelperText
                      sx={{
                        fontWeight: "500 !important", // Make text bold
                        color: "red !important",
                      }}
                    >
                      {errors.month}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4, md: 4 }} spacing={2}>
                <FormControl fullWidth error={!!errors.year}>
                  <Select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    displayEmpty
                    sx={detailStyle.fieldInput}
                  >
                    <MenuItem value="" disabled>
                      Select Year
                    </MenuItem>
                    {[...Array(100)].map((_, i) => (
                      <MenuItem key={i} value={2025 - i}>
                        {2025 - i}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.year && (
                    <FormHelperText
                      sx={{
                        fontWeight: "500 !important", // Make text bold
                        color: "red !important",
                      }}
                    >
                      {errors.year}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid2>
            </Grid2>
          </Grid2>

          {/* Password and Confirm Password */}
          {!userDetails && (
            <Grid2 size={{ xs: 12, sm: 12, md: 12 }} spacing={2}>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "16px", sm: "17px", md: "18px" },
                  color: "#333333",
                  lineHeight: "1.3",
                  fontWeight: "700",
                  marginBottom: "10px",
                  paddingLeft: { xs: "20px", sm: "10px", md: "0px" },
                }}
              >
                Password
              </Typography>
              <Grid2 size={{ xs: 12, sm: 12, md: 12 }} container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 6, md: 6 }} spacing={2}>
                  <TextField
                    fullWidth
                    placeholder="Set Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    sx={detailStyle.fieldInput}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 6 }} spacing={2}>
                  <TextField
                    fullWidth
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    sx={detailStyle.fieldInput}
                  />
                </Grid2>
              </Grid2>
            </Grid2>
          )}

          {/* Note Box */}
          <Box
            sx={{
              backgroundColor: "#E2F6F9",
              border: "1px solid #C0E8FF",
              padding: "15px",
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
              fontSize: "15px",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "15px",
                color: "#3E858F",
                fontWeight: "500",
              }}
            >
              We need to verify your identity before providing treatments.
              Please use your home address below. You can add a different
              shipping address at the checkout.
            </Typography>
          </Box>

          {/* Address Search */}
          <AddressSearch
            onAddressSelect={handleAddressSelect}
            styles={detailStyle.fieldInput}
            placeholder="Search for your address"
          />

          {/* Address Fields */}
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }} spacing={2}>
            <TextField
              fullWidth
              placeholder="Address Line 1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              error={!!errors.addressLine1}
              helperText={errors.addressLine1}
              sx={detailStyle.fieldInput}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }} spacing={2}>
            <TextField
              fullWidth
              placeholder="Address Line 2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              sx={detailStyle.fieldInput}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 4 }} spacing={2}>
            <TextField
              fullWidth
              placeholder="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              error={!!errors.postalCode}
              helperText={errors.postalCode}
              sx={detailStyle.fieldInput}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 4 }} spacing={2}>
            <TextField
              fullWidth
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
              sx={detailStyle.fieldInput}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4, md: 4 }} spacing={2}>
            <TextField
              fullWidth
              placeholder="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              error={!!errors.country}
              helperText={errors.country}
              sx={detailStyle.fieldInput}
            />
          </Grid2>
        </Grid2>

        {/* Submit Button */}
        <Box
          sx={{
            marginTop: { xs: "0px", sm: "10px", md: "20px" },
            textAlign: "center",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            sx={{
              fontSize: { xs: "15px", sm: "17px", md: "18px" },
              width: { xs: "100%", sm: "auto", md: "auto" },
              fontWeight: "600",
              lineHeight: "1.4",
              backgroundColor: "#FD6400",
              color: "#FFF",
              borderRadius: "50px",
              border: "none",
              // textTransform: "inherit",
              padding: "12px 30px",
              marginTop: "30px",
              marginBottom: "20px",
              boxShadow: "none",
              textTransform: "uppercase",
            }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Start Consultation"}

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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </Box>

        {!userDetails && isVerify && (
          <VerificationDialog
            open={isVerify}
            setOpen={setIsVerify}
            formData={formData}
          />
        )}
      </Box>
    </LocalizationProvider>
  );
}

export default YourDetailForm;
