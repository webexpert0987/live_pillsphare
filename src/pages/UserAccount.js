import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  Button,
  Divider,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Person as PersonIcon,
  Home as HomeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Lock as LockIcon,
  Save as SaveIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Cake as CakeIcon,
  Wc as GenderIcon,
  LocationOn as LocationIcon,
  LocationCity as CityIcon,
  Public as CountryIcon,
  MarkunreadMailbox as PostalCodeIcon,
  Password,
} from "@mui/icons-material";
import { useApp } from "../Context/AppContext";
import { useMessage } from "../Context/MessageContext";
import { profile, profileUpdate } from "../apis/apisList/userApi";
import EyeButton from "../components/Button/eyeButton";
// Tab Panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>}
    </div>
  );
}

// Profile validation schema
const ProfileSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is required"),
  last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  dob: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Please select a valid gender")
    .required("Gender is required"),
  // phone_number: Yup.string()
  //   .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
  //   .required("Phone number is required"),

  // modify the phone number length from 6 to 14
  phone_number: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(11, "Phone number must be at most 11 digits")
    .required("Phone number is required"),
});

// Address validation schema
const AddressSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(
      ["Billing Address", "Shipping Address"],
      "Please select a valid address type"
    )
    .required("Address type is required"),
  first_name: Yup.string(),
  last_name: Yup.string(),
  company: Yup.string(),
  address_1: Yup.string().required("Address line 1 is required"),
  address_2: Yup.string(),
  city: Yup.string().required("City is required"),
  state: Yup.string(),
  postcode: Yup.string().required("Postal code is required"),
  country: Yup.string().required("Country is required"),
  phone: Yup.string(),
  email: Yup.string().email("Invalid email"),
});

// Password validation schema
const PasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters"),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

