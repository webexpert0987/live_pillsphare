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
    title: "What is Pill Sphere?",
    description:
      "Pill Sphere is a UK-based online pharmacy and private clinic offering a wide range of prescription medications, over-the-counter products, and private healthcare services. We provide convenient, discreet, and reliable access to treatments and expert advice from qualified healthcare professionals.",
  },
  {
    title: "Is Pill Sphere a registered pharmacy?",
    description:
      "Yes, Pill Sphere is fully registered with the General Pharmaceutical Council (GPhC), the regulatory body for pharmacies in the UK. This ensures that all our services meet the highest standards of safety and professionalism.",
  },
  {
    title: "Are your medications safe and genuine?",
    description:
      "Absolutely. All medications dispensed by Pill Sphere are sourced from licensed suppliers and approved by the Medicines and Healthcare products Regulatory Agency (MHRA), the UK’s regulatory authority for medicines. This guarantees that our products are safe, effective, and of the highest quality.",
  },
  {
    title: "Do I need a prescription to order medications?",
    description:
      "For prescription-only medications, you will need a valid prescription. At Pill Sphere, we offer private online consultations with qualified healthcare professionals who can issue a prescription if appropriate. Over-the-counter (OTC) products can be purchased directly without a prescription.",
  },
  {
    title: "How do private consultations work?",
    description:
      "Our private consultations are quick, easy, and conducted online. Simply complete a health questionnaire, and one of our registered doctors or pharmacists will review your information. If approved, your prescription will be issued, and your medication will be dispensed and delivered to your doorstep.",
  },
  {
    title: "What conditions can you treat through private consultations?",
    description: [
      "Our private clinic can help with a wide range of conditions, including:",
      "- Allergies (e.g. hay fever)",
      "- Sexual health (e.g., erectile dysfunction, contraception)",
      "- Weight management",
      "- Weight Loss",
      "- General health concerns (e.g. hair loss)",
    ],
  },
  {
    title: "How do I know my personal information is safe?",
    description:
      "At Pill Sphere, we take your privacy seriously. All personal and medical information is handled in strict confidence and stored securely in compliance with UK data protection laws (GDPR). Your data will never be shared with third parties without your consent.",
  },
  {
    title: "Can I get advice from a pharmacist?",
    description:
      "Yes, our team of UK-registered pharmacists is available to provide expert advice on medications, treatments, and general health concerns. You can contact us via phone, email, or live chat for assistance.",
  },
  {
    title: "How quickly will I receive my order?",
    description:
      "We offer fast and discreet delivery across the UK. Most orders are dispatched within 24 hours and delivered within 2–3 working days. You can also choose express delivery options for quicker service.",
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
    </>
  );
};

export default FAQs;
