import React from "react";
import TrustBar from "../../pages/Trustbar";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function LowPriceGuarantee() {
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
          <Typography variant="h1">Low price guarantee </Typography>
          <Box>
            <Typography className="privacyPara" variant="body1">
              At Pillsphere, we strive to provide our customers with affordable
              private care, exceptional service, and high-quality products. We
              regularly check our prices against leading competitors to ensure
              you're getting the best value for money... guaranteed!
            </Typography>
            {/***********/}
            <Typography variant="h2">How Does It Work?</Typography>
            <Typography className="privacyPara" variant="body1">
              If you find a prescription medication at a lower price from a
              UK-registered and regulated online pharmacy with the same sale
              conditions, we will price match or refund the difference within 14
              days. Take a look for yourself. We guarantee we will not be beaten
              on price.
            </Typography>
            {/***********/}
            <Typography variant="h2">How to Make a Claim? </Typography>
            <Typography className="privacyPara" variant="body1">
              When making a claim, you must ensure that the product you have
              found meets the following criteria:
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                Same brand, quantity, and in-stock availability.
              </Typography>
              <Typography component="li" variant="body1">
                The product excludes any special offers or discounts.
              </Typography>
              <Typography component="li" variant="body1">
                Comparable postage (Tracked 24 or special next-day delivery
                guaranteed by 1 pm).
              </Typography>
            </Box>
            <Typography className="privacyPara" variant="body1">
              <strong>
                Please email{" "}
                <a
                  href="mailto:enquiries@pillsphere.com"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  enquiries@pillsphere.com
                </a>{" "}
                with all relevant information about your claim:
              </strong>
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                Name of the competitor, including website address.
              </Typography>
              <Typography component="li" variant="body1">
                Dates that the competitor's price is available.
              </Typography>
              <Typography component="li" variant="body1">
                Proof of the competitor's price.
              </Typography>
              <Typography component="li" variant="body1">
                URL to the relevant lower-priced item.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">
              What Do We Mean by “Same Sale” Conditions?
            </Typography>
            <Typography className="privacyPara" variant="body1">
              <strong>
                The competitor needs to be selling the product under the same
                conditions as we do for you to claim our low-price guarantee:
              </strong>
            </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                The competitor must have the items in stock.
              </Typography>
              <Typography component="li" variant="body1">
                The products must be identical in terms of brand, model, size,
                weight, colour, condition, specifications, etc.
              </Typography>
              <Typography component="li" variant="body1">
                The competitor’s product must be brand new and in its original
                packaging.
              </Typography>
              <Typography component="li" variant="body1">
                Delivery time should be equivalent to ours.
              </Typography>
              <Typography component="li" variant="body1">
                If delivery is included in your order from us, we will factor in
                any delivery charges from the competitor.
              </Typography>
              <Typography component="li" variant="body1">
                Payment terms need to be the same.
              </Typography>
              <Typography component="li" variant="body1">
                The pharmacy must be registered with the GPhC, and products must
                be sourced from an MHRA-approved wholesaler.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">
              Exclusions from the Low-Price Guarantee{" "}
            </Typography>
            <Typography className="privacyPara" variant="body1">
              <strong>We do not offer our low-price guarantee for:</strong>
            </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                Products sold on auction websites, price comparison sites, or by
                businesses in administration or closing down.
              </Typography>
              <Typography component="li" variant="body1">
                Prices based on bulk discounts or part of special promotions,
                bonuses, or free offers.
              </Typography>
              <Typography component="li" variant="body1">
                Prices with typographical errors.
              </Typography>
              <Typography component="li" variant="body1">
                Prices below our cost price.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">What Happens Next?</Typography>
            <Typography className="privacyPara" variant="body1">
              Pillsphere will review your claim, and if accepted, we will refund
              the difference.
            </Typography>

            {/***********/}
            <Typography variant="h2">Different Brands?</Typography>
            <Typography className="privacyPara" variant="body1">
              We stock a wide range of manufacturer brands, including Teva,
              Accord, and Mylan. If you’re looking for something specific, just
              ask. We also carry many leading generic brands.
            </Typography>

            {/***********/}
            <Typography variant="h2">Why Choose Pill sphere?</Typography>
            <Typography className="privacyPara" variant="body1">
              We want all our customers to feel happy and satisfied when
              purchasing from Pillsphere. You can have a one-on-one consultation
              with our highly skilled clinicians, trusting us to put you and
              your family's well-being as our number one priority. We offer low
              online prices, greater anonymity for consumers, and fast, express,
              discreet delivery.
            </Typography>

            {/***********/}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default LowPriceGuarantee;
