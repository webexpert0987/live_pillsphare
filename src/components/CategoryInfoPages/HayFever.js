import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  // Link,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@mui/material";
import heroImage from "../../pages/images/Info-Images/Hay-Fever/hero.jpg"
////////////////////////
import TrustBar from "../../pages/Trustbar";
import howItWorksBg from "../../pages/images/Info-Images/how-it-works-bg.svg";
import ImageOne from "../../pages/images/Info-Images/Hay-Fever/hey01.jpg";
import ImageTwo from "../../pages/images/Info-Images/Hay-Fever/hey02.jpg";

import WhyChoosePills from "./WhyChoose";
import MedicalReferences from "./MedicalReferences";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const borderColor = "#EAD4A2";

const weightCompStyle = {
  tHead: {
    fontSize: "16px",
    color: "#FFF",
    fontWeight: "bold",
    width: "auto",
    padding: "18px 25px",
    lineHeight: "1.4",
    borderBottom: `1px solid ${borderColor}`, // Bottom border only
    borderRight: `1px solid ${borderColor}`, // Right border only
    "@media (max-width: 991px)": {
      fontSize: "16px",
      padding: "12px 15px",
    },
    "@media (max-width: 767px)": {
      fontSize: "15px",
      padding: "10px 12px",
    },
  },
  tBody: {
    fontSize: "16px",
    color: "#333333",
    fontWeight: "500",
    width: "auto",
    padding: "18px 25px",
    lineHeight: "1.4",
    borderBottom: `1px solid ${borderColor}`, // Bottom border only
    borderRight: `1px solid ${borderColor}`, // Right border only
    "@media (max-width: 991px)": {
      fontSize: "16px",
      padding: "12px 15px",
    },
    "@media (max-width: 767px)": {
      fontSize: "15px",
      padding: "10px 12px",
    },
  },
  lastColumn: {
    borderRight: "none", // Removes right border for last column
  },
  lastRow: {
    borderBottom: "none", // Removes bottom border for last row
  },
};

