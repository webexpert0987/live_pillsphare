import React, { useEffect, useState } from "react";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { loginUser } from "../apis/apisList/userApi";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMessage } from "../Context/MessageContext";
import { useApp } from "../Context/AppContext";

const Text = styled(Typography)(({ theme }) => ({
  color: "#333333",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: theme.typography.h4.fontSize,
}));

const classes = {
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    aligns: "center",
  },
  avatar: {
    backgroundColor: "secondary.main",
  },
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format")
    .test("is-valid-domain", "Email must have a valid domain", (value) => {
      const domainPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return domainPattern.test(value);
    }),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const { login } = useApp();
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    const userData = { email: values.email, password: values.password };
    try {
      const response = await loginUser(userData);
      // const response = await res.json();

      if (response.status == 200) {
        let userInfo = {
          first_name: response.first_name,
          last_name: response.last_name,
          email: response.email,
          user_id: response.user_id,
          token: response.token,
        };
        login(userInfo);

        navigate("/");
        showMessage(response.message, "success");
      }
    } catch (err) {
      setError(err.response.data.message);
      console.error("Error:", err);
      // showMessage(err.response.data.message, 'error');
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
            height: "550px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Box sx={classes.paper}>
            {/* <Avatar sx={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar> */}
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Sign In
            </Typography>
            <Formik
              initialValues={{
                email: "",
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
                  <Box sx={{ width: "100%" }} noValidate>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      margin="normal"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      margin="normal"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ margin: "20px 0px 10px 0px" }}
                      disabled={isSubmitting}
                    >
                      Sign In
                    </Button>
                    {error && <Typography color="red">{error}</Typography>}
                    <Grid container justifyContent={"space-between"}>
                      <Grid>
                        <Button sx={{ textTransform: "capitalize" }}>
                          <Link
                            to={"/forgot"}
                            style={{ textDecoration: "none" }}
                          >
                            <Text>Forgot password?</Text>
                          </Link>
                        </Button>
                      </Grid>
                      <Grid>
                        <Button sx={{ textTransform: "capitalize" }}>
                          <Link
                            to={"/registration"}
                            style={{ textDecoration: "none" }}
                          >
                            <Text>Don't have an account? Sign Up</Text>
                          </Link>
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
