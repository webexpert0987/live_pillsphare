import React from "react";
import { Box, Typography, Container, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomButton from "../Button/button";
import { Link } from "react-router-dom";

const HowItWorksSection = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const steps = [
    {
      icon: (
        <img
          style={{
            width: isMobile ? "110px" : "224px", // Change width for mobile
            height: isMobile ? "110px" : "228px", // Optional: adjust height too
          }}
          src={"/images/01_image.png"}
          alt="Step 1 Icon"
        />
      ),
      title:
        "Complete a free quick online questionnaire for the treatment selected.",
    },
    {
      icon: (
        <img
          style={{
            width: isMobile ? "110px" : "224px", // Change width for mobile
            height: isMobile ? "110px" : "228px", // Optional: adjust height too
          }}
          src={"/images/02_image.png"}
          alt="Step 2 Icon"
        />
      ),
      title: "Then to be reviewed by one of our dedicated prescribers.",
    },
    {
      icon: (
        <img
          style={{
            width: isMobile ? "110px" : "224px", // Change width for mobile
            height: isMobile ? "110px" : "228px", // Optional: adjust height too
          }}
          src={"/images/03_image.png"}
          alt="Step 3 Icon"
        />
      ),
      title:
        "Receive your medication discreetly on the next day from our UK registered pharmacy.",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        marginTop: { xs: "25px", sm: "40px", md: "50px" },
        textAlign: "center",
      }}
    >
      <Container
        sx={{
          paddingY: { xs: "30px", sm: "40px", md: "80px" },
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
            variant="h2"
            sx={{
              color: "#fff",
              fontWeight: "600",
              mb: 2,
              fontSize: { xs: "22px", sm: "30px", md: "38px" },
              fontWeight: "800",
            }}
          >
            How it works
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: "#fff",
              mb: 4,
              lineHeight: "1.5",
              fontSize: { xs: "15px", sm: "16px", md: "18px" },
              fontWeight: "400",
            }}
          >
            Obtain your prescription medication in just three simple steps. It's
            fast, easy, and hassle-free. Try our service today and experience
            the difference - you won't be disappointed.
          </Typography>
        </Box>
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: { xs: "center", md: "space-between" },
            paddingX: { xs: "0px", md: "100px" },
          }}
        >
          {steps.map((step, index) => (
            <Grid key={index}>
              <Box
                sx={{
                  width: { xs: "100%", sm: "100%", md: "320px" },
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                {step.icon}
                <Typography
                  variant="h4"
                  sx={{
                    mt: 2,
                    color: "#fff",
                    lineHeight: "1.5",
                    fontWeight: "400",
                    fontSize: { xs: "15px", sm: "15px", md: "16px" },
                  }}
                >
                  {step.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        {/* <Button variant="contained" sx={{ mt: 4, backgroundColor: 'tertiary.main', borderRadius: '20px' }}>
                    Read More <Icon icon="solar:arrow-right-broken" color="#fff" width="22" height="22" />
                </Button> */}
        <Link
          // to="/how-it-work"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <CustomButton
            bgColor={"tertiary.main"}
            txColor={"#fff"}
            text="Read More"
          />
        </Link>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;
