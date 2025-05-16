import React, { useRef, useEffect, } from "react";
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
import { useNavigate } from "react-router-dom";
import {
  WeightLossQuestion,
  AcidRefluxQuestion,
  ContraceptivesQuestion,
  CystitisQuestion,
  ErectileDysfunctionQuestion,
  HairLossQuestion,
  HighFeverQuestion,
  MigraineQuestion,
  PeriodDelayQuestion,
  PeriodPainQuestion,
  PrematureQuestion,
  StopSmokingQuestion,
} from "./categories";
import YourTreatment from "../Questionnaire/YourTreatment";
import { useApp } from "../../Context/AppContext";
import CheckoutPage from "../../components/CheckoutForm/UnifiedCheckoutPage";
import { useSearchParams } from "react-router-dom";

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
    content: <WeightLossQuestion />,
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
    content: <CheckoutPage isFromQA={true} />,
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
  tabNum: (isActive) => ({
    color: isActive ? "#104239" : "#9B8962",
  }),
};

const QuestionForm = {
  "weight-loss": <WeightLossQuestion />,
  "acid-reflux": <AcidRefluxQuestion />,
  contraceptives: <ContraceptivesQuestion />,
  cystitis: <CystitisQuestion />,
  "erectile-dysfunction": <ErectileDysfunctionQuestion />,
  "hair-loss": <HairLossQuestion />,
  hayfever: <HighFeverQuestion />,
  migraine: <MigraineQuestion />,
  "period-delay": <PeriodDelayQuestion />,
  "period-pain": <PeriodPainQuestion />,
  "premature-ejaculation": <PrematureQuestion />,
  "stop-smoking": <StopSmokingQuestion />,
};

function VerticalTabs() {
  // const [selectedTab, setSelectedTab] = useState(0);
  const { selectedTab, setSelectedTab } = useApp();
  const isMobile = useMediaQuery("(max-width: 960px)");
  const progressHeight = `${(selectedTab / (tabData.length - 1)) * 100}%`;
  const accordionRefs = useRef([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category"); // Get the "category" query param
  const navigate = useNavigate();

  const handleAccordionChange = (index) => {
    // setSelectedTab(index);
    handleTabChange(index);
    setTimeout(() => {
      if (accordionRefs.current[index]) {
        // const element = accordionRefs.current[index];
        // const elementRect = element.getBoundingClientRect();
        // const absoluteElementTop = elementRect.top + window.scrollY;
        // const middleOfScreen = window.innerHeight / 2 - elementRect.height / 2;
        window.scrollTo({
          top: 100,
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

  function handleTabChange(tab) {
    const qaData = JSON.parse(
      localStorage.getItem("questionnaire_info") || "{}"
    );
    const { user, bmiData, answers } = qaData;
    if (tab === 0) {
      setSelectedTab(tab);
    } else if (tab === 1 && user) {
      setSelectedTab(tab);
    } else if (tab === 2 && bmiData && answers) {
      setSelectedTab(tab);
    }
  }

  useEffect(() => {
    const getQaData = JSON.parse(
      localStorage.getItem("questionnaire_info") || "{}"
    );
    const { category: qaCategory } = getQaData;
    if (qaCategory !== category) {
      localStorage.setItem("questionnaire_info", JSON.stringify({ category }));
    }
  }, [category]);

  // logic added to match the user url whether there is any category in url or not if not redirect to online-clinic page
  useEffect(() => {
    const match =
      category &&
      Object.keys(QuestionForm).find(
        (key) => category === key || category.startsWith(key)
      );
    if (!match) navigate("/online-clinic", { replace: true });
    else if (category !== match)
      navigate(`/questionnaire?category=${match}`, { replace: true });
  }, [category, navigate]);

  // console.log('query parameter',category);
  // console.log('includes or not ',Object.keys(QuestionForm).includes(category));
  return (
    <Container>
      <Box
        sx={{
          padding: { xs: "40px 0", sm: "50px 0", md: "70px 0" },
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
                sx={{
                  border: "1px solid #CCC",
                  boxShadow: "none",
                  borderRadius: "10px !important",
                  marginBottom: "10px",
                  "&::before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    style={styles.tabNum(selectedTab === index)}
                    sx={{
                      fontSize: "32px",
                      fontWeight: "800",
                      paddingRight: { xs: "15px", sm: "15px", md: "15px" },
                      color: "#9B8962",
                    }}
                  >
                    {tab.number}
                  </Typography>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      style={styles.tabTitle(selectedTab === index)}
                      sx={{
                        width: "100%",
                        fontWeight: "700",
                        fontSize: "18px",
                      }}
                    >
                      {tab.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "15px", sm: "15px", md: "15px" },
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
                  {selectedTab === 1 ? (
                    <>{QuestionForm[category]}</>
                  ) : (
                    <>{tab.content}</>
                  )}

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
                      Previous Tab
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
                  onChange={(event, newValue) => handleTabChange(newValue)}
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
              <Box sx={{}}>
                {selectedTab === 1 ? (
                  <>{QuestionForm[category]}</>
                ) : (
                  <>{tabData[selectedTab].content}</>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default VerticalTabs;
