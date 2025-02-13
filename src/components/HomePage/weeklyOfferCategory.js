import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Icon } from "@iconify/react";
import CustomButton from "../Button/button";

const WeeklyOffersSection = () => {
  const categories = [
    {
      name: "Weight Loss",
      discount: "20%",
      image: "/images/weight-loss-cat.jpg",
    },
    {
      name: "Skin Care",
      discount: "15%",
      image: "/images/kin-care-cat.jpg",
    },
    { name: "Hair Loss", discount: "31%", image: "/images/hair-loss-cat.jpg" },
    { name: "Ayurvedic", discount: "20%", image: "/images/ayurvedic-cat.jpg" }, 
  ];

  return (
    <Container
      sx={{
        marginY: { xs: "30px", sm: "40px", md: "80px" },
      }}
    >
      <Box
        sx={{
          display: { xs: "block", sm: "flex" },
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "left",
        }}
      >
        <Box>
          {/* Section Title */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "22px", sm: "26px", md: "32px" },
              fontWeight: "bold",
              marginBottom: "1rem",
              textAlign: "left",
            }}
          >
            Weekly offers by categories
          </Typography>
          <Typography
            variant="h3"
            sx={{
              marginBottom: { xs: "0px", sm: "1rem" },
              fontSize: { xs: "16px", sm: "17px", md: "18px" },
              color: "#333333",
              fontWeight: "500",
              lineHeight: "1.5",
            }}
          >
            Take advantages of exclusive weekly deals across a variety of
            categories!
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
        <CustomButton
          bgColor={"primary.main"}
          txColor={"#fff"}
          text="View All"
        />
      </Box>
      {/* <Grid container spacing={2}> */}
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 4 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
        width={"100%"}
        marginY={"40px"}
      >
        {categories.map((category, index) => (
          // <Grid item xs={6} sm={3} key={category.name} sx={{position: 'relative'}}>
          <Grid
            key={index}
            size={{ xs: 4, sm: 4, md: 4, lg: 3 }}
            sx={{ position: "relative" }}
          >
            <Box>
              <Box
                sx={{
                  textAlign: "right",
                  borderRadius: "12px",
                  position: "relative",
                  display: "flex",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                {/* <img src={category.image} style={{position: 'absolute', top:'15px', zIndex: 99, right:0, width: '176px', height: '208px'}}/> */}
                <img
                  src={category.image}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </Box>
              <Box
                position={"absolute"}
                bottom={"0"}
                left={"0"}
                sx={{
                  paddingLeft: { xs: "15px", sm: "20px", md: "20px" },
                  paddingBottom: { xs: "10px", sm: "10px", md: "10px" },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: { xs: "20px", sm: "18px", md: "22px" },
                    fontWeight: "800",
                    lineHeight: "1.3",
                  }}
                >
                  {category.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "800",
                    color: "#000",
                    fontSize: { xs: "18px", sm: "20px", md: "24px" },
                    lineHeight: "1.3",
                  }}
                >
                  {" "}
                  <Box
                    component="span"
                    sx={{
                      fontWeight: "800",
                      fontSize: { xs: "20px", sm: "24px", md: "30px" },
                      color: "#FF3838",
                      lineHeight: "1.3",
                    }}
                  >
                    {category.discount}
                  </Box>{" "}
                  off
                </Typography>
                <Button
                  size="small"
                  sx={{ fontWeight: "600", textTransform: "capitalize", marginTop: "7px", padding: "0" }}
                >
                  View More{" "}
                  <Icon
                    icon="solar:arrow-right-broken"
                    color="primary.main"
                    width="22"
                    height="22"
                  />
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WeeklyOffersSection;
