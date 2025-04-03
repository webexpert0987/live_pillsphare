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
  MenuItem,
  Typography,
  Checkbox,
  InputLabel,
  Select,
} from "@mui/material";
import "../../../../src/globalStyle.css";

import BmiCalculate from "../Consultation"; // Import the BMI calculation component
import { useApp } from "../../../Context/AppContext";
import { useMessage } from "../../../Context/MessageContext";
const steps = ["1", "2"];

function PeriodPainQuestion() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({
    agedBetween: "",
    agreeToTerms: "",
    photoID: "",
    periodPain: "",
    experienceChange: "",
    painseverity: 0,
    periodPain: "",
    experience: "",
    experienceChange: "",
    periodPain1: "",
    knownAllergy: "",
    otherMedication: "",
    anyTreatment: "",
    painActivity: "",
    followingCondition: "",
    understandTO: "",
    currPregnant: "",
    consentToPro: "",
    knownAllergyIssue: "",
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

  const handleNext = () => {
    const qaData = JSON.parse(
      localStorage.getItem("questionnaire_info") || "{}"
    );
    const { bmiData } = qaData;

    // Validation logic
    if (activeStep === 0) {
      const requiredFields = [
        "agedBetween",
        "periodPain",
        "experience",
        "experienceChange",
        "periodPain1",
        "knownAllergy",
        "otherMedication",
        "anyTreatment",
        "painseverity",
        "painActivity",
        "followingCondition",
        "currPregnant",
        "understandTO",
        "consentToPro",
        // "knownAllergyIssue",
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
        { field: "agedBetween", condition: "No" },
        { field: "periodPain", condition: "No" },
        // { field: "experience", condition: "No" },
        { field: "periodPain1", condition: "Yes" },
        { field: "otherMedication", condition: "Yes" },
        { field: "anyTreatment", condition: "No" },
        { field: "painActivity", condition: "Yes" },
        { field: "followingCondition", condition: "Yes" },
        { field: "currPregnant", condition: "Yes" },
        { field: "understandTO", condition: "No" },
        { field: "consentToPro", condition: "No" },
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
      if (answers.knownAllergy === "Yes") {
        if (answers.knownAllergyIssue.length === 0) {
          showMessage(
            "Please provide complete details of the questions .",
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
            {/****** 1.	Are you female and aged between 18-65?*****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("agedBetween")}
            >
              <Typography variant="h4" className="labelOne">
                Are you female and aged between 18-65?
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
                <div>
                  "This treatment is only suitable for women aged between 18 and
                  65. If you do not meet this criterion, you may not be eligible
                  for treatment."
                </div>
              )}
            </FormControl>
            {/******2.	Do you currently experience period pain (dysmenorrhea)? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("periodPain")}
            >
              <Typography variant="h4" className="labelOne">
                Do you currently experience period pain (dysmenorrhea)?
              </Typography>
              <RadioGroup
                row
                name="periodPain"
                value={answers.periodPain}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.periodPain === "No" && (
                <div>
                  "It appears that you do not suffer from period pain. We are
                  unable to provide treatment for you. Please consult your
                  healthcare provider for more information."
                </div>
              )}
            </FormControl>
            {/****** 3.	Do you experience moderate to severe pain during menstruation?****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("experience")}
            >
              <Typography variant="h4" className="labelOne">
                Do you experience moderate to severe pain during menstruation?
              </Typography>
              <RadioGroup
                row
                name="experience"
                value={answers.experience}
                onChange={(e) =>
                  setAnswers({ ...answers, experience: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.experience === "No" && (
                <div>
                  "Please confirm the severity of your period pain (mild,
                  moderate, or severe) to help us determine the best treatment
                  option."
                </div>
              )}
            </FormControl>
            {/******4.	Do you also experience any of the following symptoms with your period pain? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("symptomsPeriodPain")}
            >
              <Typography
                variant="h4"
                className="labelOne"
                name="symptomsPeriodPain"
              >
                Do you also experience any of the following symptoms with your
                period pain?
              </Typography>
              <ul>
                <FormControlLabel control={<Checkbox />} label="Bloating" />
                <br></br>
                <FormControlLabel control={<Checkbox />} label="Fatigue" />
                <br></br>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Nausea / Vomiting"
                />
                <br></br>
                <FormControlLabel control={<Checkbox />} label="Back pain" />
                <br></br>
                <FormControlLabel control={<Checkbox />} label="Other" />
              </ul>
            </FormControl>
            {/******5.	Have you experienced significant changes in the intensity or duration of your period pain in the past 6 months? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("experienceChange")}
            >
              <Typography variant="h4" className="labelOne">
                Have you experienced significant changes in the intensity or
                duration of your period pain in the past 6 months?
              </Typography>
              <RadioGroup
                row
                name="experienceChange"
                value={answers.experienceChange}
                onChange={(e) =>
                  setAnswers({ ...answers, experienceChange: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.experienceChange === "No" && (
                <div>
                  "It is important to discuss any changes in your symptoms with
                  your GP to rule out underlying conditions. We recommend
                  consulting with your healthcare provider before proceeding."
                </div>
              )}
            </FormControl>
            {/******6.	Is your period pain accompanied by any other medical symptoms, such as pelvic pain, heavy bleeding, or irregular periods? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("periodPain1")}
            >
              <Typography variant="h4" className="labelOne">
                Is your period pain accompanied by any other medical symptoms,
                such as pelvic pain, heavy bleeding, or irregular periods?
              </Typography>
              <RadioGroup
                row
                name="periodPain1"
                value={answers.periodPain1}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.periodPain1 === "Yes" && (
                <div>
                  "This could be a sign of another condition, such as
                  endometriosis or fibroids. We recommend you consult your GP
                  for further evaluation."
                </div>
              )}
            </FormControl>
            {/******7.	Have you ever been diagnosed with any of the following conditions? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("diagnosedFollowCond")}
            >
              <Typography
                variant="h4"
                className="labelOne"
                name="diagnosedFollowCond"
              >
                Have you ever been diagnosed with any of the following
                conditions?
              </Typography>
              <ul>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Endometriosis"
                />
                <br></br>
                <FormControlLabel control={<Checkbox />} label="Fibroids" />
                <br></br>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Pelvic inflammatory disease (PID)"
                />
                <br></br>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Ovarian cysts"
                />
                <br></br>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Chronic pelvic pain"
                />
                <br></br>
                <FormControlLabel control={<Checkbox />} label="Other : " />
              </ul>
            </FormControl>
            {/******8.	Do you have any known allergies to medications, especially pain relief medications like NSAIDs (e.g., ibuprofen, aspirin)? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("knownAllergy")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have any known allergies to medications, especially pain
                relief medications like NSAIDs (e.g., ibuprofen, aspirin)?
              </Typography>
              <RadioGroup
                row
                name="knownAllergy"
                value={answers.knownAllergy}
                onChange={(e) =>
                  setAnswers({ ...answers, knownAllergy: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.knownAllergy === "Yes" && (
                <>
                  <Typography>
                    "Please specify the medication(s) to which you are allergic
                    so we can avoid recommending any contraindicated
                    treatments."
                  </Typography>
                  <TextField
                    multiline
                    disabled={checkDisabled("knownAllergyIssue")}
                    line={3}
                    value={answers.knownAllergyIssue}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        knownAllergyIssue: e.target.value,
                      })
                    }
                    fullWidth
                    placeholder="Tell us more ?"
                  />
                </>
              )}
            </FormControl>
            {/******9.	Are you currently on any of the following medications? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("otherMedication")}
            >
              <Typography variant="h4" className="labelOne">
                Are you currently on any of the following medications?
              </Typography>
              <>
                {" "}
                <ul>
                  <li>Birth control (oral contraceptives, IUD, etc.)</li>
                  <li>Hormonal therapy</li>
                  <li>Pain relief medication (e.g., ibuprofen, paracetamol)</li>
                  <li>Antidepressants or antianxiety medication</li>
                  <li>Any other relevant medications</li>
                  <RadioGroup
                    row
                    name="otherMedication"
                    value={answers.otherMedication}
                    onChange={(e) => handleChange(e, "Yes")}
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
                  {answers.otherMedication === "Yes" && (
                    <div>
                      "Some medications can interact with period pain
                      treatments. Please consult your GP if you're unsure about
                      any potential interactions."
                    </div>
                  )}
                </ul>
              </>
            </FormControl>
            {/******10.	Have you used any treatments in the past for period pain, such as: *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("pastTreatments")}
            >
              <Typography
                variant="h4"
                className="labelOne"
                name="pastTreatments"
              >
                Have you used any treatments in the past for period pain, such
                as:
              </Typography>
              <ul>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Over-the-counter pain relief (e.g., ibuprofen, paracetamol)"
                />
                <br></br>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Prescription medication (e.g., hormonal treatments, stronger painkillers)"
                />
                <br></br>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Surgery (e.g., laparoscopy for endometriosis)"
                />
                <br></br>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Other treatments "
                />
              </ul>
            </FormControl>
            {/******11.	Did any of the above treatments work for you? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("anyTreatment")}
            >
              <Typography variant="h4" className="labelOne">
                Did any of the above treatments work for you?
              </Typography>
              <RadioGroup
                row
                name="anyTreatment"
                value={answers.anyTreatment}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.anyTreatment === "No" && (
                <Typography>
                  "If you did not respond to previous treatments, we recommend
                  speaking to your GP for alternative options."
                </Typography>
              )}
            </FormControl>
            {/******12.	On a scale of 1-10, how severe is your period pain? (1 being mild and 10 being unbearable) *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("painseverity")}
            >
              <Typography variant="h4" className="labelOne">
                On a scale of 1-10, how severe is your period pain? (1 being
                mild and 10 being unbearable)
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="pain-severity-label">Pain Severity</InputLabel>
                <Select
                  disabled={checkDisabled("painseverity")}
                  labelId="pain-severity-label"
                  value={answers.painseverity}
                  onChange={(e) =>
                    setAnswers({ ...answers, painseverity: e.target.value })
                  }
                  label="Pain severity"
                >
                  {[...Array(10).keys()].map((value) => (
                    <MenuItem key={value + 1} value={value + 1}>
                      {value + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormControl>
            {/******13.	Do you experience any pain during activities such as exercising, working, or socializing due to your period pain? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("painActivity")}
            >
              <Typography variant="h4" className="labelOne">
                Do you experience any pain during activities such as exercising,
                working, or socializing due to your period pain?
              </Typography>
              <RadioGroup
                row
                name="painActivity"
                value={answers.painActivity}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.painActivity === "Yes" && (
                <div>
                  "If your period pain significantly impacts your daily life,
                  this may require a more intensive treatment approach. We
                  recommend a consultation with your GP to explore further
                  options."
                </div>
              )}
            </FormControl>

            {/******14.	Do you have any of the following conditions that could impact your health or treatment options? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("followingCondition")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have any of the following conditions that could impact
                your health or treatment options?
              </Typography>
              <ul>
                <li>Asthma</li>
                <br></br>
                <li>Diabetes</li>
                <br></br>
                <li>Hypertension</li>
                <br></br>
                <li>Cardiovascular disease</li>
                <br></br>
                <li>Blood clotting disorders</li>
                <br></br>
                <RadioGroup
                  row
                  name="followingCondition"
                  value={answers.followingCondition}
                  onChange={(e) => handleChange(e, "Yes")}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                {answers.followingCondition === "Yes" && (
                  <div>
                    "Certain health conditions may affect the suitability of
                    period pain treatments. It is important to consult with your
                    GP before starting any treatment."
                  </div>
                )}
              </ul>
            </FormControl>
            {/******15.	Are you currently pregnant or breastfeeding? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("currPregnant")}
            >
              <Typography variant="h4" className="labelOne">
                Are you currently pregnant or breastfeeding?
              </Typography>
              <RadioGroup
                row
                name="currPregnant"
                value={answers.currPregnant}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.currPregnant === "Yes" && (
                <div>
                  "You should not take certain medications for period pain
                  during pregnancy or breastfeeding. Please consult your GP for
                  suitable alternatives."
                </div>
              )}
            </FormControl>
            {/******16.	Do you understand that the treatment options available for period pain may have potential side effects, and you should consult your GP if you experience any adverse reactions? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("understandTO")}
            >
              <Typography variant="h4" className="labelOne">
                Do you understand that the treatment options available for
                period pain may have potential side effects, and you should
                consult your GP if you experience any adverse reactions?
              </Typography>
              <RadioGroup
                row
                name="understandTO"
                value={answers.understandTO}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.understandTO === "No" && (
                <div>Please consult your GP for suitable alternatives.</div>
              )}
            </FormControl>
            {/******17.	Do you consent to proceeding with treatment for period pain after reviewing the information provided? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("consentToPro")}
            >
              <Typography variant="h4" className="labelOne">
                Do you consent to proceeding with treatment for period pain
                after reviewing the information provided?
              </Typography>
              <RadioGroup
                row
                name="consentToPro"
                value={answers.consentToPro}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.consentToPro === "No" && (
                <div>Please consult your GP for suitable alternatives.</div>
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

export default PeriodPainQuestion;
