import React from "react";
import TrustBar from "../../pages/Trustbar";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <>
      {/************** TrustBar Section **************/}
      <TrustBar />
      {/************** Page Content **************/}
      <Box className="PrivacyContent" sx={{
        padding: {xs: "30px 0", sm: "50px 0", md: "80px 0"}
      }}>
        <Container>
          <Typography variant="h1">Privacy Policy</Typography>
          <Box>
            <Typography variant="h2">Introduction</Typography>
            <Typography className="privacyPara" variant="body1">
              These terms and conditions apply between you, the User of this
              Website (including any sub-domains, unless expressly excluded by
              their own terms and conditions), and Pill Sphere LTD, the owner
              and operator of this Website.
            </Typography>
            <Typography className="privacyPara" variant="body1">
              Please read these terms and conditions carefully, as they affect
              your legal rights.
            </Typography>
            <Typography className="privacyPara" variant="body1">
              Your agreement to comply with and be bound by these terms and
              conditions is deemed to occur upon your first use of the Website.
              <br />
              If you do not agree to be bound by these terms and conditions, you
              should stop using the Website immediately.
            </Typography>
            <Typography className="privacyPara" variant="body1">
              You must be at least 18 years of age to use this Website. By using
              the Website and agreeing to these terms and conditions, you
              represent and warrant that you are at least 18 years of age.
            </Typography>
            {/***********/}
            <Typography variant="h2">
              Intellectual Property and Acceptable Use
            </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                All Content included on the Website, unless uploaded by Users,
                is the property of Pill Sphere LTD, its affiliates, or other
                relevant third parties. "Content" refers to any text, graphics,
                images, audio, video, software, data compilations, page layout,
                underlying code, and software that appears on or forms part of
                this Website, including content uploaded by Users.
              </Typography>
              <Typography component="li" variant="body1">
                You may, for your own personal use, retrieve, display, and view
                the Content on a computer screen.
              </Typography>
              <Typography component="li" variant="body1">
                You must not otherwise reproduce, modify, copy, distribute, or
                use for commercial purposes any Content without the written
                permission of Pill Sphere LTD.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">Prohibited Use</Typography>
            <Typography className="privacyPara" variant="body1">
              You may not use the Website for any of the following purposes:
            </Typography>
            <Box component="ol" sx={{ pl: 3, listStyleType: "lower-alpha" }}>
              <Typography component="li" variant="body1">
                In any way which causes, or may cause, damage to the Website or
                interferes with any other person's use or enjoyment of the
                Website.
              </Typography>
              <Typography component="li" variant="body1">
                In any way which is harmful, unlawful, illegal, abusive,
                harassing, threatening, or otherwise objectionable or in breach
                of any applicable law, regulation, or governmental order.
              </Typography>
              <Typography component="li" variant="body1">
                Making, transmitting, or storing electronic copies of Content
                protected by copyright without the permission of the owner.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">Registration</Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                You must ensure that the details provided during registration
                are correct and complete.
              </Typography>
              <Typography component="li" variant="body1">
                Inform us immediately of any changes to your information by
                updating your personal details to maintain effective
                communication.
              </Typography>
              <Typography component="li" variant="body1">
                We may suspend or cancel your registration for reasonable
                purposes or if you breach these terms and conditions.
              </Typography>
              <Typography component="li" variant="body1">
                You may cancel your registration at any time by informing us in
                writing. Upon cancellation, you must stop using the Website
                immediately.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">Password and Security</Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                When you register on this Website, you will be asked to create a
                password, which must be kept confidential.
              </Typography>
              <Typography component="li" variant="body1">
                If we suspect any misuse of the Website or a breach of security,
                we may require you to change your password or suspend your
                account.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">Links to Other Websites</Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                This Website may include links to other sites. Unless explicitly
                stated, these are not under the control of Pill Sphere LTD.
              </Typography>
              <Typography component="li" variant="body1">
                We assume no responsibility for the content of linked Websites
                and disclaim liability for any loss or damage arising from their
                use.
              </Typography>
              <Typography component="li" variant="body1">
                Inclusion of a link does not imply endorsement of the site or
                its operators.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">Privacy Policy</Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                Use of the Website is governed by our Privacy Policy. To view
                it, visit: <a
                href="/privacy-policy"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                www.pillsphere.com/privacy-policy.</a>
              </Typography>
            </Box>

            {/***********/}
            <Typography variant="h2">Availability of the Website </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                Any services provided via the Website ("Service") are on an 'as
                is' and 'as available' basis. Pill Sphere LTD does not guarantee
                that the Service will be defect-free.
              </Typography>
              <Typography component="li" variant="body1">
                We strive to maintain the security of the Website but cannot
                guarantee it is error-free or immune to viruses or malware.
              </Typography>
              <Typography component="li" variant="body1">
                We accept no liability for disruption or non-availability of the
                Website.
              </Typography>
              <Typography component="li" variant="body1">
                Pill Sphere LTD reserves the right to modify or discontinue any
                part of the Website, including products or services.
              </Typography>
            </Box>

            {/***********/}
            <Typography variant="h2">Limitation of Liability </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                Nothing in these terms excludes or limits liability for death,
                personal injury, or fraud caused by negligence.
              </Typography>
              <Typography component="li" variant="body1">
                We are not liable for losses arising from events beyond our
                reasonable control.
              </Typography>
              <Typography component="li" variant="body1">
                Pill Sphere LTD accepts no liability for business losses, data
                corruption, or indirect/consequential damages.
              </Typography>
            </Box>

            {/***********/}
            <Typography variant="h2">General </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                Rights under these terms are non-transferable without agreement.
              </Typography>
              <Typography component="li" variant="body1">
                Terms and conditions may be revised; check regularly for
                updates.
              </Typography>
              <Typography component="li" variant="body1">
                These terms supersede all prior agreements and discussions.
              </Typography>
              <Typography component="li" variant="body1">
                The Contracts (Rights of Third Parties) Act 1999 does not apply.
              </Typography>
              <Typography component="li" variant="body1">
                Invalid provisions will not affect remaining terms.
              </Typography>
              <Typography component="li" variant="body1">
                Delays or omissions in enforcement do not waive rights or
                remedies.
              </Typography>
              <Typography component="li" variant="body1">
                This Agreement is governed by the laws of England and Wales,
                with disputes subject to their exclusive jurisdiction.
              </Typography>
            </Box>

            {/***********/}
            <Typography variant="h2">Contact Details </Typography>

            <Typography className="privacyPara" variant="body1">
              <strong>Pill Sphere LTD</strong>
              <br />
              Registered in England and Wales, No. 10580352
              <br />
              Unit 2A and 2P, Building B, Wembley Commercial Centre, Wembley,
              <br />
              London, HA9 7UR
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
            <strong>Superintendent Pharmacist:</strong> Shikar Kerim
              <br />
              <strong>GPhC Reg No.:</strong> 2213569
            </Typography>
            <Typography className="privacyPara" variant="body1">
              © 2024 Pill Sphere LTD. All rights reserved.
            </Typography>
            {/***********/}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default PrivacyPolicy;
