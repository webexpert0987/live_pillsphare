import React, { useEffect, useRef, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Grid2,
  TextField,
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
const steps = ["1", "2"];

function HighFeverQuestion() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({
    agedBetween: "",
    agreeToTerms: "",
    photoID: "",
    pregnancyDetails: "",
    additionalDetails: "",
    smokeDetails: "",
    smokeDetailsNext: "",
    weightDetails: "",
    weightDetailsNext: "",
    allergicDetails: "",
    followingSymptomsCheckbox: "",
    currentSymptoms: "",
    currentSymptomsDetails: "",
    otherTreatment1: "",
    otherTreatmentDetails: "",
    otherTreatment2: "",
    liverIssue: "",
    otherConditions: "",
    otherConditionsDetails: "",
    currentMedication: "",
    currentMedicationDetails: "",
    otherAllergy: "",
    otherAllergyDetails: "",
    gpDetails: "",
    agreedTC: "",
    confirmTC: "",
    conditions1: [],
    conditions2: [],
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
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const isValidSelection = answers.conditions1.length === 0;

  const isValidSelection1 =
    (answers.conditions2.includes("None") && answers.conditions2.length > 1) ||
    answers.conditions2.length === 0;

  const handleNext = () => {
    const qaData = JSON.parse(
      localStorage.getItem("questionnaire_info") || "{}"
    );
    const { bmiData } = qaData;

    // Validation logic
    if (activeStep === 0) {
      const requiredFields = [
        "fullName",
        "medicationDetails",
        "agedBetween",
        "pregnancyDetails",
        "smokeDetails",
        "alcohalDetails",
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
      // Additional checks for conditional fields
      if (answers.pregnancyDetails === "Yes" && !answers.additionalDetails) {
        showMessage(
          "Please provide additional details about your pregnancy.",
          "error"
        );
        return;
      }

      if (answers.smokeDetails === "Yes" && !answers.smokeDetailsNext) {
        showMessage(
          "Please indicate if you would like more information about smoking.",
          "error"
        );
        return;
      }

      if (answers.alcohalDetails === "Yes" && !answers.alcohalDetailsNext) {
        showMessage(
          "Please indicate if you would like information on safe alcohol consumption.",
          "error"
        );
        return;
      }
      if (answers.confirmTC === "No" || answers.agreedTC === "No") {
        showMessage(
          "We are unable to provide you with treatment at this time.",
          "error"
        );
        return;
      }

      if (isValidSelection) {
        showMessage(
          "Based on your answers, we are unable to provide you with treatment at this time. Please consult your GP.",
          "error"
        );
        return;
      }
      if (isValidSelection1) {
        showMessage(
          "Based on your answers, we are unable to provide you with treatment at this time. Please consult your GP.",
          "error"
        );
        return;
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
            {/******   Whats is your full name? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("fullName")}
            >
              <Typography variant="h4" className="labelOne">
                Whats is your full name?
              </Typography>
              <TextField
                label="Full Name"
                disabled={checkDisabled("fullName")}
                variant="outlined"
                name="fullName"
                value={answers.fullName}
                onChange={(e) =>
                  setAnswers({ ...answers, fullName: e.target.value })
                }
                fullWidth
              />
            </FormControl>
           {/* ......  Are you purchasing this medication for personal use?........ */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("medicationDetails")}
            >
              <Typography variant="h4" className="labelOne">
                Are you purchasing this medication for personal use?
              </Typography>
              <TextField
                label="Your answer"
                variant="outlined"
                disabled={checkDisabled("medicationDetails")}
                name="medicationDetails"
                value={answers.medicationDetails}
                onChange={(e) =>
                  setAnswers({ ...answers, medicationDetails: e.target.value })
                }
                fullWidth
              />
            </FormControl>
            {/* ....... Are you 18 years of age or older?........ */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("agedBetween")}
            >
              <Typography variant="h4" className="labelOne">
                Are you 18 years of age or older?
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
            </FormControl>
            {/* ...... Are you currently pregnant, breastfeeding, or planning a
                pregnancy? (If yes, please provide more details.).... */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("pregnancyDetails")}
            >
              <Typography variant="h4" className="labelOne">
                Are you currently pregnant, breastfeeding, or planning a
                pregnancy? (If yes, please provide more details.)
              </Typography>
              <RadioGroup
                row
                name="pregnancyDetails"
                value={answers.pregnancyDetails}
                onChange={(e) =>
                  setAnswers({ ...answers, pregnancyDetails: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.pregnancyDetails === "Yes" && (
                <TextField
                  multiline
                  disabled={checkDisabled("additionalDetails")}
                  line={3}
                  value={answers.additionalDetails}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      additionalDetails: e.target.value,
                    })
                  }
                  fullWidth
                  placeholder="Provide additional details about you"
                />
              )}
            </FormControl>
            {/* ....  Do you smoke?... */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("smokeDetails")}
            >
              <Typography variant="h4" className="labelOne">
                Do you smoke?
              </Typography>
              <RadioGroup
                row
                name="smokeDetails"
                value={answers.smokeDetails}
                onChange={(e) =>
                  setAnswers({ ...answers, smokeDetails: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.smokeDetails === "Yes" && (
                <div>
                  <Typography>Would you like more information?</Typography>
                  <RadioGroup
                    row
                    name="smokeDetailsNext"
                    value={answers.smokeDetailsNext}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        smokeDetailsNext: e.target.value,
                      })
                    }
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </div>
              )}
            </FormControl>
            {/* ........ Do you consume alcohal ?....... */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("alcohalDetails")}
            >
              <Typography variant="h4" className="labelOne">
                Do you consume alcohal ?
              </Typography>
              <RadioGroup
                row
                name="alcohalDetails"
                value={answers.alcohalDetails}
                onChange={(e) =>
                  setAnswers({ ...answers, alcohalDetails: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.alcohalDetails === "Yes" && (
                <div>
                  <Typography>
                    Would you like information on safe consumption?
                  </Typography>
                  <RadioGroup
                    row
                    name="alcohalDetailsNext"
                    value={answers.alcohalDetailsNext}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        alcohalDetailsNext: e.target.value,
                      })
                    }
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </div>
              )}
            </FormControl>
            {/* ......... Would you like guidance on weight management?........ */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("weightDetails")}
            >
              <Typography variant="h4" className="labelOne">
                Are you overweight?
              </Typography>
              <RadioGroup
                row
                name="weightDetails"
                value={answers.weightDetails}
                onChange={(e) =>
                  setAnswers({ ...answers, weightDetails: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.weightDetails === "Yes" && (
                <div>
                  <Typography>
                    Would you like guidance on weight management?
                  </Typography>
                  <RadioGroup
                    row
                    name="weightDetailsNext"
                    value={answers.weightDetailsNext}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        weightDetailsNext: e.target.value,
                      })
                    }
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </div>
              )}
            </FormControl>
            {/* ..... Are you experiencing allergic rhinitis or hayfever?.... */}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("allergicDetails")}
            >
              <Typography variant="h4" className="labelOne">
                Are you experiencing allergic rhinitis or hayfever?
              </Typography>
              <RadioGroup
                row
                name="allergicDetails"
                value={answers.allergicDetails}
                onChange={(e) =>
                  setAnswers({ ...answers, allergicDetails: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/* .....Are your current symptoms different from previous
                hayfever/allergic rhinitis episodes?.... */}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("followingSymptomsCheckbox")}
            >
              <Typography
                variant="h4"
                className="labelOne"
                name="followingSymptomsCheckbox"
              >
                Which of the following symptoms do you have? (List options like
                sneezing, runny nose, etc.) Here’s a shuffled version of the
                symptoms:
              </Typography>
              {[
                "Sneezing and coughing",
                "Itchy throat, mouth, nose, and ears",
                "Loss of smell",
                "Pain around temples and forehead",
                "A runny or blocked nose",
                "Itchy, red, or watery eyes",
              ].map((condition, index) => (
                <FormControlLabel
                  className="checkbox2Col"
                  key={index}
                  control={
                    <Checkbox
                      checked={answers.conditions1?.includes(condition)}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        let newConditions = [...(answers.conditions1 || [])];

                        if (checked) {
                          newConditions.push(value);
                        } else {
                          newConditions = newConditions.filter(
                            (item) => item !== value
                          );
                        }

                        setAnswers({
                          ...answers,
                          conditions1: newConditions,
                        });
                      }}
                      value={condition}
                    />
                  }
                  label={condition}
                />
              ))}
            </FormControl>

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("currentSymptoms")}
            >
              <Typography variant="h4" className="labelOne">
                Are your current symptoms different from previous
                hayfever/allergic rhinitis episodes?
              </Typography>
              <RadioGroup
                row
                name="currentSymptoms"
                value={answers.currentSymptoms}
                onChange={(e) =>
                  setAnswers({ ...answers, currentSymptoms: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.currentSymptoms === "Yes" && (
                <>
                  <Typography>Please Provide More details</Typography>
                  <TextField
                    multiline
                    disabled={checkDisabled("currentSymptomsDetails")}
                    line={3}
                    value={answers.currentSymptomsDetails}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        currentSymptomsDetails: e.target.value,
                      })
                    }
                    fullWidth
                    placeholder="Please tell about symptoms"
                  />
                </>
              )}
            </FormControl>
            {/* ....... Have you previously tried other treatments for hayfever or
                allergic rhinitis?......... */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("otherTreatment1")}
            >
              <Typography variant="h4" className="labelOne">
                Have you previously tried other treatments for hayfever or
                allergic rhinitis?
              </Typography>
              <RadioGroup
                row
                name="otherTreatment1"
                value={answers.otherTreatment1}
                onChange={(e) =>
                  setAnswers({ ...answers, otherTreatment1: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.otherTreatment1 === "Yes" && (
                <>
                  <Typography>Please Provide More details</Typography>
                  <TextField
                    disabled={checkDisabled("otherTreatmentDetails")}
                    multiline
                    line={3}
                    value={answers.otherTreatmentDetails}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        otherTreatmentDetails: e.target.value,
                      })
                    }
                    fullWidth
                    placeholder="Specify what was used and its effectiveness."
                  />
                </>
              )}
            </FormControl>
            {/* ..... Do you have any of the following additional symptoms? (List
                specific symptoms like nasal pain, eye discomfort, etc.).... */}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("otherTreatment2")}
            >
              <Typography
                variant="h4"
                className="labelOne"
                name="otherTreatment2"
              >
                Do you have any of the following additional symptoms? (List
                specific symptoms like nasal pain, eye discomfort, etc.)
              </Typography>
              {[
                "Eye pain or changes in vision",
                "Frequent episodes of nosebleeds",
                "Structural changes to the nasal septum",
                "Discomfort or pain within the nasal area",
                "Presence of blood in nasal discharge",
                "Treatment not providing the desired relief",
                "Persistent symptoms affecting a single eye or nostril",
                "None",
              ].map((condition, index) => (
                <FormControlLabel
                  className="checkbox2Col"
                  key={index}
                  control={
                    <Checkbox
                      checked={answers.conditions2?.includes(condition)}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        let newConditions = [...(answers.conditions2 || [])];

                        if (checked) {
                          newConditions.push(value);
                        } else {
                          newConditions = newConditions.filter(
                            (item) => item !== value
                          );
                        }

                        setAnswers({
                          ...answers,
                          conditions2: newConditions,
                        });
                      }}
                      value={condition}
                    />
                  }
                  label={condition}
                />
              ))}
            </FormControl>

            {/* ......... Do you have any liver or kidney conditions?....... */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("liverIssue")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have any liver or kidney conditions?
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
            </FormControl>

            {/* ........Do you have other medical conditions or past surgeries?........ */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("otherConditions")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have other medical conditions or past surgeries?
              </Typography>
              <RadioGroup
                row
                name="otherConditions"
                value={answers.otherConditions}
                onChange={(e) =>
                  setAnswers({ ...answers, otherConditions: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.otherConditions === "Yes" && (
                <>
                  <Typography>Please Provide More details</Typography>
                  <TextField
                    disabled={checkDisabled("otherConditionsDetails")}
                    multiline
                    line={3}
                    value={answers.otherConditionsDetails}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        otherConditionsDetails: e.target.value,
                      })
                    }
                    fullWidth
                    placeholder="Provide more details."
                  />
                </>
              )}
            </FormControl>

            {/* ................ */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("currentMedication")}
            >
              <Typography variant="h4" className="labelOne">
                Are you currently or recently taking any medications, including
                prescription, over-the-counter, herbal, or recreational drugs?
              </Typography>
              <RadioGroup
                row
                name="currentMedication"
                value={answers.currentMedication}
                onChange={(e) =>
                  setAnswers({ ...answers, currentMedication: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.currentMedication === "Yes" && (
                <>
                  <Typography>Please Provide More details</Typography>
                  <TextField
                    multiline
                    disabled={checkDisabled("currentMedicationDetails")}
                    line={3}
                    value={answers.currentMedicationDetails}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        currentMedicationDetails: e.target.value,
                      })
                    }
                    fullWidth
                    placeholder="Provide more details."
                  />
                </>
              )}
            </FormControl>

            {/* ................ */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("otherAllergy")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have any allergies to medications or other substances
                (e.g., peanuts, soy)?
              </Typography>
              <RadioGroup
                row
                name="otherAllergy"
                value={answers.otherAllergy}
                onChange={(e) =>
                  setAnswers({ ...answers, otherAllergy: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.otherAllergy === "Yes" && (
                <>
                  <Typography>Please Provide More details</Typography>
                  <TextField
                    disabled={checkDisabled("otherAllergyDetails")}
                    multiline
                    line={3}
                    value={answers.otherAllergyDetails}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        otherAllergyDetails: e.target.value,
                      })
                    }
                    fullWidth
                    placeholder="Provide more details."
                  />
                </>
              )}
            </FormControl>

            {/* ................ */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("gpDetails")}
            >
              <Typography variant="h4" className="labelOne">
                Would you like us to inform your GP about your treatment?
              </Typography>
              <RadioGroup
                row
                name="gpDetails"
                value={answers.gpDetails}
                onChange={(e) =>
                  setAnswers({ ...answers, gpDetails: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/* ................ */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("agreedTC")}
            >
              <Typography variant="h4" className="labelOne">
                Do you agree to follow the patient information, use the
                treatment solely for personal use, and understand that incorrect
                answers may impact treatment safety?
              </Typography>
              <ul>
                <li>
                  " You confirm that you have reviewed the treatment
                  information, including side effects, effectiveness, and
                  available alternatives"
                </li>
                <li>
                  "You agree to contact your GP if there’s no improvement after
                  14 days or if symptoms persist beyond 28 days."
                </li>
                <li>
                  "Your answers are truthful, and this treatment is intended
                  solely for your own use."
                </li>
                <li>
                  "You will read and understand the patient information leaflet
                  provided."
                </li>
                <li>
                  "While optional, you acknowledge the importance of informing
                  your GP to ensure safe care."
                </li>
                <li>
                  "You understand that prescriptions rely on accurate
                  information, and orders may be declined if unsuitable.."
                </li>
              </ul>

              <RadioGroup
                row
                name="agreedTC"
                value={answers.agreedTC}
                onChange={(e) =>
                  setAnswers({ ...answers, agreedTC: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.agreedTC === "No" && (
                <div>
                  We are unable to provide you with treatment at this time.
                  Please consult your GP.
                </div>
              )}
            </FormControl>

            {/* ................ */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("confirmTC")}
            >
              <Typography variant="h4" className="labelOne">
                I confirm I have read all the information in this questionnaire
                and will follow the advice in the patient information leaflet
                provided?
              </Typography>
              <RadioGroup
                row
                name="confirmTC"
                value={answers.confirmTC}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.confirmTC === "No" && (
                <div>
                  We are unable to provide you with treatment at this time.
                  Please consult your GP.
                </div>
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

export default HighFeverQuestion;
