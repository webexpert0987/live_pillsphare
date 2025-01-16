import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


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

export default function SignUp() {

    return (
        <>
            <Grid container component="main" sx={{justifyContent: 'center'}}>
                <Grid size={{ xs: 12, sm: 8, md: 5, lg: 4 }} sx={{
                        border: '1px solid #d1cbcb',
                        padding: '30px',
                        margin: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    }}
                >
                    <Box sx={classes.paper}>
                        <Typography variant="h2" sx={{ textAlign: 'center', marginBottom: '10px' }}>
                            Sign up
                        </Typography>
                        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '25px' }}>
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
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={age}
                                            label="Gender"
                                            // onChange={handleChange}
                                        >
                                            <MenuItem value={'male'}>Male</MenuItem>
                                            <MenuItem value={'female'}>Female</MenuItem>
                                        </Select>
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
                            >
                                Sign Up
                            </Button>
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
