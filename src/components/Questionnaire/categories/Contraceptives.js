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

// import BmiCalculate from "../Consultation"; // Import the BMI calculation component
import { useApp } from "../../../Context/AppContext";
import { useMessage } from "../../../Context/MessageContext";
const steps = ["1", "2"];

function ContraceptivesQuestion() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({
    pregnancyStatus: "",
    contraceptionUsage: "",
    previousContraceptivePill: "",
    contraceptionUsageInfo: "",
    previousContraceptivePillInfo: "",
    currentMedicationsInfo: "",
    prescriptionUsageInfo: "",
    allergicSubstances: "",
    bloodPressure: "",
    cervicalCancerScreening: "",
    diagnosedConditions: "",
    currentMedications: "",
    recentSurgery: "",
    unusualBleeding: "",
    feelingVulnerable: "",
    prescriptionUsage: "",
    agreeToTerms1: "",
    agreeToTerms2: "",
    photoID: "",
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
        "pregnancyStatus",
        "contraceptionUsage",
        "previousContraceptivePill",
        "bloodPressure",
        "cervicalCancerScreening",
        "diagnosedConditions",
        "currentMedications",
        "recentSurgery",
        "unusualBleeding",
        "feelingVulnerable",
        "prescriptionUsage",
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
        { field: "pregnancyStatus", condition: "Yes" },
        { field: "diagnosedConditions", condition: "Yes" },
        { field: "recentSurgery", condition: "Yes" },
        { field: "unusualBleeding", condition: "Yes" },
        { field: "allergicSubstances", condition: "Yes" },
        { field: "agreeToTerms1", condition: "Yes" },
        { field: "cervicalCancerScreening", condition: "No" },
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

      if (answers.contraceptionUsage === "Yes") {
        if (!answers.contraceptionUsageInfo) {
          showMessage(
            "Please provide contraception usage details to proceed",
            "error"
          );
          return;
        }
      }

      if (answers.previousContraceptivePill === "Yes") {
        if (!answers.previousContraceptivePillInfo) {
          showMessage(
            "Please provide previous Contraceptive Pill details to proceed",
            "error"
          );
          return;
        }
      }

      if (answers.bloodPressure > 140) {
        showMessage(
          "Based on your answers, we are unable to provide you with treatment at this time. Please consult your GP.",
          "error"
        );
        return;
      }
    } else if (activeStep === 1) {
      const requiredAgreements = ["agreeToTerms2"];

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
    if (!answers.agreeToTerms2) {
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
      <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
        We are unable to provide you with treatment at this time. Please consult
        your GP.
      </Typography>
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
      //============= Step 01 =============//
      case 0:
        return (
          <>
            {/****** 1st	Are you pregnant, breastfeeding, trying to conceive, or have you given birth in the last six weeks? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("pregnancyStatus")}
            >
              <Typography variant="h4" className="labelOne">
                Are you pregnant, breastfeeding, trying to conceive, or have you
                given birth in the last six weeks?
              </Typography>
              <RadioGroup
                row
                name="pregnancyStatus"
                value={answers.pregnancyStatus}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {consultMessage(answers.pregnancyStatus, "Yes")}
            </FormControl>

            {/****** 2nd Are you currently using any form of contraception, such as the pill?*****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("contraceptionUsage")}
            >
              <Typography variant="h4" className="labelOne">
                Are you currently using any form of contraception, such as the
                pill?
              </Typography>
              <RadioGroup
                row
                name="contraceptionUsage"
                value={answers.contraceptionUsage}
                onChange={(e) => handleChange(e, "")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.contraceptionUsage === "Yes" && (
                <TextField
                  name="contraceptionUsageInfo"
                  label="Write here"
                  type="text"
                  value={answers.contraceptionUsageInfo}
                  required
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      contraceptionUsageInfo: e.target.value,
                    })
                  }
                />
              )}
            </FormControl>

            {/******3rd	Have you previously used a contraceptive pill?*****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("previousContraceptivePill")}
            >
              <Typography variant="h4" className="labelOne">
                Have you previously used a contraceptive pill?
              </Typography>
              <RadioGroup
                row
                name="previousContraceptivePill"
                value={answers.previousContraceptivePill}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    previousContraceptivePill: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.previousContraceptivePill === "Yes" && (
                <TextField
                  name="previousContraceptivePillInfo"
                  label="Write here"
                  type="text"
                  disabled={checkDisabled("previousContraceptivePillInfo")}
                  value={answers.previousContraceptivePillInfo}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      previousContraceptivePillInfo: e.target.value,
                    })
                  }
                />
              )}
            </FormControl>

            {/******	What is your blood pressure? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("bloodPressure")}
            >
              <Typography variant="h4" className="labelOne">
                What is your blood pressure?
              </Typography>
              <TextField
                name="bloodPressure"
                label="Blood-Pressure"
                type="number"
                disabled={checkDisabled("bloodPressure")}
                value={answers.bloodPressure}
                onChange={(e) =>
                  handleChange(e, answers.bloodPressure > 140 ? "Yes" : "No")
                }
              />

              {answers.bloodPressure > 140 && consultMessage("Yes", "Yes")}
            </FormControl>

            {/****** Have you had a cervical cancer screening test in the past 3-5 years? Yes/no  *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("cervicalCancerScreening")}
            >
              <Typography variant="h4" className="labelOne">
                Have you had a cervical cancer screening test in the past 3-5
                years?
              </Typography>
              <RadioGroup
                row
                name="cervicalCancerScreening"
                value={answers.cervicalCancerScreening}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.cervicalCancerScreening === "No" && (
                <Typography
                  color="error"
                  variant="body"
                  sx={{ mt: 1, fontSize: "14px" }}
                >
                  Cervical cancer screening is recommended for women aged 25-64.
                  If you're not up-to-date with this screening, please see your
                  doctor or contraception nurse. We cannot provide the pill
                  without this test.
                </Typography>
              )}
            </FormControl>

            {/******	Have you or any immediate family member been diagnosed with any of the following health conditions? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("diagnosedConditions")}
            >
              <Typography variant="h4" className="labelOne">
                Have you or any immediate family member been diagnosed with any
                of the following health conditions?
                <ul>
                  <li style={{ fontSize: "1rem" }}>
                    Blood clot in the legs (deep vein thrombosis, DVT), lungs
                    (pulmonary embolism, PE), or other organs
                  </li>
                  <li style={{ fontSize: "1rem" }}>Diabetes</li>
                  <li style={{ fontSize: "1rem" }}>Migraine</li>
                  <li style={{ fontSize: "1rem" }}>
                    Heart attack, stroke, angina, chest pain, mini-stroke (TIA),
                    abnormal heart rhythm, or impaired heart function
                  </li>
                  <li style={{ fontSize: "1rem" }}>High blood pressure</li>
                  <li style={{ fontSize: "1rem" }}>
                    High cholesterol or triglycerides
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    Cancer (breast, cervical, liver, etc.)
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    Liver or gallbladder disease
                  </li>
                  <li style={{ fontSize: "1rem" }}>Epilepsy</li>
                  <li style={{ fontSize: "1rem" }}>
                    Systemic lupus erythematosus (SLE)
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    Sickle cell disease or blood disorders
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    Inflammatory bowel disease (e.g., Crohn’s or ulcerative
                    colitis)
                  </li>
                </ul>
              </Typography>
              <RadioGroup
                row
                name="diagnosedConditions"
                value={answers.diagnosedConditions}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>

              {consultMessage(answers.diagnosedConditions, "Yes")}
            </FormControl>

            {/****** Are you currently taking any of the following medications? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("currentMedications")}
            >
              <Typography variant="h4" className="labelOne">
                Are you currently taking any of the following medications?
                <ul>
                  <li style={{ fontSize: "1rem" }}>
                    HIV Protease Inhibitors (e.g., Atazanavir, Ritonavir)
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    Antifungals (e.g., Itraconazole, Ketoconazole)
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    Antibiotics (e.g., Tetracycline, Ampicillin)
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    Antiepileptics (e.g., Phenobarbital, Phenytoin)
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    Herbal medications (e.g., St John's Wort)
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    Imatinib, Rifampicin, Ciclosporin
                  </li>
                </ul>
              </Typography>
              <RadioGroup
                row
                name="currentMedications"
                value={answers.currentMedications}
                onChange={(e) => handleChange(e, "")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.currentMedications === "Yes" && (
                <TextField
                  name="currentMedicationsInfo"
                  label="Write here"
                  type="text"
                  value={answers.currentMedicationsInfo}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      currentMedicationsInfo: e.target.value,
                    })
                  }
                />
              )}
            </FormControl>

            {/******	Have you undergone any surgery in the past 12 months, or are you currently immobile? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("recentSurgery")}
            >
              <Typography variant="h4" className="labelOne">
                Have you undergone any surgery in the past 12 months, or are you
                currently immobile?
              </Typography>
              <RadioGroup
                row
                name="recentSurgery"
                value={answers.recentSurgery}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {consultMessage(answers.recentSurgery, "Yes")}
            </FormControl>

            {/******	Do you experience any unexpected or unusual vaginal bleeding (e.g., bleeding between periods, after sex, very heavy or painful periods)?*****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("unusualBleeding")}
            >
              <Typography variant="h4" className="labelOne">
                Do you experience any unexpected or unusual vaginal bleeding
                (e.g., bleeding between periods, after sex, very heavy or
                painful periods)?
              </Typography>
              <RadioGroup
                row
                name="unusualBleeding"
                value={answers.unusualBleeding}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {consultMessage(answers.unusualBleeding, "Yes")}
            </FormControl>

            {/******	Do you feel vulnerable or under pressure to obtain treatment? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("feelingVulnerable")}
            >
              <Typography variant="h4" className="labelOne">
                Do you feel vulnerable or under pressure to obtain treatment?
              </Typography>
              <RadioGroup
                row
                name="feelingVulnerable"
                value={answers.feelingVulnerable}
                onChange={(e) =>
                  setAnswers({ ...answers, feelingVulnerable: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.feelingVulnerable === "Yes" && (
                <Typography
                  color="error"
                  variant="body"
                  sx={{ mt: 1, fontSize: "14px" }}
                >
                  You are not alone. We are here to help. Contact us.
                </Typography>
              )}
            </FormControl>

            {/******	Are you currently taking or have you recently stopped any prescription, over-the-counter, herbal medications, or recreational drugs?*****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("prescriptionUsage")}
            >
              <Typography variant="h4" className="labelOne">
                Are you currently taking or have you recently stopped any
                prescription, over-the-counter, herbal medications, or
                recreational drugs?
              </Typography>
              <RadioGroup
                row
                name="prescriptionUsage"
                value={answers.prescriptionUsage}
                onChange={(e) =>
                  setAnswers({ ...answers, prescriptionUsage: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.prescriptionUsage === "Yes" && (
                <TextField
                  name="prescriptionUsageInfo"
                  label="Write here"
                  type="text"
                  value={answers.prescriptionUsageInfo}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      prescriptionUsageInfo: e.target.value,
                    })
                  }
                />
              )}
            </FormControl>

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("allergicSubstances")}
            >
              <Typography variant="h4" className="labelOne">
                Are you allergic to any medications or substances (e.g.,
                peanuts, soy)?
              </Typography>
              <RadioGroup
                row
                name="allergicSubstances"
                value={answers.allergicSubstances}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {consultMessage(answers.allergicSubstances, "Yes")}
            </FormControl>

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("agreeToTerms1")}
            >
              <Typography variant="h4" className="labelOne">
                Do you agree with the following statements?
              </Typography>
              <Typography variant="body" className="labelOne">
                <ul>
                  <li style={{ fontSize: "1rem" }}>
                    You understand that vomiting or diarrhea may affect the
                    effectiveness of the pill.
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    You acknowledge the risks and possible side effects of
                    contraception and agree to report any pain in the leg,
                    breathing difficulties, or new migraines to your doctor.
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    You have read and understood the information on the
                    treatments and medications, including side effects,
                    effectiveness, and available alternatives.
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    You have answered all questions truthfully, and the
                    treatment is for your personal use only.
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    You will read and understand the patient information leaflet
                    provided with the medication.
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    You understand that, while not compulsory, it is important
                    to inform your GP about this treatment so they can provide
                    safe healthcare.
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    You understand that prescribing decisions are based on your
                    responses, and inaccurate information may lead to the
                    rejection of your order or harm to your health.
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    You are aware that a soft identity check will be conducted
                    via LexisNexis, which does not affect your credit rating.
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    You have read and agree to our Terms and Conditions, Terms
                    of Use, and Privacy Policy.
                  </li>
                </ul>
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={answers.agreeToTerms1 || false}
                    onChange={(e) => handleChange(e, "")}
                    name="agreeToTerms1"
                  />
                }
                label="I agree"
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
                    checked={answers.agreeToTerms2 || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        agreeToTerms2: e.target.checked,
                      })
                    }
                    name="agreeToTerms2"
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
