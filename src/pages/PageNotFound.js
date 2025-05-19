import React, { useEffect, useState } from "react";
// import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  //   CircularProgress,
} from "@mui/material";
const PageNotFound = () => {
  return (
    <Box
      height="60vh"
      minHeight="300px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      boxShadow="none"
      border="none"
      outline="none"
      sx={{ flexDirection: "column" }}
    >
      <Typography
        sx={{ fontSize: "22px", fontWeight: "700", lineHeight: "1.4" }}
      >
        Page Not Found...!
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
            marginTop: { xs: "5px", sm: "10px", md: "15px" },
          }}
        >
          Back To Home
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
      </Link>
    </Box>
  );
};
export default PageNotFound;
