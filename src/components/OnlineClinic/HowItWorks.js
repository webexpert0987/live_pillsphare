import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CustomButton from '../Button/button';
import { Link } from "react-router-dom"; 
const HowItWorksSection = () => {
  const steps = [
    {
      icon: <img style={{width: '120px', height: 'auto'}} src={'/images/01_image.png'} alt="Step 1 Icon" />,
      title: 'Select your condition',
    },
    {
      icon: <img style={{width: '120px', height: 'auto'}} src={'/images/02_image.png'} alt="Step 2 Icon" />,
      title: 'Answer questions designed by our healthcare professionals, so we can determine the relevant treatment for you',
    },
    {
      icon: <img style={{width: '120px', height: 'auto'}} src={'/images/03_image.png'} alt="Step 3 Icon" />,
      title: 'We will determine any relevant treatments that we can provide to treat your condition',
    },
    {
      icon: <img style={{width: '120px', height: 'auto'}} src={'/images/03_image.png'} alt="Step 4 Icon" />,
      title: 'We will issue the prescription and treatment in one cost and have your treatment sent out to you fast and discreet by Royal Mail',
    },
  ];

  const HowItWorks = {
    Btn: {
        boxShadow: "none"
    },
    description: {
        fontSize: "16px",
        lineHeight: "1.5",
        fontWeight: "400"
    },
  };

  return (
        <Box sx={{ backgroundColor: 'primary.main', textAlign: 'center' }}>
            <Container sx={{paddingY: '80px'}} >
                <Box sx={{textAlign: 'center', margin: 'auto', width: {xs:'90%', md:'47%'}}}>
                    <Typography variant="h1" sx={{ color: '#fff', fontWeight: '600', mb:5 }}>Let us explain how it works</Typography>
                    {/*<Typography variant="h3" sx={{ color: '#fff', mb: 4 }}>
                        Obtain your prescription medication in just three simple steps. It's fast, easy, and hassle-free. Try our service today and experience the difference - you won't be disappointed.
                    </Typography>*/}
                </Box>
                <Grid container spacing={3} sx={{ justifyContent: {xs: 'center', md: 'space-between'}, paddingX: {xs:"0px", md:'0'} }}>
                    {steps.map((step, index) => (
                        <Grid size={{ xs: 12, sm: 4, md: 3 }} key={index}>
                            <Box sx={{
                                padding: '1rem',
                                textAlign: 'center',
                            }}>
                                {step.icon}
                                <Typography style={HowItWorks.description} variant="h4" sx={{ mt: 2, color: '#fff' }}>{step.title}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                {/* <Button variant="contained" sx={{ mt: 4, backgroundColor: 'tertiary.main', borderRadius: '20px' }}>
                    Read More <Icon icon="solar:arrow-right-broken" color="#fff" width="22" height="22" />
                </Button> */}
               <Link to="/how-it-work" style={{ textDecoration: "none" }}> <CustomButton  style={HowItWorks.Btn} bgColor={"tertiary.main"} txColor={"#fff"} text='Start Your Consultation Today'/>
           </Link> </Container>
        </Box>
  );
};


export default HowItWorksSection;