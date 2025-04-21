import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import heroImage from "../pages/images/categoryHeroImage.jpg";
import TrustBar from "../pages/Trustbar";

import OnlinePrescriptions from "../pages/images/AboutPage/OnlinePrescriptions.jpg";
import OTC from "../pages/images/AboutPage/OTC.jpg";
import ConsultationReview from "../pages/images/HowItWorks/Consultation-Review.jpg";
import PlaceYourOrder from "../pages/images/HowItWorks/PlaceYourOrder.jpg";
import FastDelivery from "../pages/images/HowItWorks/Delivery.jpg";
import Support from "../pages/images/HowItWorks/Support.jpg";

import WhyChoosePills from "../components/CategoryInfoPages/WhyChoose";

import Mission from "../pages/images/AboutPage/mission.png";

import checkIcon from "../pages/images/HowItWorks/check-icon.png";
import listVector from "../pages/images/HowItWorks/logo-vector.png";

import useScreenSize from "../hooks/screenSizeHook";

const HowItWork = () => {
  const { width, height } = useScreenSize();

  const faqs = [
    {
      title: "Do I need a prescription to order medications?",
      description:
        "For prescription-only medications, you will need a valid prescription. At Pill Sphere, we offer private online consultations where our healthcare professionals can issue a prescription if appropriate. OTC products can be purchased directly without a prescription.",
    },
    {
      title: "How long does the consultation process take?",
      description:
        "The consultation process is quick and easy. Most questionnaires are reviewed within 24 hours, and if approved, your medication will be dispatched immediately.",
    },
    {
      title: "Is my personal information safe?",
      description:
        "Yes, we take your privacy seriously. All personal and medical information is handled in strict confidence and stored securely in compliance with UK data protection laws (GDPR).",
    },
    {
      title: "Can I get advice from a pharmacist?",
      description:
        "Absolutely. Our team of UK-registered pharmacists is available to provide expert advice on medications, treatments, and general health concerns. Contact us via phone, email, or live chat for assistance.",
    },
    {
      title: "What if I have a problem with my order?",
      description:
        "If you have any issues with your order, our customer service team is here to help. Contact us via phone, email, or live chat, and we’ll resolve your query as quickly as possible.",
    },
  ];

  const faqStyle = {
    faqBox: {
      border: "none",
      boxShadow: "none",
      "&:before": {
        display: "none", // Removes default MUI divider line
      },
    },
    faqTitle: (isActive) => ({
      backgroundColor: isActive ? "#FD6400" : "#F6EFDF",
      padding: "5px 22px",
      border: "none",
      transition: "background-color 0.3s ease",
      boxShadow: "none",
      marginBottom: "15px",
      borderRadius: "8px",
    }),
    faqTitleTxt: (isActive) => ({
      color: isActive ? "#fff" : "#104239",
      fontWeight: "600",
      lineHeight: "1.2",
      transition: "color 0.3s ease",
    }),
    faqSummaryContent: {
      "&.Mui-expanded": {
        margin: "0", // Adjust spacing when expanded
      },
    },
    faqDescription: {
      padding: "20px",
      border: "none",
      boxShadow: "none",
    },
    faqDescriptionTxt: {
      color: "#333",
      fontSize: "18px",
      fontWeight: "500",
      lineHeight: "1.6",
    },
  };

  const [expanded, setExpanded] = useState(null);

  const handleChange = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <>
      {/************** Hero Section **************/}
      <Box
        sx={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: { xs: "300px", sm: "400px", md: "450px" },
          color: "#333333",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <Box
            sx={{
              width: { xs: "100%", sm: "600px", md: "700px" },
              maxWidth: "100%",
              paddingTop: { xs: "30px", sm: "35px", md: "50px" },
              paddingBottom: { xs: "30px", sm: "35px", md: "50px" },
            }}
          >
            {/* Page Title */}
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontSize: { xs: "22px", sm: "30px", md: "45px" },
                letterSpacing: "-0.5px",
                fontWeight: "800",
                lineHeight: "1.3",
              }}
            >
              How It Works
            </Typography>

            {/* SubTitle */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                letterSpacing: "0px",
                fontWeight: { xs: "600", sm: "700", md: "700" },
                marginBottom: { xs: "10px", sm: "15px", md: "15px" },
                lineHeight: "1.4",
              }}
            >
              Pill Sphere Online Pharmacy and Private Clinic
            </Typography>

            {/* Paragraph Description */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "15px", sm: "16px", md: "18px" },
                letterSpacing: "0px",
                fontWeight: { xs: "600", sm: "500", md: "500" },
                lineHeight: "1.4",
              }}
            >
              At Pill Sphere, we make accessing medications and healthcare
              services simple, convenient, and hassle-free. Whether you need a
              prescription, over-the-counter products, or expert medical advice,
              our process is designed with you in mind. Here's how it works:
            </Typography>

            {/* Two Buttons */}
            <Box
              mt={4}
              gap={2}
              sx={{
                display: { xs: "block", sm: "flex", md: "flex" },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  fontSize: { xs: "15px", sm: "16px", md: "18px" },
                  fontWeight: "600",
                  lineHeight: "1.4",
                  backgroundColor: "#FD6400",
                  color: "#FFF",
                  borderRadius: "50px",
                  border: "none",
                  textTransform: "inherit",
                  padding: {
                    xs: "12px 25px",
                    sm: "12px 20px",
                    md: "12px 25px",
                  },
                  boxShadow: "none",
                  marginBottom: { xs: "15px", sm: "0", md: "0" },
                }}
                onClick={() => (window.location.href = `/shop`)}
              >
                Shop Now
              </Button>
              
            </Box>
          </Box>
        </Container>
      </Box>
      {/************** TrustBar Section **************/}
      <TrustBar />

      {/************** Steps Section **************/}
      <Box
        sx={{
          padding: {
            xs: "30px 0 30px 0",
            sm: "50px 0 50px 0",
            md: "70px 0 70px 0",
          },
        }}
      >
        <Container>
          {/* First Section - Image Left, Content Right */}
          <Grid2
            container
            spacing={4}
            alignItems="center"
            sx={{
              background: "#FAFAFA",
              borderRadius: {
                xs: "10px 10px 0 0",
                sm: "15px 15px 0 0",
                md: "20px 20px 0 0",
              },
              border: "1px solid #eee",
              padding: {
                xs: "15px",
                sm: "20px",
                md: "50px",
              },
            }}
          >
            <Grid2 size={{ xs: 12, sm: 3, md: 3 }}>
              <img
                src={OnlinePrescriptions}
                alt="Online Prescriptions"
                style={{ width: "100%", borderRadius: "15px 100px 15px 15px" }}
              />
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 9, md: 9 }}
              sx={{
                paddingLeft: { xs: "0", sm: "30px", md: "40px" },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "20px", sm: "26px", md: "32px" },
                  fontWeight: "700",
                  marginBottom: { xs: "15px", sm: "20px", md: "20px" },
                }}
              >
                Step 1: Browse Our Products or Services
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#4A4A4A",
                  fontSize: { xs: "15px", sm: "26px", md: "17px" },
                  lineHeight: "1.7",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                Start by browsing our wide range of prescription medications,
                over-the-counter (OTC) products, or private clinic services.
                Whether you're looking for allergy relief, skincare treatments,
                or travel vaccines, you'll find what you need in our online
                shop.
              </Typography>
              {/***************/}
              <Box sx={{ margin: "25px 0 10px 0" }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: "18px", sm: "20px", md: "26px" },
                    fontWeight: "600",
                    marginBottom: { xs: "12px", sm: "15px", md: "20px" },
                  }}
                >
                  Medication Categories
                </Typography>
                <Box>
                  {/*****1******/}
                  <Box className="iconListRow" sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        minWidth: { xs: "35px", sm: "38px", md: "48px" },
                        maxWidth: { xs: "35px", sm: "38px", md: "48px" },
                        paddingRight: "15px",
                      }}
                    >
                      <img src={listVector} alt="Prescription Medications" />
                    </Box>
                    <Box>
                      <Typography variant="h4">
                        Prescription Medications:
                      </Typography>
                      <Typography variant="body1">
                        Complete a quick online consultation to request your
                        medication.
                      </Typography>
                    </Box>
                  </Box>
                  {/******2*****/}
                  <Box className="iconListRow" sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        minWidth: { xs: "35px", sm: "38px", md: "48px" },
                        maxWidth: { xs: "35px", sm: "38px", md: "48px" },
                        paddingRight: "15px",
                      }}
                    >
                      <img src={listVector} alt="Over The Counter 0 Products" />
                    </Box>
                    <Box>
                      <Typography variant="h4">
                        Over The Counter Products:
                      </Typography>
                      <Typography variant="body1">
                        Purchase directly without a prescription.
                      </Typography>
                    </Box>
                  </Box>
                  {/*****3******/}
                  <Box className="iconListRow" sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        minWidth: { xs: "35px", sm: "38px", md: "48px" },
                        maxWidth: { xs: "35px", sm: "38px", md: "48px" },
                        paddingRight: "15px",
                      }}
                    >
                      <img src={listVector} alt="Pharmacy only medication" />
                    </Box>
                    <Box>
                      <Typography variant="h4">
                        Pharmacy only medication:
                      </Typography>
                      <Typography variant="body1">
                        Will require you to complete a simple short
                        questionnaire.
                      </Typography>
                    </Box>
                  </Box>
                  {/***********/}
                </Box>
              </Box>
            </Grid2>
          </Grid2>

          {/* Second Section - Content Left, Image Right */}
          <Grid2
            container
            spacing={4}
            alignItems="center"
            sx={{
              background: "#F6EFDF",
              padding: {
                xs: "15px",
                sm: "20px",
                md: "50px",
              },
            }}
          >
            <Grid2 size={{ xs: 12, sm: 9, md: 9 }} order={{ xs: 2, md: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "20px", sm: "26px", md: "32px" },
                  fontWeight: "700",
                  marginBottom: { xs: "15px", sm: "20px", md: "20px" },
                }}
              >
                Step 2: Complete a Quick Online Consultation (For Prescription
                Medications)
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#4A4A4A",
                  fontSize: { xs: "15px", sm: "26px", md: "17px" },
                  lineHeight: "1.7",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                If you need a prescription medication, you'll be asked to
                complete a short health questionnaire. This helps our healthcare
                professionals assess your suitability for the treatment. The
                questionnaire covers:
              </Typography>
              {/*****1*****/}
              <Box className="singleList">
                <Box sx={{ width: "30px", paddingRight: "10px" }}>
                  <img src={checkIcon} alt="Prescription Medications:" />
                </Box>
                <Box>
                  <Typography variant="h4">Your medical history</Typography>
                </Box>
              </Box>
              {/*****2*****/}
              <Box className="singleList">
                <Box sx={{ width: "30px", paddingRight: "10px" }}>
                  <img src={checkIcon} alt="Prescription Medications:" />
                </Box>
                <Box>
                  <Typography variant="h4">Current medications</Typography>
                </Box>
              </Box>
              {/*****3*****/}
              <Box className="singleList">
                <Box sx={{ width: "30px", paddingRight: "10px" }}>
                  <img src={checkIcon} alt="Prescription Medications:" />
                </Box>
                <Box>
                  <Typography variant="h4">
                    Any allergies or existing conditions
                  </Typography>
                </Box>
              </Box>
              {/**********/}

              <Typography
                variant="body1"
                sx={{
                  color: "#4A4A4A",
                  fontSize: { xs: "15px", sm: "26px", md: "17px" },
                  lineHeight: "1.7",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                Rest assured, all information is handled confidentially and
                stored securely in compliance with UK data protection laws
                (GDPR).
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3, md: 3 }} order={{ xs: 1, md: 2 }}>
              <img
                src={OTC}
                alt="Over-the-Counter"
                style={{ width: "100%", borderRadius: "100px 15px 15px 15px" }}
              />
            </Grid2>
          </Grid2>

          {/* Three Section - Image Left, Content Right */}
          <Grid2
            container
            spacing={4}
            alignItems="center"
            sx={{
              background: "#FAFAFA",
              border: "1px solid #eee",
              padding: {
                xs: "15px",
                sm: "20px",
                md: "50px",
              },
            }}
          >
            <Grid2 size={{ xs: 12, sm: 3, md: 3 }}>
              <img
                src={ConsultationReview}
                alt="Online Prescriptions"
                style={{ width: "100%", borderRadius: "15px 100px 15px 15px" }}
              />
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 9, md: 9 }}
              sx={{
                paddingLeft: { xs: "0", sm: "30px", md: "40px" },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "20px", sm: "26px", md: "32px" },
                  fontWeight: "700",
                  marginBottom: { xs: "15px", sm: "20px", md: "20px" },
                }}
              >
                Step 3: Consultation Review by a Healthcare Professional
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#4A4A4A",
                  fontSize: { xs: "15px", sm: "26px", md: "17px" },
                  lineHeight: "1.7",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                Once you've submitted your questionnaire, it will be reviewed by
                one of our UK-registered doctors or pharmacists. They will
                assess your information to ensure the medication is safe and
                appropriate for you.
              </Typography>
              {/***************/}
              {/*****1*****/}
              <Box className="singleList">
                <Box sx={{ width: "30px", paddingRight: "10px" }}>
                  <img src={checkIcon} alt="Prescription Medications:" />
                </Box>
                <Box>
                  <Typography variant="h4">
                    If approved, your prescription will be issued, and your
                    medication will be dispensed.
                  </Typography>
                </Box>
              </Box>
              {/*****2*****/}
              <Box className="singleList">
                <Box sx={{ width: "30px", paddingRight: "10px" }}>
                  <img src={checkIcon} alt="Prescription Medications:" />
                </Box>
                <Box>
                  <Typography variant="h4">
                    If further information is needed, we may contact you for
                    clarification.
                  </Typography>
                </Box>
              </Box>
              {/*****3*****/}
              <Box className="singleList">
                <Box sx={{ width: "30px", paddingRight: "10px" }}>
                  <img src={checkIcon} alt="Prescription Medications:" />
                </Box>
                <Box>
                  <Typography variant="h4">
                    If the treatment is not suitable, we will recommend
                    alternative options or advise you to consult your GP.
                  </Typography>
                </Box>
              </Box>
            </Grid2>
          </Grid2>

          {/* Four Section - Content Left, Image Right */}
          <Grid2
            container
            spacing={4}
            alignItems="center"
            sx={{
              background: "#F6EFDF",
              padding: {
                xs: "15px",
                sm: "20px",
                md: "50px",
              },
            }}
          >
            <Grid2 size={{ xs: 12, sm: 9, md: 9 }} order={{ xs: 2, md: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "20px", sm: "26px", md: "32px" },
                  fontWeight: "700",
                  marginBottom: { xs: "15px", sm: "20px", md: "20px" },
                }}
              >
                Step 4: Place Your Order
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#4A4A4A",
                  fontSize: { xs: "15px", sm: "26px", md: "17px" },
                  lineHeight: "1.7",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                After your consultation is approved, you can proceed to place
                your order. We offer a range of payment options for your
                convenience. Once your order is confirmed, our team will prepare
                it for dispatch.
              </Typography>
              {/*****1*****/}
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3, md: 3 }} order={{ xs: 1, md: 2 }}>
              <img
                src={PlaceYourOrder}
                alt="Over-the-Counter"
                style={{ width: "100%", borderRadius: "100px 15px 15px 15px" }}
              />
            </Grid2>
          </Grid2>

          {/* Five Section - Image Left, Content Right */}
          <Grid2
            container
            spacing={4}
            alignItems="center"
            sx={{
              background: "#FAFAFA",
              border: "1px solid #eee",
              padding: {
                xs: "15px",
                sm: "20px",
                md: "50px",
              },
            }}
          >
            <Grid2 size={{ xs: 12, sm: 3, md: 3 }}>
              <img
                src={FastDelivery}
                alt="Online Prescriptions"
                style={{ width: "100%", borderRadius: "15px 100px 15px 15px" }}
              />
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 9, md: 9 }}
              sx={{
                paddingLeft: { xs: "0", sm: "30px", md: "40px" },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "20px", sm: "26px", md: "32px" },
                  fontWeight: "700",
                  marginBottom: { xs: "15px", sm: "20px", md: "20px" },
                }}
              >
                Step 5: Fast, Discreet Delivery
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#4A4A4A",
                  fontSize: { xs: "15px", sm: "26px", md: "17px" },
                  lineHeight: "1.7",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                We understand the importance of privacy and convenience. That's
                why we offer fast, discreet delivery across the UK. Most orders
                are dispatched within 24 hours and delivered within 2-3 working
                days. You can also choose express delivery options for quicker
                service.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#4A4A4A",
                  fontSize: { xs: "15px", sm: "26px", md: "17px" },
                  lineHeight: "1.7",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                Your medication will arrive in plain, secure packaging, with no
                indication of the contents.
              </Typography>
              {/***************/}
            </Grid2>
          </Grid2>

          {/* Four Section - Content Left, Image Right */}
          <Grid2
            container
            spacing={4}
            alignItems="center"
            sx={{
              background: "#F6EFDF",
              borderRadius: {
                xs: "0 0 10px 10px",
                sm: "0 0 15px 15px",
                md: "0 0 20px 20px",
              },
              padding: {
                xs: "15px",
                sm: "20px",
                md: "50px",
              },
            }}
          >
            <Grid2 size={{ xs: 12, sm: 9, md: 9 }} order={{ xs: 2, md: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "20px", sm: "26px", md: "32px" },
                  fontWeight: "700",
                  marginBottom: { xs: "15px", sm: "20px", md: "20px" },
                }}
              >
                Step 6: Ongoing Support and Advice
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#4A4A4A",
                  fontSize: { xs: "15px", sm: "26px", md: "17px" },
                  lineHeight: "1.7",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                At Pill Sphere, our care doesn't end when your order is
                delivered. Our team of qualified pharmacists is available to
                provide ongoing support and advice. Whether you have questions
                about your medication, need help managing side effects, or want
                guidance on general health concerns, we're here to help.
              </Typography>
              {/*****1*****/}
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3, md: 3 }} order={{ xs: 1, md: 2 }}>
              <img
                src={Support}
                alt="Over-the-Counter"
                style={{ width: "100%", borderRadius: "100px 15px 15px 15px" }}
              />
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/************** Why Choose Pill Sphere? **************/}
      <WhyChoosePills />

      {/************** FAQ **************/}

      <Container sx={{ my: 7 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h1" fontWeight="bold">
            Frequently Asked Questions
          </Typography>
        </Box>
        {faqs.map((faq, index) => {
          const isActive = expanded === index;
          return (
            <Accordion className="faqRowBox"
              sx={faqStyle.faqBox}
              key={index}
              expanded={isActive}
              onChange={() => handleChange(index)}
            >
              <AccordionSummary
                sx={faqStyle.faqTitle(isActive)}
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ color: isActive ? "#fff" : "#104239" }}
                  />
                }
              >
                <Typography sx={faqStyle.faqTitleTxt(isActive)} variant="h6">
                  {faq.title}
                </Typography>
                <Box sx={faqStyle.faqSummaryContent} />
              </AccordionSummary>
              <AccordionDetails sx={faqStyle.faqDescription}>
                {Array.isArray(faq.description) ? (
                  faq.description.map((line, idx) => (
                    <Typography
                      key={idx}
                      sx={faqStyle.faqDescriptionTxt}
                      paragraph
                    >
                      {line}
                    </Typography>
                  ))
                ) : (
                  <Typography sx={faqStyle.faqDescriptionTxt}>
                    {faq.description}
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Container>

      {/************** Our Mission **************/}
      <Box>
        <Container>
          <Box
            sx={{
              backgroundColor: "#104239",
              paddingLeft: { xs: "0px", sm: "2rem" },
              textAlign: "left",
              marginY: { xs: "30px", sm: "35px", md: "50px" },
              display: "flex",
              borderRadius: "12px",
              overflow: "hidden",
              flexDirection: { xs: "column-reverse", md: "row" },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                padding: { xs: "0px 20px", md: "0rem 1rem" },
                marginBottom: { xs: "2rem", md: "0rem" },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "22px", md: "32px" },
                  fontWeight: 700,
                  color: "#FFF",
                  paddingTop: { xs: "30px", sm: "0", md: "0" },
                }}
                gutterBottom
              >
                Get Started Today
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "16px", md: "18px" },
                  fontWeight: "500",
                  lineHeight: "1.5",
                  color: "#FFF",
                }}
              >
                Ready to take control of your health? Browse our products and
                services, complete your online consultation, and experience the
                convenience of Pill Sphere. We're here to make healthcare
                simple, accessible, and stress-free.
              </Typography>
            </Box>
            <Box
              sx={{
                display: { xs: "none", sm: "block", md: "block" },
              }}
            >
              {width < 1080 ? (
                <img src={Mission} style={{ width: "100%" }} />
              ) : (
                <img
                  src={Mission}
                  style={{ position: "relative", bottom: "-7px" }}
                />
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HowItWork;
