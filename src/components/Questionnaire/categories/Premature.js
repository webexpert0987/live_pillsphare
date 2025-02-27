import React, { useEffect, useRef, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  TextField,
  RadioGroup,
  Typography,
  Checkbox,
} from "@mui/material";

import BmiCalculate from "../Consultation"; // Import the BMI calculation component
import { useApp } from "../../../Context/AppContext";
import { useMessage } from "../../../Context/MessageContext";
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import "../../../../src/globalStyle.css";
const steps = ["1", "2", "3"];

function PrematureQuestion() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({
    agedBetween: "",
    agreeToTerms: "",
    photoID: "",
    premature: "",
    ejaculation: "",
    allergy: "",
    allergyIssue: "",
    persistentPre: "",
    otherMedication: "",
    anyMedication: "",
    smoke: "",
    alcohal: "",
    healthyDiet: "",
    understandTM: "",
    agreeInstruc: "",
    understandTreat1: "",
    confirmAll: "",
    medicusExpress: "",
    lastConfirm: "",
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
      const requiredFields = ["agedBetween", "gender", "premature"];

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

      const preventProceedConditions = [
        { field: "gender", condition: "Yes" },
        { field: "agedBetween", condition: "No" },
        { field: "premature", condition: "No" },
        { field: "ejaculation", condition: "No" },
      ];

      for (const { field, condition } of preventProceedConditions) {
        if (answers[field] === condition) {
          showMessage(
            "Based on your answers, we are unable to provide you with treatment at this time. Please consult your GP.",
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
    const { user, bmiData } = parsedData;

    localStorage.setItem(
      "questionnaire_info",
      JSON.stringify({
        // ...parsedData,
        user,
        bmiData,
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
            {/****** •	Are you male? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you male?
              </Typography>
              <RadioGroup
                row
                name="gender"
                value={answers.gender}
                onChange={(e) =>
                  setAnswers({ ...answers, gender: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.gender === "Yes" && (
                <div>
                  "This treatment is not suitable for females. Please consult
                  your doctor for further advice."{" "}
                </div>
              )}
            </FormControl>
            {/******•	Are you aged between 18 and 65 years? *****/}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you aged between 18 and 65 years?
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
                  "This treatment is only suitable for males aged between 18 and
                  65." [Do not proceed]{" "}
                </div>
              )}
            </FormControl>
            {/******•	Do you often experience premature ejaculation? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you often experience premature ejaculation?
              </Typography>
              <RadioGroup
                row
                name="premature"
                value={answers.premature}
                onChange={(e) =>
                  setAnswers({ ...answers, premature: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.premature === "No" && (
                <div>
                  "This treatment is intended for individuals with premature
                  ejaculation. Please consult your GP for further information."{" "}
                </div>
              )}
            </FormControl>
            {/*****•	Do you find it difficult to control ejaculation during sexual intercourse?******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you find it difficult to control ejaculation during sexual
                intercourse?
              </Typography>
              <RadioGroup
                row
                name="ejaculation"
                value={answers.ejaculation}
                onChange={(e) =>
                  setAnswers({ ...answers, ejaculation: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.ejaculation === "Yes" && (
                <div>If yes, proceed with further assessment. </div>
              )}
            </FormControl>
            {/****** •	Do you have any allergies? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have any allergies?
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
              {answers.allergy === "Yes" && (
                <>
                  <Typography>"Provide more details."</Typography>
                  <TextField
                    multiline
                    line={3}
                    value={answers.allergyIssue}
                    onChange={(e) =>
                      setAnswers({ ...answers, allergyIssue: e.target.value })
                    }
                    fullWidth
                    placeholder="Tell us more ?"
                  />
                </>
              )}
            </FormControl>
            {/* •	On average, how long does it take you to ejaculate during sexual intercourse? */}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                On average, how long does it take you to ejaculate during sexual
                intercourse?
              </Typography>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Rarely"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Daily"
                  control={<Radio />}
                  label="Less than 1 minute"
                />
                <FormControlLabel
                  value="Weekly"
                  control={<Radio />}
                  label="1-2 minute"
                />
                <FormControlLabel
                  value="Occasionaly"
                  control={<Radio />}
                  label="more than 3 minute"
                />
                {/* <FormControlLabel value="Rarely" control={<Radio />} label="Rarely" /> */}
              </RadioGroup>
            </FormControl>
            {/*****•	Have you experienced persistent premature ejaculation for more than 6 months?******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Have you experienced persistent premature ejaculation for more
                than 6 months?
              </Typography>
              <RadioGroup
                row
                name="persistentPre"
                value={answers.persistentPre}
                onChange={(e) =>
                  setAnswers({ ...answers, persistentPre: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.persistentPre === "No" && (
                <div>
                  "Treatment may not be suitable for individuals with recent
                  symptoms. Please consult your GP."
                </div>
              )}
            </FormControl>
            {/*****•	Do you have any of the following health conditions? ******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have any of the following health conditions? Please check
                all that apply
              </Typography>
              {[
                "Diabetes",
                "High blood pressure",
                "Heart disease",
                "Kidney Disease",
                "Liver Disease",
                "Epilepsy",
                "Depression",
                "Anxiety",
                "Mental health disorders",
                "Any other medical conditions",
              ].map((condition, index) => (
                <FormControlLabel
                  className="checkbox2Col"
                  key={index}
                  control={
                    <Checkbox
                      checked={answers.conditions.includes(condition)}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        let newConditions = [...answers.conditions];

                        if (checked) {
                          newConditions.push(value);
                        } else {
                          newConditions = newConditions.filter(
                            (item) => item !== value
                          );
                        }

                        setAnswers({ ...answers, conditions: newConditions });
                      }}
                      value={condition}
                    />
                  }
                  label={condition}
                />
              ))}
            </FormControl>
            {/*****•	Are you currently taking any medication for any of the following? ******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you currently taking any medication for any of the
                following? Please select all that apply
              </Typography>
              <ul>
                <FormControlLabel
                  control={<Checkbox />}
                  label="High blood pressure"
                />
                <br></br>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Depression or anxiety"
                />
                <br></br>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Erectile dysfunction"
                />
                <br></br>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Hormonal treatments"
                />
                {/* <FormControlLabel
                  control={<Checkbox />}
                  label="Other"
                /> */}
                <RadioGroup
                  row
                  name="anyMedication"
                  value={answers.anyMedication}
                  onChange={(e) =>
                    setAnswers({ ...answers, anyMedication: e.target.value })
                  }
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                {answers.anyMedication === "Yes" && (
                  <div>
                    "Please inform your GP of any current medications before
                    starting treatment for premature ejaculation."{" "}
                  </div>
                )}
              </ul>
            </FormControl>
            {/****** •	Do you smoke? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you smoke?
              </Typography>
              <RadioGroup
                row
                name="smoke"
                value={answers.smoke}
                onChange={(e) =>
                  setAnswers({ ...answers, smoke: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {/****** •	Do you drink alcohol?*****/}
            {/* 
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
              	Do you drink alcohol?
              </Typography>
              <RadioGroup
                row
                name="alcohal"
                value={answers.alcohal}
                onChange={(e) =>
                  setAnswers({ ...answers, alcohal: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.alcohal === "Yes" && (
                <>
                <Typography>
                please specify how often:
                </Typography>
                <ul>
                <FormControlLabel
                  control={<Radio />}
                  label="Daily"
                /><br></br>
                <FormControlLabel
                  control={<Radio />}
                  label="Weekly"
                /><br></br>
                <FormControlLabel
                  control={<Radio />}
                  label="Occasionally"
                /><br></br>
                <FormControlLabel
                  control={<Radio />}
                  label="Rarely"
                />
                </ul>
                </>
              )}
            </FormControl> */}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography
                variant="h4"
                className="labelOne"
                id="demo-radio-buttons-group-label"
              >
                Do you drink alcohal
              </Typography>
              <RadioGroup
                row
                name="alcohal"
                value={answers.alcohal}
                onChange={(e) =>
                  setAnswers({ ...answers, alcohal: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.alcohal === "Yes" && (
                <>
                  <Typography>Please specify how often -:</Typography>

                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Rarely"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Daily"
                      control={<Radio />}
                      label="Daily"
                    />
                    <FormControlLabel
                      value="Weekly"
                      control={<Radio />}
                      label="Weekly"
                    />
                    <FormControlLabel
                      value="Occasionaly"
                      control={<Radio />}
                      label="Occasionaly"
                    />
                    <FormControlLabel
                      value="Rarely"
                      control={<Radio />}
                      label="Rarely"
                    />
                  </RadioGroup>
                </>
              )}
            </FormControl>

            {/*****•	•	Do you have a healthy diet and exercise regularly?*****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have a healthy diet and exercise regularly?
              </Typography>
              <RadioGroup
                row
                name="healthyDiet"
                value={answers.healthyDiet}
                onChange={(e) =>
                  setAnswers({ ...answers, healthyDiet: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.healthyDiet === "No" && (
                <div>
                  Consider discussing healthy lifestyle changes with your GP to
                  improve your overall well-being and treatment outcomes{" "}
                </div>
              )}
            </FormControl>
            {/*****••	Do you understand that this treatment is not intended for individuals who have certain medical conditions or are taking specific medications, and that you should consult your GP if you have any concerns?******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you understand that this treatment is not intended for
                individuals who have certain medical conditions or are taking
                specific medications, and that you should consult your GP if you
                have any concerns?
              </Typography>
              <RadioGroup
                row
                name="understandTM"
                value={answers.understandTM}
                onChange={(e) =>
                  setAnswers({ ...answers, understandTM: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.understandTM === "No" && (
                <div>
                  "We cannot proceed with treatment without your understanding
                  of the possible risks and contraindications."{" "}
                </div>
              )}
            </FormControl>
            {/*****•	Do you agree to follow the instructions for use of the prescribed medication and understand the potential side effects associated with treatment?******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you agree to follow the instructions for use of the
                prescribed medication and understand the potential side effects
                associated with treatment?
              </Typography>
              <RadioGroup
                row
                name="agreeInstruc"
                value={answers.agreeInstruc}
                onChange={(e) =>
                  setAnswers({ ...answers, agreeInstruc: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.agreeInstruc === "No" && (
                <div>
                  "We cannot provide treatment without your agreement to follow
                  the prescribed guidelines."
                </div>
              )}
            </FormControl>
            {/*****•	I understand that this treatment is for my personal use only and that I will not share any prescribed medication with others******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                I understand that this treatment is for my personal use only and
                that I will not share any prescribed medication with others
              </Typography>
              <RadioGroup
                row
                name="understandTreat1"
                value={answers.understandTreat1}
                onChange={(e) =>
                  setAnswers({ ...answers, understandTreat1: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {/*****••	I confirm that the information provided is accurate and complete to the best of my knowledge.******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                I confirm that the information provided is accurate and complete
                to the best of my knowledge.
              </Typography>
              <RadioGroup
                row
                name="confirmAll"
                value={answers.confirmAll}
                onChange={(e) =>
                  setAnswers({ ...answers, confirmAll: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {/*****•	I understand that Medicus Express will treat my information in accordance with its Privacy Policy and Terms and Conditions.******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                I understand that Medicus Express will treat my information in
                accordance with its Privacy Policy and Terms and Conditions.
              </Typography>
              <RadioGroup
                row
                name="medicusExpress"
                value={answers.medicusExpress}
                onChange={(e) =>
                  setAnswers({ ...answers, medicusExpress: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {/*****••	I confirm that I am over 18 years old and agree to the Terms and Conditions of Medicus Express.******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                I confirm that I am over 18 years old and agree to the Terms and
                Conditions of Medicus Express.
              </Typography>
              <RadioGroup
                row
                name="lastConfirm"
                value={answers.lastConfirm}
                onChange={(e) =>
                  setAnswers({ ...answers, lastConfirm: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              </RadioGroup>
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

export default PrematureQuestion;
