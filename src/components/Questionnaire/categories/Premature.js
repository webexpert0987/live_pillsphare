import React, { useEffect, useRef, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  // FormLabel,
  Radio,
  TextField,
  RadioGroup,
  Typography,
  Checkbox,
} from "@mui/material";

// import BmiCalculate from "../Consultation"; // Import the BMI calculation component
import { useApp } from "../../../Context/AppContext";
import { useMessage } from "../../../Context/MessageContext";
// import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import "../../../../src/globalStyle.css";
const steps = ["1", "2"];

function PrematureQuestion() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({
    agedBetween: "",
    agreeToTerms: "",
    photoID: "",
    premature: "",
    ejaculation: "",
    allergy: "",
    conditions: [],
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
    agree_pillsphere: "",
    lastConfirm: "",
    healthCondition: "",
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

    if (activeStep === 0) {
      const requiredFields = [
        "agedBetween",
        "gender",
        "premature",
        "allergy",
        // "allergyIssue",
        "ejaculation",
        "ejaculateTime",
        "persistentPre",
        "anyMedication",
        "smoke",
        "alcohal",
        "healthyDiet",
        "understandTM",
        "agreeInstruc",
        "understandTreat1",
        "confirmAll",
        "agree_pillsphere",
        "lastConfirm",
        "healthCondition",
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

      const preventProceedConditions = [
        { field: "gender", condition: "No" },
        { field: "agedBetween", condition: "No" },
        { field: "premature", condition: "No" },
        { field: "ejaculation", condition: "No" },
        { field: "persistentPre", condition: "No" },
        { field: "anyMedication", condition: "Yes" },
        { field: "understandTM", condition: "No" },
        { field: "agreeInstruc", condition: "No" },
        { field: "understandTreat1", condition: "No" },
        { field: "healthCondition", condition: "Yes" },
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

      if (answers?.conditions?.length > 0) {
        showMessage(
          "Based on your answers, we are unable to provide you with treatment at this time. Please consult your GP.",
          "error"
        );
        return;
      }
      if (answers.allergy === "Yes") {
        if (!answers.allergyIssue) {
          showMessage("Please provide allergies details to proceed", "error");
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
    console.log("Form submitted with answers 011: ", answers);
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
      case 0:
        return (
          <>
            {/****** •	Are you male? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("gender")}
            >
              <Typography variant="h4" className="labelOne">
                Are you male?
              </Typography>
              <RadioGroup
                row
                name="gender"
                value={answers.gender}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.gender === "No" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  This treatment is not suitable for females. Please consult
                  your doctor for further advice.{" "}
                </Typography>
              )}
            </FormControl>
            {/******•	Are you aged between 18 and 65 years? *****/}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("agedBetween")}
            >
              <Typography variant="h4" className="labelOne">
                Are you aged between 18 and 65 years?
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
                  This treatment is only suitable for males aged between 18 and
                  65. Do not proceed.{" "}
                </Typography>
              )}
            </FormControl>
            {/******•	Do you often experience premature ejaculation? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("premature")}
            >
              <Typography variant="h4" className="labelOne">
                Do you often experience premature ejaculation?
              </Typography>
              <RadioGroup
                row
                name="premature"
                value={answers.premature}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.premature === "No" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  This treatment is intended for individuals with premature
                  ejaculation. Please consult your GP for further
                  information.{" "}
                </Typography>
              )}
            </FormControl>
            {/*****•	Do you find it difficult to control ejaculation during sexual intercourse?******/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("ejaculation")}
            >
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
              {answers.ejaculation === "No" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Can not proceed with further assessment.{" "}
                </Typography>
              )}
            </FormControl>
            {/****** •	Do you have any allergies? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("allergy")}
            >
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
                  <Typography sx={{ fontSize: "15px" }}>
                    Provide more details.
                  </Typography>
                  <TextField
                    multiline
                    required={answers.allergy === "Yes"}
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
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("ejaculateTime")}
            >
              <Typography variant="h4" className="labelOne">
                On average, how long does it take you to ejaculate during sexual
                intercourse ?
              </Typography>
              <RadioGroup
                sx={{ pl: 3 }}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Rarely"
                name="radio-buttons-group"
                value={answers.ejaculateTime}
                onChange={(e) =>
                  setAnswers({ ...answers, ejaculateTime: e.target.value })
                }
              >
                <FormControlLabel
                  value="Less than 1 minute"
                  control={<Radio />}
                  label="Less than 1 minute"
                />
                <FormControlLabel
                  value="1-2 minute"
                  control={<Radio />}
                  label="1-2 minute"
                />
                <FormControlLabel
                  value="more than 3 minute"
                  control={<Radio />}
                  label="More than 3 minutes"
                />
              </RadioGroup>
            </FormControl>
            {/*****•	Have you experienced persistent premature ejaculation for more than 6 months?******/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("persistentPre")}
            >
              <Typography variant="h4" className="labelOne">
                Have you experienced persistent premature ejaculation for more
                than 6 months?
              </Typography>
              <RadioGroup
                row
                name="persistentPre"
                value={answers.persistentPre}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.persistentPre === "No" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Treatment may not be suitable for individuals with recent
                  symptoms. Please consult your GP.
                </Typography>
              )}
            </FormControl>
            {/*****•	Do you have any of the following health conditions? ******/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("healthCondition")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have any of the following health conditions?
              </Typography>
              <ul>
                <li>Diabetes</li>
                <li>High blood pressure</li>
                <li>Heart disease</li>
                <li>Kidney Disease</li>
                <li>Liver Disease</li>
                <li>Epilepsy</li>
                <li>Depression</li>
                <li>Anxiety</li>
                <li>Mental health disorders</li>
              </ul>
              <RadioGroup
                row
                name="healthCondition"
                value={answers.healthCondition}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers?.healthCondition === "Yes" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  We may not be able to provide treatment if you have any of the
                  conditions listed. Please consult your GP.
                </Typography>
              )}
            </FormControl>
            {/*****•	Are you currently taking any medication for any of the following? Please select all that apply******/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("anyMedication")}
            >
              <Typography variant="h4" className="labelOne">
                Are you currently taking any medication for any of the
                following? Please select all that apply
              </Typography>
              <ul>
                <li>High blood pressure</li>
                <li>Depression or anxiety</li>
                <li>Erectile dysfunction</li>
                <li>Hormonal treatments</li>
                {/* <FormControlLabel
                  control={<Checkbox />}
                  label="Other"
                /> */}
              </ul>
              <RadioGroup
                row
                name="anyMedication"
                value={answers.anyMedication}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.anyMedication === "Yes" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Please inform your GP of any current medications before
                  starting treatment for premature ejaculation.{" "}
                </Typography>
              )}
            </FormControl>
            {/****** •	Do you smoke? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("smoke")}
            >
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

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("alcohal")}
            >
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
                  <Typography sx={{ fontSize: "15px", mt: 1 }}>
                    Please specify how often -:
                  </Typography>
                  <RadioGroup
                    sx={{ pl: 3, fontSize: "14px" }}
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

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("healthyDiet")}
            >
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
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  Consider discussing healthy lifestyle changes with your GP to
                  improve your overall well-being and treatment outcomes{" "}
                </Typography>
              )}
            </FormControl>
            {/*****••	Do you understand that this treatment is not intended for individuals who have certain medical conditions or are taking specific medications, and that you should consult your GP if you have any concerns?******/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("understandTM")}
            >
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
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.understandTM === "No" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  We cannot proceed with treatment without your understanding of
                  the possible risks and contraindications.{" "}
                </Typography>
              )}
            </FormControl>
            {/*****•	Do you agree to follow the instructions for use of the prescribed medication and understand the potential side effects associated with treatment?******/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("agreeInstruc")}
            >
              <Typography variant="h4" className="labelOne">
                Do you agree to follow the instructions for use of the
                prescribed medication and understand the potential side effects
                associated with treatment?
              </Typography>
              <RadioGroup
                row
                name="agreeInstruc"
                value={answers.agreeInstruc}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.agreeInstruc === "No" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  We cannot provide treatment without your agreement to follow
                  the prescribed guidelines.
                </Typography>
              )}
            </FormControl>
            {/*****•	I understand that this treatment is for my personal use only and that I will not share any prescribed medication with others******/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("understandTreat1")}
            >
              <Typography variant="h4" className="labelOne">
                I understand that this treatment is for my personal use only and
                that I will not share any prescribed medication with others
              </Typography>
              <RadioGroup
                row
                name="understandTreat1"
                value={answers.understandTreat1}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.understandTreat1 === "No" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  We cannot provide treatment without your agreement to follow
                  the prescribed guidelines.
                </Typography>
              )}
            </FormControl>
            {/*****••	I confirm that the information provided is accurate and complete to the best of my knowledge.******/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("confirmAll")}
            >
              <Typography variant="h4" className="labelOne">
                I confirm that the information provided is accurate and complete
                to the best of my knowledge.
              </Typography>
              <RadioGroup
                row
                name="confirmAll"
                value={answers.confirmAll}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.confirmAll === "No" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  We cannot provide treatment without your agreement to follow
                  the prescribed guidelines.
                </Typography>
              )}
            </FormControl>
            {/*****•	I understand that pill sphere will treat my information in accordance with its Privacy Policy and Terms and Conditions.******/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("agree_pillsphere")}
            >
              <Typography variant="h4" className="labelOne">
                I understand that pill sphere will treat my information in
                accordance with its Privacy Policy and Terms and Conditions.
              </Typography>
              <RadioGroup
                row
                name="agree_pillsphere"
                value={answers.agree_pillsphere}
                onChange={(e) =>
                  setAnswers({ ...answers, agree_pillsphere: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {/*****••	I confirm that I am over 18 years old and agree to the Terms and Conditions of Medicus Express.******/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("lastConfirm")}
            >
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

export default PrematureQuestion;
