import React from "react";
import TrustBar from "../../pages/Trustbar";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function TermsOfUse() {
  return (
    <>
      {/************** TrustBar Section **************/}
      <TrustBar />
      {/************** Page Content **************/}
      <Box className="PrivacyContent" sx={{
        padding: {xs: "30px 0", sm: "50px 0", md: "80px 0"}
      }}>
        <Container>
          <Typography variant="h1">Terms of Use</Typography>
          <Box>
            <Typography variant="h2">Introduction</Typography>
            <Typography className="privacyPara" variant="body1">
            These terms and conditions govern your use of this Website, owned and operated by Pill Sphere LTD. By accessing and using this Website, you agree to comply with these terms. If you do not agree, you must cease use immediately.
            </Typography>
            <Typography className="privacyPara" variant="body1">
            "User" or "Users" refers to anyone accessing this Website who is not employed by or providing services to Pill Sphere LTD in the course of such employment or engagement.
            </Typography>
            <Typography className="privacyPara" variant="body1">
            You must be at least 18 years old to use this Website. By accessing it, you confirm that you meet this age requirement.
            </Typography>
            {/***********/}
            <Typography variant="h2">
            Intellectual Property and Acceptable Use
            </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
              <strong>Content Ownership:</strong> All materials on this Website (including text, graphics, software, and code) are owned by Pill Sphere LTD or its licensors unless explicitly uploaded by Users. These materials are protected under intellectual property laws.
              </Typography>
              <Typography component="li" variant="body1">
              <strong>Permitted Use:</strong> You may: View, retrieve, and display content on a computer screen for personal, non-commercial use.
              </Typography>
              <Typography component="li" variant="body1">
              <strong>Prohibited Use:</strong> You must not reproduce, modify, copy, distribute, or exploit any content for commercial purposes without prior written consent from Pill Sphere LTD.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">Prohibited Use </Typography>
            <Typography className="privacyPara" variant="body1">
            <strong>You agree not to use this Website for:</strong>
            </Typography>
            <Box component="ol" sx={{ pl: 3, listStyleType: "lower-alpha" }}>
              <Typography component="li" variant="body1">
              Causing damage, disruption, or interfering with another person's use of the Website.
              </Typography>
              <Typography component="li" variant="body1">
              Illegal, harmful, abusive, or objectionable activities.
              </Typography>
              <Typography component="li" variant="body1">
              Copying or transmitting copyright-protected materials without authorization.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">Registration</Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
              All information you provide during registration must be accurate and kept up to date.
              </Typography>
              <Typography component="li" variant="body1">
              Notify us immediately of any changes to your registration details.
              </Typography>
              <Typography component="li" variant="body1">
              We may suspend or terminate your registration at any time for valid reasons, including breaches of these terms.
              </Typography>
              <Typography component="li" variant="body1">
              You may cancel your registration by contacting us in writing.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">Password and Security</Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
              You are responsible for keeping your password secure and confidential.
              </Typography>
              <Typography component="li" variant="body1">
              If misuse or security concerns arise, we may require you to change your password or suspend your account.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">Links to Other Websites </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
              This Website may link to third-party sites, but Pill Sphere LTD is not responsible for their content or any associated loss.
              </Typography>
              <Typography component="li" variant="body1">
              Links do not imply endorsement of these sites.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">Privacy Policy</Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
              Your use of the Website is subject to our Privacy Policy, which is incorporated into these terms.
              </Typography>
            </Box>

            {/***********/}
            <Typography variant="h2">Availability and Disclaimers </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
              The Website and its services are provided "as is" and "as available." No warranties are made regarding accuracy, compatibility, or quality.
              </Typography>
              <Typography component="li" variant="body1">
              We are not liable for errors, viruses, or security issues arising from using the Website.
              </Typography>
              <Typography component="li" variant="body1">
              Disruptions or non-availability of the Website are not guaranteed to be prevented.
              </Typography>
              <Typography component="li" variant="body1">
              We reserve the right to modify or discontinue any aspect of the Website.
              </Typography>
            </Box>

            {/***********/}
            <Typography variant="h2">Limitation of Liability </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
              Nothing in these terms excludes liability for death, personal injury, or fraud resulting from negligence.
              </Typography>
              <Typography component="li" variant="body1">
              We are not liable for events beyond our reasonable control.
              </Typography>
              <Typography component="li" variant="body1">
              <strong>We are not liable for:</strong>
              <Box component="ol" sx={{ pl: 3, listStyleType: "lower-alpha" }}>
                            <Typography component="li" variant="body1">
                            Business losses, including lost profits or revenue.
                            </Typography>
                            <Typography component="li" variant="body1">
                            Data or software corruption.
                            </Typography>
                            <Typography component="li" variant="body1">
                            Special, indirect, or consequential damages.
                            </Typography>
                          </Box>
              </Typography>
              
            </Box>

            {/***********/}
            <Typography variant="h2">General </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
              Your rights under these terms cannot be transferred. We may transfer our rights where your rights remain unaffected.
              </Typography>
              <Typography component="li" variant="body1">
              Updates to these terms will be published on the Website, and it is your responsibility to review them.
              </Typography>
              <Typography component="li" variant="body1">
              These terms, alongside our Privacy Policy, constitute the entire agreement.
              </Typography>
              <Typography component="li" variant="body1">
              The Contracts (Rights of Third Parties) Act 1999 does not apply.
              </Typography>
              <Typography component="li" variant="body1">
              If any provision is deemed invalid, the rest of the terms remain in effect.
              </Typography>
              <Typography component="li" variant="body1">
              Delay in enforcing rights does not constitute a waiver of them.
              </Typography>
            </Box>

            {/***********/}
            <Typography variant="h2">Governing Law </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
              These terms are governed by the laws of England and Wales. Disputes will be subject to the exclusive jurisdiction of the courts in these jurisdictions.
              </Typography>
            </Box>

            {/***********/}
            <Typography variant="h2">Contact Information </Typography>

            <Typography className="privacyPara" variant="body1">
              <strong>Pill Sphere LTD</strong>
            </Typography>
            <Typography className="privacyPara" variant="body1">
            Registered in England and Wales, No. 16158942
            </Typography>
            <Typography className="privacyPara" variant="body1">
            <strong>Registered Address:</strong> Unit 2a And Unit 2p Building B East Lane, Wembley Commercial Centre, Wembley, Middlesex, United Kingdom, HA9 7UR
            </Typography>
            <Typography className="privacyPara" variant="body1">
            <strong>Email:</strong>
              <a
                href="mailto:enquiries@pillsphere.com"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                enquiries@pillsphere.com
              </a>
            </Typography>
            <Typography className="privacyPara" variant="body1">
            By using this Website, you agree to these terms. If you have any questions, please contact us.
            </Typography>
            {/***********/}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default TermsOfUse;
