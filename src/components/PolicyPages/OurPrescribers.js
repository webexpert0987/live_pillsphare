import React from "react";
import TrustBar from "../../pages/Trustbar";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function OurPrescribers() {
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
          <Typography variant="h1">Our Prescribers</Typography>
          <Typography className="privacyPara" variant="body1">
            <strong>
              Shikar Kerim
              <br />
              GPhC No.{" "}
              <a
                href="https://www.pharmacyregulation.org/registers/pharmacist/2213569"
                target="_blank"
              >
                2213569
              </a>
            </strong>
          </Typography>
          <Box>
            <Typography variant="h2">Our Commitment to You </Typography>
            <Typography className="privacyPara" variant="body1">
              <strong>
                Pill Sphere offers a holistic approach to your health:
              </strong>
            </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Box sx={{pl:3}}>
              <Typography component="li" variant="body1">
                Expert Guidance: Receive tailored advice and care from a
                seasoned pharmacist and prescriber.
              </Typography>
              <Typography component="li" variant="body1">
                Quality Assurance: Trust in our strict adherence to regulatory
                standards and quality controls.
              </Typography>
              <Typography component="li" variant="body1">
                Personalised Care: Benefit from treatments and prescriptions
                specifically tailored to your health needs.
              </Typography>
              <Typography component="li" variant="body1">
                Integrated Healthcare: Enjoy coordinated care, as we work with
                other healthcare professionals to ensure a seamless healthcare
                experience.
              </Typography>
              </Box>
            </Box>

            {/***********/}
            <Typography variant="h2">Check with the Regulators</Typography>
            <Typography className="privacyPara" variant="body1">
              <strong>
                To view our superintendent pharmacist on the register, visit:{" "}
              </strong>{" "}
              <a
                href="https://www.pharmacyregulation.org/registers/pharmacist/2213569"
                target="_blank"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                https://www.pharmacyregulation.org/registers/pharmacist/2213569
              </a>
            </Typography>

            {/***********/}
            <Typography variant="h2">About Our Superintendent</Typography>
            <strong>
              Shikar Kerim GPhC No.{" "}
              <a
                href="https://www.pharmacyregulation.org/registers/pharmacist/2213569"
                target="_blank"
              >
                2213569
              </a>
            </strong>
            <Typography className="privacyPara" variant="body1">
              Shikar brings a wealth of experience and knowledge to Pill Sphere.
              His dedication to patient care and commitment to continual
              learning ensure that you receive the best possible service and
              support.
            </Typography>
            <Typography className="privacyPara" variant="body1">
              He ensures that Pill Sphere meets the highest standards of
              pharmaceutical care. His responsibilities include overseeing the
              safe and effective supply of medicines, maintaining our rigorous
              quality control standards, and providing expert healthcare advice.
            </Typography>
            <Typography className="privacyPara" variant="body1">
              Shikar is able to offer personalised care by conducting in-depth
              consultations to understand your unique health needs. He
              prescribes medications as part of a comprehensive treatment plan
              and closely monitors your progress, adjusting treatments as
              necessary.
            </Typography>

            {/***********/}
            <Typography variant="h2">
              How Are Our Prescribers Regulated?
            </Typography>
            <Typography className="privacyPara" variant="body1">
              Our prescribers are regulated by the General Pharmaceutical
              Council (GPhC). The GPhC is the independent regulator for
              pharmacists, pharmacy technicians, and pharmacy premises in Great
              Britain.
            </Typography>
            {/***********/}
            <Typography variant="h2">
              Find Out More About Our Prescribers, Pharmacists, and Premises
            </Typography>
            <Typography className="privacyPara" variant="body1">
              We invite you to experience the difference at Pill Sphere. Whether
              you're seeking advice, treatment, or simply peace of mind, our
              team is here to provide the highest level of care.
            </Typography>
            <Typography className="privacyPara" variant="body1">
              Welcome to a pharmacy where your health is in expert hands.
            </Typography>

            {/***********/}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default OurPrescribers;
