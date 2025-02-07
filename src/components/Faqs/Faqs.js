import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ServiceProvidedDark from "../Faqs/ServiceProviderDark";

const faqs = [
  {
    title: "Do I need a prescription to order medication?",
    description:
      "Some medications require a valid prescription, while others are available over the counter. If a prescription is needed, you can upload it during checkout, or our medical professionals can assess your condition and provide one if necessary. We ensure a smooth and hassle-free process for our customers.",
  },
  {
    title: "How long does it take to receive my order?",
    description:
      "Orders are usually processed within 24-48 hours. Delivery times vary based on your location and the shipping option selected at checkout. Standard shipping typically takes 3-5 business days, while express options are available for faster delivery. We provide tracking details so you can monitor your order’s status.",
  },
  {
    title: "Are the medications you sell genuine and safe?",
    description:
      "Yes, all our medications are sourced from licensed manufacturers and authorized suppliers. We follow strict quality control standards to ensure that all products are genuine, safe, and effective. Additionally, our pharmacy operates under government regulations and guidelines to guarantee the highest level of safety.",
  },
  {
    title: "Can I return or exchange my medication?",
    description:
      "Due to health and safety regulations, we cannot accept returns on prescription medications. However, if you receive the wrong medication, a damaged product, or an order error, please contact our customer service team immediately, and we will work to resolve the issue as quickly as possible.",
  },
  {
    title: "How do I book an appointment?",
    description:
      "Booking an appointment is easy! You can schedule a consultation through our website, call our clinic directly, or visit us in person. We offer both in-person and virtual consultations to provide flexibility for our patients. Same-day appointments may be available depending on doctor availability.",
  },
  {
    title: "What services does the private clinic offer?",
    description:
      "Our private clinic offers a range of services, including general health check-ups, diagnostic tests, specialist consultations, vaccinations, minor surgical procedures, and wellness treatments. We are committed to providing personalized healthcare solutions tailored to your specific needs.",
  },
  {
    title: "Is my personal information secure?",
    description:
      "Yes, we take patient confidentiality very seriously. Our clinic follows strict data protection policies to ensure that all personal and medical information is securely stored and only accessible by authorized personnel. We comply with HIPAA (Health Insurance Portability and Accountability Act) and other data security standards to protect your privacy.",
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

const FAQs = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <>
      <ServiceProvidedDark />
      <Container sx={{ my: 7 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h1" fontWeight="bold">
            Frequently Asked Questions
          </Typography>
        </Box>
        {faqs.map((faq, index) => {
          const isActive = expanded === index;
          return (
            <Accordion
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
                <Typography sx={faqStyle.faqDescriptionTxt}>
                  {faq.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Container>
    </>
  );
};

export default FAQs;
