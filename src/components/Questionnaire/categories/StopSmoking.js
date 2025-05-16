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
  TextField,
  RadioGroup,
  Typography,
  Checkbox,
} from "@mui/material";
import "../../../../src/globalStyle.css";

// import BmiCalculate from "../Consultation"; // Import the BMI calculation component
import { useApp } from "../../../Context/AppContext";
import { useMessage } from "../../../Context/MessageContext";
const steps = ["1", "2"];

function StopSmokingQuestion() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({
    agedBetween: "",
    agreeToTerms: "",
    photoID: "",
    purchaseMedication: "",
    areYouBreastFeeding: "",
    varenicline: "",
    sufferAnyFollowing: "",
    currTakingAnyMedi: "",
    currTakingAnyMediDetails: "",
    agreeToTheFollowing: "",
    agreeToStartingVarenicline: "",
    agreeToVareniclineIncrease: "",
    stopTakingVarenicline: "",
    understandDevelopAgiation: "",
    understandStartTakingVarenicline: "",
    discontinuationVarenicline: "",
    conditions: [],
  });
  const boxRef = useRef(null);
  const { setSelectedTab } = useApp();
  const { showMessage } = useMessage();
  const [disabled, setDisabled] = useState(false);
  const [currentQue, setCurrentQue] = useState("");

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
          // behavior: "smooth",
        });
      }
    }, 0);
  };

  const isValidSelection = answers.conditions.length === 0;

  const handleNext = () => {
    // const qaData = JSON.parse(
    //   localStorage.getItem("questionnaire_info") || "{}"
    // );
    // const { bmiData } = qaData;

    if (activeStep === 0) {
      // console.log(answers)
      const requiredFields = [
        "agedBetween",
        "purchaseMedication",
        "areYouBreastFeeding",
        "varenicline",
        "sufferAnyFollowing",
        "currTakingAnyMedi",
        "agreeToTheFollowing",
        "agreeToStartingVarenicline",
        "agreeToVareniclineIncrease",
        "stopTakingVarenicline",
        "understandDevelopAgiation",
        "understandStartTakingVarenicline",
        "discontinuationVarenicline",
      ];

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
      if (isValidSelection) {
        showMessage(
          "Based on your answers, we are unable to provide you with treatment at this time. Please consult your GP.",
          "error"
        );
        return;
      }
      if (answers.currTakingAnyMedi === "Yes") {
        if (!answers.currTakingAnyMediDetails) {
          showMessage(
            "Please provide current medication details to proceed",
            "error"
          );
          return;
        }
      }
    } else if (activeStep === 1) {
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

  const handleChange = (e, condition) => {
    const { name, value } = e.target;
    setCurrentQue(name);
    setAnswers({ ...answers, [name]: value });
    if (condition === value) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const checkDisabled = (name) => {
    return disabled && currentQue !== name;
  };
  const handleSubmit = () => {
    // e.preventDefault();
    // console.log('submitting the info');
    if (!answers.agreeToTerms) {
      showMessage("Please agree to the terms and conditions", "error");
      return;
    }
      //  console.log('datass',answers);
    const data = localStorage.getItem("questionnaire_info");
    let parsedData = {}; 
    if (data) {
      parsedData = JSON.parse(data);
    }
    const { user, bmiData } = parsedData;
    localStorage.setItem(
      "questionnaire_info",
      JSON.stringify({
        user,
        bmiData,
        answers: answers,
        ...parsedData,
      })
    );
    // console.log('data info ',answers);
    setSelectedTab(2);
  };

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      //============= Step 01 =============//
      case 0:
        return (
          <>
            {/******Are you purchasing this medication for yourself?  *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("purchaseMedication")}
            >
              <Typography variant="h4" className="labelOne">
                Are you purchasing this medication for yourself?
              </Typography>
              <RadioGroup
                row
                name="purchaseMedication"
                value={answers.purchaseMedication}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.purchaseMedication === "No" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Can not proceed.
                </Typography>
              )}
            </FormControl>
            {/****** Are you aged between 18-75 years *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("agedBetween")}
            >
              <Typography variant="h4" className="labelOne">
                Are you aged between 18-75 years
              </Typography>
              <RadioGroup
                row
                name="agedBetween"
                value={answers.agedBetween}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.agedBetween === "No" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Can not proceed please see GP.
                </Typography>
              )}
            </FormControl>
            {/****** Are you breast feeding, pregnant or planning to become pregnant?  *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("areYouBreastFeeding")}
            >
              <Typography variant="h4" className="labelOne">
                Are you breast feeding, pregnant or planning to become pregnant?
              </Typography>
              <RadioGroup
                row
                name="areYouBreastFeeding"
                value={answers.areYouBreastFeeding}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.areYouBreastFeeding === "Yes" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Can not proceed please see GP.
                </Typography>
              )}
            </FormControl>
            {/****** Do you have allergy to varenicline? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("varenicline")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have allergy to varenicline?
              </Typography>
              <RadioGroup
                row
                name="varenicline"
                value={answers.varenicline}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.varenicline === "Yes" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Can not proceed please see GP.
                </Typography>
              )}
            </FormControl>

            {/****** •	Do you have any of the following health conditions? *****/}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              // disabled={checkDisabled("followingCond")}
            >
              <Typography variant="h4" className="labelOne">
                Please confirm the following box to confirm?
              </Typography>

              <ul>
                {[
                  "You are currently a smoker",
                  "You do not have a history of deliberate overdoses in the past 15 years",
                  "You do not have dependency to benzodiazepines",
                  "You do not suffer with any mental health conditions, such as depression and anxiety",
                ].map((condition) => (
                  <li
                    key={condition}
                    style={{
                      listStyleType: "none",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={answers.conditions?.includes(condition)}
                          onChange={(e) => {
                            const { value, checked } = e.target;
                            let newConditions = [...(answers.conditions || [])];

                            if (checked) {
                              newConditions.push(value);
                            } else {
                              newConditions = newConditions.filter(
                                (item) => item !== value
                              );
                            }

                            setAnswers({
                              ...answers,
                              conditions: newConditions,
                            });
                          }}
                          value={condition}
                        />
                      }
                      label={condition}
                    />
                  </li>
                ))}
              </ul>
              {/* {isValidSelection && (
                <div>
                  This treatment is not suitable for you. Please consult your GP
                  for alternative options.
                </div>
              )} */}
            </FormControl>

            {/****** Do you suffer from any of the following? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("sufferAnyFollowing")}
            >
              <Typography variant="h4" className="labelOne">
                Do you suffer from any of the following?
                <ul>
                  <li style={{ fontSize: "1rem" }}>Kidney (renal) disease</li>
                    <li style={{ fontSize: "1rem" }}>History of epilepsy/seizure</li>
                    <li style={{ fontSize: "1rem" }}>Stroke</li>
                    <li style={{ fontSize: "1rem" }}>Heart disease</li>
                    <li style={{ fontSize: "1rem" }}>Diabetes</li>
                    <li style={{ fontSize: "1rem" }}>
                    Any serious medical condition which may require immediate
                    hospitalisation
                  </li>
                </ul>
              </Typography>
              <RadioGroup
                row
                name="sufferAnyFollowing"
                value={answers.sufferAnyFollowing}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.sufferAnyFollowing === "Yes" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Can not proceed please see GP.
                </Typography>
              )}
            </FormControl>

            {/****** Are you currently taking any medication (including over-the-counter, prescriptions or recreational drugs ?*****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("currTakingAnyMedi")}
            >
              <Typography variant="h4" className="labelOne">
                Are you currently taking any medication (including
                over-the-counter, prescriptions or recreational drugs) ?
              </Typography>
              <RadioGroup
                row
                name="currTakingAnyMedi"
                value={answers.currTakingAnyMedi}
                onChange={(e) =>
                  setAnswers({ ...answers, currTakingAnyMedi: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.currTakingAnyMedi === "Yes" && (
                <TextField
                  disabled={checkDisabled("currTakingAnyMediDetails")}
                  multiline
                  line={3}
                  value={answers.currTakingAnyMediDetails}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      currTakingAnyMediDetails: e.target.value,
                    })
                  }
                  fullWidth
                  placeholder="Tell us about it?"
                />
              )}
            </FormControl>
            {/****** Do you suffer from any of the following? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("agreeToTheFollowing")}
            >
              <Typography variant="h4" className="labelOne">
                Do you suffer from any of the following?
                <ul>
                <li style={{ fontSize: "1rem" }}>
                    You will read the patient information leaflet supplied with
                    your medication
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    You will contact us and inform your GP of your medication if
                    you experience any side effects of treatment, you start new
                    medication and/or your medical conditions change during
                    treatment
                  </li>
                  <li style={{ fontSize: "1rem" }}>The treatment is solely for your own use</li>
                  <li style={{ fontSize: "1rem" }}>
                    You have answered all the above questions accurately and
                    truthfully
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    You understand our prescribers take your answers in good
                    faith and base their prescribing decisions accordingly, and
                    that incorrect information can be hazardous to your health
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    You understand that whilst decisions relating to your
                    treatment are made jointly between you and the prescriber,
                    the final decision to issue a prescription will always be
                    with the prescriber
                  </li>
                </ul>
              </Typography>
              <RadioGroup
                row
                name="agreeToTheFollowing"
                value={answers.agreeToTheFollowing}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.agreeToTheFollowing === "No" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Can not proceed please see GP.
                </Typography>
              )}
            </FormControl>
            {/****** Do you understand that when starting varenicline treatment you should start with a 2-week starter pack  *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("agreeToStartingVarenicline")}
            >
              <Typography variant="h4" className="labelOne">
                Do you understand that when starting varenicline treatment you
                should start with a 2-week starter pack
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={answers.agreeToStartingVarenicline || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        agreeToStartingVarenicline: e.target.checked,
                      })
                    }
                    name="agreeToStartingVarenicline"
                  />
                }
                label="I agree"
              />
            </FormControl>
            {/******Are you aware that varenicline increases your chances of quitting smoking, but you will also need willpower to succeed  *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("agreeToVareniclineIncrease")}
            >
              <Typography variant="h4" className="labelOne">
                Are you aware that varenicline increases your chances of
                quitting smoking, but you will also need willpower to succeed
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={answers.agreeToVareniclineIncrease || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        agreeToVareniclineIncrease: e.target.checked,
                      })
                    }
                    name="agreeToVareniclineIncrease"
                  />
                }
                label="Yes "
              />
            </FormControl>
            {/******Do you understand that you must stop taking varenicline and contact your GP or other urgent healthcare provider if you experience any of the following conditions? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("stopTakingVarenicline")}
            >
              <Typography variant="h4" className="labelOne">
                Do you understand that you must stop taking varenicline and
                contact your GP or other urgent healthcare provider if you
                experience any of the following conditions?
                <ul>
                <li style={{ fontSize: "1rem" }}>
                    new or worse heart or blood vessel (cardiovascular) problems
                  </li>
                  <li style={{ fontSize: "1rem" }}>seizures</li>
                  <li style={{ fontSize: "1rem" }}>
                    agitatation, depressed mood, changes in behaviour, suicidal
                    thoughts
                  </li>
                  <li style={{ fontSize: "1rem" }}>swelling of face, mouth or neck</li>
                  <li style={{ fontSize: "1rem" }}>skin rash or skin peeling</li>
                </ul>
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={answers.stopTakingVarenicline || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        stopTakingVarenicline: e.target.checked,
                      })
                    }
                    name="stopTakingVarenicline"
                  />
                }
                label="Yes "
              />
            </FormControl>
            {/******do you understand that if you develop agitation, depressed mood, suicidal thoughts, behaviour changes while taking varenicline you should stop taking treatment and contact your doctor immediately? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("understandDevelopAgiation")}
            >
              <Typography variant="h4" className="labelOne">
                Do you understand that if you develop agitation, depressed mood,
                suicidal thoughts, behaviour changes while taking varenicline
                you should stop taking treatment and contact your doctor
                immediately?
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={answers.understandDevelopAgiation || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        understandDevelopAgiation: e.target.checked,
                      })
                    }
                    name="understandDevelopAgiation"
                  />
                }
                label="Yes "
              />
            </FormControl>
            {/******Do you understand that you should start taking varenicline 1 to 2 weeks before you stop smoking ? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("understandStartTakingVarenicline")}
            >
              <Typography variant="h4" className="labelOne">
                Do you understand that you should start taking varenicline 1 to
                2 weeks before you stop smoking ?
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={answers.understandStartTakingVarenicline || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        understandStartTakingVarenicline: e.target.checked,
                      })
                    }
                    name="understandStartTakingVarenicline"
                  />
                }
                label="Yes "
              />
            </FormControl>
            {/******Do you understand that discontinuation of varenicline is associated with an increase in irritability, urge to smoke, depression and/or insomnia in up to 3% of patients.  *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("discontinuationVarenicline")}
            >
              <Typography variant="h4" className="labelOne">
                Do you understand that discontinuation of varenicline is
                associated with an increase in irritability, urge to smoke,
                depression and/or insomnia in up to 3% of patients.
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={answers.discontinuationVarenicline || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        discontinuationVarenicline: e.target.checked,
                      })
                    }
                    name="discontinuationVarenicline"
                  />
                }
                label="Yes "
              />
            </FormControl>

            {/****** End *****/}
          </>
        );
      //============= Step 03 =============//
      case 1:
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

export default StopSmokingQuestion;
