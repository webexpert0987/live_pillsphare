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
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import "../../../../src/globalStyle.css";

import BmiCalculate from "../Consultation"; // Import the BMI calculation component
import { useApp } from "../../../Context/AppContext";
import { useMessage } from "../../../Context/MessageContext";
const steps = ["1", "2"];

function PeriodDelayQuestion() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({
    agedBetween: "",
    agreeToTerms: "",
    photoID: "",
    gender: "",
    allergy: "",
    allergyIssue: "",
    period: "",
    delayPeriod: "",
    periodDelay1: "",
    periodDelay2: "",
    periodDetails: "",
    periodTime: "",
    regularPeriod: "",
    pregnant: "",
    breastfeeding: "",
    delayingperiod: "",
    safeUse: "",
    confirmAll: "",
    agreeMedicus: "",
    confirmAge: "",
    conditions: [], // Stores selected health conditions
    medications: [],
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

  const isValidSelection =
    (answers.conditions.includes("None") && answers.conditions.length > 1) ||
    (!answers.conditions.includes("None") && answers.conditions.length > 0);

  const isValidSelection1 =
    (answers.medications.includes("None") && answers.medications.length > 1) ||
    (!answers.medications.includes("None") && answers.medications.length > 0);
  const handleNext = () => {
    const qaData = JSON.parse(
      localStorage.getItem("questionnaire_info") || "{}"
    );
    const { bmiData } = qaData;

    if (activeStep === 0) {
      const requiredFields = [
        "gender",
        "agedBetween",
        "allergy",
        "period",
        "delayPeriod",
        "periodDelay1",
        "regularPeriod",
        "pregnant",
        "breastfeeding",
        "delayingperiod",
        "safeUse",
        "confirmAll",
        "agreeMedicus",
        "confirmAge",
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

      if (answers.conditions.length === 0 || answers.medications.length === 0) {
        showMessage(
          "Please fill all details before proceeding to the next step.",
          "error"
        );
        return;
      }

      const preventProceedConditions = [
        { field: "gender", condition: "No" },
        { field: "agedBetween", condition: "No" },
        { field: "period", condition: "No" },
        { field: "regularPeriod", condition: "No" },
        { field: "pregnant", condition: "Yes" },
        { field: "breastfeeding", condition: "Yes" },
        { field: "delayingperiod", condition: "No" },
        { field: "safeUse", condition: "No" },
        { field: "confirmAll", condition: "No" },
        { field: "agreeMedicus", condition: "No" },
        { field: "confirmAge", condition: "No" },
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

      if (isValidSelection || isValidSelection1) {
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
            {/****** •	Are you female? *****/}

            <FormControl component="fieldset" className="QuestionBox" disabled={checkDisabled("gender")}>
              <Typography variant="h4" className="labelOne">
                Are you female?
              </Typography>
              <RadioGroup
                row
                name="gender"
                value={answers.gender}
                onChange={(e) =>
                  handleChange(e,"No")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.gender === "No" && (
                <div>
                  "This treatment is only available to women. Please consult
                  your GP for alternative options."{" "}
                </div>
              )}
            </FormControl>
            {/****** •	Are you aged 18 or over?*****/}

            <FormControl component="fieldset" className="QuestionBox" disabled={checkDisabled("agedBetween")}>
              <Typography variant="h4" className="labelOne">
                Are you aged 18 or over?
              </Typography>
              <RadioGroup
                row
                name="agedBetween"
                value={answers.agedBetween}
                onChange={(e) =>
                 handleChange(e,"No")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.agedBetween === "No" && (
                <div>
                  "This treatment is only suitable for individuals aged 18 or
                  older."{" "}
                </div>
              )}
            </FormControl>
            {/****** •	Do you have any of the following health conditions? *****/}

            <FormControl component="fieldset" className="QuestionBox" disabled={checkDisabled("followingHealCond")}>
              <Typography variant="h4" className="labelOne" name="followingHealCond">
                Do you have any of the following health conditions?
              </Typography>

              <ul>
                {[
                  "Pregnancy",
                  "Breastfeeding",
                  "Severe liver disease",
                  "Severe kidney disease",
                  "History of blood clots or stroke",
                  "Hormonal disorders",
                  "History of any types of cancer (e.g., breast or ovarian cancer)",
                  "Severe high blood pressure",
                  "Any serious health condition that requires immediate hospital treatment",
                  "None",
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
              {isValidSelection && (
                <div>
                  This treatment is not suitable for you. Please consult your GP
                  for alternative options.
                </div>
              )}
            </FormControl>
            {/******•	Are you currently taking any of the following medications? *****/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("currentlyMedications")}>
              <Typography variant="h4" className="labelOne" name="currentlyMedications">
                Are you currently taking any of the following medications?
              </Typography>
              <ul>
                {[
                  "Hormonal medication (e.g., contraceptive pills, HRT)",
                  "Blood thinners (e.g., Warfarin)",
                  "Steroids",
                  "Anti-seizure medication",
                  "Any other prescription or over-the-counter medications",
                  "None",
                ].map((medication) => (
                  <li
                    key={medication}
                    style={{
                      listStyleType: "none",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={answers?.medications?.includes(medication)}
                          onChange={(e) => {
                            const { value, checked } = e.target;
                            let newConditions = [
                              ...(answers.medications || []),
                            ];

                            if (checked) {
                              newConditions.push(value);
                            } else {
                              newConditions = newConditions.filter(
                                (item) => item !== value
                              );
                            }

                            setAnswers({
                              ...answers,
                              medications: newConditions,
                            });
                          }}
                          value={medication}
                        />
                      }
                      label={medication}
                    />
                  </li>
                ))}
              </ul>
              {isValidSelection1 && (
                <div>
                  This treatment is not suitable for you. Please consult your GP
                  for alternative options.
                </div>
              )}
            </FormControl>
            {/****** •	Do you have any allergies to any medications or substances (e.g., peanuts, latex)? *****/}

            <FormControl component="fieldset" className="QuestionBox" disabled={checkDisabled("allergy")}>
              <Typography variant="h4" className="labelOne">
                Do you have any allergies to any medications or substances
                (e.g., peanuts, latex)?
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
                <TextField
                  multiline
                  line={3}
                  value={answers.allergyIssue}
                  onChange={(e) =>
                    setAnswers({ ...answers, allergyIssue: e.target.value })
                  }
                  fullWidth
                  placeholder="Tell us more about your issue ?"
                />
              )}
            </FormControl>
            {/******•	Are you currently having a period or expecting your period soon?  *****/}

            <FormControl component="fieldset" className="QuestionBox" disabled={checkDisabled("period")}>
              <Typography variant="h4" className="labelOne">
                Are you currently having a period or expecting your period soon?
              </Typography>
              <RadioGroup
                row
                name="period"
                value={answers.period}
                onChange={(e) =>
                  handleChange(e,"No")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.period === "No" && (
                <div>
                  "This treatment is specifically designed to delay your period.
                  Please consult your GP for alternative options if you're not
                  currently menstruating."
                </div>
              )}
            </FormControl>
            {/****** •	Are you female? *****/}

            <FormControl component="fieldset" className="QuestionBox" disabled={checkDisabled("delayPeriod")}>
              <Typography variant="h4" className="labelOne">
                How long would you like to delay your period?
              </Typography>
              <RadioGroup
                row
                name="delayPeriod"
                value={answers.delayPeriod}
                onChange={(e) =>
                  setAnswers({ ...answers, delayPeriod: e.target.value })
                }
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="1 Week"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="2 Week"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              {answers.delayPeriod === "Other" && (
                <TextField
                  multiline
                  disabled={checkDisabled("periodDetails")}
                  line={3}
                  value={answers.periodDetails}
                  onChange={(e) =>
                    setAnswers({ ...answers, periodDetails: e.target.value })
                  }
                  fullWidth
                  placeholder="Please Specify?"
                />
              )}
            </FormControl>
            {/****** •	Have you ever used period delay medication before?*****/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("periodDelay1")}>
              <Typography variant="h4" className="labelOne">
                Have you ever used period delay medication before?
              </Typography>
              <RadioGroup
                row
                name="periodDelay1"
                value={answers.periodDelay1}
                onChange={(e) =>
                  setAnswers({ ...answers, periodDelay1: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.periodDelay1 === "Yes" && (
                <div>
                  "Please indicate the medication you previously used and
                  whether you experienced any side effects:"{" "}
                </div>
              )}
            </FormControl>
            {/******•	Do you have a history of any of the following conditions that could affect your menstrual cycle? *****/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("menstrualCyc")}> 
              <Typography variant="h4" className="labelOne" name="menstrualCyc">
                Do you have a history of any of the following conditions that
                could affect your menstrual cycle?
              </Typography>
              <ul>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Irregular periods"
                />
                <br></br>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Endometriosis"
                />
                <br></br>
                <FormControlLabel control={<Checkbox />} label="Fibroids" />
                <br></br>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Polycystic Ovary Syndrome (PCOS)"
                />
                <br></br>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Menstrual disorders"
                />
                <br></br>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Other"
                  // value={answers.menstrual}
                />
              </ul>
              {answers.menstrual === "Other" && (
                <div>
                  "Please indicate the medication you previously used and
                  whether you experienced any side effects:"{" "}
                </div>
              )}
            </FormControl>
            {/******•	When was the first day of your last period? *****/}

            <FormControl component="fieldset" className="QuestionBox"   disabled={checkDisabled("periodDelay2")}>
              <Typography variant="h4" className="labelOne" name="periodDelay2">
                When was the first day of your last period?
              </Typography>
              <input
                type="date"
                value={answers.periodDelay2}
                onChange={(e) =>
                  setAnswers({ ...answers, periodDelay2: e.target.value })
                }
              />
            </FormControl>
            {/******•	How long does your typical period last? *****/}

            <FormControl component="fieldset" className="QuestionBox" disabled={checkDisabled("periodTime")}>
              <Typography variant="h4" className="labelOne">
                How long does your typical period last?
              </Typography>
              <RadioGroup
                row
                name="periodTime"
                value={answers.periodTime}
                onChange={(e) =>
                  setAnswers({ ...answers, periodTime: e.target.value })
                }
              >
                <FormControlLabel
                  value="3-5 days"
                  control={<Radio />}
                  label="3-5 days"
                />
                <FormControlLabel
                  value="6-7 days"
                  control={<Radio />}
                  label="6-7 days"
                />
                <FormControlLabel
                  value="more than 7 days"
                  control={<Radio />}
                  label="more than 7 days"
                />
              </RadioGroup>
            </FormControl>
            {/******•	Are your periods regular? *****/}

            <FormControl component="fieldset" className="QuestionBox" disabled={checkDisabled("regularPeriod")}>
              <Typography variant="h4" className="labelOne">
                Are your periods regular?
              </Typography>
              <RadioGroup
                row
                name="regularPeriod"
                value={answers.regularPeriod}
                onChange={(e) =>
                  handleChange(e,"No")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.regularPeriod === "No" && (
                <div>
                  "If your periods are irregular, it is recommended to consult
                  your GP before using period delay treatment."{" "}
                </div>
              )}
            </FormControl>
            {/*****•	Are you currently pregnant or trying to conceive?******/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("pregnant")}>
              <Typography variant="h4" className="labelOne">
                Are you currently pregnant or trying to conceive?
              </Typography>
              <RadioGroup
                row
                name="pregnant"
                value={answers.pregnant}
                onChange={(e) =>
                  handleChange(e,"Yes")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.pregnant === "Yes" && (
                <div>
                  "This treatment is not suitable for pregnant women. Please
                  consult your GP for alternative options."
                </div>
              )}
            </FormControl>
            {/******•	Are you currently breastfeeding? *****/}

            <FormControl component="fieldset" className="QuestionBox" disabled={checkDisabled("breastfeeding")}>
              <Typography variant="h4" className="labelOne">
                Are you currently breastfeeding?
              </Typography>
              <RadioGroup
                row
                name="breastfeeding"
                value={answers.breastfeeding}
                onChange={(e) =>
                handleChange(e,"Yes")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.breastfeeding === "Yes" && (
                <div>
                  "This treatment is not recommended for breastfeeding women.
                  Please consult your GP for alternative options."
                </div>
              )}
            </FormControl>
            {/******•	Do you understand that delaying your period may have potential side effects, and that you should consult your GP if you experience any issues? *****/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("delayingperiod")}>
              <Typography variant="h4" className="labelOne">
                Do you understand that delaying your period may have potential
                side effects, and that you should consult your GP if you
                experience any issues?
              </Typography>
              <RadioGroup
                row
                name="delayingperiod"
                value={answers.delayingperiod}
                onChange={(e) =>
                handleChange(e,"No")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.delayingperiod === "No" && (
                <div>
                  "We cannot proceed with your treatment unless you understand
                  and agree to this information."
                </div>
              )}
            </FormControl>
            {/******•	Do you understand that it is essential to follow the provided instructions for the medication to be effective and safe? *****/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("safeUse")}>
              <Typography variant="h4" className="labelOne">
                Do you understand that it is essential to follow the provided
                instructions for the medication to be effective and safe?
              </Typography>
              <RadioGroup
                row
                name="safeUse"
                value={answers.safeUse}
                onChange={(e) =>
                  setAnswers({ ...answers, safeUse: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.safeUse === "No" && (
                <div>
                  "You must agree to the instructions and consult your GP for
                  further guidance if needed."
                </div>
              )}
            </FormControl>
            {/******•	Do you confirm that all the information you have provided is accurate and complete to the best of your knowledge?	 *****/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("confirmAll")}>
              <Typography variant="h4" className="labelOne">
                Do you confirm that all the information you have provided is
                accurate and complete to the best of your knowledge?
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
              {answers.confirmAll === "No" && (
                <div>
                  "Please ensure that all details are correct before proceeding.
                  Inaccurate information may impact the suitability of the
                  treatment."
                </div>
              )}
            </FormControl>
            {/******•	Do you agree to Medicus Express's terms and conditions and privacy policy for this consultation and treatment? *****/}

            <FormControl component="fieldset" className="QuestionBox" disabled={checkDisabled("agreeMedicus")}>
              <Typography variant="h4" className="labelOne">
                Do you agree to Medicus Express's terms and conditions and
                privacy policy for this consultation and treatment?
              </Typography>
              <RadioGroup
                row
                name="agreeMedicus"
                value={answers.agreeMedicus}
                onChange={(e) =>
                  setAnswers({ ...answers, agreeMedicus: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.agreeMedicus === "No" && (
                <div>
                  "You must agree to the terms and conditions before
                  continuing."
                </div>
              )}
            </FormControl>
            {/******•	Do you confirm that you are over 18 years of age and fully understand the nature of the treatment prescribed?	 *****/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("confirmAge")}>
              <Typography variant="h4" className="labelOne">
                Do you confirm that you are over 18 years of age and fully
                understand the nature of the treatment prescribed?
              </Typography>
              <RadioGroup
                row
                name="confirmAge"
                value={answers.confirmAge}
                onChange={(e) =>
                  setAnswers({ ...answers, confirmAge: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.confirmAge === "No" && (
                <div>
                  "You must be at least 18 years old to proceed with this
                  treatment."
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

export default PeriodDelayQuestion;
