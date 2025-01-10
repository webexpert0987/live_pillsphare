import React from 'react';
import { Box, Typography, TextField, Button, IconButton, Container, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: 'secondary.main', padding: '40px 20px' }}>
        <Container maxWidth='lg'>
            {/* Email Subscription Section */}
            <Box textAlign="center" marginBottom={4} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '50px'}}>
                <Typography variant="h6" sx={{fontSize: '20px', textAlign: 'left'}} gutterBottom>
                Join our email subscription now to get updates on new offers and notifications.
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        borderRadius: '50px',
                        width: '50%'
                    }}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Enter Your Email"
                        sx={{
                            flex: 1,
                            width: '100%',                            
                            paddingRight: 1,
                            position: 'relative',
                            left: '5px',
                            backgroundColor: '#F5F5F5',
                            borderRadius: '50px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 10,

                            },
                            '& .MuiOutlinedInput-input': {
                                paddingRight: 5,
                                marginRight: 5 
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'primary.main',
                            borderRadius: '50px',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#22432A',
                            },
                        }}
                        size='small'
                    >
                        Subscribe Now
                    </Button>
                </Box>
            </Box>

            {/* Footer Sections */}
            <Grid container spacing={4}>
                {/* Logo Section */}
                <Grid item xs={12} md={4}>
                <img src="/path-to-logo.png" alt="Pill Sphere Logo" style={{ maxWidth: '150px' }} />
                </Grid>

                {/* Categories Section */}
                <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                    Categories
                </Typography>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                    <Typography>Men's Health</Typography>
                    <Typography>Women's Health</Typography>
                    <Typography>Pediatric Health</Typography>
                    <Typography>General Wellbeing</Typography>
                    <Typography>Delivery</Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography>How It Works</Typography>
                    <Typography>Account</Typography>
                    <Typography>Cart</Typography>
                    <Typography>Cookies</Typography>
                    <Typography>Prescribers</Typography>
                    </Grid>
                </Grid>
                </Grid>

                {/* Contact Us Section */}
                <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                    Contact Us
                </Typography>
                <Typography>
                    Address: Unit 2a And Unit 2p Building B East Lane, Wembley Commercial Centre, Middlesex, HA9 7UR
                </Typography>
                <Typography>Email: info@pillsphere.com</Typography>
                <Typography>Call: 555-555-1234</Typography>
                </Grid>
            </Grid>
            
            <Box sx={{ backgroundColor: '#F9F5E7', padding: '20px 0', textAlign: 'center' }}>
                {/* Registration Information */}
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Pharmacy GPHC Registration:
                    </Typography>
                    <Typography>Pill Sphere GPHC Number: XXXXXX</Typography>
                    </Grid>

                    <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />

                    <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Superintendent Pharmacist:
                    </Typography>
                    <Typography>GPHC Number: 2213569</Typography>
                    </Grid>

                    <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />

                    <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Company Registration:
                    </Typography>
                    <Typography>Pill Sphere Limited: 16158942</Typography>
                    </Grid>
                </Grid>

                {/* Certification Logos */}
                <Box display="flex" justifyContent="center" gap={2} marginY={2}>
                    <img src="/path-to-legit-logo.png" alt="LegitScript Certified" style={{ height: '40px' }} />
                    <img src="/path-to-registered-pharmacy.png" alt="Registered Pharmacy" style={{ height: '40px' }} />
                    <img src="/path-to-cyber-essentials.png" alt="Cyber Essentials Certified Plus" style={{ height: '40px' }} />
      </Box>

      {/* Copyright and Social Icons */}
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        © 2025 Pill Sphere LTD. All rights reserved.
      </Typography>

      <Box display="flex" justifyContent="center" gap={1} marginTop={1}>
        <IconButton><Facebook /></IconButton>
        <IconButton><Twitter /></IconButton>
        <IconButton><LinkedIn /></IconButton>
      </Box>
    </Box>

            {/* Footer Bottom
            <Box textAlign="center" marginTop={4}>
                <Typography variant="body2">
                © 2025 Pill Sphere LTD. All rights reserved.
                </Typography>
                <Box display="flex" justifyContent="center" gap={2} marginTop={1}>
                <IconButton><Facebook /></IconButton>
                <IconButton><Twitter /></IconButton>
                <IconButton><LinkedIn /></IconButton>
                </Box>
            </Box> */}
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