import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
      <Box
          sx={{
              backgroundColor: 'primary.main',
              color: '#fff',
              padding: '2rem 0',
              textAlign: 'center',
          }}
      >
          <Container>

              <Grid container spacing={2}>
                  <Grid item xs={12} md={6} display={'flex'} justifyContent={'space-between'}>
                      <Typography variant="body2">
                          Join our email subscription now to get updates on new offers and notifications.
                      </Typography>
                      <Box
                          sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mt: 2,
                          }}
                      >
                          <TextField
                              id="outlined-basic"
                              label="Enter Your Email"
                              variant="outlined"
                              sx={{ mr: 2 }}
                          />
                          <Button variant="contained" color="primary">
                              Subscribe Now
                          </Button>
                      </Box>
                  </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                  <img
                      src="/path/to/pillsphere-logo.svg" // Replace with actual logo path
                      alt="PillSphere Logo"
                      style={{ maxWidth: '150px' }}
                  />
              </Grid>

              <Grid container spacing={2} sx={{ mt: 4 }}>
                  <Grid item xs={12} md={4}>
                      <Typography variant="h6">Categories</Typography>
                      <List>
                          <ListItem>
                              <ListItemText primary="Men's Health" />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="Women's Health" />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="Pediatric Health" />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="General Wellbeing" />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="Delivery" />
                          </ListItem>
                      </List>
                  </Grid>
                  <Grid item xs={12} md={4}>
                      <Typography variant="h6">Account</Typography>
                      <List>
                          <ListItem>
                              <ListItemText primary="How It Works" />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="About Us" />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="Cart" />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="Cookies" />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="Prescribers" />
                          </ListItem>
                      </List>
                  </Grid>
                  <Grid item xs={12} md={4}>
                      <Typography variant="h6">Contact Us</Typography>
                      <List>
                          <ListItem>
                              <ListItemIcon>
                                  {/* <LocationOnIcon />  */}
                              </ListItemIcon>
                              <ListItemText
                                  primary="Address: Unit 20 And Unit 2p Building 8 East"
                                  secondary="Lone Werritsley Commercial Centre, Wembley, Middlesex, United Kingdom, HA9 7UR"
                              />
                          </ListItem>
                          <ListItem>
                              <ListItemIcon>
                                  {/* <EmailIcon />  */}
                              </ListItemIcon>
                              <ListItemText primary="Email: info@pillsphere.com" />
                          </ListItem>
                          <ListItem>
                              <ListItemIcon>
                                  {/* <PhoneIcon />  */}
                              </ListItemIcon>
                              <ListItemText primary="Call: 555-555-1234" />
                          </ListItem>
                      </List>
                  </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mt: 4 }}>
                  <Grid item xs={12} md={4}>
                      <Typography variant="body2">
                          Pharmacy GPHC Registration:
                      </Typography>
                      <Typography variant="body2">
                          Pill Sphere GPHC Number: XXXXXXX
                      </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                      <Typography variant="body2">
                          Superintendent Pharmacist
                      </Typography>
                      <Typography variant="body2">
                          GPHC Number: 2213569
                      </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                      <Typography variant="body2">
                          Company Registration:
                      </Typography>
                      <Typography variant="body2">
                          Pill Sphere Limited: 16158942
                      </Typography>
                  </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mt: 4 }}>
                  <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <img
                              src="/path/to/gphc-logo.png" // Replace with actual logo path
                              alt="GPHC Logo"
                              style={{ marginRight: '10px' }}
                          />
                          <img
                              src="/path/to/ema-logo.png" // Replace with actual logo path
                              alt="EMA Logo"
                              style={{ marginRight: '10px' }}
                          />
                          <img
                              src="/path/to/mhra-logo.png" // Replace with actual logo path
                              alt="MHRA Logo"
                              style={{ marginRight: '10px' }}
                          />
                      </Box>
                  </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mt: 4 }}>
                  <Grid item xs={12}>
                      <Typography variant="body2">
                          © 2025 Pill Sphere LTD. All rights reserved.
                      </Typography>
                  </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <FacebookIcon />
                          <InstagramIcon />
                          <LinkedInIcon />
                      </Box>
                  </Grid>
              </Grid>
          </Container>
      </Box>
  );
};

export default Footer;