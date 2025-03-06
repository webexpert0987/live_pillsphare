import React, { useState } from "react";
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
import { useMessage } from "../../Context/MessageContext";
import { subscribeNewsLetter } from "../../apis/apisList/userApi";

const onlineClinicItems = [
  { id: 1, name: "Weight Loss", link: "/online-clinic/weight-loss" },
  { id: 2, name: "Acid Reflux", link: "/online-clinic/acid-reflux" },
  {
    id: 3,
    name: "Contraceptives",
    link: "/online-clinic/contraceptives",
  },
  { id: 4, name: "Cystitis", link: "/online-clinic/cystitis" },
  {
    id: 5,
    name: "Erectile Dysfunction",
    link: "/online-clinic/erectile-dysfunction",
  },
  { id: 6, name: "Hair Loss", link: "/online-clinic/hair-loss" },
  { id: 7, name: "Hay Fever", link: "/online-clinic/hayfever" },
  {
    id: 8,
    name: "Migraine",
    link: "/online-clinic/migraine",
  },
  { id: 9, name: "Period Delay", link: "/online-clinic/period-delay" },
  { id: 10, name: "Period Pain", link: "/online-clinic/period-pain" },
  {
    id: 11,
    name: "Premature Ejaculation",
    link: "/online-clinic/premature-ejaculation",
  },
  { id: 12, name: "Stop Smoking", link: "/online-clinic/stop-smoking" },
];

