import React from "react";
import TrustBar from "../../pages/Trustbar";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function DeliveryInformation() {
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
          <Typography variant="h1">Delivery Information </Typography>
          <Box>
            <Typography className="privacyPara" variant="body1">
              Prior to dispatching any orders, they must first receive approval
              from a prescriber. Typically, this process takes only a few hours,
              but occasionally it may extend to up to 24 hours from the time of
              order placement.
            </Typography>
            <Typography className="privacyPara" variant="body1">
              Please note if a customer misses the delivery attempts and the
              parcel is returned to Pillsphere, a £5 redelivery fee will apply.
              All relevant cut-off times will then apply as if it were a new
              order.
            </Typography>
            <Typography className="privacyPara" variant="body1">
              Delays to dispatch may occur where we have requested additional
              information to be sent to us.
            </Typography>
            {/***********/}
            <Typography variant="h2">What Are My Delivery Options? </Typography>
            <Typography className="privacyPara" variant="body1">
              We endeavour to ship all orders fully approved before 3pm Monday -
              Royal mail Tracked 24
            </Typography>
            <Typography className="privacyPara" variant="body1">
              If you place an order on a Saturday or Sunday, your order will be
              processed on Monday for Tuesday delivery.
            </Typography>
            {/***********/}
            <Typography variant="h2">Our Dispatch Cut-off Times </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
            <Typography component="li" variant="body1"><strong>Mon - </strong> 3:00pm</Typography>
            <Typography component="li" variant="body1"><strong>Tue - </strong> 3:00pm</Typography>
            <Typography component="li" variant="body1"><strong>Wed - </strong> 3:00pm</Typography>
            <Typography component="li" variant="body1"><strong>Thurs - </strong> 3:00pm</Typography>
            <Typography component="li" variant="body1"><strong>Fri - </strong> 3:00pm</Typography>
            <Typography component="li" variant="body1"><strong>Sat - </strong> No dispatch</Typography>
            <Typography component="li" variant="body1"><strong>Sun - </strong> No dispatch</Typography>
            </Box>
            {/***********/}
            <Typography className="privacyPara" variant="body1">
            Royal mail standard (1st class) usually next day (Monday to Saturday) £2.95
            </Typography>
            <Typography className="privacyPara" variant="body1">
            Next day by 1pm (special delivery 1pm) guaranteed next day by 1pm (Monday to Saturday ) £8.95
            </Typography>
            <Typography className="privacyPara" variant="body1">
            Next day by 9am Guarenteed next day by 9am (Monday-Saturday) special delivery 9am £21.95
            </Typography>
            {/***********/}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default DeliveryInformation;
