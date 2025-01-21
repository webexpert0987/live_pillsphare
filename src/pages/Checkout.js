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
import { registerUser, loginUser } from '../apis/apisList/userApi';
import { useMessage } from '../Context/MessageContext';
import { useApp } from '../Context/AppContext';


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
    company: Yup.string()
        .required('Company is required'),
        // .min(2, 'Company must be at least 2 characters'),
    address_1: Yup.string()
        .required('Address is required'),
        // .min(2, 'Last name must be at least 2 characters'),
    address_2: Yup.string()
        .required('Address 2 is required'),
        // .min(2, 'Last name must be at least 2 characters'),
    city: Yup.string()
        .required('City is required'),
        // .min(2, 'Last name must be at least 2 characters'),
    state: Yup.string()
        .required('State is required'),
        // .min(2, 'Last name must be at least 2 characters'),
    postcode: Yup.string()
        .required('Postcode is required'),
        // .min(2, 'Last name must be at least 2 characters'),
    country: Yup.string()
        .required('Country is required'),
        // .min(2, 'Last name must be at least 2 characters'),
    phone: Yup.string()
        .required('Phone is required')
        // .min(2, 'Last name must be at least 2 characters'),
});

export default function Checkout() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const {showMessage} = useMessage();
    const {login} = useApp();

    
    const handleSubmit = async (values, { setSubmitting }) => {
        // console.log('values', values)

        // setError('');
        // const userData = {
        //     first_name: values.firstName,
        //     last_name: values.lastName,
        //     email: values.email,
        //     gender: values.gender,
        //     age: values.age,
        //     password: values.password
        // };
        // try {
        //     const registarRes = await registerUser(userData);
            
        //     if (registarRes.status == 200) {
        //         const userData = { email: values.email, password: values.password };
        //         const response = await loginUser(userData);
        //         if(response.status == 200) {
        //             let userInfo = {first_name: response.first_name, last_name: response.last_name, user_id: response.user_id, token: response.token}
        //             login(userInfo);
    
        //             navigate('/');
        //             showMessage(registarRes.message, 'success');
        //         }
        //     }
        // } catch (err) {
        //     setError(err.response.data.message);
        //     console.error('Error:', err);
        // } finally {
        //     setSubmitting(false);
        // }
    };
    return (
        <>
            <Grid  component="main" sx={{ justifyContent: 'center' }}>
                <Grid size={{ xs: 12, sm: 8, md: 5, lg: 4 }} sx={{
                    border: '1px solid #d1cbcb',
                    padding: '30px',
                    margin: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                }}
                >
                    <Box sx={classes.paper}>
                        <Typography variant="h2" sx={{ textAlign: 'center', marginBottom: '30px', fontWeight: '600' }}>
                            Checkout
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
                                    company: '',
                                    address_1: '',
                                    address_2: '',
                                    city: '',
                                    state: '',
                                    postcode: '',
                                    country: '',
                                    email: '',
                                    phone: '',
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
                                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="company"
                                                    label="Company"
                                                    name="company"
                                                    autoComplete="company"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.company && Boolean(errors.company)}
                                                    helperText={touched.company && errors.company}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="address_1"
                                                    label="Address 1"
                                                    name="address_1"
                                                    autoComplete="address_1"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.address_1 && Boolean(errors.address_1)}
                                                    helperText={touched.address_1 && errors.address_1}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="address_2"
                                                    label="Address 2"
                                                    name="address_2"
                                                    autoComplete="address_2"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.address_2 && Boolean(errors.address_2)}
                                                    helperText={touched.address_2 && errors.address_2}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="city"
                                                    label="City"
                                                    name="city"
                                                    autoComplete="city"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.city && Boolean(errors.city)}
                                                    helperText={touched.city && errors.city}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="state"
                                                    label="State"
                                                    name="state"
                                                    autoComplete="state"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.state && Boolean(errors.state)}
                                                    helperText={touched.state && errors.state}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="postcode"
                                                    label="Postcode"
                                                    name="postcode"
                                                    autoComplete="postcode"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.postcode && Boolean(errors.postcode)}
                                                    helperText={touched.postcode && errors.postcode}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="country"
                                                    label="Country"
                                                    name="country"
                                                    autoComplete="country"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.country && Boolean(errors.country)}
                                                    helperText={touched.country && errors.country}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                <TextField
                                                    variant="outlined"
                                                    type="number"
                                                    required
                                                    fullWidth
                                                    id="phone"
                                                    label="Phone"
                                                    name="phone"
                                                    autoComplete="phone"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.phone && Boolean(errors.phone)}
                                                    helperText={touched.phone && errors.phone}
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
                                            Checkout
                                        </Button>
                                        {error && <Typography color="red">{error}</Typography>}
                                    </Form>
                                )}
                            </Formik>
                            
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
