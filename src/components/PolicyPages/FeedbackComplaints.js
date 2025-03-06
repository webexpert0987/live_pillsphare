import React from "react";
import TrustBar from "../../pages/Trustbar";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function FeedbackComplaints() {
  return (
    <>
      {/************** TrustBar Section **************/}
      <TrustBar />
      {/************** Page Content **************/}
      <Box className="PrivacyContent" sx={{
        padding: {xs: "30px 0", sm: "50px 0", md: "80px 0"}
      }}>
        <Container>
          <Typography variant="h1">Feedback & Complaints</Typography>
          <Box>
            <Typography className="privacyPara" variant="body1">
            At <strong>Pill Sphere</strong>, we are committed to providing exceptional service and quality care to all our customers. We understand the importance of your feedback and complaints in helping us improve our services and address any issues promptly.
            </Typography>
            <Typography className="privacyPara" variant="body1">
            If you have any concerns or feedback, we encourage you to reach out to us through our designated customer service channels, available on our website.
            </Typography>
            <Typography className="privacyPara" variant="body1">
            You can submit your feedback or complaints via our online form under the "Contact Us" page, email, or by calling our customer service.
            </Typography>
            <Typography className="privacyPara" variant="body1">
            Upon receiving your complaint, we will promptly acknowledge it and initiate an investigation to understand the issue thoroughly. We aim to resolve complaints quickly and effectively, and we will keep you informed throughout the process.
            </Typography>
            <Typography className="privacyPara" variant="body1">
            Our dedicated team will provide a resolution or update within a specified timeframe, ensuring your satisfaction and trust in our services are maintained.
            </Typography>
            <Typography className="privacyPara" variant="body1">
            Your feedback is invaluable to us as it helps us continuously improve our offerings and the overall customer experience.
            </Typography>
            {/***********/}
            
            {/***********/}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default FeedbackComplaints;
