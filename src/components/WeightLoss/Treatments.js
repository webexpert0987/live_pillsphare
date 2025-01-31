import React from "react";
import { Box, Grid2, Typography, Button, Container } from "@mui/material";
import Treatment from "../../pages/images/treatment.png";
import TreatmentOver from "../../pages/images/treatment2.png";
import howItWorksBg from "../../pages/images/how-it-works-bg.svg";

const Treatments = ({
  subtitle = "Treatments",
  title = "Understanding GLP-1 Treatments",
  paragraphs = [
    "Glucagon-like peptide-1 receptor agonists (GLP-1 RAs) are medications that help reduce blood sugar and control appetite by mimicking the body's natural incretin hormones.",
    "Clinical studies have shown that participants using GLP-1 medications lost significantly more weight compared to those relying on diet and exercise alone.",
  ],
  buttonText = "Read More About",
  images = [howItWorksBg, Treatment, TreatmentOver],
}) => {
  // Define styles inside the component
  const howItWorksStyles = {
    imageOne: {
      position: "absolute",
      left: "20px",
      top: "40px",
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
      left: "0",
      bottom: "-30px",
      borderRadius: "20px",
      zIndex: "2",
    },
    leftCol: {
      position: "relative",
      display: "flex",
      justifyContent: "right",
    },
    rightCol: {
      padding: "0 10% 0 0",
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
    },
    TreatmentWrapp: {
      alignItems: "center",
    },
  };

  return (
    <Container>
      <Box sx={{ maxWidth: "100%", margin: "auto", padding: "70px 0 60px 0" }}>
        <Grid2 container spacing={0} style={howItWorksStyles.TreatmentWrapp}>
          {/* Left Column */}
          <Grid2
            style={howItWorksStyles.rightCol}
            size={{ xs: 12, sm: 6, md: 8 }}
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
            <Button
              style={howItWorksStyles.btnAbout}
              variant="contained"
              color="primary"
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
            </Button>
          </Grid2>

          {/* Right Column */}
          <Grid2
            style={howItWorksStyles.leftCol}
            size={{ xs: 12, sm: 6, md: 4 }}
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
        </Grid2>
      </Box>
    </Container>
  );
};

export default Treatments;
