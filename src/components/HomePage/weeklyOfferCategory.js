import React from "react";
import { Box, Typography, Button, Container } from '@mui/material';
import Grid  from '@mui/material/Grid2';
import { Icon } from '@iconify/react';
import CustomButton from "../Button/button";

const WeeklyOffersSection = () => {
    const categories = [
        { name: 'Weight Loss', discount: '20%', image: "/images/pngegg.png"},
        { name: 'Skin Care', discount: '15%', image: "/images/list-2-removebg-preview.png"},
        { name: 'Hair Loss', discount: '31%', image: "/images/pngegg2.png" },
        { name: 'Ayurvedic', discount: '20%', image: "/images/pngegg3.png" },
    ];
  
    return (
        <Container sx={{ marginY:'80px' }}>
            <Box sx={{ display: {xs:'block', sm: 'flex' }, alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}>
                <Box>
                    {/* Section Title */}
                    <Typography variant="h1" sx={{ fontWeight: "bold", marginBottom: "1rem", textAlign: 'left' }}>
                        Weekly offers by categories
                    </Typography>
                    <Typography variant="h3" sx={{ marginBottom: {xs: "0px", sm: '1rem'}, color: "#555" }}>
                        Take advantages of exclusive weekly deals across a variety of categories!
                    </Typography>
                </Box>

                {/* View All Button */}
                {/* <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "primary.main",
                        color: "#fff",
                        borderRadius: "16px",
                        padding: "0.5rem 2rem",
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: "#1f3d3e",
                        },
                    }}
                >
                    View All <Icon icon="solar:arrow-right-broken" color="#fff" width="24" height="24" />
                </Button> */}
                <CustomButton bgColor={"primary.main"} txColor={"#fff"} text='View All'/>
            </Box>
            {/* <Grid container spacing={2}> */}
            <Grid container spacing={{ xs: 2, md: 3, lg: 5 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }} width={'100%'} marginY={'40px'}>
                {categories.map((category, index) => (
                    // <Grid item xs={6} sm={3} key={category.name} sx={{position: 'relative'}}>
                    <Grid key={index} size={{ xs: 4, sm: 4, md: 4, lg: 3 }} sx={{position: 'relative'}}>
                        <Box>
                            <Box
                                sx={{
                                    border: '1px solid lightgrey',
                                    textAlign: 'right',
                                    borderRadius: '10px',
                                    backgroundColor: 'secondary.main',
                                    height: '225px',
                                    position: 'relative',
                                    width: '100%'
                                }}
                            >
                                {/* <img src={category.image} style={{position: 'absolute', top:'15px', zIndex: 99, right:0, width: '176px', height: '208px'}}/> */}
                                <img src={category.image} style={{height: '100%', width: '100%', objectFit: 'contain', objectPosition: 'right'}}/>
                            </Box>
                            <Box position={'absolute'} bottom={'10px'} left={'5%'}>
                                <Typography variant="subtitle1">{category.name}</Typography>
                                <Typography variant="h6" sx={{fontWeight: '600  '}}> {category.discount} off</Typography>
                                <Button  size="small" sx={{fontWeight: '600', textTransform: 'capitalize'}}>
                                    View More <Icon icon="solar:arrow-right-broken" color="primary.main" width="22" height="22" />
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
  };

export default WeeklyOffersSection