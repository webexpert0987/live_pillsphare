import React from "react";
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
    title: "What is the consultation process?",
    description:
      "Our consultation process involves a quick online assessment where you answer a few health-related questions. A medical professional will review your information and recommend the best treatment options for you.",
  },
  {
    title: "How long does it take to get my treatment?",
    description:
      "Once your consultation is approved, your treatment will be processed and shipped within 24-48 hours, depending on your location.",
  },
  {
    title: "Is my personal information secure?",
    description:
      "Yes, we take privacy seriously. All your personal and medical information is encrypted and stored securely.",
  },
  {
    title: "Do I need a prescription?",
    description:
      "In most cases, our medical professionals can issue a prescription after reviewing your consultation form.",
  },
];

const FAQs = () => {
  return (
    <>
    <ServiceProvidedDark />
    <Container sx={{ my: 7 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h1" fontWeight="bold">
          Frequently Asked Questions
        </Typography>
      </Box>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{faq.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
    </>
  );
};

export default FAQs;
