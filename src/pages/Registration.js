import React, {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from "@mui/material";
import { Formik, Form, } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../apis/apisList/userApi';
import Snackbar from '@mui/material/Snackbar';



const Text = styled(Typography)(({ theme }) => ({
    color: '#333333', textDecoration: 'none', fontWeight: 600, fontSize: theme.typography.h4.fontSize
}));

const classes = {
    paper: {
        display: "flex",
        flexDirection: "column",
        aligns: "center"
    },
    avatar: {
        backgroundColor: 'secondary.main'
    },
    form: {
        width: "100%",
    }
};

const validationSchema = Yup.object({
    firstName: Yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters'),
    lastName: Yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email format')
        .test('is-valid-domain', 'Email must have a valid domain', (value) => {
            const domainPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return domainPattern.test(value);
        }),
    age: Yup.number()
        .required('Age is required')
        .min(18, 'You must be at least 18 years old')
        .max(100, 'You must be 100 years old or younger'),
    gender: Yup.string()
        .required('Gender is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
});

export default function SignUp() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [openMessage, setOpenMessage] = React.useState(false);
    const [message, setMessage] = useState('');

    const handleClick = () => {
        setOpenMessage(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenMessage(false);
      };

    
    const handleSubmit = async (values, { setSubmitting }) => {
        console.log('values', values)

        setError('');
        const userData = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            gender: values.gender,
            age: values.age,
            password: values.password
        };
        try {
            const response = await registerUser(userData);
            console.log('API Response:', response);
            if (response.status == 200) {
                navigate('/');
            }
        } catch (err) {
            setError('An error occurred during the request.');
            console.error('Error:', err);
            setMessage(err.response.data.message);
            setOpenMessage(true)
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <>
            <Grid container component="main" sx={{ justifyContent: 'center' }}>
                <Grid size={{ xs: 12, sm: 8, md: 5, lg: 4 }} sx={{
                    border: '1px solid #d1cbcb',
                    padding: '30px',
                    margin: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                }}
                >
                    <Box sx={classes.paper}>
                        <Typography variant="h2" sx={{ textAlign: 'center', marginBottom: '10px', fontWeight: '600' }}>
                            Sign Up
                        </Typography>
                        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '30px' }}>
                            Welcome to Pillsphere, SignUp to create account
                        </Typography>
                        <Box sx={{ width: '100%' }} noValidate>
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
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                    age: '',
                                    gender: '',
                                    password: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ values, touched, errors, handleChange, handleBlur, isSubmitting }) => (
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
                                                    name="age"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.age && Boolean(errors.age)}
                                                    helperText={touched.age && errors.age}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
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
                                                        <MenuItem value={'male'}>Male</MenuItem>
                                                        <MenuItem value={'female'}>Female</MenuItem>
                                                    </Select>
                                                    {touched.gender && errors.gender && (
                                                        <FormHelperText error>{errors.gender}</FormHelperText>
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
                                                    type="password"
                                                    id="password"
                                                    autoComplete="current-password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.password && Boolean(errors.password)}
                                                    helperText={touched.password && errors.password}
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
                                            sx={{ margin: '30px 0px 10px 0px' }}
                                            disabled={isSubmitting}
                                        >
                                            Sign Up
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                            <Grid container justifyContent={'end'}>
                                <Grid >
                                    <Button sx={{ textTransform: 'capitalize' }}>
                                        <Link to={'/login'} style={{ textDecoration: 'none' }}>
                                            <Text> Already have an account? Sign in</Text>
                                        </Link>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar
                open={openMessage}
                autoHideDuration={5000}
                onClose={handleClose}
                message={message}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            />
        </>
        // <Grid container component="main" maxWidth="xs" justifyContent={'center'}>
        //     <Grid container component="main" sx={{justifyContent: 'center'}}>
        //     {/* <CssBaseline /> */}
        //     <Box sx={classes.paper}>
        //         {/* <Avatar sx={classes.avatar}>
        //             <LockOutlinedIcon />
        //         </Avatar> */}
        //         <Typography  variant="h2">
        //             Sign up
        //         </Typography>
        //         {/* <form noValidate>
        //         </form> */}
        // <Grid container spacing={2}>
        //     <Grid xs={12} sm={6} md={3} lg={3}>
        //         <TextField
        //             autoComplete="fname"
        //             name="firstName"
        //             variant="outlined"
        //             required
        //             fullWidth
        //             id="firstName"
        //             label="First Name"
        //             autoFocus
        //         />
        //     </Grid>
        //     <Grid xs={12} sm={6} md={3} lg={3}>
        //         <TextField
        //             variant="outlined"
        //             required
        //             fullWidth
        //             id="lastName"
        //             label="Last Name"
        //             name="lastName"
        //             autoComplete="lname"
        //         />
        //     </Grid>
        //     <Grid xs={12}>
        //         <TextField
        //             variant="outlined"
        //             required
        //             fullWidth
        //             id="email"
        //             label="Email Address"
        //             name="email"
        //             autoComplete="email"
        //         />
        //     </Grid>
        //     <Grid xs={12}>
        //         <TextField
        //             variant="outlined"
        //             required
        //             fullWidth
        //             name="password"
        //             label="Password"
        //             type="password"
        //             id="password"
        //             autoComplete="current-password"
        //         />
        //     </Grid>
        //     <Grid xs={12}>
        //         <FormControlLabel
        //             control={<Checkbox value="allowExtraEmails" color="primary" />}
        //             label="I want to receive inspiration, marketing promotions and updates via email."
        //         />
        //     </Grid>
        // </Grid>
        //             <Button
        //                 type="submit"
        //                 fullWidth
        //                 variant="contained"
        //                 color="primary"
        //                 sx={classes.submit}
        //             >
        //                 Sign Up
        //             </Button>
        //             <Grid container justify="flex-end">
        //                 <Grid >
        //                     <Link href="/" variant="body2">
        //                         Already have an account? Sign in
        //                     </Link>
        //                 </Grid>
        //             </Grid>
        //     </Box>
        // </Grid>

        // <Container component="main" maxWidth="xs">
        //     <CssBaseline />
        //     <Box sx={classes.paper}>
        //         <Avatar sx={classes.avatar}>
        //             <LockOutlinedIcon />
        //         </Avatar>
        //         <Typography component="h1" variant="h5">
        //             Sign up
        //         </Typography>
        //         <form noValidate>
        //             <Grid container spacing={2}>
        //                 <Grid xs={12} sm={6}>
        //                     <TextField
        //                         autoComplete="fname"
        //                         name="firstName"
        //                         variant="outlined"
        //                         required
        //                         fullWidth
        //                         id="firstName"
        //                         label="First Name"
        //                         autoFocus
        //                     />
        //                 </Grid>
        //                 <Grid xs={12} sm={6}>
        //                     <TextField
        //                         variant="outlined"
        //                         required
        //                         fullWidth
        //                         id="lastName"
        //                         label="Last Name"
        //                         name="lastName"
        //                         autoComplete="lname"
        //                     />
        //                 </Grid>
        //                 <Grid xs={12}>
        //                     <TextField
        //                         variant="outlined"
        //                         required
        //                         fullWidth
        //                         id="email"
        //                         label="Email Address"
        //                         name="email"
        //                         autoComplete="email"
        //                     />
        //                 </Grid>
        //                 <Grid xs={12}>
        //                     <TextField
        //                         variant="outlined"
        //                         required
        //                         fullWidth
        //                         name="password"
        //                         label="Password"
        //                         type="password"
        //                         id="password"
        //                         autoComplete="current-password"
        //                     />
        //                 </Grid>
        //                 <Grid xs={12}>
        //                     <FormControlLabel
        //                         control={<Checkbox value="allowExtraEmails" color="primary" />}
        //                         label="I want to receive inspiration, marketing promotions and updates via email."
        //                     />
        //                 </Grid>
        //             </Grid>
        //             <Button
        //                 type="submit"
        //                 fullWidth
        //                 variant="contained"
        //                 color="primary"
        //                 sx={classes.submit}
        //             >
        //                 Sign Up
        //             </Button>
        //             <Grid container justify="flex-end">
        //                 <Grid >
        //                     <Link href="/" variant="body2">
        //                         Already have an account? Sign in
        //                     </Link>
        //                 </Grid>
        //             </Grid>
        //         </form>
        //     </Box>
        //     <Box mt={5}>
        //         <MadeWithLove />
        //     </Box>
        // </Container>
    );
}
