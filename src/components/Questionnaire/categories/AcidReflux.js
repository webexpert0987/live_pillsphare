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
const steps = ["1", "2"];

function AcidRefluxQuestion() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({
    over50WithNewSymptoms: "",
    agreeToTerms: "",
    photoID: "",
    acidRefluxSymptoms: "",
    difficultySwallowing: "",
    allergyToPPIs: "",
    pregnantOrBreastfeeding: "",
    otherConditions: "",
    rashAfterPPIs: "",
    takingMedications: "",
    onSteroids: "",
    healthyLifestyle: "",
    shortTermUse: "",
    contactGP: "",
    agree: "",
  });
  const boxRef = useRef(null);
  const { setSelectedTab, setQuestionData } = useApp();
  const { showMessage } = useMessage();
  const [stopNext, setStopNext] = useState(false);
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
        "over50WithNewSymptoms",
        "acidRefluxSymptoms",
        "difficultySwallowing",
        "allergyToPPIs",
        "pregnantOrBreastfeeding",
        "otherConditions",
        "rashAfterPPIs",
        "takingMedications",
        "onSteroids",
        "healthyLifestyle",
        "shortTermUse",
        "contactGP",
        "agree",
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

      if (
        answers.over50WithNewSymptoms === "Yes" ||
        answers.acidRefluxSymptoms === "No" ||
        answers.difficultySwallowing === "Yes" ||
        answers.allergyToPPIs === "Yes" ||
        answers.pregnantOrBreastfeeding === "Yes" ||
        answers.otherConditions === "Yes" ||
        answers.rashAfterPPIs === "Yes" ||
        answers.takingMedications === "Yes" ||
        answers.onSteroids === "Yes" ||
        answers.healthyLifestyle === "No" ||
        answers.shortTermUse === "No" ||
        answers.contactGP === "No" ||
        answers.agree === "No"
      ) {
        showMessage(
          "We are unable to provide you with treatment at this time. Please consult your GP.",
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

  const handleSubmit = () => {
    if (!answers.agreeToTerms) {
      showMessage(
        "Please fill all details before proceeding to the next step.",
        "error"
      );
      return;
    }
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
        ...parsedData,
      })
    );
    setSelectedTab(2);
  };

  const consultMessage = (value, condition) => {
    if (value !== condition) {
      return null;
    }
    return (
      <div>
        We are unable to provide you with treatment at this time. Please consult
        your GP.
        <br></br>Please Do not proceed.
      </div>
    );
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

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <>
            {/* 1st Are you over 50 with any new or recently changed symptoms?  */}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("over50WithNewSymptoms")}
            >
              <Typography variant="h4" className="labelOne">
                Are you over 50 with any new or recently changed symptoms?
              </Typography>
              <RadioGroup
                row
                name="over50WithNewSymptoms"
                value={answers.over50WithNewSymptoms}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {consultMessage(answers.over50WithNewSymptoms, "Yes")}
            </FormControl>

            {/* 2nd Do you experience acid reflux symptoms at least twice a week, including:  */}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("acidRefluxSymptoms")}
            >
              <Typography variant="h4" className="labelOne">
                Do you experience acid reflux symptoms at least twice a week,
                including : <br></br>
                <ul>
                  <li>
                    {" "}
                    Burning sensation in the throat or sour/acidic taste.
                  </li>
                  <li> Chest pain after meals, when lying down, or bending.</li>
                  <li> Food sensation “sticking” in the chest or throat.</li>
                </ul>
              </Typography>
              <RadioGroup
                row
                name="acidRefluxSymptoms"
                value={answers.acidRefluxSymptoms}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>

              {consultMessage(answers.acidRefluxSymptoms, "No")}
            </FormControl>
            {/* ---------------- */}

            {/****** 3rd  Do you have any of these symptoms: difficulty swallowing, unintended weight loss,
             * persistent vomiting, severe/persistent diarrhea,
             *  vomiting blood, blood in stools or black stools,
             *  iron deficiency anemia, severe liver problems, or abdominal swelling?   *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("difficultySwallowing")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have any of these symptoms :
                <ul>
                  <li>Difficulty swallowing</li> <li>Unintended weight loss</li>{" "}
                  <li>Persistent vomiting</li>{" "}
                  <li>Severe/persistent diarrhea</li> <li>Vomiting blood</li>{" "}
                  <li>Blood in stools or black stools</li>
                  <li>Iron deficiency anemia</li>{" "}
                  <li>Severe liver problems or abdominal swelling</li>
                </ul>
              </Typography>
              <RadioGroup
                row
                name="difficultySwallowing"
                value={answers.difficultySwallowing}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {consultMessage(answers.difficultySwallowing, "Yes")}
            </FormControl>

            {/****** 4th Do you have a known allergy to proton pump inhibitors (e.g., omeprazole, pantoprazole)? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("allergyToPPIs")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have a known allergy to proton pump inhibitors (e.g.,
                omeprazole, pantoprazole)
              </Typography>
              <RadioGroup
                row
                name="allergyToPPIs"
                value={answers.allergyToPPIs}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {consultMessage(answers.allergyToPPIs, "Yes")}
            </FormControl>

            {/****** 5th.** Are you pregnant, possibly pregnant, or breastfeeding?  *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("pregnantOrBreastfeeding")}
            >
              <Typography variant="h4" className="labelOne">
                Are you pregnant, possibly pregnant, or breastfeeding?
              </Typography>
              <RadioGroup
                row
                name="pregnantOrBreastfeeding"
                value={answers.pregnantOrBreastfeeding}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {consultMessage(answers.pregnantOrBreastfeeding, "Yes")}
            </FormControl>

            {/****** 6th Do you have any of the following conditions:   *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("otherConditions")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have any of the following conditions:
                <ul>
                  <li>Osteoporosis</li>
                  <li>Liver disease</li>
                  <li>Gastric cancer</li>
                  <li>Hypomagnesemia (low blood magnesium) </li>
                </ul>
              </Typography>
              <RadioGroup
                row
                name="otherConditions"
                value={answers.otherConditions}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {consultMessage(answers.otherConditions, "Yes")}
            </FormControl>

            {/****** 7th  Have you experienced a ring-shaped or plaque-shaped rash after
             * sun exposure while taking a proton pump inhibitor?  *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("rashAfterPPIs")}
            >
              <Typography variant="h4" className="labelOne">
                Have you experienced a ring-shaped or plaque-shaped rash after
                sun exposure while taking a proton pump inhibitor?
              </Typography>
              <RadioGroup
                row
                name="rashAfterPPIs"
                value={answers.rashAfterPPIs}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {consultMessage(answers.rashAfterPPIs, "Yes")}
            </FormControl>

            {/****** 8th  Are you taking any medication, including over-the-counter, prescription, or recreational drugs?  *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("takingMedications")}
            >
              <Typography variant="h4" className="labelOne">
                Are you taking any medication, including over-the-counter,
                prescription, or recreational drugs?
              </Typography>

              <RadioGroup
                row
                name="takingMedications" //
                value={answers.takingMedications || ""}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {consultMessage(answers.takingMedications, "Yes")}
            </FormControl>

            {/****** 9th Are you on any of the following medications? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("onSteroids")}
            >
              <Typography variant="h4" className="labelOne">
                Are you on any of the following medications?
                <ul>
                  <li>NSAIDs (e.g., ibuprofen)</li>
                  <li>Antifungals (e.g., ketoconazole)</li>
                  <li>Digoxin, Diazepam, or Ulipristal</li>
                  <li>
                    Phenytoin, Fosphenytoin, warfarin, or vitamin K blockers
                  </li>
                  <li>
                    Rifampicin, HIV medications, Ledipasvir, Ciclosporin,
                    Tacrolimus
                  </li>
                  <li>St John's Wort, Cilostazol, Clopidogrel, Vitamin B12</li>
                  <li>
                    Certain cancer treatments, antibiotics, Methotrexate,
                    Escitalopram, Clozapine
                  </li>
                </ul>
              </Typography>

              <RadioGroup
                row
                name="onSteroids"
                value={answers.onSteroids || ""} // Prevents undefined errors
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {consultMessage(answers.onSteroids, "Yes")}
            </FormControl>

            {/****** 10th .** Do you agree to:  
                     - Read the patient information leaflet
                     - Inform Medicus Express and your GP if you experience side effects or change medications
                     - Use the treatment for personal use only
                     - Provide accurate and truthful answers for safe prescribing  *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("healthyLifestyle")}
            >
              <Typography variant="h4" className="labelOne">
                Do you agree to :
                <ul>
                  <li>Read the patient information leaflet</li>
                  <li>Use the treatment for personal use only</li>
                  <li>
                    {" "}
                    Provide accurate and truthful answers for safe prescribing
                  </li>
                  <li>
                    Inform Medicus Express and your GP if you experience side
                    effects or change medications
                  </li>
                </ul>
              </Typography>

              <RadioGroup
                row
                name="healthyLifestyle"
                value={answers.healthyLifestyle || ""} // Prevents undefined errors
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {consultMessage(answers.healthyLifestyle, "No")}
            </FormControl>

            {/* 11th Do you understand that maintaining a healthy diet, reducing alcohol intake, 
          achieving a healthy weight, and stopping smoking can improve symptoms?   */}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("shortTermUse")}
            >
              <Typography variant="h4" className="labelOne">
                Do you understand that maintaining a healthy diet, reducing
                alcohol intake, achieving a healthy weight, and stopping smoking
                can improve symptoms?
              </Typography>

              <RadioGroup
                row
                name="shortTermUse"
                value={answers.shortTermUse || ""} // Prevents undefined errors
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {consultMessage(answers.shortTermUse, "No")}
            </FormControl>

            {/* 12th Do you agree to use this medication for the short-term treatment of GORD 
            (heartburn/acid indigestion) for up to 28 days only?   */}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("contactGP")}
            >
              <Typography variant="h4" className="labelOne">
                Do you agree to use this medication for the short-term treatment
                of GORD (heartburn/acid indigestion) for up to 28 days only?
              </Typography>

              <RadioGroup
                row
                name="contactGP"
                value={answers.contactGP || ""} // Prevents undefined errors
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {consultMessage(answers.contactGP, "No")}
            </FormControl>

            {/* 13th Do you agree to contact your GP if you have no symptom 
              relief after 14 days or if symptoms persist beyond 28 days?   */}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("agree")}
            >
              <Typography variant="h4" className="labelOne">
                Do you agree to contact your GP if you have no symptom relief
                after 14 days or if symptoms persist beyond 28 days?
              </Typography>

              <RadioGroup
                row
                name="agree"
                value={answers.agree || ""} // Prevents undefined errors
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>

              {consultMessage(answers.agree, "No")}
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
      case 2:
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
                disabled={disabled}
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

export default AcidRefluxQuestion;
