import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Icon } from '@iconify/react';
import CustomButton from '../Button/button';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <img style={{width: '224px', height: '228px'}} src={'/images/01_image.png'} alt="Step 1 Icon" />,
      title: 'Complete a free quick online questionnaire for the treatment selected.',
    },
    {
      icon: <img style={{width: '224px', height: '228px'}} src={'/images/02_image.png'} alt="Step 2 Icon" />,
      title: 'Then to be reviewed by one of our dedicated prescribers.',
    },
    {
      icon: <img style={{width: '224px', height: '228px'}} src={'/images/03_image.png'} alt="Step 3 Icon" />,
      title: 'Receive your medication discreetly on the next day from our UK registered pharmacy.',
    },
  ];

  return (
        <Box sx={{ backgroundColor: 'primary.main', marginTop: '50px', textAlign: 'center' }}>
            <Container sx={{paddingY: '80px'}} >
                <Box sx={{textAlign: 'center', margin: 'auto', width: {xs:'90%', md:'47%'}}}>
                    <Typography variant="h1" sx={{ color: '#fff', fontWeight: '600', mb:2 }}>How it works</Typography>
                    <Typography variant="h3" sx={{ color: '#fff', mb: 4 }}>
                        Obtain your prescription medication in just three simple steps. It's fast, easy, and hassle-free. Try our service today and experience the difference - you won't be disappointed.
                    </Typography>
                </Box>
                <Grid container spacing={3} sx={{ justifyContent: {xs: 'center', md: 'space-between'}, paddingX: {xs:"0px", md:'100px'} }}>
                    {steps.map((step, index) => (
                        <Grid key={index}>
                            <Box sx={{
                                width: '250px',
                                padding: '1rem',
                                textAlign: 'center',
                            }}>
                                {step.icon}
                                <Typography variant="h4" sx={{ mt: 2, color: '#fff' }}>{step.title}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                {/* <Button variant="contained" sx={{ mt: 4, backgroundColor: 'tertiary.main', borderRadius: '20px' }}>
                    Read More <Icon icon="solar:arrow-right-broken" color="#fff" width="22" height="22" />
                </Button> */}
                <CustomButton bgColor={"tertiary.main"} txColor={"#fff"} text='Read More'/>
            </Container>
        </Box>
  );
};


export default HowItWorksSection;