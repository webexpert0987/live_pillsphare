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
import heroImage from "../../pages/images/Info-Images/Migraine/hero.jpg"
////////////////////////
import TrustBar from "../../pages/Trustbar";
import howItWorksBg from "../../pages/images/Info-Images/how-it-works-bg.svg";
import ImageOne from "../../pages/images/Info-Images/Migraine/migraine01.jpg";
import ImageTwo from "../../pages/images/Info-Images/Migraine/migraine02.jpg";

import ImageThree from "../../pages/images/Info-Images/Migraine/migraine03.jpg";

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

function MigraineTreatment() {
  const rowsMigraine = [
    {
      medicineName: "Sumatriptan",
      form: "Tablets, nasal spray, or injections",
      usage:
        "Taken at the first sign of a migraine. Dosage varies by form (e.g., 50-100 mg tablets, 10-20 mg nasal spray).",
      keybenefits: [
        "- Fast-acting relief for moderate to severe migraines.",
        "- Available in multiple forms for convenience.",
      ],
      sideeffect: "Dizziness, fatigue, mild chest tightness.",
      bestFor: "Individuals needing fast relief for acute migraine attacks.",
    },
    {
      medicineName: "Rizatriptan",
      form: "Tablets or orally disintegrating tablets",
      usage:
        "Taken at the first sign of a migraine (5-10 mg dose).",
      keybenefits: [
        "- Fast-acting and effective for moderate to severe migraines.",
        "- Orally disintegrating tablets are convenient for those who struggle to swallow pills.",
      ],
      sideeffect: "Dizziness, fatigue, dry mouth.",
      bestFor: "Individuals who prefer quick-dissolving tablets or need rapid relief.",
    },
    {
      medicineName: "Zolmitriptan",
      form: "Tablets or nasal spray",
      usage:
        "Taken at the first sign of a migraine (2.5-5 mg dose).",
      keybenefits: [
        "- Effective for moderate to severe migraines.",
        "- Nasal spray provides faster absorption for quicker relief.",
      ],
      sideeffect: "Dizziness, nausea, mild chest tightness.",
      bestFor: "Individuals who prefer nasal spray or need fast-acting relief.",
    },
    {
      medicineName: "Naratriptan",
      form: "Tablets",
      usage:
        "Taken at the first sign of a migraine (1-2.5 mg dose).",
      keybenefits: [
        "- Longer-lasting relief compared to other triptans.",
        "- Lower risk of side effects.",
      ],
      sideeffect: "Dizziness, fatigue, mild chest tightness.",
      bestFor: "Individuals with longer-lasting migraines or those who experience side effects with other triptans.",
    },
  ];

  ////////////////////////// FAQ ////////////////////////////////

  const faqs = [
    {
      title: "When should I take a triptan?",
      description:
        "Take a triptan at the first sign of a migraine for the best results. Do not use it as a preventive medication.",
    },
    {
      title: "Can I take triptans with other medications?",
      description:
        "Triptans should not be taken with other migraine medications (e.g., ergotamines) or certain antidepressants. Always consult a healthcare professional.",
    },
    {
      title: "Are triptans safe for everyone?",
      description:
        "Triptans are not recommended for individuals with certain cardiovascular conditions. A healthcare professional can help determine if they are safe for you.",
    },
    {
      title: "What should I do if triptans don't work?",
      description:
        "If triptans are ineffective, consult a healthcare professional. Alternative treatments or preventive medications may be recommended.",
    },
    {
      title: "Can I use triptans during pregnancy?",
      description:
        "Triptans are not recommended during pregnancy. Consult your doctor for safe alternatives.",
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
      description: "Guidelines on migraine treatment.",
    },
    {
      id: 2,
      image: require("../../pages/images/Info-Images/BNF.jpg"),
      title: "British National Formulary (BNF)",
      description: "Information on triptans.",
    },
    {
      id: 3,
      image: require("../../pages/images/Info-Images/MHRA.png"),
      title: "MHRA (Medicines and Healthcare products Regulatory Agency)",
      description: "Safety information for migraine medications.",
    },
    {
      id: 4,
      image: require("../../pages/images/Info-Images/LogoSmPCs.png"),
      title: "Product Summaries of Product Characteristics (SmPCs)",
      description: "For each triptan listed.",
    },
  ];

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
              Effective Migraine Relief
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
              Manage Pain and Regain Control
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
              Migraines are more than just headaches — they can cause severe
              pain, nausea, and sensitivity to light and sound, significantly
              impacting your daily life. At Pill Sphere, we offer a range of
              trusted migraine treatments, including Sumatriptan, Rizatriptan,
              Zolmitriptan, and Naratriptan, to help you manage symptoms and
              regain control. Our team of healthcare professionals is here to
              guide you to the right treatment for your needs.
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
                  (window.location.href = `/questionnaire?category=migraine`)
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
      {/************** What is Migraines **************/}
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
                  fontSize: { xs: "22px", sm: "26px", md: "32px" },
                  fontWeight: "700",
                  color: "#333",
                  lineHeight: "1.3",
                  marginBottom: "20px",
                }}
              >
                What is a Migraine?
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
                    <strong>Definition: </strong> A migraine is a neurological condition characterized by intense, throbbing headaches, often accompanied by nausea, vomiting, and sensitivity to light or sound.
                  </li>
                  <li>
                    <strong>Symptoms: </strong> Severe headache, nausea, vomiting, visual disturbances (aura), and sensitivity to light, sound, or smells.
                  </li>
                  <li>
                    <strong>Triggers: </strong> Stress, hormonal changes, certain foods, dehydration, and environmental factors.
                  </li>
                  <li>
                    <strong>Impact: </strong> Migraines can disrupt work, social life, and overall well-being.
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
                  (window.location.href = `/questionnaire?category=migraine`)
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
      {/************** Treatment Options for Migraines **************/}
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
                    sm: "0 5% 0 0",
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
                  Treatment Options for Migraines
                </Typography>
                <ul className="infoList">
                  <li>
                    <strong>Triptans: </strong> Medications like Sumatriptan, Rizatriptan, Zolmitriptan, and Naratriptan are specifically designed to treat migraines by narrowing blood vessels and reducing inflammation.
                  </li>
                  <li>
                    <strong>Pain Relief: </strong> Over-the-counter painkillers like ibuprofen or paracetamol can help with mild migraines.
                  </li>
                  <li>
                    <strong>Lifestyle Tips: </strong> Identify and avoid triggers, stay hydrated, and maintain a regular sleep schedule.
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
                  How Triptans Work
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
                  Triptans are a class of medications that target the underlying causes of migraines. They work by:
                </Typography>
                <ul className="infoList">
                  <li>Narrowing blood vessels in the brain to reduce throbbing pain.</li>
                  <li>Blocking pain pathways in the brain.</li>
                  <li>Reducing inflammation and other migraine symptoms.</li>
                </ul>
              </Grid2>
            </Grid2>
          </Box>
        </Container>
      </Box>
      {/************** Detailed Overview of Migraine Treatments **************/}
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
                  Form
                  </TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>Usage</TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>Key Benefits</TableCell>
                  <TableCell sx={{ ...weightCompStyle.tHead }}>
                  Common Side Effects
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
                {rowsMigraine.map((row, index) => (
                  <TableRow key={index}>

                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsMigraine.length - 1 &&
                          weightCompStyle.lastRow),
                          fontWeight: "700",
                      }}
                    >
                      {row.medicineName}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsMigraine.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.form}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsMigraine.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.usage}
                    </TableCell>
                  

                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsMigraine.length - 1 &&
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
                        : row.keybenefits}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...(index === rowsMigraine.length - 1 &&
                          weightCompStyle.lastRow),
                      }}
                    >
                      {row.sideeffect}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...weightCompStyle.tBody,
                        ...weightCompStyle.lastColumn,
                        ...(index === rowsMigraine.length - 1 &&
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
                size={{ xs: 12, sm: 6, md: 6 }}
                spacing={2}
                sx={{
                  position: "relative",
                }}
              >
                <Grid2 container spacing={0}>
                  <Grid2 item xs={12} sm={5} md={4}>
                    <Box
                      component="img"
                      src={ImageThree}
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
                size={{ xs: 12, sm: 6, md: 6 }}
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
                  How to Choose the Right Migraine Treatment
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
                    <li>Severity and frequency of migraines. </li>
                    <li>Speed of relief needed.</li>
                    <li>Preferred method of administration (tablets, nasal spray, etc.).</li>
                    <li>Side effect profile.</li>
                    <li>Medical history (e.g., cardiovascular conditions).</li>
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
                    (window.location.href = `/questionnaire?category=migraine`)
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

export default MigraineTreatment;
