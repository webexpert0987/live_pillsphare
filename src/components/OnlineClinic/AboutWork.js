import React from "react";
import { Box, Grid2, Typography, Button, Container } from "@mui/material";
import processImage from "../../pages/images/process-image.png";
import howItWorksBg from "../../pages/images/how-it-works-bg.svg";

const AboutWork = ({
  subtitle = "Your Path to Personalized Care",
  title = "A Simple, Hassle-Free Consultation & Treatment Process",
  paragraphs = [
    "We make getting the right treatment easy and convenient. Our seamless consultation and treatment process ensures that you receive expert guidance and personalized care from the comfort of your home. Start by selecting your concern, complete a quick and secure online consultation, and receive tailored treatment recommendations from our specialists. Once approved, your medication will be discreetly delivered to your doorstep. No waiting rooms, no long appointments—just expert care made simple.",
    "Your health and well-being are our priority. With our streamlined process, you can access safe and effective treatments quickly, ensuring you get the care you need without any hassle.",
  ],
  //buttonText = "Start Your Consultation",
  images = [howItWorksBg, processImage],
}) => {
  // Define styles inside the component
  const howItWorksStyles = {
    Wrapp: {
      backgroundColor: "#F7F7F7",
    },
    imageOne: {
      position: "absolute",
      left: "-40px",
      bottom: "-30px",
    },
    imageTwo: {
      maxWidth: "100%",
      borderRadius: "20px",
      zIndex: "1",
      position: "relative",
    },
    imageThree: {
      maxWidth: "100%",
      position: "absolute",
      right: "0",
      bottom: "0",
      borderRadius: "20px",
      zIndex: "2",
    },
    leftCol: {
      position: "relative",
    },
    rightCol: {
      padding: "30px 0 0 80px",
    },
    subtitle: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#FD6400",
      textTransform: "uppercase",
    },
    title: {
      fontSize: "32px",
      fontWeight: "700",
      color: "#333",
      lineHeight: "1.3",
      marginBottom: "20px",
    },
    paragraphtxt: {
      fontSize: "16px",
      fontWeight: "500",
      color: "#4A4A4A",
      lineHeight: "1.6",
      marginBottom: "25px",
    },
    btnAbout: {
      fontSize: "18px",
      fontWeight: "600",
      lineHeight: "1.4",
      backgroundColor: "#FD6400",
      color: "#FFF",
      borderRadius: "50px",
      border: "none",
      textTransform: "inherit",
      padding: "12px 25px",
      boxShadow: "none",
    },
  };

  return (
    <Box style={howItWorksStyles.Wrapp}>
      <Container>
        <Box
          sx={{ maxWidth: "100%", margin: "auto", padding: "70px 0 70px 0" }}
        >
          <Grid2 container spacing={0}>
            {/* Left Column */}
            <Grid2
              style={howItWorksStyles.leftCol}
              size={{ xs: 12, sm: 6, md: 6 }}
              spacing={2}
            >
              <Grid2 container spacing={0}>
                {images.slice(0, 3).map((image, index) => (
                  <Grid2
                    key={index}
                    item
                    xs={12}
                    sm={6}
                    md={index === 2 ? 12 : 6}
                  >
                    <img
                      src={image}
                      alt={`Image ${index + 0}`}
                      style={
                        index === 0
                          ? howItWorksStyles.imageOne
                          : index === 1
                          ? howItWorksStyles.imageTwo
                          : howItWorksStyles.imageThree
                      }
                    />
                  </Grid2>
                ))}
              </Grid2>
            </Grid2>

            {/* Right Column */}
            <Grid2
              style={howItWorksStyles.rightCol}
              size={{ xs: 12, sm: 6, md: 6 }}
              spacing={2}
            >
              <Typography
                style={howItWorksStyles.subtitle}
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                {subtitle}
              </Typography>
              <Typography
                style={howItWorksStyles.title}
                variant="h4"
                gutterBottom
              >
                {title}
              </Typography>
              {paragraphs.slice(0, 2).map((text, index) => (
                <Typography
                  style={howItWorksStyles.paragraphtxt}
                  key={index}
                  paragraph
                >
                  {text}
                </Typography>
              ))}
              {/*<Button
              style={howItWorksStyles.btnAbout}
              variant="contained"
              color="primary"
              onClick={() => (window.location.href = "/questionnaire")}
            >
              {buttonText}{" "}
              <svg
                style={{ marginLeft: "10px" }}
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 7L11 1M17 7L11 13M17 7L6.5 7M1 7L3.5 7"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>*/}
            </Grid2>
          </Grid2>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutWork;
