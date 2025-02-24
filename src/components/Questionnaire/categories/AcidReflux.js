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

function AcidRefluxQuestion() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({
    agedBetween: "",
    agreeToTerms: "",
    photoID: "",
    experiencedAny: "",
    AreYouPregnantBreastfeeding: "",
    eatingDisorder: "",
    injectionsOrMedications: "",
    allergicReaction: "",
    familyMembersDiagnosed: "",
    medicationStatus: "",
    takingSteroidsMedication: "",
    takingSteroidsMedication1: "",
    takingSteroidsMedication2: "",
    takingSteroidsMedication3: "",
    takenInjectableMedication: "",
    agree: "",
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
            {/* 1st Are you over 50 with any new or recently changed symptoms?  */}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you over 50 with any new or recently changed symptoms?
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

            {/* 2nd Do you experience acid reflux symptoms at least twice a week, including:  */}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you experience acid reflux symptoms at least twice a week, including : <br></br>
                <ul>
               <li> Burning sensation in the throat or sour/acidic taste.</li>
               <li> Chest pain after meals, when lying down, or bending.</li>
                <li> Food sensation “sticking” in the chest or throat.</li> 
                </ul>
              </Typography>
              <RadioGroup
                row
                name="experiencedAny"
                value={answers.experiencedAny}
                onChange={(e) =>
                  setAnswers({ ...answers, experiencedAny: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {/* ---------------- */}

            {/****** 3rd  Do you have any of these symptoms: difficulty swallowing, unintended weight loss, 
             * persistent vomiting, severe/persistent diarrhea,
             *  vomiting blood, blood in stools or black stools,
             *  iron deficiency anemia, severe liver problems, or abdominal swelling?   *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have any of these symptoms : 
                <ul>
                <li>Difficulty swallowing</li> <li>Unintended weight loss</li> <li>Persistent vomiting</li> <li>Severe/persistent diarrhea</li> <li>Vomiting blood</li> <li>Blood in stools or black stools</li>
                <li>Iron deficiency anemia</li> <li>Severe liver problems or abdominal swelling</li>
                </ul>
              </Typography>
              <RadioGroup
                row
                name="AreYouPregnantBreastfeeding"
                value={answers.AreYouPregnantBreastfeeding}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    AreYouPregnantBreastfeeding: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/****** 4th Do you have a known allergy to proton pump inhibitors (e.g., omeprazole, pantoprazole)? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have a known allergy to proton pump inhibitors (e.g., omeprazole, pantoprazole)
              </Typography>
              <RadioGroup
                row
                name="eatingDisorder"
                value={answers.eatingDisorder}
                onChange={(e) =>
                  setAnswers({ ...answers, eatingDisorder: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/****** 5th.** Are you pregnant, possibly pregnant, or breastfeeding?  *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you pregnant, possibly pregnant, or breastfeeding?
              </Typography>
              <RadioGroup
                row
                name="injectionsOrMedications"
                value={answers.injectionsOrMedications}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    injectionsOrMedications: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/****** 6th Do you have any of the following conditions:   *****/}

            <FormControl component="fieldset" className="QuestionBox">
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
                name="allergicReaction"
                value={answers.allergicReaction}
                onChange={(e) =>
                  setAnswers({ ...answers, allergicReaction: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/****** 7th  Have you experienced a ring-shaped or plaque-shaped rash after 
             * sun exposure while taking a proton pump inhibitor?  *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Have you experienced a ring-shaped or plaque-shaped rash after sun exposure while taking a proton pump inhibitor?
              </Typography>
              <RadioGroup
                row
                name="familyMembersDiagnosed"
                value={answers.familyMembersDiagnosed}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    familyMembersDiagnosed: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>


            {/****** 8th  Are you taking any medication, including over-the-counter, prescription, or recreational drugs?  *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you taking any medication, including over-the-counter, prescription, or recreational drugs?
              </Typography>

              <RadioGroup
                row
                name="medicationStatus" //
                value={answers.medicationStatus || ""}
                onChange={(e) =>
                  setAnswers({ ...answers, medicationStatus: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/****** 9th Are you on any of the following medications? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you on any of the following medications?
              </Typography>

              <RadioGroup
                row
                name="takingSteroidsMedication"
                value={answers.takingSteroidsMedication || ""} // Prevents undefined errors
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    takingSteroidsMedication: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/****** 10th .** Do you agree to:  
                       - Read the patient information leaflet
                       - Inform Medicus Express and your GP if you experience side effects or change medications
                       - Use the treatment for personal use only
                       - Provide accurate and truthful answers for safe prescribing  *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you agree to :
                <ul>
                <li>Read the patient information leaflet</li>
                <li>Use the treatment for personal use only</li>
                <li> Provide accurate and truthful answers for safe prescribing</li>
                <li>Inform Medicus Express and your GP if you experience side effects or change medications</li></ul>
              </Typography>

              <RadioGroup
                row
                name="takenInjectableMedication"
                value={answers.takenInjectableMedication || ""} // Prevents undefined errors
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    takenInjectableMedication: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/* 11th Do you understand that maintaining a healthy diet, reducing alcohol intake, 
            achieving a healthy weight, and stopping smoking can improve symptoms?   */}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you understand that maintaining a healthy diet, reducing alcohol intake,
                achieving a healthy weight, and stopping smoking can improve symptoms?
              </Typography>

              <RadioGroup
                row
                name="takingSteroidsMedication1"
                value={answers.takingSteroidsMedication1 || ""} // Prevents undefined errors
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    takingSteroidsMedication1: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/* 12th Do you agree to use this medication for the short-term treatment of GORD 
              (heartburn/acid indigestion) for up to 28 days only?   */}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you agree to use this medication for the short-term treatment of GORD
                (heartburn/acid indigestion) for up to 28 days only?
              </Typography>

              <RadioGroup
                row
                name="takingSteroidsMedication2"
                value={answers.takingSteroidsMedication2 || ""} // Prevents undefined errors
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    takingSteroidsMedication2: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/* 12th Do you agree to use this medication for the short-term treatment of GORD 
              (heartburn/acid indigestion) for up to 28 days only?   */}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you agree to use this medication for the short-term treatment of GORD
                (heartburn/acid indigestion) for up to 28 days only?
              </Typography>

              <RadioGroup
                row
                name="takingSteroidsMedication3"
                value={answers.takingSteroidsMedication3 || ""} // Prevents undefined errors
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    takingSteroidsMedication3: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

                {/* 13th Do you agree to contact your GP if you have no symptom 
                relief after 14 days or if symptoms persist beyond 28 days?   */}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
              Do you agree to contact your GP if you have no symptom 
              relief after 14 days or if symptoms persist beyond 28 days?  
              </Typography>

              <RadioGroup
                row
                name="agree"
                value={answers.agree || ""} // Prevents undefined errors
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    agree: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
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

export default AcidRefluxQuestion;
