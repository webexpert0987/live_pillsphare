import React from "react";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const Text = styled(Typography)(({ theme }) => ({
    color: '#333333', textDecoration: 'none', fontWeight: 600, fontSize: theme.typography.h4.fontSize
}));

const classes = {
    root: {
        height: "100vh"
    },
    image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
    },
    paper: {
        
        display: "flex",
        flexDirection: "column",
        aligns: "center"
    },
    avatar: {
        // margin: theme.spacing(1),
        backgroundColor: 'secondary.main'
    },
    submit: {
        // margin: theme.spacing(3, 0, 2)
    }
};

const Login = () => {
    

    return (
        <>
            <Grid container component="main" sx={{justifyContent: 'center'}}>
                <Grid size={{ xs: 12, sm: 8, md: 5, lg: 4 }} sx={{
                        border: '1px solid #d1cbcb',
                        padding: '30px',
                        margin: '20px',
                        borderRadius: '10px',
                        height: '550px',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    }}
                >
                    <Box sx={classes.paper}>
                        {/* <Avatar sx={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar> */}
                        <Typography component="h1" variant="h5" sx={{textAlign: 'center'}}>
                            Sign in
                        </Typography>
                        <Box sx={{width: '100%'}} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
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
                                sx={{margin:'20px 0px 10px 0px'}}
                            >
                                Sign In
                            </Button>
                            <Grid container justifyContent={'space-between'}>
                                <Grid xs>
                                    <Button sx={{ textTransform: 'capitalize' }}>
                                        <Link to={'/registration'} style={{ textDecoration: 'none' }}>
                                            <Text>Forgot password?</Text>
                                        </Link>
                                    </Button>
                                </Grid>
                                <Grid >
                                    <Button sx={{ textTransform: 'capitalize' }}>
                                        <Link to={'/registration'} style={{ textDecoration: 'none' }}>
                                            <Text>Don't have an account? Sign Up</Text>
                                        </Link>
                                    </Button>
                                    {/* <Link href="/registration" variant="h4">
                                        {"Don't have an account? Sign Up"}
                                    </Link> */}
                                </Grid>
                            </Grid>
                            {/* <Box mt={5}>
                                <MadeWithLove />
                            </Box> */}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            {/* <Grid container component="main" sx={classes.root}>
                <CssBaseline />
                <Grid xs={false} sm={4} md={7} sx={classes.image} />
                <Grid xs={12} sm={8} md={5} component={Paper} elevation={3} square>
                    <Box sx={classes.paper}>
                        <Avatar sx={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form sx={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid >
                                    <Link href="/registration" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <MadeWithLove />
                            </Box>
                        </form>
                    </Box>
                </Grid>
            </Grid> */}
        </>
    );
};

export default Login;
