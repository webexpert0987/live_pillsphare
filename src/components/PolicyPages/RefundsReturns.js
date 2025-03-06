import React from "react";
import TrustBar from "../../pages/Trustbar";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function RefundsReturns() {
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
          <Typography variant="h1">Refunds & Returns </Typography>
          <Box>
            <Typography className="privacyPara" variant="body1">
              We understand that you may, at times, want to return an item
              you've purchased from us. Not all items can be returned, but for
              the ones that can, please read the policy below.
            </Typography>
            {/***********/}
            <Typography variant="h2">Returns Policy for Medicines</Typography>
            <Typography className="privacyPara" variant="body1">
              Due to UK legislation, we cannot accept returns of medicines.
            </Typography>
            <Typography className="privacyPara" variant="body1">
              This applies to all medicines we sell, including anti-malaria
              tablets, over-the-counter pain relief, and antihistamines.
              Medicines can also include creams and liquids.
            </Typography>
            <Typography className="privacyPara" variant="body1">
              If you are unsure whether a product is a medicine, please contact
              our customer service team for advice.
            </Typography>

            {/***********/}
            <Typography variant="h2">
              Why Can't We Accept Returns of Medicines?
            </Typography>
            <Typography className="privacyPara" variant="body1">
              There are a few reasons why we cannot accept returns of medicines.
              First, medicines are tightly regulated by the UK government. This
              means that we have to follow strict rules about how we store,
              handle, and sell medicines. If we accepted returns of medicines,
              we would be at risk of breaking these rules.
            </Typography>
            <Typography className="privacyPara" variant="body1">
              Second, medicines can be dangerous if they are not used properly.
              If you return a medicine to us, we cannot be sure that it will be
              used safely. This is why we have to destroy all returned
              medicines.
            </Typography>

            {/***********/}
            <Typography variant="h2">
              What Can I Do if I No Longer Want a Medicine?
            </Typography>
            <Typography className="privacyPara" variant="body1">
              If you no longer want a medicine, you can:
            </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                Take it to your local pharmacy for free disposal.
              </Typography>
              <Typography component="li" variant="body1">
                Do not return medicines to us.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">
              Return of Unwanted Items that Are Not Medicines
            </Typography>
            <Typography className="privacyPara" variant="body1">
              It is your responsibility to notify us within 14 days of receipt
              of the parcel of your intention to return one or all items. Once
              authorisation from customer services has been granted, we must
              receive the return within 14 days. You, the customer, will be
              liable for the cost of returning the items. This includes
              situations where free delivery was offered with the order.
            </Typography>

            {/***********/}
            <Typography variant="h2">Errors or Damaged Items </Typography>
            <Typography className="privacyPara" variant="body1">
              We apologise in advance if we make a mistake or if items arrive
              damaged. Please contact our customer services team to arrange the
              return of faulty or damaged goods. A returns label will be
              provided by email.
            </Typography>
            {/***********/}
            <Typography variant="h2">Refused Deliveries</Typography>
            <Typography className="privacyPara" variant="body1">
              You may only refuse delivery if the parcel arrives damaged. In
              this situation, you must notify our customer services team within
              7 days. Refusal of a parcel is not a means of initiating a return
              of an unwanted item.
            </Typography>

            {/***********/}
            <Typography variant="h2">
              Parcels Returned to Us by the Courier
            </Typography>
            <Typography className="privacyPara" variant="body1">
              If a parcel is returned to us for any reason without prior
              authorisation, we will attempt to contact you so we can resend the
              parcel back to you.
            </Typography>
            {/***********/}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default RefundsReturns;