const supportItems = [
  { id: 1, name: "Privacy Policy", link: "/privacy-policy" },
  {
    id: 2,
    name: "Terms Of Use",
    link: "/terms-of-use",
  },
  { id: 3, name: "Terms And Conditions", link: "/terms-conditions" },
  { id: 8, name: "Cookies Policy", link: "/cookies-policy" },
  { id: 6, name: "Feedback Complaints", link: "/feedback-complaints" },
  { id: 4, name: "Our Prescriber", link: "/our-prescribers" },
  { id: 5, name: "Low Price Guarantee", link: "/low-price-guarantee" },
  { id: 7, name: "Delivery Information", link: "/delivery-information" },
  { id: 9, name: "Refunds Returns", link: "/refunds-returns" },
  { id: 10, name: "Reorder Prescription", link: "/reorder-prescription" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const { showMessage } = useMessage();
  const linkStyle = {
    color: "#333",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "1.5",
  };
  const handleNavigate = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const handleSubscribe = async () => {
    if (!email) return;
    try {
      await subscribeNewsLetter({ email });
      setEmail("");
      showMessage("Subscribed successfully!", "success");
    } catch (error) {
      showMessage(
        "Failed to subscribe. Please check your internet connection and try again.",
        "error"
      );
      return;
    }
  };
  return (
    <Box sx={{ backgroundColor: "secondary.main", padding: "40px 0px" }}>
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
            sx={{
              fontSize: { xs: "16px", sm: "17px", md: "20px" },
              textAlign: { sm: "center", md: "left" },
              fontWeight: "600",
              marginBottom: { xs: "15px", sm: "0", md: "0" },
            }}
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
              border: "none",
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
                fontWeight: "600",
                // left: '60px',
                whiteSpace: "nowrap",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 10,
                  fontWeight: "600",
                  fontSize: "16px",
                  border: "none",
                },
                "& .MuiOutlinedInput-input": {
                  paddingRight: "62px",
                  // marginRight: 5,
                  borderRadius: "50px",
                  backgroundColor: "#F5F5F5",
                  padding: {
                    xs: "13.5px 54px 13.5px 12px",
                    sm: "20.1px 60px 20.1px 28px",
                  },
                  fontSize: "16px",
                  border: "none",
                  // paddingTop: 2.5,
                  // paddingBottom: 2.5
                },
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "primary.main",
                borderRadius: "50px",
                boxShadow: "none",
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
              onClick={handleSubscribe}
            >
              Subscribe Now
            </Button>
          </Box>
        </Box>
        <Divider />
        {/* Footer Sections */}
        <Box
          sx={{ flexGrow: 2, marginY: { xs: "20px", sm: "30px", md: "40px" } }}
        >
          <Grid container spacing={3}>
            {/* Logo Section */}
            {/* <Grid size={{ xs: 12, sm: 10, md: 3, lg: 2.6 }}>
              <img
                src="/Pillsphere_logo_footer.png"
                alt="Pill Sphere Logo"
                style={{ maxWidth: "258px" }}
              />
            </Grid> */}

            {/* Categories Section */}
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "900",
                  marginBottom: "0",
                  fontSize: { xs: "20px", sm: "20px", md: "24px" },
                }}
                gutterBottom
              >
                Categories
              </Typography>
              <Box
                sx={{
                  margin: "10px 0px 20px 0px",
                  borderBottom: "2px solid #000",
                }}
              >
                <Divider />
              </Box>
              <Box>
                <Grid
                  container
                  direction="row"
                  spacing={{ xs: 0, sm: 2, md: 3 }}
                >
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                    {onlineClinicItems.slice(0, 6).map((item) => (
                      <Link
                        style={linkStyle}
                        to={item.link}
                        onClick={handleNavigate}
                        key={item.id}
                      >
                        <Typography
                          variant="h4"
                          marginY={1}
                          sx={{
                            fontWeight: "500",
                            margin: "12px 0",
                            fontSize: { xs: "15px", sm: "16px", md: "16px" },
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Link>
                    ))}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                    {onlineClinicItems.slice(6, 12).map((item) => (
                      <Link
                        style={linkStyle}
                        to={item.link}
                        key={item.id}
                        onClick={handleNavigate}
                      >
                        <Typography
                          variant="h4"
                          marginY={1}
                          sx={{
                            fontWeight: "500",
                            margin: "12px 0",
                            fontSize: { xs: "15px", sm: "16px", md: "16px" },
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Link>
                    ))}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            {/* Support pages */}
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "900",
                  marginBottom: "0",
                  fontSize: { xs: "20px", sm: "20px", md: "24px" },
                }}
                gutterBottom
              >
                Support
              </Typography>
              <Box
                sx={{
                  margin: "10px 0px 20px 0px",
                  borderBottom: "2px solid #000",
                }}
              >
                <Divider />
              </Box>
              <Box>
                <Grid
                  container
                  direction="row"
                  spacing={{ xs: 0, sm: 2, md: 3 }}
                >
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                    {supportItems.slice(0, 5).map((item) => (
                      <Link
                        style={linkStyle}
                        to={item.link}
                        onClick={handleNavigate}
                        key={item.id}
                      >
                        <Typography
                          variant="h4"
                          marginY={1}
                          sx={{
                            fontWeight: "500",
                            margin: "12px 0",
                            whiteSpace: "nowrap",
                            fontSize: { xs: "15px", sm: "16px", md: "16px" },
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Link>
                    ))}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                    {supportItems.slice(5, 10).map((item) => (
                      <Link
                        style={linkStyle}
                        to={item.link}
                        key={item.id}
                        onClick={handleNavigate}
                      >
                        <Typography
                          variant="h4"
                          marginY={1}
                          sx={{
                            fontWeight: "500",
                            margin: "12px 0",
                            whiteSpace: "nowrap",
                            fontSize: { xs: "15px", sm: "16px", md: "16px" },
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Link>
                    ))}
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Contact Us Section */}
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "900",
                    fontSize: { xs: "20px", sm: "20px", md: "24px" },
                    marginBottom: "0",
                  }}
                  gutterBottom
                >
                  Contact Us
                </Typography>
                <Box
                  sx={{
                    margin: "10px 0px 20px 0px",
                    borderBottom: "2px solid #000",
                  }}
                >
                  <Divider />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    marginY={3}
                    sx={{
                      lineHeight: "1.5",
                      fontWeight: "500",
                      fontSize: { xs: "15px", sm: "16px", md: "16px" },
                    }}
                  >
                    <strong> Address: </strong>
                    Unit 2ap Building B East Lane, Wembley Commercial Centre,
                    Wembley, Middlesex, HA9 7UR
                  </Typography>
                  <Typography
                    variant="h4"
                    marginY={1}
                    sx={{
                      lineHeight: "1.5",
                      fontWeight: "500",
                      fontSize: { xs: "15px", sm: "16px", md: "16px" },
                    }}
                  >
                    <strong>Email:</strong>{" "}
                    <Link
                      href="mailto:info@pillsphere.com"
                      color="inherit"
                      underline="hover"
                      sx={{
                        textDecoration: "none",
                        fontSize: { xs: "15px", sm: "16px", md: "16px" },
                      }}
                    >
                      info@pillsphere.com
                    </Link>
                  </Typography>
                  <Typography
                    variant="h4"
                    marginY={2}
                    sx={{
                      lineHeight: "1.5",
                      fontWeight: "500",
                      fontSize: { xs: "15px", sm: "16px", md: "16px" },
                    }}
                  >
                    <strong>Call:</strong>{" "}
                    <Link
                      href="tel:555-555-1234"
                      color="inherit"
                      underline="hover"
                      sx={{ textDecoration: "none" }}
                    >
                      555-555-1234
                    </Link>
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
            <Grid
              xs={12}
              sm={4}
              textAlign={"left"}
              sx={{
                marginBottom: { xs: "-20px", sm: "0", md: "0" },
                marginTop: { xs: "10px", sm: "0", md: "0" },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "700",
                  fontSize: { xs: "16px", sm: "18px", md: "20px" },
                }}
              >
                Pharmacy GPHC Registration:
              </Typography>
              <Typography
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "20px" },
                  fontSize: { xs: "15px", sm: "16px", md: "16px" },
                  fontWeight: "500",
                }}
              >
                Pill Sphere GPHC Number: XXXXXX
              </Typography>
            </Grid>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", sm: "block" } }}
            />

            <Grid
              xs={12}
              sm={4}
              textAlign={"left"}
              sx={{
                marginBottom: { xs: "-20px", sm: "0", md: "0" },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "700",
                  fontSize: { xs: "16px", sm: "18px", md: "20px" },
                }}
              >
                Superintendent Pharmacist:
              </Typography>
              <Typography
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "20px" },
                  fontSize: { xs: "15px", sm: "16px", md: "16px" },
                  fontWeight: "500",
                }}
              >
                GPHC Number: 2213569
              </Typography>
            </Grid>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", sm: "block" } }}
            />

            <Grid
              xs={12}
              sm={4}
              textAlign={"left"}
              sx={{
                marginBottom: { xs: "0px", sm: "0", md: "0" },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "700",
                  fontSize: { xs: "16px", sm: "18px", md: "20px" },
                }}
              >
                Company Registration:
              </Typography>
              <Typography
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "20px" },
                  fontSize: { xs: "15px", sm: "16px", md: "16px" },
                  fontWeight: "500",
                }}
              >
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
          <Typography
            variant="h4"
            sx={{
              marginTop: 2,
              fontWeight: "500",
              fontSize: { xs: "15px", sm: "15px", md: "16px" },
            }}
          >
            © 2025 Pill Sphere LTD. All rights reserved.
          </Typography>
          <Box
            display="flex"
            justifyContent="left"
            gap={1}
            marginTop={{ xs: 2, md: 1 }}
          >
            <a href="https://www.facebook.com/pillsphere" target="_blank">
              <img src="/images/social/fb.png" alt="facebook" />
            </a>
            <a href="https://www.x.com/pillsphere" target="_blank">
              <img src="/images/social/x.png" alt="x" />
            </a>
            <a href="https://www.instagram.com/pillsphere" target="_blank">
              <img src="/images/social/insta.png" alt="instagram" />
            </a>
            <a href="https://www.linkdin.com/pillsphere" target="_blank">
              <img src="/images/social/linkedin.png" alt="linkedin" />
            </a>
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
