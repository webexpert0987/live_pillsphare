import React from "react";
import { Box, Container, Typography, Button } from "@mui/material"; // Added Button import

const QuestionHeroStyle = {
  Wrapp: {
    background: "#104239",
    textAlign: "center",
    padding: "100px 0",
  },
  title: {
    fontSize: "45px",
    color: "#FFF",
    letterSpacing: "-0.5px",
    fontWeight: "700",
  },
  paragraphtxt: {
    fontSize: "18px",
    color: "#FFF",
    fontWeight: "400",
    width: "800px",
    maxWidth: "100%",
    margin: "0 auto",
  },
  backBtn: {
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "1.4",
    backgroundColor: "#FD6400",
    color: "#FFF",
    borderRadius: "50px",
    border: "none",
    textTransform: "inherit",
    padding: "12px 25px",
    marginTop: "35px",
  },
};

function QuestionHero() {
  return (
    <>
      <Box style={QuestionHeroStyle.Wrapp}>
        <Container>
          <Typography style={QuestionHeroStyle.title} variant="h2" gutterBottom>
            Fill your personal information
          </Typography>
          <Typography style={QuestionHeroStyle.paragraphtxt}>
            There are a variety of reasons why you may want to lose weight. You
            might be looking to drop a few pounds before an important event or
            completely change your lifestyle to improve your health and your
            confidence.
          </Typography>
          <Button
            style={QuestionHeroStyle.backBtn}
            variant="contained"
            color="primary"
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
        </Container>
      </Box>
    </>
  );
}

export default QuestionHero;
