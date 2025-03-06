import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { registerUser, loginUser } from "../apis/apisList/userApi";
import { useMessage } from "../Context/MessageContext";
import { useApp } from "../Context/AppContext";
import EyeButton from "../components/Button/eyeButton";

const Text = styled(Typography)(({ theme }) => ({
  color: "#333333",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: theme.typography.h4.fontSize,
}));

const classes = {
  paper: {
    display: "flex",
    flexDirection: "column",
    aligns: "center",
  },
  avatar: {
    backgroundColor: "secondary.main",
  },
  form: {
    width: "100%",
  },
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format")
    .test("is-valid-domain", "Email must have a valid domain", (value) => {
      const domainPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return domainPattern.test(value);
    }),
  age: Yup.number()
    .required("Age is required")
    .min(18, "You must be at least 18 years old")
    .max(100, "You must be 100 years old or younger"),
  gender: Yup.string().required("Gender is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { showMessage } = useMessage();
  const { login } = useApp();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    const userData = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      gender: values.gender,
      age: values.age,
      password: values.password,
    };
    try {
      const registarRes = await registerUser(userData);
      // const registarRes = await res.json();

      if (registarRes.status == 200) {
        const userData = { email: values.email, password: values.password };
        localStorage.setItem("verify_user", JSON.stringify(userData));
        showMessage("Otp sent to your email", "success");
        navigate("/verification");
        // const response = await loginUser(userData);
        // if(response.status == 200) {
        //     let userInfo = {first_name: response.first_name, last_name: response.last_name, user_id: response.user_id, token: response.token}
        //     login(userInfo);

        //     navigate('/');
        //     showMessage(registarRes.message, 'success');
        // }
      }
    } catch (err) {
      setError(err.response.data.message);
      console.error("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Grid container component="main" sx={{ justifyContent: "center" }}>
        <Grid
          size={{ xs: 12, sm: 8, md: 5, lg: 4 }}
          sx={{
            border: "1px solid #d1cbcb",
            padding: "30px",
            margin: "20px",
            borderRadius: "10px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Box sx={classes.paper}>
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                marginBottom: "10px",
                fontWeight: "600",
              }}
            >
              Sign Up
            </Typography>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", marginBottom: "30px" }}
            >
              Welcome to Pillsphere, SignUp to create account
            </Typography>
            <Box sx={{ width: "100%" }} noValidate>
              {/* <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            /> */}
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  age: "",
                  gender: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                  isSubmitting,
                }) => (
                  <Form>
                    <Grid container spacing={3.5}>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <TextField
                          autoComplete="fname"
                          name="firstName"
                          variant="outlined"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.firstName && Boolean(errors.firstName)}
                          helperText={touched.firstName && errors.firstName}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="lname"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.lastName && Boolean(errors.lastName)}
                          helperText={touched.lastName && errors.lastName}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="age"
                          label="Age"
                          type="number"
                          inputProps={{ min: 0 }} // Allows only letters and spaces
                          name="age"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.age && Boolean(errors.age)}
                          helperText={touched.age && errors.age}
                          in
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Gender
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Gender"
                            name="gender"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.gender}
                            error={touched.gender && Boolean(errors.gender)}
                          >
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                            <MenuItem value={"other"}>Other</MenuItem>
                          </Select>
                          {touched.gender && errors.gender && (
                            <FormHelperText error>
                              {errors.gender}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type={showPassword ? "text" : "password"}
                          id="password"
                          autoComplete="current-password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.password && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                          InputProps={{
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
                      {/* <Grid size={{ xs: 12, sm: 12, md: 5, lg: 6 }}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid> */}
                    </Grid>
                    {/* <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Remember me"
                                        /> */}

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ margin: "30px 0px 10px 0px" }}
                      disabled={isSubmitting}
                    >
                      Sign Up
                    </Button>
                    {error && <Typography color="red">{error}</Typography>}
                  </Form>
                )}
              </Formik>
              <Grid container justifyContent={"end"}>
                <Grid>
                  <Button sx={{ textTransform: "capitalize" }}>
                    <Link to={"/login"} style={{ textDecoration: "none" }}>
                      <Text> Already have an account? Sign in</Text>
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
