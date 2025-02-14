import React from "react";
import { Box, Grid2, Typography, Button, Container } from "@mui/material";
import howItWorks from "../../pages/images/how-it-works.jpg";
import howItWorksSm from "../../pages/images/how-it-works2.jpg";
import howItWorksBg from "../../pages/images/how-it-works-bg.svg";

const HowItWorks = ({
  subtitle = "How it Works?",
  title = "How do weight loss treatments work?",
  paragraphs = [
    "Although they should not be used as a substitute for a healthy diet and lifestyle, weight loss medications can help you to lose more weight than dieting alone.",
    "Some weight loss aids, such as Mysimba and Saxenda weight loss injections, work by controlling your appetite, which can help you to consume fewer calories. On the other hand, treatments like Orlistat and Alli work by helping your body to absorb less fat from your food.",
    "Weight loss aids can be useful for those who have a high BMI and are struggling to lose weight or for those who have a medical condition that can be made worse if you're overweight.",
    "Answer our quick questionnaire and our prescriber will decide whether a prescription weight loss medication will be beneficial for you.",
  ],
  buttonText = "Start Your Consultation",
}) => {
  return (
    <Container>
      <Box
        sx={{
          maxWidth: "100%",
          margin: "auto",
          padding: {
            xs: "30px 0 30px 0",
            sm: "50px 0 50px 0",
            md: "70px 0 70px 0",
          },
        }}
      >
        <Grid2 container spacing={0}>
          {/* Left Column */}
          <Grid2
            size={{ xs: 12, sm: 6, md: 5 }}
            spacing={2}
            sx={{
              position: "relative",
            }}
          >
            <Grid2 container spacing={0}>
              <Grid2 item xs={12} sm={6} md={5}>
                <Box
                  component="img"
                  src={howItWorksBg}
                  sx={{
                    position: "absolute",
                    right: "20px",
                    top: "40px",
                    display: { xs: "none", sm: "block", md: "block" },
                  }}
                />
                <Box
                  component="img"
                  src={howItWorks}
                  sx={{
                    maxWidth: "100%",
                    borderRadius: "20px",
                    zIndex: "1",
                    position: "relative",
                  }}
                />
                <Box
                  component="img"
                  src={howItWorksSm}
                  sx={{
                    maxWidth: "100%",
                    position: "absolute",
                    right: "0",
                    bottom: "0",
                    borderRadius: "20px",
                    zIndex: "2",
                    display: { xs: "none", sm: "block", md: "block" },
                  }}
                />
              </Grid2>
            </Grid2>
          </Grid2>

          {/* Right Column */}
          <Grid2
            size={{ xs: 12, sm: 6, md: 7 }}
            spacing={2}
            sx={{
              padding: {
                xs: "20px 0 0 0px",
                sm: "30px 0 0 50px",
                md: "30px 0 0 80px",
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
            {paragraphs.slice(0, 4).map((text, index) => (
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
        </Grid2>
      </Box>
    </Container>
  );
};

export default HowItWorks;
