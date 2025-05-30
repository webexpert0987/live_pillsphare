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

// import BmiCalculate from "../Consultation"; // Import the BMI calculation component
import { useApp } from "../../../Context/AppContext";
import { useMessage } from "../../../Context/MessageContext";
const steps = ["1", "2"];

function MigraineQuestion() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({
    agedBetween: "",
    agreeToTerms: "",
    photoID: "",
    migrain: "",
    migrainTime: "",
    experienceMigrain: "",
    anySymptoms: "",
    diagnosed: "",
    otherAllergy: "",
    triptans: "",
    diagnoseAny: "",
    medicationAny1: "",
    medicationAny2: "",
    agreedTC1: "",
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

  const handleNext = () => {
    // const qaData = JSON.parse(
    //   localStorage.getItem("questionnaire_info") || "{}"
    // );
    // const { bmiData } = qaData;

    // Validation logic
    if (activeStep === 0) {
      const requiredFields = [
        "agedBetween",
        "migrain",
        "migrainTime",
        "experienceMigrain",
        "anySymptoms",
        "diagnosed",
        "triptans",
        "otherAllergy",
        "diagnoseAny",
        "medicationAny1",
        "agreedTC1",
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
      // Other medications options checking
      if (answers.medicationAny1 === "Yes" && !answers.medicationAny2) {
        showMessage("Please provide other medications.", "error");
        return;
      }
      const preventProceedConditions = [
        { field: "agedBetween", condition: "No" },
        { field: "migrain", condition: "No" },
        { field: "migrainTime", condition: "Yes" },
        { field: "experienceMigrain", condition: "Yes" },
        { field: "anySymptoms", condition: "Yes" },
        { field: "diagnosed", condition: "No" },
        { field: "otherAllergy", condition: "Yes" },
        { field: "triptans", condition: "Yes" },
        { field: "diagnoseAny", condition: "Yes" },
        { field: "medicationAny2", condition: "Yes" },
        { field: "agreedTC1", condition: "No" },
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
    if (!answers.agreeToTerms) {
      showMessage(
        "Please fill all details before proceeding to the next step.",
        "error"
      );
      return;
    }
    console.log('reponse of questionnaire ',answers);
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
    setSelectedTab(2);
  };

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      //============= Step 01 =============//
      case 0:
        return (
          <>
            {/****** Are you between 18 and 65 years old?**  ****/}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("agedBetween")}
            >
              <Typography variant="h4" className="labelOne">
                Are you between 18 and 65 years old?
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
                  Please consult your GP for a migraine treatment plan.
                </Typography>
              )}
            </FormControl>
            {/****** Do your migraines follow a consistent pattern?****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("migrain")}
            >
              <Typography variant="h4" className="labelOne">
                Do your migraines follow a consistent pattern?
              </Typography>
              <RadioGroup
                row
                name="migrain"
                value={answers.migrain}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.migrain === "No" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Please consult your GP for device.
                </Typography>
              )}
            </FormControl>
            {/****** Do your migraines last less than 4 hours or longer than 24
                hours?  ****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("migrainTime")}
            >
              <Typography variant="h4" className="labelOne">
                Do your migraines last less than 4 hours or longer than 24
                hours?
              </Typography>
              <RadioGroup
                row
                name="migrainTime"
                value={answers.migrainTime}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.migrainTime === "Yes" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Please consult your GP for a management plan.
                </Typography>
              )}
            </FormControl>
            {/****** Do you experience migraines more than 10 days per month?  ****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("experienceMigrain")}
            >
              <Typography variant="h4" className="labelOne">
                Do you experience migraines more than 10 days per month?
              </Typography>
              <RadioGroup
                row
                name="experienceMigrain"
                value={answers.experienceMigrain}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.experienceMigrain === "Yes" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Please consult your GP for further guidance.
                </Typography>
              )}
            </FormControl>
            {/****** Do you have any of the following symptoms****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("anySymptoms")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have any of the following symptoms?
              </Typography>
              <ul>
                <li>Coordination issues </li>
                <li>Back-of-head pain </li>
                <li>Ringing in ears </li>
                <li>Seizure-like episodes </li>
                <li>Recent rash with headache</li>
                <li>Reduced alertness </li>
                <li>Blurred/double vision </li>
                <li>
                  Increased frequency, severity, or duration of migraines{" "}
                </li>
                <li>One-sided weakness </li>
              </ul>
              <RadioGroup
                // sx={{pl:2}}
                row
                name="anySymptoms"
                value={answers.anySymptoms}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.anySymptoms === "Yes" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Consult your GP.
                </Typography>
              )}
            </FormControl>
            {/****** Have you been diagnosed with migraines, and do triptans relieve
                them?  ****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("diagnosed")}
            >
              <Typography variant="h4" className="labelOne">
                Have you been diagnosed with migraines, and do triptans relieve
                them?
              </Typography>
              <RadioGroup
                row
                name="diagnosed"
                value={answers.diagnosed}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.diagnosed === "No" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Consult your GP.
                </Typography>
              )}
            </FormControl>
            {/***** Do you have an allergy to any of the following medications?  ****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("otherAllergy")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have an allergy to any of the following medications?
              </Typography>
              <ul>
                <li>Sumatriptan </li>
                <li>Rizatriptan </li>
                <li>Zolmitriptan </li>
              </ul>
              <RadioGroup
                row
                name="otherAllergy"
                value={answers.otherAllergy}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.otherAllergy === "Yes" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Consult your GP.
                </Typography>
              )}
            </FormControl>
            {/******  Have you experienced any of the following after taking triptans?*  ****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("triptans")}
            >
              <Typography variant="h4" className="labelOne">
                Have you experienced any of the following after taking triptans?
              </Typography>
              <ul>
                <li>Chest tightness </li>
                <li>Palpitations or dizziness </li>
                <li>Worsening nausea </li>
                <li>Increased blood pressure </li>
              </ul>
              <RadioGroup
                row
                name="triptans"
                value={answers.triptans}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.triptans === "Yes" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Consult your GP.
                </Typography>
              )}
            </FormControl>
            {/****** Have you been diagnosed with any of the following conditions? ****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("diagnoseAny")}
            >
              <Typography variant="h4" className="labelOne">
                Have you been diagnosed with any of the following conditions?
              </Typography>
              <ul>
                <li>Heart disease </li>
                <li>Stroke or mini-stroke </li>
                <li>High blood pressure </li>
                <li>Epilepsy </li>
                <li>Serious medical conditions requiring hospitalization </li>
              </ul>
              <RadioGroup
                row
                name="diagnoseAny"
                value={answers.diagnoseAny}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.diagnoseAny === "Yes" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Consult your GP.
                </Typography>
              )}
            </FormControl>
            {/****** Are you currently taking any medications? ****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you currently taking any medications?
              </Typography>
              <RadioGroup
                row
                name="medicationAny1"
                value={answers.medicationAny1}
                onChange={(e) =>
                  setAnswers({ ...answers, medicationAny1: e.target.value })
                }
              >
                <FormControlLabel
                  value="Yes"
                  control={<Radio disabled={checkDisabled("medicationAny1")} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="No"
                  control={<Radio disabled={checkDisabled("medicationAny1")} />}
                  label="No"
                />
              </RadioGroup>
              {answers.medicationAny1 === "Yes" && (
                <div>
                  Please check for the following :
                  <ul>
                    <li>Ergotamine or Methysergide </li>
                    <li>Another triptan in the last 24 hours </li>
                    <li>MAOIs (recent use) </li>
                    <li>SSRIs </li>
                    <li>SNRIs </li>
                    <li>Lithium </li>
                    <li>Current antibiotics</li>
                    <li>Antifungals </li>
                    <li>Combined oral contraceptive </li>
                  </ul>
                  <RadioGroup
                    row
                    name="medicationAny2"
                    value={answers.medicationAny2}
                    onChange={(e) => handleChange(e, "Yes")}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={
                        <Radio disabled={checkDisabled("medicationAny2")} />
                      }
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={
                        <Radio disabled={checkDisabled("medicationAny2")} />
                      }
                      label="No"
                    />
                  </RadioGroup>
                  {answers.medicationAny2 === "Yes" && (
                    <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                      Consult your GP.
                    </Typography>
                  )}
                </div>
              )}
            </FormControl>

            {/****** Do you agree to the following terms?**    ****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("agreedTC1")}
            >
              <Typography variant="h4" className="labelOne">
                Do you agree to the following terms?
              </Typography>
              <ul>
                <li> I will read the patient information leaflet. </li>
                <li>
                  I will inform Medicus Express and my GP about any side effects
                  or changes in condition.{" "}
                </li>
                <li>The treatment is for my personal use. </li>
                <li>I confirm all answers are truthful. </li>
              </ul>
              <RadioGroup
                row
                name="agreedTC1"
                value={answers.agreedTC1}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.agreedTC1 === "No" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Treatment cannot be provided.
                </Typography>
              )}
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

export default MigraineQuestion;
