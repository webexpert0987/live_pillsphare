import React from "react";
import TrustBar from "../../pages/Trustbar";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ReorderYourPrescription() {
  return (
    <>
      {/************** TrustBar Section **************/}
      <TrustBar />
      {/************** Page Content **************/}
      <Box
        className="PrivacyContent"
        sx={{
          padding: { xs: "30px 0", sm: "50px 0", md: "80px 0" },
        }}
      >
        <Container>
          <Typography variant="h1">
            How To Reorder Your Prescription:
          </Typography>
          <Box>
            {/***********/}
            <Typography variant="h2">
             Step 1: Log into Your Account
            </Typography>
            <Typography className="privacyPara" variant="body1">
              Make sure you're logged into your account and head over to your
              account section.
            </Typography>

            {/***********/}
            <Typography variant="h2">
              Step 2: Go to Your Previous Orders 
            </Typography>
            <Typography className="privacyPara" variant="body1">
              Navigate to the "Reorder Treatment" section in your account area.
            </Typography>

            {/***********/}
            <Typography variant="h2">
              Step 3: Select Your Medication 
            </Typography>
            <Typography className="privacyPara" variant="body1">
              Select the medication you want to reorder along with the dosage
              and quantity. Please note, our reorder function is unavailable if
              you are purchasing a different medication, emergency
              contraception, antimalarials, or cystitis. If you are reordering a
              weight loss medication, you will need to input your BMI.
            </Typography>

            {/***********/}
            <Typography variant="h2">
              Step 4: Confirm the Prescription Details 
            </Typography>
            <Typography className="privacyPara" variant="body1">
              Ensure that your consultation and medical history from the
              previous purchase are still up to date. If there have been any
              changes in your medical history, you will need to complete a new
              consultation.
            </Typography>

            {/***********/}
            <Typography variant="h2">
              Step 5: Checkout
            </Typography>
            <Typography className="privacyPara" variant="body1">
              If your previous consultation and medical history are unchanged,
              select "No" and proceed to checkout. You will receive an order
              confirmation after your purchase, followed by an email once your
              order is on its way.
            </Typography>
            {/***********/}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default ReorderYourPrescription;
