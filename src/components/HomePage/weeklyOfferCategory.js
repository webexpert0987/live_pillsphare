import React from "react";
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import { Icon } from '@iconify/react';

const WeeklyOffersSection = () => {
    const categories = [
        { name: 'Weight Loss', discount: '20%', image: "/images/pngegg 1.png"},
        { name: 'Skin Care', discount: '15%', image: "/images/list-2-removebg-preview 1.png"},
        { name: 'Hair Loss', discount: '31%', image: "/images/pngegg (2) 1.png" },
        { name: 'Ayurvedic', discount: '20%', image: "/images/pngegg (3) 1.png" },
    ];
  
    return (
        <Container sx={{ marginY:'50px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    {/* Section Title */}
                    <Typography variant="h1" sx={{ fontWeight: "bold", marginBottom: "1rem", textAlign: 'left' }}>
                        Weekly offers by categories
                    </Typography>
                    <Typography variant="h3" sx={{ marginBottom: "1rem", color: "#555" }}>
                        Take advantages of exclusive weekly deals across a variety of categories!
                    </Typography>
                </Box>

                {/* View All Button */}
                <Button
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
                </Button>
            </Box>
            <Grid container spacing={2}>
                {categories.map((category) => (
                    <Grid item xs={6} sm={3} key={category.name} sx={{position: 'relative'}}>
                        <Box
                            sx={{
                                border: '1px solid lightgrey',
                                textAlign: 'right',
                                borderRadius: '10px',
                                backgroundColor: 'secondary.main',
                                height: '225px',
                                position: 'relative'
                            }}
                        >
                            <img src={category.image} style={{position: 'absolute', top:'15px', zIndex: 99, right:0, width: '176px', height: '208px'}}/>
                        </Box>
                        <Box position={'absolute'} bottom={'10px'} left={'10%'}>
                            <Typography variant="subtitle1">{category.name}</Typography>
                            <Typography variant="h6"> {category.discount} off</Typography>
                            <Button  size="small">
                                View More <Icon icon="solar:arrow-right-broken" color="primary.main" width="22" height="22" />
                            </Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
  };

export default WeeklyOffersSection