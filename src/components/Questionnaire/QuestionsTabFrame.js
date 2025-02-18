import React, { useState, useRef } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import YourDetail from "../Questionnaire/YourDetails";
import MultiStepQuestion from "../Questionnaire/MultiStepQuestion";
import YourTreatment from "../Questionnaire/YourTreatment";

const tabData = [
  {
    number: "1",
    title: "Your Details",
    subtitle: "Please complete your account details for consultation.",
    content: <YourDetail />,
  },
  {
    number: "2",
    title: "Consultation",
    subtitle: "A consultation provides a personalized approach to weight loss.",
    content: <MultiStepQuestion />,
  },
  {
    number: "3",
    title: "Your Treatment",
    subtitle: "Customized Plans to Achieve Your Weight Loss Goals.",
    content: <YourTreatment />,
  },
  {
    number: "4",
    title: "Checkout",
    subtitle: "Securely Complete Your Purchase and Start Your Journey.",
    content: "Securely Complete Your Purchase and Start Your Journey.",
  },
];

const styles = {
  progressActive: (progressHeight) => ({
    position: "absolute",
    left: "52px",
    top: "0",
    width: "4px",
    height: progressHeight,
    backgroundColor: "#104239",
    transition: "height 0.3s ease-in-out",
  }),
  tabBoxDiv: {
    padding: "0",
    maxWidth: "100%",
  },
  tabBox: (isActive) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    gap: "15px",
    width: "100%",
    padding: "15px 20px",
    backgroundColor: isActive ? "#EFE5CE" : "transparent",
    borderRadius: "0",
    transition: "0.3s ease-in-out",
    cursor: "pointer",
  }),
  tabNumber: (isActive) => ({
    fontWeight: "800",
    color: "#FFF",
    backgroundColor: isActive ? "#104239" : "#9B8962",
    fontSize: "48px",
    minWidth: "70px",
    height: "70px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.3s",
  }),
  tabTitle: (isActive) => ({
    color: isActive ? "#104239" : "#9B8962",
    transition: "color 0.3s",
    textTransform: "capitalize",
  }),
};

function VerticalTabs() {
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useMediaQuery("(max-width: 960px)");
  const progressHeight = `${(selectedTab / (tabData.length - 1)) * 100}%`;
  const accordionRefs = useRef([]);

  const handleAccordionChange = (index) => {
    setSelectedTab(index);
    setTimeout(() => {
      if (accordionRefs.current[index]) {
        const element = accordionRefs.current[index];
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.scrollY;
        const middleOfScreen = window.innerHeight / 2 - elementRect.height / 2;
        window.scrollTo({
          top: absoluteElementTop - middleOfScreen,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleNext = () => {
    if (selectedTab < tabData.length - 1) {
      handleAccordionChange(selectedTab + 1);
    }
  };

  const handlePrev = () => {
    if (selectedTab > 0) {
      handleAccordionChange(selectedTab - 1);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          padding: "70px 0",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {isMobile ? (
          <Box sx={{ width: "100%" }}>
            {tabData.map((tab, index) => (
              <Accordion
                key={index}
                ref={(el) => (accordionRefs.current[index] = el)}
                expanded={selectedTab === index}
                onChange={() => handleAccordionChange(index)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h4"
                      style={styles.tabTitle(selectedTab === index)}
                      sx={{
                        width: "100%",
                        fontSize: "18px",
                        fontWeight: "700",
                      }}
                    >
                      {tab.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "14px", sm: "14px", md: "15px" },
                        fontWeight: "500",
                        textTransform: "none",
                        lineHeight: "1.4",
                        width: "100%",
                      }}
                    >
                      {tab.subtitle}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {tab.content}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      onClick={handlePrev}
                      disabled={selectedTab === 0}
                      variant="contained"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={selectedTab === tabData.length - 1}
                      variant="contained"
                    >
                      Next Tab
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Paper
              sx={{
                backgroundColor: "#F6EFDF",
                width: "28%",
                borderRadius: "10px",
                padding: "0",
                boxShadow: "none",
                position: "relative",
                minHeight: "700px",
              }}
            >
              <Box sx={{ position: "relative", overflow: "hidden" }}>
                <Box
                  sx={{
                    position: "absolute",
                    left: "52px",
                    top: "0",
                    width: "4px",
                    height: "100%",
                    backgroundColor: "#ddd",
                  }}
                ></Box>
                <Box style={styles.progressActive(progressHeight)}></Box>
                <Tabs
                  orientation="vertical"
                  value={selectedTab}
                  onChange={(event, newValue) => setSelectedTab(newValue)}
                  sx={{ height: "100%", padding: "0" }}
                >
                  {tabData.map((tab, index) => (
                    <Tab
                      sx={{
                        padding: "0",
                        maxWidth: "100%",
                        marginTop: "45px",
                      }}
                      key={index}
                      label={
                        <Box
                          style={styles.tabBox(selectedTab === index)}
                          sx={{}}
                        >
                          <Typography
                            style={styles.tabNumber(selectedTab === index)}
                          >
                            {tab.number}
                          </Typography>
                          <Box
                            sx={{
                              textAlign: "left",
                            }}
                          >
                            <Typography
                              variant="h4"
                              style={styles.tabTitle(selectedTab === index)}
                              sx={{
                                fontSize: "24px",
                                fontWeight: "700",
                              }}
                            >
                              {tab.title}
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: {
                                  xs: "14px",
                                  sm: "14px",
                                  md: "15px",
                                },
                                fontWeight: "500",
                                textTransform: "none",
                                lineHeight: "1.4",
                              }}
                            >
                              {tab.subtitle}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  ))}
                </Tabs>
              </Box>
            </Paper>
            <Box
              sx={{
                width: "68%",
                border: "30px solid #F7F7F7",
                borderRadius: "10px",
                padding: "30px 45px",
              }}
            >
              <Box sx={{
              }}>
              {tabData[selectedTab].content}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default VerticalTabs;
