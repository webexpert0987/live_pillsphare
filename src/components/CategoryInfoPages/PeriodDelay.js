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
  Link,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@mui/material";
import TrustBar from "../../pages/Trustbar";
import howItWorksBg from "../../pages/images/Info-Images/how-it-works-bg.svg";
import ImageOne from "../../pages/images/Info-Images/Hay-Fever01.jpg";
import ImageTwo from "../../pages/images/Info-Images/Hay-Fever02.jpg";

import ImageThree from "../../pages/images/Info-Images/Hay-Fever03.png";
import ImageFour from "../../pages/images/Info-Images/Hay-Fever04.png";

import WhyChoosePills from "./WhyChoose";

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

function PeriodDelay() {
  const rowsPeriodDelay = [
    {
      medicineName: "Norethisterone",
      ingredients: "Norethisterone",
      form: "Tablets",
      usage:
        "Take 3 tablets daily (5 mg each), starting 3-4 days before your expected period. Continue for up to 14-17 days.",
      keybenefits: [
        "- Effectively delays periods for special occasions or travel.",
        "- Easy to use and widely trusted.",
      ],
      sideeffect: "Bloating, breast tenderness, mood changes.",
      prescription: "Yes.",
      bestFor: "Individuals needing short-term period delay.",
    },
    {
      medicineName: "Medroxyprogesterone",
      ingredients: "Medroxyprogesterone",
      form: "Tablets",
      usage:
        "Take 1 tablet daily (10 mg), starting 3-4 days before your expected period. Continue for up to 14-17 days.",
      keybenefits: [
        "- Effective for delaying periods.",
        "- Suitable for individuals who prefer a lower daily dose.",
      ],
      sideeffect: "Bloating, breast tenderness, mood changes.",
      prescription: "Yes.",
      bestFor:
        "Individuals needing short-term period delay with a lower daily dose.",
    },
  ];

  ////////////////////////// FAQ ////////////////////////////////

  const faqs = [
    {
      title: "How long can I delay my period?",
      description:
        "Both Norethisterone and Medroxyprogesterone can delay your period for up to 14-17 days.",
    },
    {
      title: "When should I start taking period delay medication?",
      description:
        "Start taking the medication 3-4 days before your expected period for best results.",
    },
    {
      title: "What happens when I stop taking the medication?",
      description:
        "Your period will usually start 2-3 days after stopping the medication.",
    },
    {
      title: "Are there any side effects of period delay treatments?",
      description:
        "Common side effects include bloating, breast tenderness, and mood changes. Serious side effects are rare but consult a healthcare professional if you have concerns.",
    },
    {
      title: "Can I use period delay treatments long-term?",
      description:
        "These treatments are designed for short-term use only. For long-term menstrual management, consult a healthcare professional.",
    },
    {
      title:
        "Can I use period delay treatments if I'm on hormonal contraception?",
      description:
        "Period delay treatments are not typically needed if you're on hormonal contraception, as you can often manipulate your cycle by adjusting your pill schedule. Consult your healthcare provider for advice.",
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

  //////////////////////////// Medical References ////////////////////////////////////

  const MedicalReferences = [
    {
      id: 1,
      image: require("../../pages/images/Info-Images/NICE-Logo.png"),
      title: "National Institute for Health and Care Excellence (NICE)",
      description: "Guidelines on menstrual management.",
    },
    {
      id: 2,
      image: require("../../pages/images/Info-Images/BNF.jpg"),
      title: "British National Formulary (BNF)",
      description: "Information on Norethisterone and Medroxyprogesterone.",
    },
    {
      id: 3,
      image: require("../../pages/images/Info-Images/MHRA.png"),
      title: "MHRA (Medicines and Healthcare products Regulatory Agency)",
      description: "Safety information for period delay medications.",
    },
    {
      id: 4,
      image: require("../../pages/images/Info-Images/LogoSmPCs.png"),
      title: "Product Summaries of Product Characteristics (SmPCs)",
      description: "For Norethisterone and Medroxyprogesterone.",
    },
  ];

  return (
    <>
      {/************** Hero Section **************/}
      <Box
        sx={{
          backgroundImage: `url("https://admin.pillsphere.com/wp-content/uploads/2025/01/categoryHeroImage.jpg")`,
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
              width: "700px",
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
              Take Control of Your Cycle
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
              Effective Period Delay Treatments
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
              Life doesn't always align with your menstrual cycle, whether it's
              for a special event, holiday, or personal preference. At Pill
              Sphere, we offer trusted period delay treatments like
              Norethisterone and Medroxyprogesterone to help you take control of
              your cycle. Our team of healthcare professionals is here to guide
              you to the right solution for your needs.
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
                }}
              >
                View Treatment
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      {/************** TrustBar Section **************/}
      <TrustBar />
      {/************** What is Period Delay? **************/}
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
                      bottom: "0",
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
                What is Period Delay?
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
                    <strong>Definition: </strong> Period delay involves using
                    medication to temporarily postpone your menstrual period.
                  </li>
                  <li>
                    <strong>How It Works: </strong> Hormonal treatments like
                    Norethisterone and Medroxyprogesterone work by maintaining
                    progesterone levels, preventing the shedding of the uterine
                    lining.
                  </li>
                  <li>
                    <strong>When to Use: </strong> Ideal for special occasions,
                    travel, or personal preference.
                  </li>
                  <li>
                    <strong>Importance of Planning: </strong> Start treatment
                    3-4 days before your expected period for best results.
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
      {/************** Treatment Options for Period Delay **************/}
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
                  Treatment Options for Period Delay
                </Typography>
                <ul className="infoList">
                  <li>
                    <strong>Norethisterone: </strong> A synthetic progesterone
                    that effectively delays periods.
                  </li>
                  <li>
                    <strong>Medroxyprogesterone: </strong> Another
                    progesterone-based option for period delay.
                  </li>
                  <li>
                    <strong>Lifestyle Tips: </strong> Plan ahead, stay hydrated,
                    and maintain a healthy lifestyle.
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
                  How Norethisterone and Medroxyprogesterone Work
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "15px", sm: "17px", md: "18px" },
                    fontWeight: "500",
                    color: "#333",
                    lineHeight: "1.7",
                    marginBottom: "20px",
                  }}
                >
                  Both medications work by mimicking the hormone progesterone,
                  which helps maintain the uterine lining and prevents
                  menstruation. They are taken orally and must be started before
                  your period begins.
                </Typography>
              </Grid2>
            </Grid2>
          </Box>
        </Container>
      </Box>
      {/************** Detailed Overview of Period Pain Treatments **************/}
      <Box
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
              Detailed Overview of Period Delay Treatments
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
              Below is a detailed overview of the period delay treatments
              available at <strong>Pill Sphere</strong>. All information is
              based on clinical guidelines and medical references.
            </Typography>
          </Box>

          {/* Treatments Table */}
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
                    Product
                  </TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>
                    Active Ingredient
                  </TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>Form</TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>Usage</TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>
                    Key Benefits
                  </TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>
                    Common Side Effects
                  </TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>
                    Prescription Required
                  </TableCell>
                  <TableCell
                    sx={{
                      ...weightCompStyle.tHead,
                      ...weightCompStyle.lastColumn,
                    }}
                  >
                    Best For
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody sx={{ backgroundColor: "#F6EFDF" }}>
                {rowsPeriodDelay.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsPeriodDelay.length - 1 &&
                          weightCompStyle.lastRow),
                        fontWeight: "700",
                      }}
                    >
                      {row.medicineName}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsPeriodDelay.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.ingredients}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsPeriodDelay.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.form}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsPeriodDelay.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {/* Check if Rightdescription is an array */}
                      {Array.isArray(row.usage)
                        ? row.usage.map((item, i) => (
                            <React.Fragment key={i}>
                              {item}
                              <br />
                            </React.Fragment>
                          ))
                        : row.usage}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsPeriodDelay.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {/* Check if Rightdescription is an array */}
                      {Array.isArray(row.keybenefits)
                        ? row.keybenefits.map((item, i) => (
                            <React.Fragment key={i}>
                              {item}
                              <br />
                            </React.Fragment>
                          ))
                        : row.keybenefits}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsPeriodDelay.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.sideeffect}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsPeriodDelay.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.prescription}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...weightCompStyle.lastColumn,
                        ...(index === rowsPeriodDelay.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.bestFor}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {/************** How to Choose the Right Period Delay Treatment **************/}
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
            <Grid2 container spacing={0}>
              {/* Left Column */}
              <Grid2
                size={{ xs: 12, sm: 6, md: 4 }}
                spacing={2}
                sx={{
                  position: "relative",
                }}
              >
                <Grid2 container spacing={0}>
                  <Grid2 item xs={12} sm={5} md={4}>
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
                  </Grid2>
                </Grid2>
              </Grid2>

              {/* Right Column */}
              <Grid2
                size={{ xs: 12, sm: 7, md: 8 }}
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
                  How to Choose the Right Period Delay Treatment
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "16px", sm: "18px", md: "20px" },
                    fontWeight: "700",
                    color: "#333",
                    lineHeight: "1.3",
                    marginBottom: "20px",
                  }}
                >
                  Factors to Consider:
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
                    <li>Duration of delay needed (up to 14-17 days).</li>
                    <li>
                      Dosage preference (e.g., multiple tablets per day vs.
                      single tablet).
                    </li>
                    <li>Side effect profile.</li>
                    <li>
                      Medical history (e.g., liver conditions, blood clots).
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

      <Box
        sx={{
          padding: { xs: "35px 0", sm: "40px 0", md: "80px 0" },
          backgroundColor: "#104239",
        }}
      >
        <Container>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "22px", sm: "30px", md: "38px" },
              fontWeight: "700",
              color: "#FFF",
              lineHeight: "1.3",
              marginBottom: "20px",
              textAlign: "center",
              marginBottom: { xs: "10px", sm: "10px", md: "10px" },
            }}
          >
            Medical References
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "15px", sm: "16px", md: "18px" },
              fontWeight: "500",
              color: "#FFF",
              lineHeight: "1.6",
              maxWidth: "100%",
              textAlign: "center",
              marginBottom: { xs: "25px", sm: "35px", md: "50px" },
            }}
          >
            To ensure accuracy, the content is based on the following
            references:
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: { xs: "30px", sm: "20px", md: "30px" },
              textAlign: "center",
            }}
          >
            {MedicalReferences.map((item) => (
              <Box key={item.id}>
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: "150px",
                    height: "auto",
                    marginBottom: "10px",
                    borderRadius: "8px",
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: "20px", sm: "22px", md: "22px" },
                    fontWeight: "600",
                    color: "#FFF",
                    marginBottom: "10px",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "16px",
                    color: "#FFF",
                    fontWeight: "400",
                    letterSpacing: "0.2px",
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default PeriodDelay;
