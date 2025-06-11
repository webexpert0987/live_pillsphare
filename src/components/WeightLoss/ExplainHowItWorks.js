import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomButton from "../Button/button";

const ExplainHowItWorks = () => {
  const steps = [
    {
      icon: (
        <img
          style={{ width: "100%" }}
          src={"/images/complete-assessment.png"}
          alt="Step 1 Icon"
        />
      ),
      title: "Complete Our Assessment",
      shortText: "Answer a few questions to help us understand your needs.",
    },
    {
      icon: (
        <img
          style={{ width: "100%" }}
          src={"/images/receive-treatment.png"}
          alt="Step 2 Icon"
        />
      ),
      title: "Receive Your Treatment",
      shortText: "Get your medication delivered in discreet packaging.",
    },
    {
      icon: (
        <img
          style={{ width: "100%" }}
          src={"/images/ongoing-support.png"}
          alt="Step 3 Icon"
        />
      ),
      title: "Ongoing Support",
      shortText:
        "Our clinicians are available to assist you throughout your journey.",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        //marginTop: { xs: "30px", sm: "40px", md: "50px" },
        textAlign: "center",
      }}
    >
      <Container
        sx={{
          paddingY: { xs: "40px", sm: "50px", md: "80px" },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            margin: "auto",
            width: { xs: "90%", md: "47%" },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "#fff",
              fontWeight: "600",
              marginBottom: { xs: "30px", sm: "40px", md: "60px" },
            }}
          >
            Let us explain how it works
          </Typography>
          {/* <Typography variant="h3" sx={{ color: '#fff', mb: 4 }}>
                        Obtain your prescription medication in just three simple steps. It's fast, easy, and hassle-free. Try our service today and experience the difference - you won't be disappointed.
                    </Typography>*/}
        </Box>
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: { xs: "center", md: "space-between" },
            paddingX: { xs: "0px", md: "10%" },
            display: "flex",
            flexWrap: { xs: "wrap", sm: "nowrap", md: "nowrap" },
          }}
        >
          {steps.map((step, index) => (
            <Grid
              key={index}
              sx={{
                width: { xs: "100%", sm: "33.33%", md: "33.33%" },
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100px", sm: "120px", md: "165px" },
                  }}
                >
                  {step.icon}
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: "18px", sm: "18px", md: "22px" },
                    fontWeight: "700",
                    marginTop: { xs: "15px", sm: "15px", md: "20px" },
                    marginBottom: { xs: "10px", sm: "15px", md: "15px" },
                    color: "#fff",
                    width: "100%",
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#FFF",
                    fontSize: { xs: "15px", sm: "16px", md: "16px" },
                    lineHeight: "1.5",
                  }}
                >
                  {step.shortText}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            marginTop: { xs: "30px", sm: "40px", md: "60px" },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => (window.location.href = "/questionnaire")}
            sx={{
              fontSize: { xs: "14px", sm: "17px", md: "18px" },
              fontWeight: "600",
              lineHeight: "1.4",
              // backgroundColor: "none",
              backgroundColor: "#FD6400",
              color: "#FFF",
              borderRadius: "50px",
              // border: "2px solid #FFFFFF",
              border: "none",
              textTransform: "inherit",
              padding: "12px 25px",
              boxShadow: "none",
            }}
          >
            Start Your Consultation Today
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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ExplainHowItWorks;
