import React, { useEffect, useRef, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Checkbox,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "../../../../src/globalStyle.css";

import BmiCalculate from "../Consultation"; // Import the BMI calculation component
import { useApp } from "../../../Context/AppContext";
import { useMessage } from "../../../Context/MessageContext";
const steps = ["1", "2", "3", "4"];

function CystitisQuestion() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({
    agedBetween: "",
    agreeToTerms: "",
    photoID: "",
  });
  const boxRef = useRef(null);
  const { setSelectedTab } = useApp();
  const { showMessage } = useMessage();
  const handleScroll = () => {
    setTimeout(() => {
      if (boxRef.current) {
        const element = boxRef.current;
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.scrollY;
        // Adjust the scroll position to be a bit higher (for example, 100px above the middle)
        const offset = 300; // Change this value as needed
        window.scrollTo({
          top: absoluteElementTop - offset,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleNext = () => {
    const qaData = JSON.parse(
      localStorage.getItem("questionnaire_info") || "{}"
    );
    const { bmiData } = qaData;

    // Validation logic
    if (activeStep === 0) {
      if (!bmiData?.bmi) {
        showMessage("Please calculate your BMI first", "error");
        return;
      }
    } else if (activeStep === 1) {
      const requiredFields = ["agedBetween"];

      for (const field of requiredFields) {
        if (
          Array.isArray(answers[field])
            ? answers[field].length === 0
            : !answers[field]
        ) {
          showMessage(
            "Please fill all details before proceeding to the next step.",
            "error"
          );
          return;
        }
      }
    } else if (activeStep === 2) {
      const requiredAgreements = ["agreeToTerms"];

      for (const field of requiredAgreements) {
        if (!answers[field]) {
          showMessage(
            "Please fill all details before proceeding to the next step.",
            "error"
          );
          return;
        }
      }
    }

    setActiveStep((prevStep) => prevStep + 1);
    handleScroll();
  };
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    handleScroll();
  };

  const handleSubmit = () => {
    console.log("Form submitted with answers: ", answers);
    const data = localStorage.getItem("questionnaire_info");
    let parsedData = {};
    if (data) {
      parsedData = JSON.parse(data);
    }
    localStorage.setItem(
      "questionnaire_info",
      JSON.stringify({
        ...parsedData,
        answers: answers,
      })
    );
    setSelectedTab(2);
  };

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      //============= Step 01 =============//
      case 0:
        return (
          <>
            <BmiCalculate />
          </>
        );
      //============= Step 02 =============//
      case 1:
        return (
          <>
            {/****** 1st What is your gender? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                What is your gender? (Male N/A)
              </Typography>
              <RadioGroup
                row
                name="agedBetween"
                value={answers.agedBetween}
                onChange={(e) =>
                  setAnswers({ ...answers, agedBetween: e.target.value })
                }
              >
                {/* <FormControlLabel value="Male" control={<Radio />} label="Male" /> */}
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>

            {/****** Do you need assistance with this questionnaire? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you need assistance with this questionnaire?
              </Typography>
              <RadioGroup
                row
                name="assistanceNeeded"
                value={answers.assistanceNeeded}
                onChange={(e) =>
                  setAnswers({ ...answers, assistanceNeeded: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.assistanceNeeded === "Yes" && (
                <div>
                  <Typography variant="h4" >
                    Call us : 1234567890
                  </Typography>    
                  <Typography variant="h4">
                    Mail us : help@medicusexpress.com 
                  </Typography>
                </div>
              )}
            </FormControl>

            {/****** Are you able to make decisions about your healthcare? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you able to make decisions about your healthcare?
              </Typography>
              <RadioGroup
                row
                name="makeDecision"
                value={answers.makeDecision}
                onChange={(e) =>
                  setAnswers({ ...answers, makeDecision: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.makeDecision === "No" && (
                <div>
                  <Typography variant="h4" >
                  Sorry we can’t offer you this treatment, please contact your GP or 111 and not proceed .
                  </Typography>    
                </div>
              )}
            </FormControl>

            {/****** Do you have any diagnosed medical conditions? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have any diagnosed medical conditions?
              </Typography>
              <RadioGroup
                row
                name="diagnosedMed"
                value={answers.diagnoseMed}
                onChange={(e) =>
                  setAnswers({ ...answers, diagnoseMed: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.diagnoseMed === "Yes" && (<TextField 
              multiline
              line={3}
              value={answers.diagnosisDetails}
              onChange={(e) =>
                setAnswers({...answers, diagnosisDetails:e.target.value})
              } fullWidth placeholder="Please write here"/>
            )}
            </FormControl>

            {/******.** Are you currently taking any medications, including prescription, over-the-counter, or homeopathic options? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you currently taking any medications, including prescription, over-the-counter, or homeopathic options?
              </Typography>
              <RadioGroup
                row
                name="prescription"
                value={answers.prescription}
                onChange={(e) =>
                  setAnswers({ ...answers, prescription: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.prescription === "Yes" && (<TextField
              multiline
              line={3}
              value={answers.prescripDetails}
              onChange={(e) =>
                setAnswers({...answers, prescripDetails:e.target.value})
              } fullWidth placeholder="Provide details about your prescriptions"/>
            )}
            </FormControl>

            {/****** Do you have any known allergies? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have any known allergies?
              </Typography>
              <RadioGroup
                row
                name="allergy"
                value={answers.allergy}
                onChange={(e) =>
                  setAnswers({ ...answers, allergy: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.allergy === "Yes" && (<TextField
              multiline
              line={3}
              value={answers.allergyDetails}
              onChange={(e) =>
                setAnswers({...answers, allergyDetails:e.target.value})
              } fullWidth placeholder="Provide details about your allergies"/>
            )}
            </FormControl>

            {/****** Is there any additional information that would help us provide appropriate care?*****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Is there any additional information that would help us provide appropriate care?
              </Typography>
              <RadioGroup
                row
                name="additional"
                value={answers.additional}
                onChange={(e) =>
                  setAnswers({ ...answers, additional: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.additional === "Yes" && (<TextField
              multiline
              line={3}
              value={answers.additionalDetails}
              onChange={(e) =>
                setAnswers({...answers, additionalDetails:e.target.value})
              } fullWidth placeholder="Provide additional details about you"/>
            )}
            </FormControl>

            {/****** Are you over 65?*****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you over 65?
              </Typography>
              <RadioGroup
                row
                name="ageover"
                value={answers.ageover}
                onChange={(e) =>
                  setAnswers({ ...answers, ageover: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.ageover === "Yes" && (
                <div>
                  <Typography variant="h4" >
                  Note that over the age 65 are more likely to require longer duration and closer monitoring. Therefore please see your GP if unable call 111.
                  </Typography>    
              
                </div>
              )}
            </FormControl>
            {/* ---- Have you previously been diagnosed with cystitis (UTI)?--- */}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Have you previously been diagnosed with cystitis (UTI)?
              </Typography>
              <RadioGroup
                row
                name="uti"
                value={answers.uti}
                onChange={(e) =>
                  setAnswers({ ...answers, uti: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.uti === "Yes" && (
              <div> <Typography variant="h4" >
                  1. Are you passing urine more frequently than usually do?
                </Typography><RadioGroup
                  row
                  name="uti1"
                  value={answers.uti1}
                  onChange={(e) => setAnswers({ ...answers, uti1: e.target.value })}
                >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                  
                  <Typography variant="h4" >
                  2.	Have you got strong desire to urinate and empty bladder
                </Typography><RadioGroup
                  row
                  name="uti2"
                  value={answers.uti2}
                  onChange={(e) => setAnswers({ ...answers, uti2: e.target.value })}
                >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                  <Typography variant="h4" >
                  3.	Is your urine cloudy or smell strong 
                </Typography><RadioGroup
                  row
                  name="uti3"
                  value={answers.uti3}
                  onChange={(e) => setAnswers({ ...answers, uti3: e.target.value })}
                >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                  <Typography variant="h4" >
                  4. Are you experiencing lower abdominal pain and or discomfort?
                </Typography><RadioGroup
                  row
                  name="uti4"
                  value={answers.uti4}
                  onChange={(e) => setAnswers({ ...answers, uti4: e.target.value })}
                >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>

                  </div>
              )}
            </FormControl>

            {/* ---- Is there any blood in your urine?--- */}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Is there any blood in your urine?
              </Typography>
              <RadioGroup
                row
                name="bloodurine"
                value={answers.bloodurine}
                onChange={(e) =>
                  setAnswers({ ...answers, bloodurine: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/* .** Are you currently experiencing lower back pain? */}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you currently experiencing lower back pain?
              </Typography>
              <RadioGroup
                row
                name="lowerpain"
                value={answers.lowerpain}
                onChange={(e) =>
                  setAnswers({ ...answers, lowerpain: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            {answers.lowerpain === "Yes" && (
              <TextField
              multiline
              line={3}
              value={answers.painDetails}
              onChange={(e) =>
                setAnswers({...answers,painDetails: e.target.value})
              } fullWidth placeholder="Tell us exactly at what location you're having the pain"
              />
            )}
            </FormControl>
            {/* Are you feeling nauseous or vomiting? */}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you feeling nauseous or vomiting?
              </Typography>
              <RadioGroup
                row
                name="vomit"
                value={answers.vomit}
                onChange={(e) =>
                  setAnswers({ ...answers, vomit: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {/* .** Do you have a fever (above 38°C)? */}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have a fever (above 38°C)?
              </Typography>
              <RadioGroup
                row
                name="fever"
                value={answers.fever}
                onChange={(e) =>
                  setAnswers({ ...answers, fever: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {/* .Are you feeling unusually tired or sleepy? */}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you feeling unusually tired or sleepy?
              </Typography>
              <RadioGroup
                row
                name="tired"
                value={answers.tired}
                onChange={(e) =>
                  setAnswers({ ...answers, tired: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {/* .** Do you have any heart, kidney, or liver issues? */}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have any heart, kidney, or liver issues?
              </Typography>
              <RadioGroup
                row
                name="liverIssue"
                value={answers.liverIssue}
                onChange={(e) =>
                  setAnswers({ ...answers, liverIssue: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.liverIssue === "Yes" && (
                <TextField
                multiline
                line={3}
                value={answers.infoIssue}
                onChange={(e) =>
                  setAnswers({...answers,infoIssue:e.target.value})
                } fullWidth placeholder="Tell us more about your issue type and locatin"
                />
              )}
            </FormControl>
            {/* .** Do you have any blood disorders? */}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have any blood disorders?
              </Typography>
              <RadioGroup
                row
                name="bloodDisorder"
                value={answers.bloodDisorder}
                onChange={(e) =>
                  setAnswers({ ...answers, bloodDisorder: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.bloodDisorder === "Yes" && (
                <TextField
                multiline
                lline={3}
                value={answers.infobloodDis}
                onChange={(e) => 
                  setAnswers({...answers,infobloodDis:e.target.value})
                }
                fullWidth placeholder="Tell us more about your blood disorder"
                />
              )}
            </FormControl>
            {/* Are you folic acid deficient? */}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you folic acid deficient?
              </Typography>
              <RadioGroup
                row
                name="folicDef"
                value={answers.folicDef}
                onChange={(e) =>
                  setAnswers({ ...answers, folicDef: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.folicDef === "Yes" && (
                <TextField
                multiline
                lline={3}
                value={answers.folicDefMore}
                onChange={(e) => 
                  setAnswers({...answers,folicDefMore:e.target.value})
                }
                fullWidth placeholder="Tell us more about acid deficient"
                />
              )}
            </FormControl>
            {/*  Have you been diagnosed with porphyria ( a condition which is couased by photosensitivity of the skin, muscle weakness and pain? */}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Have you been diagnosed with porphyria ( a condition which is couased by photosensitivity of the skin, muscle weakness and pain?
              </Typography>
              <RadioGroup
                row
                name="porphyria"
                value={answers.porphyria}
                onChange={(e) =>
                  setAnswers({ ...answers, porphyria: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.porphyria === "Yes" && (
                <TextField
                multiline
                lline={3}
                value={answers.porphyriaDetails}
                onChange={(e) => 
                  setAnswers({...answers,porphyriaDetails:e.target.value})
                }
                fullWidth placeholder="Please provide more informations"
                />
              )}
            </FormControl>
            {/* Do you agree to seek urgent medical advice if back pain or flu-like symptoms arise?*/}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you agree to seek urgent medical advice if back pain or flu-like symptoms arise?
              </Typography>
              <RadioGroup
                row
                name="flusymptoms"
                value={answers.flusymptoms}
                onChange={(e) =>
                  setAnswers({ ...answers, flusymptoms: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              
            </FormControl>
            {/* Do you agree not to take UTI medication if pregnant or breastfeeding? */}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you agree not to take UTI medication if pregnant or breastfeeding?
              </Typography>
              <RadioGroup
                row
                name="utiMedi"
                value={answers.utiMedi}
                onChange={(e) =>
                  setAnswers({ ...answers, utiMedi: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {/* How many UTIs have you had in the last 6 months? */}
            <FormControl component="fieldset" className="QuestionBox">
             <Typography variant="h4" className="labelOne">
             How many UTI have you had in last 6 months?</Typography>
             <Select width="500"
            //  labelId=""
            //  id=""
            name="utiCount"
             value={answers.utiCount}
             label="Select"
             >
            <MenuItem value="Select">
            <em>None</em>
            </MenuItem>
            <MenuItem value="Less than 6 months">Less than 6 months
            </MenuItem>
            <MenuItem value="More than 6 months">More than 6 months
            </MenuItem>
             </Select>
            </FormControl>
           
            {/****** End *****/}
          </>
        );
      //============= Step 03 =============//
      case 2:
        return (
          <>
            {/****** Do you agree to the following? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you agree to the following?
              </Typography>
              <Typography variant="body1" className="noteTxt">
                You will read the patient information leaflet provided with your
                medication. You will notify us and inform your GP if you
                experience any side effects, start new medication, or if your
                medical conditions change during treatment. The treatment is for
                your personal use only. You confirm that all the answers you
                have provided are accurate and truthful. You understand that our
                prescribers rely on your responses in good faith to make
                prescribing decisions, and providing incorrect information could
                pose a risk to your health.
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={answers.agreeToTerms || false}
                    onChange={(e) =>
                      setAnswers({ ...answers, agreeToTerms: e.target.checked })
                    }
                    name="agreeToTerms"
                  />
                }
                label="I agree"
              />
            </FormControl>
          </>
        );
      //============= Step 04 =============//
      case 3:
        return (
          <>
            <Typography variant="h3" className="stepHeading">
              Please Upload relevant documents required
            </Typography>

            {/****** Please upload a photo ID which is within date and not expired. *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Box sx={{ marginTop: "10px" }}>
                <Typography variant="body1">
                  Please upload a photo ID which is within date and not expired.
                  (Max. file size: 80 MB.)
                </Typography>
                <input
                  type="file"
                  name="photoID"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      photoID: e.target.files[0],
                    })
                  }
                  style={{ marginTop: "10px" }}
                />
              </Box>
            </FormControl>
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("questionnaire_info");
    if (data) {
      const { answers } = JSON.parse(data);
      if (answers) {
        setAnswers(answers);
      }
    }
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{/** {label}*/}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ padding: "20px" }} ref={boxRef}>
        {renderStepContent(activeStep)}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{
              fontSize: { xs: "13px", sm: "15px", md: "16px" },
            }}
          >
            Back
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{
                  fontSize: { xs: "13px", sm: "15px", md: "16px" },
                }}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  fontSize: { xs: "13px", sm: "15px", md: "16px" },
                }}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CystitisQuestion;
