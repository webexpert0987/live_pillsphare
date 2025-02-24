import React from "react";
import ServiceProvidedDark from "../Faqs/ServiceProviderDark";
import { Box, Container, Typography } from "@mui/material";

function Support() {
  return (
    <div>
      <ServiceProvidedDark />
      <Box sx={{ 
        padding: {xs: "80px 0", sm: "60px 0", md: "80px 0"} 
        }}>
        <Container>
        <Typography variant="h1">Support</Typography>
        <Typography variant="body1">
        Our clinical team regularly produce helpful guides to provide supporting information for the conditions that we treat and the treatments that we provide.
        </Typography>
        <Typography variant="body1">
        Simply find your medical condition below to read helpful information written and reviewed by our healthcare professionals.
        </Typography>
        </Container>
      </Box>
    </div>
  );
}

export default Support;
