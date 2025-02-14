import React from "react";
import { Box, Grid2, Typography, Button, Container } from "@mui/material";
import imageOne from "../../pages/images/treatment.png";
import imageTwo from "../../pages/images/treatment2.png";
import imageThree from "../../pages/images/how-it-works-bg.svg";

const Treatments = ({
  subtitle = "Treatments",
  title = "Understanding GLP-1 Treatments",
  paragraphs = [
    "Glucagon-like peptide-1 receptor agonists (GLP-1 RAs) are medications that help reduce blood sugar and control appetite by mimicking the body's natural incretin hormones.",
    "Clinical studies have shown that participants using GLP-1 medications lost significantly more weight compared to those relying on diet and exercise alone.",
  ],
  buttonText = "Start Your Consultation Today",
}) => {
  // Define styles inside the component

  return (
    <Container>
      <Box
        sx={{
          maxWidth: "100%",
          margin: "auto",
          padding: {
            xs: "30px 0 30px 0",
            sm: "50px 0 40px 0",
            md: "70px 0 60px 0",
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
              variant="subtitle1"
              color="textSecondary"
              gutterBottom
              sx={{
                fontSize: { xs: "15px", sm: "16px", md: "18px" },
                fontWeight: "700",
                color: "#FD6400",
                textTransform: "uppercase",
              }}
            >
              {subtitle}
            </Typography>
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => (window.location.href = "/questionnaire")}
              sx={{
                fontSize: { xs: "14px", sm: "17px", md: "18px" },
                fontWeight: "600",
                lineHeight: "1.4",
                backgroundColor: "#FD6400",
                color: "#FFF",
                borderRadius: "50px",
                border: "none",
                textTransform: "inherit",
                padding: "12px 25px",
                boxShadow: "none",
              }}
            >
              {buttonText}
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
  );
};

export default Treatments;
