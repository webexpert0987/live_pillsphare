import React from "react";
import { Box, Container, Typography, Button } from "@mui/material"; // Added Button import
import { Link } from "react-router-dom";

function QuestionHero() {
  return (
    <>
      <Box
        sx={{
          background: "#104239",
          textAlign: "center",
          padding: { xs: "40px 0", sm: "50px 0", md: "100px 0" },
        }}
      >
        <Container>
          <Typography
            variant="h2"
            sx={{
              fontSize: "45px",
              color: "#FFF",
              letterSpacing: "-0.5px",
              fontWeight: "700",
              marginBottom: { xs: "15px", sm: "20px", md: "30px" },
            }}
          >
            Fill your personal information
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "15px", sm: "16px", md: "18px" },
              color: "#FFF",
              fontWeight: "400",
              width: "800px",
              maxWidth: "100%",
              margin: "0 auto",
            }}
          >
            There are a variety of reasons why you may want to lose weight. You
            might be looking to drop a few pounds before an important event or
            completely change your lifestyle to improve your health and your
            confidence.
          </Typography>
          <Link to="/">
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontSize: { xs: "15px", sm: "16px", md: "18px" },
                fontWeight: "600",
                lineHeight: "1.4",
                backgroundColor: "#FD6400",
                color: "#FFF",
                borderRadius: "50px",
                border: "none",
                textTransform: "inherit",
                padding: { xs: "12px 25px", sm: "12px 20px", md: "12px 25px" },
                boxShadow: "none",
                marginTop: { xs: "20px", sm: "25px", md: "35px" },
              }}
            >
              Back to Home Page
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
                  strokeWidth="1.5" // Corrected camelCase
                  strokeLinecap="round" // Corrected camelCase
                  strokeLinejoin="round" // Corrected camelCase
                />
              </svg>
            </Button>
          </Link>
        </Container>
      </Box>
    </>
  );
}

export default QuestionHero;
