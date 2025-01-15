import React from "react";
import { Box, Button, Card, CardContent, Container, Typography, useTheme } from "@mui/material";
import { Icon } from '@iconify/react'
import CustomButton from "../Button/button";

const treatments = [
  {
    title: "Weight Loss",
    description:
      "Changes to diet and exercise are often combined with this medication.",
    // icon: "hugeicons:body-weight",
    icon: "/images/weight-loss.png",
    link: "#",
  },
  {
    title: "Mens Health",
    description:
      "Men tend to go less frequently to medical professionals to seek help...",
    // icon: "solar:men-broken",
    icon: "/images/mens-health.png",
    link: "#",
  },
  {
    title: "Womens Health",
    description:
      "Women can be the most caring members of the family but can...",
    // icon: "solar:women-broken",
    icon: "/images/womens-health.png",
    link: "#",
  },
  {
    title: "General Wellbeing",
    description: "We at the Medicus Express are passionate about encouraging a...",
    icon: "/images/general-wellbeing.png",
    link: "#",
  },
];

const TreatmentSection = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                backgroundColor: "secondary.main",
                padding: {xs:"4rem 1rem 4rem 1rem", md: '4rem'},
                textAlign: "center",
            }}
        >
            <Container>
                <Box sx={{ display: {xs:'block', sm: 'flex' }, alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}>
                    <Box>
                        {/* Section Title */}
                        <Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: "1rem", textAlign: 'left' }}>
                            Explore our treatments
                        </Typography>
                        <Typography variant="h3" sx={{ marginBottom: {xs: "0px", sm: '1rem'}, color: "#555", textAlign: 'left' }}>
                            Explore our offerings and find the perfect treatment for your goals
                            today!
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

                {/* Cards */}
                {/* <Box
                    display={{ xs:'block', sm: "flex", md:'flex', lg:'flex' }}
                    sx={{
                        justifyContent: "center",
                        gap: "2.5rem",
                        marginBottom: "2rem",
                    }}
                >
                    {treatments.map((treatment, index) => (
                        <Card
                            key={index}
                            sx={{
                                width: "100%",
                                borderRadius: "16px",
                                boxShadow: "0px 0px 0px rgb(255, 255, 255)",
                            }}
                        >
                            <CardContent sx={{ textAlign: 'left', paddingBottom: '16px !important' }}>
                                <Box >
                                    <img
                                        src={treatment.icon}
                                        alt={treatment.title}
                                    />
                                </Box>
                                <Typography
                                    variant="body3"

                                    sx={{
                                        fontWeight: "bold",
                                        marginBottom: "0.5rem",
                                        color: "#333",
                                    }}
                                >
                                    {treatment.title}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    sx={{ marginBottom: "1rem", color: "#777" }}
                                >
                                    {treatment.description}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: "bold",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <a
                                        href={treatment.link}
                                        style={{
                                            textDecoration: "none",
                                            color: "#FD6400",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        Read More <span style={{ marginLeft: "0.5rem" }}><Icon icon="solar:arrow-right-broken" color="primary.main" width="22" height="22" /></span>
                                    </a>
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box> */}

                <Box
                    // display={{ xs: "flex", sm: "flex", md: "flex", lg: "flex" }}
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    // flexDirection={{xs: "column", sm: "column", md: "row", lg: "row", xl: "row", xxl: 'row' }}
                    flexDirection={{xs: "column", md: "row" }}
                    gap={{ xs: "1rem", sm: "2rem", md: "2rem", lg: "2rem" }}
                    marginBottom="2rem"
                    marginTop={'2rem'}
                >
                    {treatments.map((treatment, index) => (
                        <Card
                            key={index}
                            sx={{
                                width: { xs: "100%", sm: "100%", md: "22.8%", lg: '23.2%', },
                                borderRadius: "16px",
                                boxShadow: "0px 0px 0px rgb(255, 255, 255)",
                            }}
                        >
                            <CardContent sx={{ textAlign: "left", paddingBottom: "16px !important" }}>
                                <Box>
                                    <img
                                        src={treatment.icon}
                                        alt={treatment.title}
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                </Box>
                                <Typography
                                    variant="body3"
                                    sx={{
                                        fontWeight: "bold",
                                        marginBottom: "0.5rem",
                                        color: "#333",
                                    }}
                                >
                                    {treatment.title}
                                </Typography>
                                <Typography variant="h4" sx={{ marginBottom: "1rem", color: "#777" }}>
                                    {treatment.description}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: "bold",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <a
                                        href={treatment.link}
                                        style={{
                                            textDecoration: "none",
                                            color: "#FD6400",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        Read More{" "}
                                        <span style={{ marginLeft: "0.5rem" }}>
                                            <Icon icon="solar:arrow-right-broken" color="primary.main" width="22" height="22" />
                                        </span>
                                    </a>
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                {/* Footer Text */}
                <Typography
                    variant="h4"
                    sx={{
                        marginTop: "2rem",
                        fontWeight: "600",
                        textAlign: 'left'
                    }}
                >
                    Our expert team is committed to delivering effective solutions tailored
                    to help you look and feel your best.
                </Typography>
            </Container>
        </Box>
    );
};

export default TreatmentSection;