function HayFever() {
  const rows = [
    {
      Antihistamines: "Telfast (Fexofenadine)",
      formtyle: "Tablets",
      usage: "Taken once daily.",
      keybenefits:
        "Non-drowsy, fast-acting, and effective for sneezing, itching, and runny nose.",
      sideeffect: "Headache, nausea.",
    },
    {
      Antihistamines: "Cetirizine",
      formtyle: "Tablets or liquid",
      usage: "Taken once daily.",
      keybenefits:
        "Non-drowsy (for most people), effective for 24-hour relief.",
      sideeffect: "Mild drowsiness, dry mouth.",
    },
    {
      Antihistamines: "Desloratadine",
      formtyle: "Tablets",
      usage: "Taken once daily.",
      keybenefits: "Non-drowsy, long-lasting relief for up to 24 hours.",
      sideeffect: "Fatigue, dry mouth.",
    },
    {
      Antihistamines: "Allevia (Fexofenadine)",
      formtyle: "Tablets",
      usage: "Taken once daily.",
      keybenefits:
        "Non-drowsy, effective for sneezing, itching, and runny nose.",
      sideeffect: "Headache, nausea.",
    },
    {
      Antihistamines: "Loratadine",
      formtyle: "Tablets or syrup",
      usage: "Taken once daily.",
      keybenefits: "Non-drowsy, long-lasting relief for up to 24 hours.",
      sideeffect: "Headache, fatigue.",
    },
    {
      Antihistamines: "Chlorphenamine",
      formtyle: "Tablets or syrup",
      usage: "Taken 2-3 times daily.",
      keybenefits: "Fast-acting, effective for severe symptoms.",
      sideeffect: "Drowsiness, dry mouth.",
    },
  ];

  const rowsNasal = [
    {
      NasalSprays: "Avamys (Fluticasone Furoate)",
      formtyle: "Steroid nasal spray",
      usage: "Used once daily.",
      keybenefits:
        "Reduces inflammation and congestion, effective for moderate to severe symptoms.",
      sideeffect: "Mild nasal irritation or dryness.",
    },
    {
      NasalSprays: "Rhinolast (Azelastine)",
      formtyle: "Antihistamine nasal spray",
      usage: "Used once or twice daily.",
      keybenefits:
        "Fast relief for nasal symptoms like sneezing and congestion.",
      sideeffect: "Bitter taste, mild nasal irritation.",
    },
    {
      NasalSprays: "Flixonase (Fluticasone Propionate)",
      formtyle: "Steroid nasal spray",
      usage: "Used once daily.",
      keybenefits:
        "Reduces inflammation and congestion, effective for moderate to severe symptoms.",
      sideeffect: "Mild nasal irritation or dryness.",
    },
    {
      NasalSprays: "Nasonex (Mometasone)",
      formtyle: "Steroid nasal spray",
      usage: "Used once daily.",
      keybenefits:
        "Reduces inflammation and congestion, effective for moderate to severe symptoms.",
      sideeffect: "Mild nasal irritation or dryness.",
    },
    {
      NasalSprays: "Nasacort (Triamcinolone)",
      formtyle: "Steroid nasal spray",
      usage: "Used once daily.",
      keybenefits:
        "Reduces inflammation and congestion, effective for moderate to severe symptoms.",
      sideeffect: "Mild nasal irritation or dryness.",
    },
    {
      NasalSprays: "Dymista (Azelastine + Fluticasone)",
      formtyle: "Combination nasal spray",
      usage: "Used once or twice daily.",
      keybenefits:
        "Combines antihistamine and steroid for fast and long-lasting relief.",
      sideeffect: "Bitter taste, mild nasal irritation.",
    },
    {
      NasalSprays: "Beconase (Beclometasone)",
      formtyle: "Steroid nasal spray",
      usage: "Used once or twice daily.",
      keybenefits:
        "Reduces inflammation and congestion, effective for moderate to severe symptoms.",
      sideeffect: "Mild nasal irritation or dryness.",
    },
  ];

  const RowEyeDrops = [
    {
      EyeDropsName: "Opticrom (Sodium Cromoglicate)",
      formtyle: "Eye drops",
      usage: "Applied 2-4 times daily.",
      keybenefits: "Soothes itchy, red, or watery eyes.",
      sideeffect: "Mild stinging or blurred vision temporarily.",
    },
    {
      EyeDropsName: "Optilast (Azelastine)",
      formtyle: "Eye drops",
      usage: "Applied once or twice daily.",
      keybenefits: "Fast relief for itchy and watery eyes.",
      sideeffect: "Mild stinging or dryness.",
    },
    {
      EyeDropsName: "Opatanol (Olopatadine)",
      formtyle: "Eye drops",
      usage: "Applied once or twice daily.",
      keybenefits: "Fast relief for itchy and watery eyes.",
      sideeffect: "Mild stinging or dryness.",
    },
  ];

  ////////////////////////// FAQ ////////////////////////////////

  const faqs = [
    {
      title: "When should I start taking hay fever medication?",
      description:
        "Start taking medication 1-2 weeks before the pollen season begins for best results.",
    },
    {
      title: "Can I take antihistamines every day?",
      description:
        "Yes, antihistamines are safe for daily use during the hay fever season.",
    },
    {
      title: "Are steroid nasal sprays safe?",
      description:
        "Yes, steroid nasal sprays are safe when used as directed. They are effective for reducing inflammation and congestion.",
    },
    {
      title:
        "What's the difference between antihistamines and steroid nasal sprays?",
      description:
        "Antihistamines relieve sneezing, itching, and runny nose, while steroid sprays reduce inflammation and congestion.",
    },
    {
      title: "Can children use hay fever treatments?",
      description:
        "Yes, many hay fever treatments are suitable for children, but always check the product label or consult a pharmacist.",
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
      fontSize: "19px",
      // Media Queries
      "@media (max-width: 991px)": {
        // Tablet
        fontSize: "16px",
      },
      "@media (max-width: 767px)": {
        // Mobile
        fontSize: "16px",
      },
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
      // Media Queries
      "@media (max-width: 991px)": {
        // Tablet
        padding: "15px 20px",
      },
      "@media (max-width: 767px)": {
        // Mobile
        padding: "10px 20px",
      },
    },
    faqDescriptionTxt: {
      color: "#333",
      fontSize: "18px",
      fontWeight: "500",
      lineHeight: "1.6",
      // Media Queries
      "@media (max-width: 991px)": {
        // Tablet
        fontSize: "16px",
      },
      "@media (max-width: 767px)": {
        // Mobile
        fontSize: "15px",
      },
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
              Effective Hay Fever Relief
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
              Breathe Easier This Allergy Season
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
              Hay fever, also known as allergic rhinitis, is a common condition
              that affects millions of people in the UK. It can cause sneezing,
              itchy eyes, a runny nose, and other uncomfortable symptoms.
              At Pill Sphere, we offer a wide range of trusted treatments,
              including nasal sprays, eye drops, and antihistamines, to help you
              manage hay fever and enjoy the outdoors with confidence.
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
                onClick={() =>
                  (window.location.href = `/questionnaire?category=hayfever`)
                }
              >
                Start Your Consultation Today
              </Button>
              <Button
                variant="outlined"
                sx={{
                  fontSize: { xs: "15px", sm: "16px", md: "18px" },
                  fontWeight: "600",
                  lineHeight: "1.4",
                  backgroundColor: "#104239",
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
                onClick={() =>
                  (window.location.href = `#Treatment`)
                }
              >
                View Treatment
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      {/************** TrustBar Section **************/}
      <TrustBar />
      {/************** What is Hay Fever? **************/}
      <Container>
        <Box
          sx={{
            maxWidth: "100%",
            margin: "auto",
            padding: {
              xs: "30px 0 30px 0",
              sm: "50px 0 60px 0",
              md: "70px 0 90px 0",
            },
          }}
        >
          <Grid2 container spacing={0}>
            {/* Left Column */}
            <Grid2
              size={{ xs: 12, sm: 6, md: 5 }}
              spacing={2}
              sx={{
                position: "relative",
              }}
            >
              <Grid2 container spacing={0}>
                <Grid2 item xs={12} sm={6} md={5}>
                  <Box
                    component="img"
                    src={howItWorksBg}
                    sx={{
                      position: "absolute",
                      right: "20px",
                      top: "40px",
                      display: { xs: "none", sm: "block", md: "block" },
                    }}
                  />
                  <Box
                    component="img"
                    src={ImageOne}
                    sx={{
                      maxWidth: "100%",
                      borderRadius: "20px",
                      zIndex: "1",
                      position: "relative",
                    }}
                  />
                  <Box
                    component="img"
                    src={ImageTwo}
                    sx={{
                      maxWidth: "100%",
                      position: "absolute",
                      right: "0",
                      bottom: "-30px",
                      borderRadius: "20px",
                      zIndex: "2",
                      display: { xs: "none", sm: "block", md: "block" },
                    }}
                  />
                </Grid2>
              </Grid2>
            </Grid2>

            {/* Right Column */}
            <Grid2
              size={{ xs: 12, sm: 6, md: 7 }}
              spacing={2}
              sx={{
                padding: {
                  xs: "20px 0 0 0px",
                  sm: "30px 0 0 50px",
                  md: "30px 0 0 80px",
                },
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontSize: { xs: "22px", sm: "26px", md: "32px" },
                  fontWeight: "700",
                  color: "#333",
                  lineHeight: "1.3",
                  marginBottom: "20px",
                }}
              >
                What is Hay Fever?
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "15px", sm: "16px", md: "16px" },
                  fontWeight: "500",
                  color: "#4A4A4A",
                  lineHeight: "1.6",
                  marginBottom: "25px",
                }}
              >
                <ul className="infoList">
                  <li>
                    <strong>Definition:</strong> Hay fever is an allergic
                    reaction to pollen, dust mites, or animal dander.
                  </li>
                  <li>
                    <strong>Symptoms:</strong> Sneezing, runny or blocked nose,
                    itchy eyes, throat, or ears, and fatigue.
                  </li>
                  <li>
                    <strong>Triggers:</strong> Tree pollen (spring), grass
                    pollen (summer), and weed pollen (autumn).
                  </li>
                  <li>
                    <strong>Impact:</strong> Hay fever can disrupt daily
                    activities, sleep, and overall quality of life.
                  </li>
                </ul>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  fontSize: { xs: "14px", sm: "17px", md: "18px" },
                  fontWeight: "600",
                  lineHeight: "1.4",
                  backgroundColor: "#FD6400",
                  color: "#FFF",
                  borderRadius: "50px",
                  border: "none",
                  textTransform: "inherit",
                  padding: "12px 25px",
                  boxShadow: "none",
                }}
                onClick={() =>
                  (window.location.href = `/questionnaire?category=hayfever`)
                }
              >
                Start Your Consultation
                <svg
                  style={{ marginLeft: "10px" }}
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 7L11 1M17 7L11 13M17 7L6.5 7M1 7L3.5 7"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Container>
      {/************** Treatment Options for Hay fever /  How to Choose the Right Hay fever Treatment **************/}
      <Box sx={{ backgroundColor: "#F6EFDF" }}>
        <Container>
          <Box
            sx={{
              maxWidth: "100%",
              margin: "auto",
              padding: {
                xs: "30px 0 30px 0",
                sm: "50px 0 50px 0",
                md: "70px 0 70px 0",
              },
            }}
          >
            <Grid2 container spacing={0} sx={{}}>
              {/* Left Column */}
              <Grid2
                size={{ xs: 12, sm: 6, md: 6 }}
                spacing={2}
                sx={{
                  padding: {
                    xs: "0 0 0 0",
                    sm: "0 10% 0 0",
                    md: "0 10% 0 0",
                  },
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "22px", sm: "26px", md: "32px" },
                    fontWeight: "700",
                    color: "#333",
                    lineHeight: "1.3",
                    marginBottom: "20px",
                  }}
                >
                  Treatment Options for Hay fever
                </Typography>
                <ul className="infoList">
                  <li>
                    <strong>Antihistamines:</strong> Relieve sneezing, itching,
                    and runny nose (e.g., Telfast, Cetirizine, Loratadine).
                  </li>
                  <li>
                    <strong>Nasal Sprays:</strong> Reduce inflammation and
                    congestion (e.g., Avamys, Flixonase, Dymista).
                  </li>
                  <li>
                    <strong>Eye Drops:</strong> Soothe itchy, red, or watery
                    eyes (e.g., Opticrom, Optilast, Opatanol).
                  </li>
                  <li>
                    <strong>Lifestyle Tips:</strong> Avoid pollen, keep windows
                    closed, and shower after being outdoors.
                  </li>
                </ul>
              </Grid2>

              {/* Right Column */}
              <Grid2
                size={{ xs: 12, sm: 6, md: 6 }}
                spacing={2}
                sx={{
                  position: "relative",
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "22px", sm: "26px", md: "32px" },
                    fontWeight: "700",
                    color: "#333",
                    lineHeight: "1.3",
                    marginBottom: "20px",
                  }}
                >
                  How to Choose the Right Hay fever Treatment
                </Typography>
                <ul className="infoList">
                  <li>Severity of symptoms (mild, moderate, or severe) </li>
                  <li>Type of symptoms (nasal, eye, or both) </li>
                  <li>Duration of symptoms (seasonal or year-round) </li>
                  <li>
                    Personal preferences (e.g., tablets, sprays, or drops){" "}
                  </li>
                </ul>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    fontSize: { xs: "14px", sm: "17px", md: "18px" },
                    fontWeight: "600",
                    lineHeight: "1.4",
                    backgroundColor: "#FD6400",
                    color: "#FFF",
                    borderRadius: "50px",
                    border: "none",
                    textTransform: "inherit",
                    padding: "12px 25px",
                    boxShadow: "none",
                    marginTop: { xs: "15px", sm: "20px", md: "25px" },
                  }}
                  onClick={() =>
                    (window.location.href = `/questionnaire?category=hayfever`)
                  }
                >
                  Start Your Consultation
                  <svg
                    style={{ marginLeft: "10px" }}
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 7L11 1M17 7L11 13M17 7L6.5 7M1 7L3.5 7"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Button>
              </Grid2>
            </Grid2>
          </Box>
        </Container>
      </Box>
      {/************** Detailed Overview of Hay fever Treatments **************/}
      <Box id="Treatment"
        sx={{
          padding: { xs: "30px 0", sm: "50px 0", md: "70px 0" },
          backgroundColor: "#F7F7F7",
        }}
      >
        <Container>
          <Box style={weightCompStyle.sectionInfo}>
            {/* Title */}
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "22px", sm: "26px", md: "32px" },
                fontWeight: "700",
                color: "#333",
                lineHeight: "1.3",
                marginBottom: "20px",
              }}
            >
              Detailed Overview of Hay fever Treatments
            </Typography>

            {/* Paragraph */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "15px", sm: "16px", md: "18px" },
                fontWeight: "500",
                color: "#4A4A4A",
                lineHeight: "1.6",
                marginBottom: "35px",
                width: "700px",
                maxWidth: "100%",
              }}
            >
              Below is a detailed overview of the hay fever treatments available
              at Pill Sphere. All information is based on clinical guidelines
              and medical references.
            </Typography>
          </Box>

          {/* Antihistamines Table */}
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "15px",
              boxShadow: "none",
              border: "none",
            }}
          >
            <Table sx={{ border: "none" }}>
              {/* Table Head */}
              <TableHead>
                <TableRow sx={{ backgroundColor: "#104239" }}>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>
                    Antihistamines
                  </TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>Form</TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>Usage</TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>
                    Key Benefits:
                  </TableCell>
                  <TableCell
                    sx={{
                      ...weightCompStyle.tHead,
                      ...weightCompStyle.lastColumn,
                    }}
                  >
                    Common Side Effects
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody sx={{ backgroundColor: "#F6EFDF" }}>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rows.length - 1 &&
                          weightCompStyle.lastRow),
                        fontWeight: "700",
                      }}
                    >
                      {row.Antihistamines}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rows.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.formtyle}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rows.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.usage}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rows.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.keybenefits}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...weightCompStyle.lastColumn,
                        ...(index === rows.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.sideeffect}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Nasal Sprays Table */}
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "15px",
              boxShadow: "none",
              border: "none",
              marginTop: { xs: "30px", sm: "35px", md: "40px" },
            }}
          >
            <Table sx={{ border: "none" }}>
              {/* Table Head */}
              <TableHead>
                <TableRow sx={{ backgroundColor: "#104239" }}>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>
                    Nasal Sprays
                  </TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>Form</TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>Usage</TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>
                    Key Benefits:
                  </TableCell>
                  <TableCell
                    sx={{
                      ...weightCompStyle.tHead,
                      ...weightCompStyle.lastColumn,
                    }}
                  >
                    Common Side Effects
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody sx={{ backgroundColor: "#F6EFDF" }}>
                {rowsNasal.map((rowsNasal, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsNasal.length - 1 &&
                          weightCompStyle.lastRow),
                        fontWeight: "700",
                      }}
                    >
                      {rowsNasal.NasalSprays}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsNasal.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {rowsNasal.formtyle}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsNasal.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {rowsNasal.usage}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsNasal.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {rowsNasal.keybenefits}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...weightCompStyle.lastColumn,
                        ...(index === rowsNasal.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {rowsNasal.sideeffect}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Eye Drops Table */}
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "15px",
              boxShadow: "none",
              border: "none",
              marginTop: { xs: "30px", sm: "35px", md: "40px" },
            }}
          >
            <Table sx={{ border: "none" }}>
              {/* Table Head */}
              <TableHead>
                <TableRow sx={{ backgroundColor: "#104239" }}>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>
                    Eye Drops
                  </TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>Form</TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>Usage</TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>
                    Key Benefits:
                  </TableCell>
                  <TableCell
                    sx={{
                      ...weightCompStyle.tHead,
                      ...weightCompStyle.lastColumn,
                    }}
                  >
                    Common Side Effects
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody sx={{ backgroundColor: "#F6EFDF" }}>
                {RowEyeDrops.map((RowEyeDrops, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === RowEyeDrops.length - 1 &&
                          weightCompStyle.lastRow),
                        fontWeight: "700",
                      }}
                    >
                      {RowEyeDrops.EyeDropsName}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === RowEyeDrops.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {RowEyeDrops.formtyle}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === RowEyeDrops.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {RowEyeDrops.usage}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === RowEyeDrops.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {RowEyeDrops.keybenefits}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...weightCompStyle.lastColumn,
                        ...(index === RowEyeDrops.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {RowEyeDrops.sideeffect}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {/************** Why Choose Pill Sphere? **************/}
      <WhyChoosePills />

      {/************** FAQs **************/}
      <Box
        sx={{
          padding: { xs: "30px 0", sm: "50px 0", md: "70px 0" },
        }}
      >
        <Container sx={{}}>
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
      </Box>

      {/************** Medical References **************/}
<MedicalReferences/>
    </>
  );
}

export default HayFever;
