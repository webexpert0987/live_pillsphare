import React from "react";
import TrustBar from "../../pages/Trustbar";
import { Box, Container, Typography } from "@mui/material";
// import { Link } from "react-router-dom";

function TermsAndConditions() {
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
          <Typography variant="h1">Terms and Conditions</Typography>
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
                conditions is deemed to occur upon your first use of the
                Website.
                <br />
                If you do not agree to be bound by these terms and conditions,
                you should stop using the Website immediately.
              </Typography>
              <Typography className="privacyPara" variant="body1">
                You must be at least 18 years of age to use this Website. By
                using the Website and agreeing to these terms and conditions,
                you represent and warrant that you are at least 18 years of age.
              </Typography>
            {/***********/}
            <Typography variant="h2">
              Intellectual Property and Acceptable Use
            </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Box sx={{ pl: 3 }}>
                <Typography component="li" variant="body1">
                  All Content included on the Website, unless uploaded by Users,
                  is the property of Pill Sphere LTD, its affiliates, or other
                  relevant third parties. In these terms and conditions, Content
                  means any text, graphics, images, audio, video, software, data
                  compilations, page layout, underlying code and software, and
                  any other form of information capable of being stored in a
                  computer that appears on or forms part of this Website,
                  including any such content uploaded by Users.
                </Typography>
                <Typography component="li" variant="body1">
                  You may, for your own personal use, retrieve, display, and
                  view the Content on a computer screen.
                </Typography>
                <Typography component="li" variant="body1">
                  You must not otherwise reproduce, modify, copy, distribute, or
                  use for commercial purposes any Content without the written
                  permission of Pill Sphere LTD.
                </Typography>
              </Box>
            </Box>
            {/***********/}
            <Typography variant="h2">Prohibited Use</Typography>
            <Typography className="privacyPara" variant="body1">
              You may not use the Website for any of the following purposes :
            </Typography>
            <Box sx={{ pl: 3 }}>
              <Box component="ol" sx={{ pl: 3, listStyleType: "lower-alpha" }}>
                <Typography component="li" variant="body1">
                  In any way which causes, or may cause, damage to the Website
                  or interferes with any other person's use or enjoyment of the
                  Website.
                </Typography>
                <Typography component="li" variant="body1">
                  In any way which is harmful, unlawful, illegal, abusive,
                  harassing, threatening, or otherwise objectionable or in
                  breach of any applicable law, regulation, or governmental
                  order.
                </Typography>
                <Typography component="li" variant="body1">
                  Making, transmitting, or storing electronic copies of Content
                  protected by copyright without the permission of the owner.
                </Typography>
              </Box>
            </Box>
            {/***********/}
            <Typography variant="h2">Registration</Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Box sx={{ pl: 3 }}>
                <Typography component="li" variant="body1">
                  You must ensure that the details provided by you on
                  registration or at any time are correct and complete.
                </Typography>
                <Typography component="li" variant="body1">
                  You must inform us immediately of any changes to the
                  information that you provided when registering by updating
                  your personal details to ensure we can communicate with you
                  effectively.
                </Typography>
                <Typography component="li" variant="body1">
                  We may suspend or cancel your registration with immediate
                  effect for any reasonable purposes or if you breach these
                  terms and conditions.
                </Typography>
                <Typography component="li" variant="body1">
                  You may cancel your registration at any time by informing us
                  in writing to the address at the end of these terms and
                  conditions. If you do so, you must immediately stop using the
                  Website. Cancellation or suspension of your registration does
                  not affect any statutory rights.
                </Typography>
              </Box>
            </Box>
            {/***********/}
            <Typography variant="h2">Password and Security</Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Box sx={{ pl: 3 }}>
                <Typography component="li" variant="body1">
                  When you register on this Website, you will be asked to create
                  a password, which you should keep confidential and not
                  disclose or share with anyone.
                </Typography>
                <Typography component="li" variant="body1">
                  If we have reason to believe that there is or is likely to be
                  any misuse of the Website or breach of security, we may
                  require you to change your password or suspend your account.
                </Typography>
              </Box>
            </Box>
            {/***********/}
            <Typography variant="h2">Links to Other Websites</Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Box sx={{ pl: 3 }}>
                <Typography component="li" variant="body1">
                  This Website may contain links to other sites. Unless
                  expressly stated, these sites are not under the control of
                  Pill Sphere LTD or that of our affiliates.
                </Typography>
                <Typography component="li" variant="body1">
                  We assume no responsibility for the content of such Websites
                  and disclaim liability for any and all forms of loss or damage
                  arising out of the use of them.
                </Typography>
                <Typography component="li" variant="body1">
                  The inclusion of a link to another site on this Website does
                  not imply any endorsement of the sites themselves or of those
                  in control of them.
                </Typography>
              </Box>
            </Box>
            {/***********/}
            <Typography variant="h2">Privacy Policy</Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Box sx={{ pl: 3 }}>
                <Typography component="li" variant="body1">
                  Use of the Website is also governed by our Privacy Policy,
                  which is incorporated into these terms and conditions by this
                  reference. To view the Privacy Policy,  <br/>please visit:{" "}
                  <a
                    href="/privacy-policy"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    www.pillsphere.com/privacy-policy.
                  </a>
                </Typography>
              </Box>
            </Box>

            {/***********/}
            <Typography variant="h2">
              Availability of the Website and Disclaimers
            </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Box sx={{ pl: 3 }}>
                <Typography component="li" variant="body1">
                  Any online facilities, tools, services, or information that
                  Pill Sphere LTD makes available through the Website (the
                  Service) is provided 'as is' and on an 'as available' basis.
                  We give no warranty that the Service will be free of defects
                  and/or faults.
                  <br />
                  To the maximum extent permitted by the law, we provide no
                  warranties (express or implied) of fitness for a particular
                  purpose, accuracy of information, compatibility, or
                  satisfactory quality. Pill Sphere LTD is under no obligation
                  to update information on the Website.
                </Typography>
                <Typography component="li" variant="body1">
                  Whilst we use reasonable endeavors to ensure that the Website
                  is secure and free of errors, viruses, and other malware, we
                  give no warranty or guarantee in that regard, and all Users
                  take responsibility for their own security, personal details,
                  and computers.
                </Typography>
                <Typography component="li" variant="body1">
                  We accept no liability for any disruption or non-availability
                  of the Website.
                </Typography>
                <Typography component="li" variant="body1">
                  We reserve the right to alter, suspend, or discontinue any
                  part (or the whole of) the Website, including, but not limited
                  to, any products and/or services available.
                  <br />
                  These terms and conditions shall continue to apply to any
                  modified version of the Website unless it is expressly stated
                  otherwise.
                </Typography>
              </Box>
            </Box>

            {/***********/}
            <Typography variant="h2">Limitation of Liability </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Box sx={{ pl: 3 }}>
                <Typography component="li" variant="body1">
                  <strong>Nothing in these terms and conditions will :</strong>
                </Typography>
              </Box>
            </Box>
            {/****** li *****/}
            <Box component="ol" sx={{ pl: 3, listStyleType: "lower-alpha" }}>
              <Box sx={{ pl: 3 }}>
                <Typography component="li" variant="body1">
                  Limit or exclude our or your liability for death or personal
                  injury resulting from our or your negligence, as applicable.
                </Typography>
                <Typography component="li" variant="body1">
                  Limit or exclude our or your liability for fraud or fraudulent
                  misrepresentation.
                </Typography>
                <Typography component="li" variant="body1">
                  Limit or exclude any of our or your liabilities in any way
                  that is not permitted under applicable law.
                </Typography>
              </Box>
            </Box>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Box sx={{ pl: 3 }}>
                <Typography component="li" variant="body1">
                  We will not be liable to you in respect of any losses arising
                  out of events beyond our reasonable control.
                </Typography>
                <Typography component="li" variant="body1">
                  <strong>
                    To the maximum extent permitted by law, we accept no
                    liability for any of the following :
                  </strong>
                </Typography>
              </Box>
            </Box>
            {/****** li *****/}
            <Box component="ol" sx={{ pl: 3, listStyleType: "lower-alpha" }}>
              <Box sx={{ pl: 3 }}>
                <Typography component="li" variant="body1">
                  Any business losses, such as loss of profits, income, revenue,
                  anticipated savings, business contracts, goodwill, or
                  commercial opportunities.
                </Typography>
                <Typography component="li" variant="body1">
                  Loss or corruption of any data, database, or software.
                </Typography>
                <Typography component="li" variant="body1">
                  Any special, indirect, or consequential loss or damage.
                </Typography>
              </Box>
            </Box>

            {/***********/}
            <Typography variant="h2">General </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Box sx={{ pl: 3 }}>
                <Typography component="li" variant="body1">
                  You may not transfer any of your rights under these terms and
                  conditions to any other person.
                  <br />
                  We may transfer our rights under these terms where we
                  reasonably believe your rights will not be affected.
                </Typography>
                <Typography component="li" variant="body1">
                  These terms and conditions may be varied by us from time to
                  time. Such revised terms will apply to the Website from the
                  date of publication.
                  <br />
                  Users should check the terms and conditions regularly to
                  ensure familiarity with the then-current version.
                </Typography>
                <Typography component="li" variant="body1">
                  The Contracts (Rights of Third Parties) Act 1999 shall not
                  apply to these terms and conditions, and no third party will
                  have any right to enforce or rely on any provision of these
                  terms and conditions.
                </Typography>
                <Typography component="li" variant="body1">
                  If any court or competent authority finds that any provision
                  of these terms and conditions (or part-provision) is invalid,
                  illegal, or unenforceable, that provision or part-provision
                  will, to the extent required, be deemed deleted, and the
                  validity and enforceability of the other provisions of these
                  terms and conditions will not be affected.
                </Typography>
                <Typography component="li" variant="body1">
                  Unless otherwise agreed, no delay, act, or omission by a party
                  in exercising any right or remedy will be deemed a waiver of
                  that, or any other, right or remedy.
                </Typography>
                <Typography component="li" variant="body1">
                  This Agreement shall be governed by and interpreted according
                  to the law of England and Wales, and all disputes arising
                  under the Agreement (including non-contractual disputes or
                  claims) shall be subject to the exclusive jurisdiction of the
                  English and Welsh courts.
                </Typography>
              </Box>
            </Box>

            {/***********/}
            <Typography variant="h2">Contact Details </Typography>
              <Typography className="privacyPara" variant="body1">
                <strong>
                  Pill Sphere LTD is a company registered in England and Wales
                  with registered number 10580352.{" "}
                </strong>
              </Typography>
              <Typography className="privacyPara" variant="body1">
                <strong>Registered Address: </strong> Unit 2A and 2P Building B,
                Wembley Commercial Centre, Wembley, London, HA9 7UR
              </Typography>
              <Typography className="privacyPara" variant="body1">
                <strong>Email: </strong>
                <a
                  href="mailto:enquiries@pillsphere.com"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  enquiries@pillsphere.com
                </a>
              </Typography>
            {/***********/}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default TermsAndConditions;
