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
  TextField,
} from "@mui/material";
import "../../../../src/globalStyle.css";

import BmiCalculate from "../Consultation"; // Import the BMI calculation component
import { useApp } from "../../../Context/AppContext";
import { useMessage } from "../../../Context/MessageContext";
const steps = ["1", "2", "3", "4"];

function ContraceptivesQuestion() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({
    agedBetween: "",
    agreeToTerms: "",
    photoID: "",
    contraPill: "",
    contraception: "",
    bloodPressure: "",
    cervicalCancer: "",
    diagnosed: "",
    anyMedication: "",
    surgery: "",
    bleeding: "",
    vulnerable: "",
    prescription: "",
    
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
            {/****** 1st	Are you pregnant, breastfeeding, trying to conceive, or have you given birth in the last six weeks? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
              Are you pregnant, breastfeeding, trying to conceive, or 
              have you given birth in the last six weeks?
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

             {/****** 2nd Are you currently using any form of contraception, such as the pill?*****/}

             <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
              Are you currently using any form of contraception, such as the pill?
              </Typography>
              <RadioGroup
                row
                name="contraception"
                value={answers.contraception}
                onChange={(e) =>
                  setAnswers({ ...answers, contraception: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

             {/******3rd	Have you previously used a contraceptive pill?*****/}

             <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
              Have you previously used a contraceptive pill?
              </Typography>
              <RadioGroup
                row
                name="contraPill"
                value={answers.contraPill}
                onChange={(e) =>
                  setAnswers({ ...answers, contraPill: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

             {/******	What is your blood pressure? *****/}

             <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
              	What is your blood pressure?
              </Typography>
             <TextField 
             name="bloodPressure"
             label= "Blood-Pressure"
             type="number"
             value={answers.bloodPressure}
             onChange={(e)=>setAnswers({...answers,bloodPressure: e.target.value})}
             />
            </FormControl>

             {/****** Have you had a cervical cancer screening test in the past 3-5 years? Yes/no  *****/}

             <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
              	Have you had a cervical cancer screening test in the past 3-5 years? 
              </Typography>
              <RadioGroup
                row
                name="cervicalCancer"
                value={answers.cervicalCancer}
                onChange={(e) =>
                  setAnswers({ ...answers, cervicalCancer: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

             {/******	Have you or any immediate family member been diagnosed with any of the following health conditions? *****/}

             <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
              Have you or any immediate family member been diagnosed with any of the following health conditions? 
              <ul>
                <li>Blood clot in the legs (deep vein thrombosis, DVT), lungs (pulmonary embolism, PE), or other organs</li>
                <li>Diabetes</li>
                <li>Migraine</li>
                <li>Heart attack, stroke, angina, chest pain, mini-stroke (TIA), abnormal heart rhythm, or impaired heart function</li>
                <li>High blood pressure</li>
                <li>High cholesterol or triglycerides</li>
                <li>Cancer (breast, cervical, liver, etc.)</li>
                <li>Liver or gallbladder disease</li>
                <li>Epilepsy</li>
                <li>Systemic lupus erythematosus (SLE)</li>
                <li>Sickle cell disease or blood disorders</li> 
                <li>Inflammatory bowel disease (e.g., Crohn’s or ulcerative colitis)</li> 
                
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
            </FormControl>

             {/****** Are you currently taking any of the following medications? *****/}

             <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
              	Are you currently taking any of the following medications?
                <ul>
                <li>HIV Protease Inhibitors (e.g., Atazanavir, Ritonavir)</li>
                <li>Antifungals (e.g., Itraconazole, Ketoconazole)</li>
                <li>Antibiotics (e.g., Tetracycline, Ampicillin)</li>
                <li>Antiepileptics (e.g., Phenobarbital, Phenytoin)</li>
                <li>Herbal medications (e.g., St John's Wort)</li>
                <li>Imatinib, Rifampicin, Ciclosporin</li>
                
                </ul>
              </Typography>
              <RadioGroup
                row
                name="anyMedication"
                value={answers.anyMedication}
                onChange={(e) =>
                  setAnswers({ ...answers, anyMedication: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

             {/******	Have you undergone any surgery in the past 12 months, or are you currently immobile? *****/}

             <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
              	Have you undergone any surgery in the past 12 months, or are you currently immobile?
              </Typography>
              <RadioGroup
                row
                name="surgery"
                value={answers.surgery}
                onChange={(e) =>
                  setAnswers({ ...answers, surgery: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            
             {/******	Do you experience any unexpected or unusual vaginal bleeding (e.g., bleeding between periods, after sex, very heavy or painful periods)?*****/}

             <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
              	Do you experience any unexpected or unusual vaginal bleeding (e.g., bleeding between periods, after sex, very heavy or painful periods)?
              </Typography>
              <RadioGroup
                row
                name="bleeding"
                value={answers.bleeding}
                onChange={(e) =>
                  setAnswers({ ...answers, bleeding: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            
             {/******	Do you feel vulnerable or under pressure to obtain treatment? *****/}

             <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
              	Do you feel vulnerable or under pressure to obtain treatment?
              </Typography>
              <RadioGroup
                row
                name="vulnerable"
                value={answers.vulnerable}
                onChange={(e) =>
                  setAnswers({ ...answers, vulnerable: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
             
               {/******	Are you currently taking or have you recently stopped any prescription, over-the-counter, herbal medications, or recreational drugs?*****/}

             <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
             Are you currently taking or have you recently stopped any prescription, over-the-counter, herbal medications, or recreational drugs?
              </Typography>
              <RadioGroup
                row
                name="prescription"
                value={answers.prescription}
                onChange={(e) =>
                  setAnswers({ ...answers, prescription: e.target.value })
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

export default ContraceptivesQuestion;