// Format date for display
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export default function UserAccount() {
  const [tabValue, setTabValue] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const { setUserDetails } = useApp();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    dob: "",
    email: "",
    first_name: "",
    gender: "",
    last_name: "",
    phone_number: "",
    user_id: null,
    username: "",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (!storedUser.user_id) return;
      try {
        const response = await profile(storedUser.user_id);
        const { billing_address, shipping_address, ...user } = response;

        // Create an array of addresses from the API response
        const addressArr = [];
        if (billing_address) {
          addressArr.push({
            ...billing_address,
            type: "Billing Address",
            id: "billing",
          });
        }
        if (shipping_address) {
          addressArr.push({
            ...shipping_address,
            type: "Shipping Address",
            id: "shipping",
          });
        }

        setAddresses(addressArr);
        setProfileData(response);
      } catch (error) {
        showMessage("Error fetching user data", "error");
        console.error("Error fetching user data:", error);
      }
    };
    getUserData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddressSubmit = async (values, { resetForm }) => {
    try {
      const addressType = values.type;
      const addressKey =
        addressType === "Billing Address"
          ? "billing_address"
          : "shipping_address";

      // Prepare the new address object
      const newAddress = {
        first_name: values.first_name || "",
        last_name: values.last_name || "",
        company: values.company || "",
        address_1: values.address_1,
        address_2: values.address_2 || "",
        city: values.city,
        state: values.state || "",
        postcode: values.postcode,
        country: values.country,
        phone: values.phone || "",
        email: values.email || "",
      };

      // Update the profileData with the new address
      const updatedProfileData = {
        ...profileData,
        [addressKey]: newAddress,
      };

      // Call handleProfileUpdate with the updated profile data
      await handleProfileUpdate(updatedProfileData);

      // Update the addresses state
      const updatedAddresses = addresses.map((addr) =>
        addr.type === addressType
          ? { ...newAddress, type: addressType, id: addr.id }
          : addr
      );
      if (!updatedAddresses.some((addr) => addr.type === addressType)) {
        updatedAddresses.push({
          ...newAddress,
          type: addressType,
          id: addressKey === "billing_address" ? "billing" : "shipping",
        });
      }
      setAddresses(updatedAddresses);

      // Clear the form fields and close the dialog
      resetForm();
      setEditingAddressId(null);
      setShowAddressForm(false);
      showMessage(`${addressType} updated successfully!`, "success");
    } catch (error) {
      console.error("Error managing address:", error);
      showMessage("Failed to save address. Please try again.", "error");
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddressId(address.id);
    setShowAddressForm(true);
  };

  const handlePasswordSubmit = async (values, { resetForm }) => {
    // In a real app, you would send this to your API
    try {
      await profileUpdate(profileData.user_id, {
        password: values.newPassword,
      });
      console.log("Password change submitted:", values);
      setShowPasswordDialog(false);
      resetForm();
    } catch (error) {
      console.log("Failed to change password:", error);
      showMessage("Failed to change password. Please try again later.");
    }
  };

  const handleProfileUpdate = async (data) => {
    setLoading(true);
    try {
      await profileUpdate(data.user_id, data);
      setUserDetails(data);
      localStorage.setItem("user", JSON.stringify(data));
      showMessage("Profile updated successfully!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Failed to update user details:", error);
      showMessage("Failed to update profile. Please try again later.");
    }
  };

  if (!profileData) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "20vh" }}>No profile data</Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 0,
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            minHeight: "600px",
          }}
        >
          {/* Tabs Section */}
          <Box
            sx={{
              borderRight: { md: 1 },
              borderBottom: { xs: 1, md: 0 },
              borderColor: "divider",
              width: { xs: "100%", md: "250px" },
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 3,
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {profileData.first_name} {profileData.last_name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {profileData.email}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<LockIcon />}
                onClick={() => setShowPasswordDialog(true)}
                fullWidth
              >
                Change Password
              </Button>
            </Box>

            <Tabs
              orientation={isMobile ? "horizontal" : "vertical"}
              variant={isMobile ? "fullWidth" : "standard"}
              value={tabValue}
              onChange={handleTabChange}
              aria-label="profile tabs"
              sx={{
                minHeight: { xs: 48, md: 300 },
                "& .MuiTab-root": {
                  minHeight: 60,
                  justifyContent: { md: "flex-start" },
                  textAlign: "left",
                  pl: { md: 3 },
                },
              }}
            >
              <Tab
                icon={<PersonIcon />}
                iconPosition="start"
                label="Profile"
                id="profile-tab-0"
                aria-controls="profile-tabpanel-0"
              />
              <Tab
                icon={<HomeIcon />}
                iconPosition="start"
                label="Address"
                id="profile-tab-1"
                aria-controls="profile-tabpanel-1"
              />
            </Tabs>
          </Box>

          {/* Content Section */}
          <Box sx={{ flexGrow: 1 }}>
            {/* Profile Tab */}
            <TabPanel value={tabValue} index={0}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                Personal Information
              </Typography>

              <Divider sx={{ mb: 4 }} />

              <Formik
                initialValues={profileData}
                validationSchema={ProfileSchema}
                onSubmit={(values) => {
                  handleProfileUpdate(values);
                }}
                enableReinitialize
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                }) => (
                  <Form>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="first_name"
                          label="First Name"
                          fullWidth
                          variant="outlined"
                          value={values.first_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.first_name && Boolean(errors.first_name)
                          }
                          helperText={touched.first_name && errors.first_name}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="last_name"
                          label="Last Name"
                          fullWidth
                          variant="outlined"
                          value={values.last_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.last_name && Boolean(errors.last_name)}
                          helperText={touched.last_name && errors.last_name}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="email"
                          label="Email Address"
                          fullWidth
                          variant="outlined"
                          type="email"
                          value={values.email}
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                          // error={touched.email && Boolean(errors.email)}
                          // helperText={touched.email && errors.email}
                          disabled
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="phone_number"
                          label="Phone Number"
                          fullWidth
                          variant="outlined"
                          value={values.phone_number}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.phone_number && Boolean(errors.phone_number)
                          }
                          helperText={
                            touched.phone_number && errors.phone_number
                          }
                          type="number"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon color="primary" />
                              </InputAdornment>
                            ),
                            inputProps: {
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                            },
                          }}
                          sx={{
                            "& input::-webkit-outer-spin-button": {
                              WebkitAppearance: "none",
                              margin: 0,
                            },
                            "& input::-webkit-inner-spin-button": {
                              WebkitAppearance: "none",
                              margin: 0,
                            },
                            "& input[type=number]": {
                              MozAppearance: "textfield",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="dob"
                          label="Date of Birth"
                          type="date"
                          fullWidth
                          variant="outlined"
                          value={formatDateForInput(values.dob)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.dob && Boolean(errors.dob)}
                          helperText={touched.dob && errors.dob}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CakeIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="gender"
                          select
                          label="Gender"
                          fullWidth
                          variant="outlined"
                          value={values.gender}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.gender && Boolean(errors.gender)}
                          helperText={touched.gender && errors.gender}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <GenderIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        >
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          startIcon={<SaveIcon />}
                          size="large"
                          sx={{
                            mt: 2,
                            px: 4,
                            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                            borderRadius: 2,
                          }}
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save Changes"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </TabPanel>

            {/* Address Tab */}
            <TabPanel value={tabValue} index={1}>
              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Saved Addresses
                </Typography>
                {addresses.length < 2 && (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      // Determine which address type is available to add
                      const hasShipping = addresses.some(
                        (addr) => addr.type === "Shipping Address"
                      );
                      const hasBilling = addresses.some(
                        (addr) => addr.type === "Billing Address"
                      );

                      if (hasShipping && hasBilling) {
                        showMessage(
                          "You can only add up to 2 addresses (Billing and Shipping)",
                          "info"
                        );
                        return;
                      }

                      setEditingAddressId(null);
                      setShowAddressForm(true);
                    }}
                    sx={{
                      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                      borderRadius: 2,
                    }}
                  >
                    Add Address
                  </Button>
                )}
              </Box>

              <Divider sx={{ mb: 4 }} />

              {addresses.length === 0 ? (
                <Box
                  sx={{
                    textAlign: "center",
                    my: 8,
                    p: 4,
                    border: "1px dashed",
                    borderColor: "divider",
                    borderRadius: 2,
                  }}
                >
                  <HomeIcon
                    sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
                  />
                  <Typography variant="h6" color="text.secondary">
                    No addresses saved yet.
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Add your first address to get started.
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      setEditingAddressId(null);
                      setShowAddressForm(true);
                    }}
                  >
                    Add New Address
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {addresses.map((address) => (
                    <Grid item xs={12} md={6} key={address.id}>
                      <Card
                        variant="outlined"
                        sx={{
                          position: "relative",
                          borderColor: "primary.main",
                          borderWidth: 1,
                          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                          },
                        }}
                      >
                        <CardContent sx={{ pt: 3 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              mb: 2,
                            }}
                          >
                            <LocationIcon
                              color="primary"
                              sx={{ mr: 1, mt: 0.5 }}
                            />
                            <Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: 1,
                                }}
                              >
                                <Typography
                                  variant="subtitle1"
                                  component="div"
                                  fontWeight="bold"
                                >
                                  {address.type}
                                </Typography>
                              </Box>
                              <Typography variant="body2" component="p">
                                {address.first_name} {address.last_name}
                              </Typography>
                              {address.company && (
                                <Typography variant="body2" component="p">
                                  {address.company}
                                </Typography>
                              )}
                              <Typography variant="body2" component="p">
                                {address.address_1}
                              </Typography>
                              {address.address_2 && (
                                <Typography variant="body2" component="p">
                                  {address.address_2}
                                </Typography>
                              )}
                              <Typography variant="body2" component="p">
                                {address.city}, {address.state}{" "}
                                {address.postcode}
                              </Typography>
                              <Typography variant="body2" component="p">
                                {address.country}
                              </Typography>
                              {address.phone && (
                                <Typography variant="body2" component="p">
                                  Phone: {address.phone}
                                </Typography>
                              )}
                              {address.email && (
                                <Typography variant="body2" component="p">
                                  Email: {address.email}
                                </Typography>
                              )}
                            </Box>
                          </Box>

                          <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<EditIcon />}
                              onClick={() => handleEditAddress(address)}
                            >
                              Edit
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* Address Form Dialog */}
              <Dialog
                open={showAddressForm}
                onClose={() => {
                  setShowAddressForm(false);
                  setEditingAddressId(null);
                }}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                  sx: {
                    borderRadius: 2,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <DialogTitle sx={{ pb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LocationIcon color="primary" sx={{ mr: 1 }} />
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      {editingAddressId ? "Edit Address" : "Add New Address"}
                    </Typography>
                  </Box>
                </DialogTitle>
                <Divider />
                <Formik
                  initialValues={
                    editingAddressId
                      ? addresses.find((addr) => addr.id === editingAddressId)
                      : {
                          type: !addresses.some(
                            (addr) => addr.type === "Billing Address"
                          )
                            ? "Billing Address"
                            : "Shipping Address",
                          first_name: "",
                          last_name: "",
                          company: "",
                          address_1: "",
                          address_2: "",
                          city: "",
                          state: "",
                          postcode: "",
                          country: "",
                          phone: "",
                          email: "",
                        }
                  }
                  validationSchema={AddressSchema}
                  onSubmit={handleAddressSubmit}
                >
                  {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                      <DialogContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <TextField
                              name="type"
                              select
                              label="Address Type"
                              fullWidth
                              variant="outlined"
                              value={values.type}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.type && Boolean(errors.type)}
                              helperText={touched.type && errors.type}
                              disabled={editingAddressId !== null} // Disable changing type when editing
                            >
                              {/* Only show address types that haven't been added yet, unless editing */}
                              {(!addresses.some(
                                (addr) => addr.type === "Billing Address"
                              ) ||
                                (editingAddressId &&
                                  values.type === "Billing Address")) && (
                                <MenuItem value="Billing Address">
                                  Billing Address
                                </MenuItem>
                              )}
                              {(!addresses.some(
                                (addr) => addr.type === "Shipping Address"
                              ) ||
                                (editingAddressId &&
                                  values.type === "Shipping Address")) && (
                                <MenuItem value="Shipping Address">
                                  Shipping Address
                                </MenuItem>
                              )}
                            </TextField>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              name="first_name"
                              label="First Name"
                              fullWidth
                              variant="outlined"
                              value={values.first_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.first_name && Boolean(errors.first_name)
                              }
                              helperText={
                                touched.first_name && errors.first_name
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              name="last_name"
                              label="Last Name"
                              fullWidth
                              variant="outlined"
                              value={values.last_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.last_name && Boolean(errors.last_name)
                              }
                              helperText={touched.last_name && errors.last_name}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              name="company"
                              label="Company (Optional)"
                              fullWidth
                              variant="outlined"
                              value={values.company}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.company && Boolean(errors.company)}
                              helperText={touched.company && errors.company}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              name="address_1"
                              label="Address Line 1"
                              fullWidth
                              variant="outlined"
                              value={values.address_1}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.address_1 && Boolean(errors.address_1)
                              }
                              helperText={touched.address_1 && errors.address_1}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LocationIcon color="primary" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              name="address_2"
                              label="Address Line 2 (Optional)"
                              fullWidth
                              variant="outlined"
                              value={values.address_2}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.address_2 && Boolean(errors.address_2)
                              }
                              helperText={touched.address_2 && errors.address_2}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LocationIcon color="primary" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              name="postcode"
                              label="Postal Code"
                              fullWidth
                              variant="outlined"
                              value={values.postcode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.postcode && Boolean(errors.postcode)
                              }
                              helperText={touched.postcode && errors.postcode}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PostalCodeIcon color="primary" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              name="city"
                              label="City"
                              fullWidth
                              variant="outlined"
                              value={values.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.city && Boolean(errors.city)}
                              helperText={touched.city && errors.city}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <CityIcon color="primary" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              name="state"
                              label="State/Province"
                              fullWidth
                              variant="outlined"
                              value={values.state}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.state && Boolean(errors.state)}
                              helperText={touched.state && errors.state}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              name="country"
                              label="Country"
                              fullWidth
                              variant="outlined"
                              value={values.country}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.country && Boolean(errors.country)}
                              helperText={touched.country && errors.country}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <CountryIcon color="primary" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              name="phone"
                              label="Phone"
                              fullWidth
                              variant="outlined"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.phone && Boolean(errors.phone)}
                              helperText={touched.phone && errors.phone}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              name="email"
                              label="Email"
                              fullWidth
                              variant="outlined"
                              type="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.email && Boolean(errors.email)}
                              helperText={touched.email && errors.email}
                            />
                          </Grid>
                        </Grid>
                      </DialogContent>
                      <DialogActions sx={{ px: 3, pb: 3 }}>
                        <Button
                          onClick={() => {
                            setShowAddressForm(false);
                            setEditingAddressId(null);
                          }}
                          variant="outlined"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          startIcon={<SaveIcon />}
                          sx={{
                            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                            borderRadius: 2,
                          }}
                        >
                          {editingAddressId ? "Update Address" : "Save Address"}
                        </Button>
                      </DialogActions>
                    </Form>
                  )}
                </Formik>
              </Dialog>
            </TabPanel>
          </Box>
        </Box>

        {/* Change Password Dialog */}
        <Dialog
          open={showPasswordDialog}
          onClose={() => setShowPasswordDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LockIcon color="primary" sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                Change Password
              </Typography>
            </Box>
          </DialogTitle>
          <Divider />
          <Formik
            initialValues={{
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={PasswordSchema}
            onSubmit={handlePasswordSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <DialogContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        name="newPassword"
                        label="New Password"
                        fullWidth
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.newPassword && Boolean(errors.newPassword)
                        }
                        helperText={touched.newPassword && errors.newPassword}
                        InputProps={{
                          autoComplete: "new-password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <EyeButton
                                show={showPassword}
                                setShow={setShowPassword}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="confirmPassword"
                        label="Confirm New Password"
                        fullWidth
                        variant="outlined"
                        type={showConfPassword ? "text" : "password"}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
                        }
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
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
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                  <Button
                    onClick={() => setShowPasswordDialog(false)}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    sx={{
                      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                      borderRadius: 2,
                    }}
                  >
                    Change Password
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Dialog>
      </Paper>
    </Container>
  );
}
