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
import heroImage from "../../pages/images/Info-Images/Contraceptive/hero.jpg"
////////////////////////
import TrustBar from "../../pages/Trustbar";
import howItWorksBg from "../../pages/images/Info-Images/how-it-works-bg.svg";
import ImageOne from "../../pages/images/Info-Images/Contraceptive/Contraceptive01.jpg";
import ImageTwo from "../../pages/images/Info-Images/Contraceptive/Contraceptive02.jpg";

// import ImageThree from "../../pages/images/Info-Images/Hay-Fever03.png";
// import ImageFour from "../../pages/images/Info-Images/Hay-Fever04.png";

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
      // padding: "7px 9px",
    },
  },
  tBody: {
    fontSize: "16px",
    color: "#333333",
    fontWeight: "500",
    width: "auto",
    padding: "18px 25px",
    lineHeight: "1.4",
    verticalAlign: "top",
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

function ContraceptiveTreatment() {
  const rowsCOCs = [
    {
      medicineName: "Microgynon 30",
      ingredients: "Ethinylestradiol (30 mcg) + Levonorgestrel (150 mcg)",
      usage: "Take 1 tablet daily for 21 days, followed by a 7-day break.",
      keybenefits: "Reliable, widely used, and helps regulate periods.",
      sideeffect: "Nausea, headaches, breast tenderness.",
      prescription: "Yes",
    },
    {
      medicineName: "Microgynon 30 ED",
      ingredients: "Ethinylestradiol (30 mcg) + Levonorgestrel (150 mcg)",
      usage:
        "Take 1 tablet daily for 28 days (21 active pills + 7 placebo pills).",
      keybenefits: "Helps maintain a daily routine with no break required.",
      sideeffect: "Nausea, headaches, breast tenderness.",
      prescription: "Yes",
    },
    {
      medicineName: "Marvelon",
      ingredients: "Ethinylestradiol (30 mcg) + Desogestrel (150 mcg)",
      usage: "Take 1 tablet daily for 21 days, followed by a 7-day break.",
      keybenefits: "May improve acne and reduce PMS symptoms.",
      sideeffect: "Nausea, headaches, mood changes.",
      prescription: "Yes",
    },
    {
      medicineName: "Femodene",
      ingredients: "Ethinylestradiol (30 mcg) + Gestodene (75 mcg)",
      usage: "Take 1 tablet daily for 21 days, followed by a 7-day break.",
      keybenefits: "Low risk of weight gain and water retention.",
      sideeffect: "Nausea, headaches, breast tenderness.",
      prescription: "Yes",
    },
    {
      medicineName: "Yasmin",
      ingredients: "Ethinylestradiol (30 mcg) + Drospirenone (3 mg)",
      usage: "Take 1 tablet daily for 21 days, followed by a 7-day break.",
      keybenefits: "May reduce bloating and improve acne.",
      sideeffect: "Nausea, headaches, breast tenderness.",
      prescription: "Yes",
    },
    {
      medicineName: "Qlaira",
      ingredients: "Estradiol valerate + Dienogest (varying doses)",
      usage:
        "Take 1 tablet daily for 28 days (26 active pills + 2 placebo pills).",
      keybenefits:
        "Mimics natural hormone fluctuations, may reduce side effects.",
      sideeffect: "Nausea, headaches, irregular bleeding.",
      prescription: "Yes",
    },
    {
      medicineName: "Gedarel 20/150",
      ingredients: "Ethinylestradiol (20 mcg) + Desogestrel (150 mcg)",
      usage: "Take 1 tablet daily for 21 days, followed by a 7-day break.",
      keybenefits: "Low-dose option with fewer side effects.",
      sideeffect: "Nausea, headaches, breast tenderness.",
      prescription: "Yes",
    },
    {
      medicineName: "Gedarel 30/150",
      ingredients: "Ethinylestradiol (30 mcg) + Desogestrel (150 mcg)",
      usage: "Take 1 tablet daily for 21 days, followed by a 7-day break.",
      keybenefits: "Reliable and widely used.",
      sideeffect: "Nausea, headaches, breast tenderness.",
      prescription: "Yes",
    },
    {
      medicineName: "Rigevidon",
      ingredients: "Ethinylestradiol (30 mcg) + Levonorgestrel (150 mcg)",
      usage: "Take 1 tablet daily for 21 days, followed by a 7-day break.",
      keybenefits: "Cost-effective and reliable.",
      sideeffect: "Nausea, headaches, breast tenderness.",
      prescription: "Yes",
    },
  ];

  const rowsPOPs = [
    {
      medicineName: "Cerazette",
      ingredients: "Desogestrel (75 mcg)",
      usage: "Take 1 tablet daily with no break.",
      keybenefits:
        "Suitable for breastfeeding women and those who cannot take estrogen.",
      sideeffect: "Irregular bleeding, headaches, mood changes.",
      prescription: "Yes",
    },
    {
      medicineName: "Cerelle",
      ingredients: "Desogestrel (75 mcg)",
      usage: "Take 1 tablet daily with no break.",
      keybenefits:
        "Similar to Cerazette, suitable for estrogen-sensitive individuals.",
      sideeffect: "Irregular bleeding, headaches, mood changes.",
      prescription: "Yes.",
    },
    {
      medicineName: "Norgeston",
      ingredients: "Levonorgestrel (30 mcg)",
      usage: "Take 1 tablet daily with no break.",
      keybenefits:
        "Low-dose option, suitable for estrogen-sensitive individuals.",
      sideeffect: "Irregular bleeding, headaches, mood changes.",
      prescription: "Yes.",
    },
    {
      medicineName: "Noiday",
      ingredients: "Norethisterone (350 mcg)",
      usage: "Take 1 tablet daily with no break.",
      keybenefits: "Suitable for estrogen-sensitive individuals.",
      sideeffect: "Irregular bleeding, headaches, mood changes.",
      prescription: "Yes.",
    },
  ];

  ////////////////////////// FAQ ////////////////////////////////

  const faqs = [
    {
      title: "What's the difference between COCs and POPs?",
      description:
        "COCs contain both estrogen and progestogen, while POPs contain only progestogen. POPs are often recommended for women who cannot take estrogen.",
    },
    {
      title: "Can I switch contraceptives?",
      description:
        "Yes, but consult a healthcare professional to ensure a smooth transition and avoid gaps in protection.",
    },
    {
      title: "What should I do if I miss a pill?",
      description:
        "Follow the instructions in the patient leaflet or consult a pharmacist. Missing pills can reduce effectiveness.",
    },
    {
      title: "Are there any side effects of contraceptives?",
      description:
        "Side effects vary by product but are generally mild. Common ones include nausea, headaches, and mood changes.",
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
              Reliable Contraceptive Solutions
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
              Find the Right Birth Control for You
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
              Choosing the right contraceptive is an important decision for your
              health and lifestyle. At Pill Sphere, we offer a wide range of
              trusted contraceptive options, including combined pills,
              progestogen-only pills, and other hormonal contraceptives. Our
              team of healthcare professionals is here to help you find the best
              solution tailored to your needs.
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
                  (window.location.href = `/questionnaire?category=contraceptives`)
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
      {/************** What are Contraceptives? **************/}
      <Container>
        <Box
          sx={{
            maxWidth: "100%",
            margin: "auto",
            padding: {
              xs: "30px 0 30px 0",
              sm: "50px 0 70px 0",
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
                  fontSize: { xs: "22px", sm: "30px", md: "32px" },
                  fontWeight: "700",
                  color: "#333",
                  lineHeight: "1.3",
                  marginBottom: "20px",
                }}
              >
                What are Contraceptives?
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
                    <strong>Definition:</strong> Contraceptives are methods or
                    medications used to prevent pregnancy.
                  </li>
                  <li>
                    <strong>Types:</strong> Combined oral contraceptives (COCs),
                    progestogen-only pills (POPs), and other hormonal options.
                  </li>
                  <li>
                    <strong>Importance of Choice:</strong> Emphasize the
                    importance of selecting a contraceptive that suits your
                    health, lifestyle, and preferences.
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
                  (window.location.href = `/questionnaire?category=contraceptives`)
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
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                xs: "30px 0 50px 0",
                sm: "50px 0 60px 0",
                md: "70px 0 90px 0",
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
                    fontSize: { xs: "22px", sm: "30px", md: "32px" },
                    fontWeight: "700",
                    color: "#333",
                    lineHeight: "1.3",
                    marginBottom: "20px",
                  }}
                >
                  Types of Contraceptives Available
                </Typography>
                <ul className="infoList">
                  <li>
                    <strong>Combined Oral Contraceptives (COCs):</strong>{" "}
                    Contain both estrogen and progestogen (e.g., Microgynon 30,
                    Yasmin, Qlaira).
                  </li>
                  <li>
                    <strong>Progestogen-Only Pills (POPs): </strong> Contain
                    only progestogen (e.g., Cerazette, Cerelle, Norgeston).
                  </li>
                  <li>
                    <strong>Other Options: </strong> Include patches,
                    injections, and implants (not listed here but can be
                    mentioned for completeness).
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
                    fontSize: { xs: "22px", sm: "30px", md: "32px" },
                    fontWeight: "700",
                    color: "#333",
                    lineHeight: "1.3",
                    marginBottom: "20px",
                  }}
                >
                  How to Choose the Right Contraceptive
                </Typography>
                <ul className="infoList">
                  <li>Medical history (e.g., migraines, blood clots) </li>
                  <li>Lifestyle (e.g., ease of use, daily routine) </li>
                  <li>Side effects </li>
                  <li>Future pregnancy plans </li>
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
                    (window.location.href = `/questionnaire?category=contraceptives`)
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
      {/************** Detailed Overview of Contraceptive Products **************/}
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
              Detailed Overview of Contraceptive Products
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
              Below is a detailed overview of the contraceptive products
              available at Pill Sphere. All information is based on clinical
              guidelines and medical references.
            </Typography>
          </Box>

          {/* Combined Oral Contraceptives (COCs) */}
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
                    Combined Oral Contraceptives (COCs)
                  </TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>
                    Active Ingredients
                  </TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>Usage</TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>
                    Key Benefits:
                  </TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>
                    Common Side Effects
                  </TableCell>
                  <TableCell
                    sx={{
                      ...weightCompStyle.tHead,
                      ...weightCompStyle.lastColumn,
                    }}
                  >
                    Prescription Required
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody sx={{ backgroundColor: "#F6EFDF" }}>
                {rowsCOCs.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsCOCs.length - 1 &&
                          weightCompStyle.lastRow),
                        fontWeight: "700",
                      }}
                    >
                      {row.medicineName}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsCOCs.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.ingredients}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsCOCs.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.usage}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsCOCs.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.keybenefits}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsCOCs.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.sideeffect}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...weightCompStyle.lastColumn,
                        ...(index === rowsCOCs.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.prescription}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Progestogen-Only Pills (POPs) */}
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
                    Progestogen-Only Pills (POPs)
                  </TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>
                    Active Ingredients
                  </TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>Usage</TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>
                    Key Benefits:
                  </TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>
                    Common Side Effects
                  </TableCell>
                  <TableCell
                    sx={{
                      ...weightCompStyle.tHead,
                      ...weightCompStyle.lastColumn,
                    }}
                  >
                    Prescription Required
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody sx={{ backgroundColor: "#F6EFDF" }}>
                {rowsPOPs.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsPOPs.length - 1 &&
                          weightCompStyle.lastRow),
                        fontWeight: "700",
                      }}
                    >
                      {row.medicineName}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsPOPs.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.ingredients}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsPOPs.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.usage}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsPOPs.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.keybenefits}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsPOPs.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.sideeffect}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...weightCompStyle.lastColumn,
                        ...(index === rowsPOPs.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.prescription}
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

export default ContraceptiveTreatment;
