import React from "react";
import TrustBar from "../../pages/Trustbar";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function CookiesPolicy() {
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
          <Typography variant="h1">Cookies Policy</Typography>
          <Box>
            <Typography className="privacyPara" variant="body1">
              Please read this cookie policy (“cookie policy,” “policy”)
              carefully before using our website (“website,” “service”) operated
              by <strong>Pill Sphere LTD</strong> (“us,” “we,” “our”).
            </Typography>
            {/***********/}
            <Typography variant="h2">What Are Cookies?</Typography>
            <Typography className="privacyPara" variant="body1">
              Cookies are simple text files that are stored on your computer or
              mobile device by a website's server. Each cookie is unique to your
              web browser. It will contain some anonymous information such as a
              unique identifier, the website's domain name, and some digits and
              numbers.
            </Typography>
            {/***********/}
            <Typography variant="h2">
              What Types of Cookies Do We Use?
            </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                <strong>Necessary Cookies: </strong>
                Necessary cookies allow us to offer you the best possible
                experience when accessing and navigating through our website and
                using its features. For example, these cookies let us recognize
                that you have created an account and have logged into that
                account.
              </Typography>
              <Typography component="li" variant="body1">
                <strong>Functionality Cookies: </strong> Functionality cookies
                let us operate the site in accordance with the choices you make.
                For example, we will recognize your username and remember how
                you customized the site during future visits.
              </Typography>
              <Typography component="li" variant="body1">
                <strong>Analytical Cookies:</strong> These cookies enable us and
                third-party services to collect aggregated data for statistical
                purposes on how our visitors use the website. These cookies do
                not contain personal information such as names and email
                addresses and are used to help us improve your user experience
                of the website.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">How to Delete Cookies?</Typography>
            <Typography className="privacyPara" variant="body1">
              If you want to restrict or block the cookies that are set by our
              website, you can do so through your browser settings.
              Alternatively, you can visit <a href="https://www.internetcookies.com/" target="_blank"> www.internetcookies.com</a>, which
              contains comprehensive information on how to do this on a wide
              variety of browsers and devices. You will find general information
              about cookies and details on how to delete cookies from your
              device.
            </Typography>

            {/***********/}
            <Typography variant="h2">Need Help? </Typography>
            <Typography className="privacyPara" variant="body1">
            Feel free to submit an enquiry via the form, and we will get back to you as soon as possible.
            </Typography>
            
            {/***********/}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CookiesPolicy;
