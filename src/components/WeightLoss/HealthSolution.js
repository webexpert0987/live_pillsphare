import React from "react";
import { Box, Grid2, Typography, Button, Container } from "@mui/material";
import imageOne from "../../pages/images/treatment.png";
import imageTwo from "../../pages/images/treatment2.png";
import imageThree from "../../pages/images/how-it-works-bg.svg";

const HealthSolution = ({
  title = "Discover Personalised Health Solutions Tailored Just for You | Pillsphere",
  paragraphs = [
    "At Pillsphere, we understand that everyone’s biology is unique—what works for one person may not work for another. That’s why we specialise in creating customised health and wellness plans designed to meet your individual needs. Our platform offers personalised medication solutions and expert guidance, empowering you to take control of your health with confidence. Experience the difference of tailored care with Curate, your trusted partner in personalised health management in the UK.",
  ],
  buttonText = "Start Your Consultation Today",
}) => {
  // Define styles inside the component

  return (
    <>
      <Box sx={{ backgroundColor: "#fff" }}>
        <Container>
          <Box
            sx={{
              maxWidth: "100%",
              margin: "auto",
              padding: {
                xs: "30px 0 50px 0",
                sm: "50px 0 60px 0",
                md: "70px 0 90px 0",
              },
            }}
          >
            <Grid2
              container
              spacing={0}
              sx={{
                alignItems: "center",
              }}
            >
              {/* Left Column */}
              <Grid2
                size={{ xs: 12, sm: 6, md: 8 }}
                spacing={2}
                sx={{
                  padding: {
                    xs: "0 0 0 0",
                    sm: "0 10% 0 0",
                    md: "0 10% 0 0",
                  },
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "22px", sm: "30px", md: "32px" },
                    fontWeight: "700",
                    color: "#333",
                    lineHeight: "1.3",
                    marginBottom: "20px",
                  }}
                >
                  {title}
                </Typography>
                {paragraphs.slice(0, 2).map((text, index) => (
                  <Typography
                    key={index}
                    sx={{
                      fontSize: { xs: "15px", sm: "16px", md: "16px" },
                      fontWeight: "500",
                      color: "#4A4A4A",
                      lineHeight: "1.6",
                      marginBottom: "25px",
                    }}
                  >
                    {text}
                  </Typography>
                ))}
              </Grid2>

              {/* Right Column */}
              <Grid2
                size={{ xs: 12, sm: 6, md: 4 }}
                spacing={2}
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <Grid2 container spacing={0}>
                  <Grid2 item xs={12} sm={6} md={5}>
                    <Box
                      component="img"
                      src={imageThree}
                      sx={{
                        position: "absolute",
                        left: { xs: "0", sm: "20px", md: "20px" },
                        top: "40px",
                      }}
                    />
                    <Box
                      component="img"
                      src={imageOne}
                      sx={{
                        maxWidth: { xs: "80%", sm: "100%", md: "100%" },
                        borderRadius: "20px",
                        zIndex: "1",
                        position: "relative",
                        right: { xs: "-20%", sm: "0", md: "0" },
                        top: { xs: "20px", sm: "0", md: "0" },
                      }}
                    />
                    <Box
                      component="img"
                      src={imageTwo}
                      sx={{
                        maxWidth: "40%",
                        position: "absolute",
                        left: "0",
                        bottom: "-30px",
                        borderRadius: "20px",
                        zIndex: "2",
                      }}
                    />
                  </Grid2>
                </Grid2>
              </Grid2>
            </Grid2>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HealthSolution;
