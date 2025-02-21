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
} from "@mui/material";
import "../../../../src/globalStyle.css";

import BmiCalculate from "../Consultation"; // Import the BMI calculation component
import { useApp } from "../../../Context/AppContext";
import { useMessage } from "../../../Context/MessageContext";
const steps = ["1", "2", "3", "4"];

function HairLossQuestion() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({
    agedBetween: "",
    agreeToTerms: "",
    photoID: "",
    hairLossPatch: "",
    hairLossLocal: "",
    healthyScalp: "",
    suddenHairLoss: "",
    hairLossMedi: "",
    diagnosed: "",
    depressionHistory: "",
    medicationInfo: "",
    medicationInfoNext: "",
    finasteride: "",
    prescribedFIn: "",
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
            {/****** Are you aged between 17-74 years *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you aged between 17-74 years
              </Typography>
              <RadioGroup
                row
                name="agedBetween"
                value={answers.agedBetween}
                onChange={(e) =>
                  setAnswers({ ...answers, agedBetween: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.agedBetween === "No" && (
                <div>
                  "This treatment is not suitable for women or individuals under 18 or over 65." [Do not proceed]
                </div>
              )}
            </FormControl>
            {/*****•	•	Do you have hair loss in patches, or is your scalp itchy or sore?*****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have hair loss in patches, or is your scalp itchy or sore?
              </Typography>
              <RadioGroup
                row
                name="hairLossPatch"
                value={answers.hairLossPatch}
                onChange={(e) =>
                  setAnswers({ ...answers, hairLossPatch: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.hairLossPatch === "Yes" && (
                <div>
                  This treatment may not be suitable for you. We recommend contacting your GP for further advice." [Do not proceed]
                </div>
              )}
            </FormControl>
            {/****•	Is your hair loss localized to the temple area?******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Is your hair loss localized to the temple area?
              </Typography>
              <RadioGroup
                row
                name="hairLossLocal"
                value={answers.hairLossLocal}
                onChange={(e) =>
                  setAnswers({ ...answers, hairLossLocal: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.hairLossLocal === "No" && (
                <div>
                  We can still offer treatment, but the range of available medications may be limited.
                </div>
              )}
            </FormControl>
            {/****** •	Do you have a healthy scalp? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have a healthy scalp?
                <br></br>
                Your scalp should not have any of the following:
                <ul>
                  <li>Inflammation</li>
                  <li>Redness</li>
                  <li>Medical dressings</li>
                  <li>Shaved areas</li>

                </ul>
              </Typography>
              <RadioGroup
                row
                name="healthyScalp"
                value={answers.healthyScalp}
                onChange={(e) =>
                  setAnswers({ ...answers, healthyScalp: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.healthyScalp === "No" && (
                <div>
                  "We are unable to supply treatment. Please consult your GP." [Do not proceed]
                </div>
              )}
            </FormControl>
            {/****** Are you experiencing sudden or complete hair loss? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you experiencing sudden or complete hair loss?
              </Typography>
              <RadioGroup
                row
                name="suddenHairLoss"
                value={answers.suddenHairLoss}
                onChange={(e) =>
                  setAnswers({ ...answers, suddenHairLoss: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.suddenHairLoss === "Yes" && (
                <div>
                  "This treatment is not suitable for this type of hair loss. We recommend speaking to your GP for further advice." [Do not proceed]
                </div>
              )}
            </FormControl>
            {/****** •	Could your hair loss be related to medication, dietary factors, or an illness? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Could your hair loss be related to medication, dietary factors, or an illness?
              </Typography>
              <RadioGroup
                row
                name="hairLossMedi"
                value={answers.hairLossMedi}
                onChange={(e) =>
                  setAnswers({ ...answers, hairLossMedi: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.hairLossMedi === "Yes" && (
                <div>
                  "If your hair loss is caused by lifestyle or health factors, we recommend discussing it with your GP." [Do not proceed]
                </div>
              )}
            </FormControl>
            {/******•	Have you ever been diagnosed with any of the following conditions?  *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Have you ever been diagnosed with any of the following conditions?
                <ul>
                  <li>Heart disease (including chest pain, angina, heart attack, or any history of cardiovascular events)</li>
                  <li>Acute Porphyria (a rare hereditary disease affecting haemoglobin)</li>
                  <li>Pheochromocytoma (cancer of the adrenal glands)</li>
                  <li>Prostate problems (e.g., prostate enlargement, prostatitis, prostate cancer)</li>
                  <li>Male breast cancer</li>
                  <li>High blood pressure</li>
                </ul>

              </Typography>
              <RadioGroup
                row
                name="diagnosed"
                value={answers.diagnosed}
                onChange={(e) =>
                  setAnswers({ ...answers, diagnosed: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.diagnosed === "Yes" && (
                <div>
                  "This treatment is not suitable for you." [Do not proceed]
                </div>
              )}
            </FormControl>
            {/******•	Do you have a history of depression or any other mental health conditions?  *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have a history of depression or any other mental health conditions?
              </Typography>
              <RadioGroup
                row
                name="depressionHistory"
                value={answers.depressionHistory}
                onChange={(e) =>
                  setAnswers({ ...answers, depressionHistory: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.depressionHistory === "Yes" && (
                <div>
                  We can still offer treatment, but with a limited product range.
                </div>
              )}
            </FormControl>
            {/****** •	Are you currently taking any medication (including prescription, over-the-counter, or recreational drugs)? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you currently taking any medication (including prescription, over-the-counter, or recreational drugs)?
              </Typography>
              <RadioGroup
                row
                name="medicationInfo"
                value={answers.medicationInfo}
                onChange={(e) =>
                  setAnswers({ ...answers, medicationInfo: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.medicationInfo === "Yes" && (
                <div>
                  <ul>
                    <Typography>
                      Are you taking any of the following medications?
                    </Typography>
                    <ul>
                      <li>
                        Dithranol (used to treat psoriasis)
                      </li>
                      <li>
                        Tretinoin (used to treat acne or other skin disorders)
                      </li>
                      <li>
                        Corticosteroids (e.g., hydrocortisone, betamethasone dipropionate)
                      </li>
                      <li>
                        Petrolatum (a common ingredient in hair wax and gel)
                      </li>
                    </ul>

                    <RadioGroup
                      row
                      name="medicationInfoNext"
                      value={answers.medicationInfoNext}
                      onChange={(e) =>
                        setAnswers({ ...answers, medicationInfoNext: e.target.value })
                      }
                    >
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                    {answers.medicationInfoNext === "Yes" && (
                      <div>
                        "We are unable to supply you with treatment. Please consult your GP." [Do not proceed]
                      </div>
                    )}
                  </ul>
                </div>
              )}
            </FormControl>
            {/****** •	Do you understand that if prescribed finasteride, and your partner is (or may be) pregnant, they should avoid handling crushed or broken tablets, and that you should always wear a condom during sex?*****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you understand that if prescribed finasteride, and your partner is (or may be) pregnant, they should avoid handling crushed or broken tablets, and that you should always wear a condom during sex?
              </Typography>
              <RadioGroup
                row
                name="finasteride"
                value={answers.finasteride}
                onChange={(e) =>
                  setAnswers({ ...answers, finasteride: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.finasteride === "No" && (
                <div>
                  "We are unable to supply you with medication unless you understand and agree to this condition." [Do not proceed]
                </div>
              )}
            </FormControl>
            {/******	Do you understand that if prescribed finasteride, you should inform your GP before undergoing a PSA blood test for your prostate?  *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you understand that if prescribed finasteride, you should inform your GP before undergoing a PSA blood test for your prostate?
              </Typography>
              <RadioGroup
                row
                name="prescribedFin"
                value={answers.prescribedFIn}
                onChange={(e) =>
                  setAnswers({ ...answers, prescribedFIn: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.prescribedFIn === "No" && (
                <div>
                  "We are unable to supply you with medication unless you understand and agree to this condition." [Do not proceed]
                </div>
              )}
            </FormControl>
            {/****** •	I agree to the terms and conditions, and I confirm that I am over 18 years of age. *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                I agree to the terms and conditions, and I confirm that I am over 18 years of age.
              </Typography>
              <RadioGroup
                row
                name="agreeTC"
                value={answers.agreeTC}
                onChange={(e) =>
                  setAnswers({ ...answers, agreeTC: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.agreeTC === "No" && (
                <div>
                  "We are unable to supply you with medication unless you understand and agree to this condition." [Do not proceed]
                </div>
              )}
            </FormControl>
            {/****** End *****/}
          </>
        )
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

export default HairLossQuestion;
