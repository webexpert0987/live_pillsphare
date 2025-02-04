import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Container,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";

export default function Footer() {
  const linkStyle = {
    color: "#333",
    textDecoration: "none",
    fontWeight: 500,
  };
  return (
    <Box sx={{ backgroundColor: "secondary.main", padding: "40px 20px" }}>
      <Container maxWidth="lg">
        {/* Email Subscription Section */}
        <Box
          textAlign="center"
          marginBottom={4}
          sx={{
            display: { xs: "block", md: "flex" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: "50px",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: "20px", textAlign: { sm: "center", md: "left" } }}
            gutterBottom
          >
            Join our email subscription now to get updates on new offers and
            notifications.
          </Typography>
          <Box
            sx={{
              display: { xs: "flex", sm: "flex" },
              borderRadius: "50px",
              width: { xs: "100%", md: "50%" },
              position: "relative",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Enter Your Email"
              sx={{
                flex: 1,
                width: "100%",
                minWidth: { xs: "0px", sm: "235px" },
                paddingRight: { xs: 11, sm: 17, md: 18 },
                position: "relative",
                left: "5px",
                border: "none",
                backgroundColor: "secondary.main",
                borderRadius: "50px",
                position: "relative",
                // left: '60px',
                whiteSpace: "nowrap",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 10,
                },
                "& .MuiOutlinedInput-input": {
                  paddingRight: "62px",
                  // marginRight: 5,
                  borderRadius: "50px",
                  backgroundColor: "#F5F5F5",
                  padding: {
                    xs: "13.5px 54px 13.5px 12px",
                    sm: "20.1px 60px 20.1px 18px",
                  },
                  // paddingTop: 2.5,
                  // paddingBottom: 2.5
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "primary.main",
                borderRadius: "50px",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#22432A",
                },
                // padding: '0px 30px',
                zIndex: 99,
                fontSize: { xs: "14px", sm: "18px" },
                width: { xs: "130px", sm: "189px" },
                position: "absolute",
                padding: { xs: "13px", sm: "16px" },
                // right: {xs: '7px', md: '3%', lg: '13%'}
                right: { xs: "0%", md: "0%", lg: "0%" },
              }}
              size="small"
            >
              Subscribe Now
            </Button>
          </Box>
        </Box>
        <Divider />
        {/* Footer Sections */}
        <Box sx={{ flexGrow: 2, marginY: "40px" }}>
          <Grid container spacing={3}>
            {/* Logo Section */}
            <Grid size={{ xs: 12, sm: 10, md: 3, lg: 2.6 }}>
              <img
                src="/Pillsphere_logo_footer.png"
                alt="Pill Sphere Logo"
                style={{ maxWidth: "258px" }}
              />
            </Grid>

            {/* Categories Section */}
            <Grid
              size={{ xs: 12, sm: 12, md: 4, lg: 6 }}
              sx={{ marginRight: "20px", width: { md: "50%" } }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "900", fontSize: "24px" }}
                gutterBottom
              >
                Categories
              </Typography>
              <Box sx={{ margin: "20px 0px", borderBottom: "2px solid #000" }}>
                <Divider />
              </Box>
              <Box>
                <Grid container direction="row" spacing={5}>
                  <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4 }}>
                    <Typography variant="h4" marginY={1}>
                      <Link style={linkStyle}>Men's Health</Link>
                    </Typography>
                    <Typography variant="h4" marginY={1}>
                      <Link style={linkStyle}>Women's Health</Link>
                    </Typography>
                    <Typography variant="h4" marginY={1}>
                      <Link style={linkStyle}>Pediatric Health</Link>
                    </Typography>
                    <Typography variant="h4" marginY={1}>
                      <Link style={linkStyle}>General Wellbeing</Link>
                    </Typography>
                    <Typography variant="h4" marginY={1}>
                      <Link style={linkStyle}>Delivery</Link>
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4 }}>
                    <Typography variant="h4" marginY={1}>
                      <Link style={linkStyle}>How It Works</Link>
                    </Typography>
                    <Typography variant="h4" marginY={1}>
                      <Link style={linkStyle}>Account</Link>
                    </Typography>
                    <Typography variant="h4" marginY={1}>
                      <Link style={linkStyle}>Cart</Link>
                    </Typography>
                    <Typography variant="h4" marginY={1}>
                      <Link style={linkStyle}>Cookies</Link>
                    </Typography>
                    <Typography variant="h4" marginY={1}>
                      <Link style={linkStyle}>Prescribers</Link>
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4 }}>
                    <Typography variant="h4" marginY={1}>
                      <Link style={linkStyle}>Contact Us</Link>
                    </Typography>
                    <Typography variant="h4" marginY={1}>
                      <Link style={linkStyle}>About Us</Link>
                    </Typography>
                    <Typography variant="h4" marginY={1}>
                      <Link style={linkStyle}>Privacy Policy</Link>
                    </Typography>
                    <Typography variant="h4" marginY={1}>
                      <Link style={linkStyle}>Terms of Use</Link>
                    </Typography>
                    <Typography variant="h4" marginY={1}>
                      <Link style={linkStyle}>Terms and Conditions</Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Contact Us Section */}
            <Grid size={{ xs: 12, sm: 12, md: 2.5, lg: 3 }}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "900", fontSize: "24px" }}
                  gutterBottom
                >
                  Contact Us
                </Typography>
                <Box
                  sx={{ margin: "20px 0px", borderBottom: "2px solid #000" }}
                >
                  <Divider />
                </Box>
                <Box>
                  <Typography variant="h4" marginY={3}>
                    <strong> Address: </strong>
                    Unit 2ap Building B East Lane, Wembley Commercial Centre,
                    Wembley, Middlesex, HA9 7UR
                  </Typography>
                  <Typography variant="h4" marginY={1}>
                    <strong>Email:</strong> info@pillsphere.com
                  </Typography>
                  <Typography variant="h4" marginY={1}>
                    <strong>Call:</strong> 555-555-1234
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box marginY={2}>
          <Divider />
        </Box>
        <Box
          sx={{
            backgroundColor: "secondary.main",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Registration Information */}
          <Grid container spacing={6}>
            <Grid xs={12} sm={4} textAlign={"left"}>
              <Typography variant="h3" fontWeight="bold">
                Pharmacy GPHC Registration:
              </Typography>
              <Typography sx={{ marginTop: "20px" }}>
                Pill Sphere GPHC Number: XXXXXX
              </Typography>
            </Grid>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", sm: "block" } }}
            />

            <Grid xs={12} sm={4} textAlign={"left"}>
              <Typography variant="h3" fontWeight="bold">
                Superintendent Pharmacist:
              </Typography>
              <Typography sx={{ marginTop: "20px" }}>
                GPHC Number: 2213569
              </Typography>
            </Grid>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", sm: "block" } }}
            />

            <Grid xs={12} sm={4} textAlign={"left"}>
              <Typography variant="h3" fontWeight="bold">
                Company Registration:
              </Typography>
              <Typography sx={{ marginTop: "20px" }}>
                Pill Sphere Limited: 16158942
              </Typography>
            </Grid>
          </Grid>

          <Box
            display={"flex"}
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="center"
            gap={{ xs: 4, md: 4 }}
            alignItems={"center"}
          >
            {/* <img src="/images/1293611.png" alt="LegitScript Certified" />
                    <img src="/images/pharmacy-badge.png" alt="Pharmacy badge" style={{ height: '40px' }} />
                    <img src="/images/cyber-essentials.png" alt="Cyber Essentials Certified Plus"/> */}
          </Box>
        </Box>

        <Box marginY={2}>
          <Divider />
        </Box>

        {/* Copyright and Social Icons */}
        <Box
          display={{ xs: "block", sm: "flex" }}
          justifyContent="space-between"
          textAlign={"left"}
        >
          <Typography variant="h4" sx={{ marginTop: 2 }}>
            © 2025 Pill Sphere LTD. All rights reserved.
          </Typography>
          <Box
            display="flex"
            justifyContent="left"
            gap={1}
            marginTop={{ xs: 2, md: 1 }}
          >
            <img src="/images/social/fb.png" alt="facebook" />
            <img src="/images/social/x.png" alt="x" />
            <img src="/images/social/insta.png" alt="instagram" />
            <img src="/images/social/linkedin.png" alt="linkedin" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// import React from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Link,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Container,
// } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';

// const Footer = () => {
//   return (
//       <Box
//           sx={{
//               backgroundColor: 'primary.main',
//               color: '#fff',
//               padding: '2rem 0',
//               textAlign: 'center',
//           }}
//       >
//           <Container>

//               <Grid container spacing={2}>
//                   <Grid item xs={12} md={6} display={'flex'} justifyContent={'space-between'}>
//                       <Typography variant="body2">
//                           Join our email subscription now to get updates on new offers and notifications.
//                       </Typography>
//                       <Box
//                           sx={{
//                               display: 'flex',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                               mt: 2,
//                           }}
//                       >
//                           <TextField
//                               id="outlined-basic"
//                               label="Enter Your Email"
//                               variant="outlined"
//                               sx={{ mr: 2 }}
//                           />
//                           <Button variant="contained" color="primary">
//                               Subscribe Now
//                           </Button>
//                       </Box>
//                   </Grid>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                   <img
//                       src="/path/to/pillsphere-logo.svg" // Replace with actual logo path
//                       alt="PillSphere Logo"
//                       style={{ maxWidth: '150px' }}
//                   />
//               </Grid>

//               <Grid container spacing={2} sx={{ mt: 4 }}>
//                   <Grid item xs={12} md={4}>
//                       <Typography variant="h6">Categories</Typography>
//                       <List>
//                           <ListItem>
//                               <ListItemText primary="Men's Health" />
//                           </ListItem>
//                           <ListItem>
//                               <ListItemText primary="Women's Health" />
//                           </ListItem>
//                           <ListItem>
//                               <ListItemText primary="Pediatric Health" />
//                           </ListItem>
//                           <ListItem>
//                               <ListItemText primary="General Wellbeing" />
//                           </ListItem>
//                           <ListItem>
//                               <ListItemText primary="Delivery" />
//                           </ListItem>
//                       </List>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                       <Typography variant="h6">Account</Typography>
//                       <List>
//                           <ListItem>
//                               <ListItemText primary="How It Works" />
//                           </ListItem>
//                           <ListItem>
//                               <ListItemText primary="About Us" />
//                           </ListItem>
//                           <ListItem>
//                               <ListItemText primary="Cart" />
//                           </ListItem>
//                           <ListItem>
//                               <ListItemText primary="Cookies" />
//                           </ListItem>
//                           <ListItem>
//                               <ListItemText primary="Prescribers" />
//                           </ListItem>
//                       </List>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                       <Typography variant="h6">Contact Us</Typography>
//                       <List>
//                           <ListItem>
//                               <ListItemIcon>
//                                   {/* <LocationOnIcon />  */}
//                               </ListItemIcon>
//                               <ListItemText
//                                   primary="Address: Unit 20 And Unit 2p Building 8 East"
//                                   secondary="Lone Werritsley Commercial Centre, Wembley, Middlesex, United Kingdom, HA9 7UR"
//                               />
//                           </ListItem>
//                           <ListItem>
//                               <ListItemIcon>
//                                   {/* <EmailIcon />  */}
//                               </ListItemIcon>
//                               <ListItemText primary="Email: info@pillsphere.com" />
//                           </ListItem>
//                           <ListItem>
//                               <ListItemIcon>
//                                   {/* <PhoneIcon />  */}
//                               </ListItemIcon>
//                               <ListItemText primary="Call: 555-555-1234" />
//                           </ListItem>
//                       </List>
//                   </Grid>
//               </Grid>

//               <Grid container spacing={2} sx={{ mt: 4 }}>
//                   <Grid item xs={12} md={4}>
//                       <Typography variant="body2">
//                           Pharmacy GPHC Registration:
//                       </Typography>
//                       <Typography variant="body2">
//                           Pill Sphere GPHC Number: XXXXXXX
//                       </Typography>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                       <Typography variant="body2">
//                           Superintendent Pharmacist
//                       </Typography>
//                       <Typography variant="body2">
//                           GPHC Number: 2213569
//                       </Typography>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                       <Typography variant="body2">
//                           Company Registration:
//                       </Typography>
//                       <Typography variant="body2">
//                           Pill Sphere Limited: 16158942
//                       </Typography>
//                   </Grid>
//               </Grid>

//               <Grid container spacing={2} sx={{ mt: 4 }}>
//                   <Grid item xs={12}>
//                       <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                           <img
//                               src="/path/to/gphc-logo.png" // Replace with actual logo path
//                               alt="GPHC Logo"
//                               style={{ marginRight: '10px' }}
//                           />
//                           <img
//                               src="/path/to/ema-logo.png" // Replace with actual logo path
//                               alt="EMA Logo"
//                               style={{ marginRight: '10px' }}
//                           />
//                           <img
//                               src="/path/to/mhra-logo.png" // Replace with actual logo path
//                               alt="MHRA Logo"
//                               style={{ marginRight: '10px' }}
//                           />
//                       </Box>
//                   </Grid>
//               </Grid>

//               <Grid container spacing={2} sx={{ mt: 4 }}>
//                   <Grid item xs={12}>
//                       <Typography variant="body2">
//                           © 2025 Pill Sphere LTD. All rights reserved.
//                       </Typography>
//                   </Grid>
//               </Grid>

//               <Grid container spacing={2} sx={{ mt: 2 }}>
//                   <Grid item xs={12}>
//                       <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                           <FacebookIcon />
//                           <InstagramIcon />
//                           <LinkedInIcon />
//                       </Box>
//                   </Grid>
//               </Grid>
//           </Container>
//       </Box>
//   );
// };

// export default Footer;
