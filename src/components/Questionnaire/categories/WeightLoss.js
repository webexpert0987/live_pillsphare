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
import GpSearch from "../GpSeacrch";
const steps = ["1", "2", "3", "4", "5"];

function WeightLossQuestion() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({
    ageRange: "",
    isPregnantOrBreastfeeding: "",
    hasEatingDisorder: "",
    usesBloodSugarMedications: "",
    hadAllergicReaction: "",
    hasFamilyHistoryThyroidCancer: "",
    diagnosedConditions: [],
    isTakingMedications: "",
    isTakingSteroidsOrThyroidMeds: "",
    usedInjectableWeightLossMedLast4Weeks: "",
    previousMedicationProof: "",
    agreedToTerms: "",
    understandsGLP1Effects: "",
    understandsMoodEffects: "",
    understandsNeckLumpRisks: "",
    understandsNoMixingWeightLossMeds: "",
    understandsPancreatitisRisk: "",
    understandsConceptionRisk: "",
    photoIDUpload: "",
    bodyPhoto: "",
    gpResult: null,
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
      const requiredFields = [
        "ageRange",
        "isPregnantOrBreastfeeding",
        "hasEatingDisorder",
        "usesBloodSugarMedications",
        "hadAllergicReaction",
        "hasFamilyHistoryThyroidCancer",
        "isTakingMedications",
        "isTakingSteroidsOrThyroidMeds",
        "usedInjectableWeightLossMedLast4Weeks",
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
    } else if (activeStep === 2) {
      const requiredAgreements = [
        "agreedToTerms",
        "acknowledgeGLP1Effects",
        "acknowledgeMoodEffects",
        "acknowledgeNeckLumpRisk",
        "acknowledgeNoMixingWeightLossMeds",
        "acknowledgePancreatitisRisk",
        "acknowledgeConceptionRisk",
      ];

      for (const field of requiredAgreements) {
        if (!answers[field]) {
          showMessage(
            "Please fill all details before proceeding to the next step.",
            "error"
          );
          return;
        }
      }
    } else if (activeStep === 3) {
      if (!answers.photoID || !answers.bodyPhoto) {
        showMessage("Please upload required documents", "error");
        return;
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
    if (!answers.gpResult) {
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
            <BmiCalculate />
          </>
        );
      //============= Step 02 =============//
      case 1:
        return (
          <>
            {/****** Are you aged between 17-74 years? *****/}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you aged between 17-74 years?
              </Typography>
              <RadioGroup
                row
                name="ageRange"
                value={answers.ageRange}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    ageRange: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/****** Are you pregnant or breastfeeding? *****/}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you pregnant or breastfeeding?
              </Typography>
              <RadioGroup
                row
                name="isPregnantOrBreastfeeding"
                value={answers.isPregnantOrBreastfeeding}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    isPregnantOrBreastfeeding: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/****** Have you ever suffered from an eating disorder? *****/}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Have you ever suffered from an eating disorder?
              </Typography>
              <RadioGroup
                row
                name="hasEatingDisorder"
                value={answers.hasEatingDisorder}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    hasEatingDisorder: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/****** Using injections/medications (excluding Metformin) for Type 2 Diabetes? *****/}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you currently using any injections or medications, aside
                from Metformin, to manage your blood sugar if you have Type 2
                diabetes?
              </Typography>
              <RadioGroup
                row
                name="usesBloodSugarMedications"
                value={answers.usesBloodSugarMedications}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    usesBloodSugarMedications: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/****** Experienced allergic reactions to specific medications? *****/}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Have you experienced an allergic reaction to Wegovy, Mounjaro,
                Semaglutide, Saxenda, or Liraglutide before?
              </Typography>
              <RadioGroup
                row
                name="hadAllergicReaction"
                value={answers.hadAllergicReaction}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    hadAllergicReaction: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/****** Family history of Thyroid Cancer or MEN2 syndrome? *****/}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Have you or any family members ever been diagnosed with
                Medullary Thyroid Cancer, Thyroid Cancer, or Multiple Endocrine
                Neoplasia Type 2 (MEN2) syndrome?
              </Typography>
              <RadioGroup
                row
                name="hasFamilyHistoryThyroidCancer"
                value={answers.hasFamilyHistoryThyroidCancer}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    hasFamilyHistoryThyroidCancer: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/****** Are you taking any medications? (Prescription, over-the-counter, or recreational) *****/}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you taking any medications? (Prescription, over-the-counter,
                or recreational drugs)
              </Typography>
              <RadioGroup
                row
                name="isTakingMedications"
                value={answers.isTakingMedications}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    isTakingMedications: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/****** Are you taking steroids or medication to treat your thyroid? *****/}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you taking steroids or medication to treat your thyroid?
              </Typography>
              <RadioGroup
                row
                name="isTakingSteroidsOrThyroidMeds"
                value={answers.isTakingSteroidsOrThyroidMeds}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    isTakingSteroidsOrThyroidMeds: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/****** Have you taken injectable weight loss medication in the last 4 weeks? *****/}
            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Have you taken injectable weight loss medication in the last 4
                weeks?
              </Typography>
              <RadioGroup
                row
                name="usedInjectableWeightLossMedLast4Weeks"
                value={answers.usedInjectableWeightLossMedLast4Weeks}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    usedInjectableWeightLossMedLast4Weeks: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>

              {/* Conditionally show file upload if "Yes" is selected */}
              {answers.usedInjectableWeightLossMedLast4Weeks === "Yes" && (
                <Box sx={{ marginTop: "10px" }}>
                  <Typography variant="body1">
                    Please upload proof of previous supply (showing name,
                    medication, and supply date).
                  </Typography>
                  <input
                    type="file"
                    name="previousMedicationProof"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        previousMedicationProof: e.target.files[0],
                      })
                    }
                    style={{ marginTop: "10px" }}
                  />
                </Box>
              )}
            </FormControl>
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
                    checked={answers.agreedToTerms || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        agreedToTerms: e.target.checked,
                      })
                    }
                    name="agreedToTerms"
                  />
                }
                label="I agree"
              />
            </FormControl>

            {/****** Do you understand that GLP-1 injectable weight-loss medications *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you understand that GLP-1 injectable weight-loss medications
                (such as Mounjaro and Wegovy) may reduce the effectiveness of
                oral contraceptives, and that you will need to use additional
                non-oral contraception methods (e.g., condoms) while undergoing
                treatment? (Required)
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={answers.acknowledgeGLP1Effects || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        acknowledgeGLP1Effects: e.target.checked,
                      })
                    }
                    name="acknowledgeGLP1Effects"
                  />
                }
                label="I agree"
              />
            </FormControl>

            {/****** Do you understand that both weight loss and injectable weight-loss treatments *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you understand that both weight loss and injectable
                weight-loss treatments have been linked to a lowering of mood?
                If you experience depression, thoughts of self-harm, or other
                mental health issues, you should stop the treatment and speak to
                your doctor immediately.
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={answers.acknowledgeMoodEffects || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        acknowledgeMoodEffects: e.target.checked,
                      })
                    }
                    name="acknowledgeMoodEffects"
                  />
                }
                label="I agree"
              />
            </FormControl>

            {/****** Do you understand that if you develop any lumps in your neck *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you understand that if you develop any lumps in your neck or
                experience a hoarse voice while taking this medication, you
                should stop using it and consult your doctor immediately?
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={answers.acknowledgeNeckLumpRisk || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        acknowledgeNeckLumpRisk: e.target.checked,
                      })
                    }
                    name="acknowledgeNeckLumpRisk"
                  />
                }
                label="I agree"
              />
            </FormControl>

            {/****** Do you understand that injectable weight-loss medications *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you understand that injectable weight-loss medications should
                not be used alongside other weight-loss medications? (Required)
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={answers.acknowledgeNoMixingWeightLossMeds || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        acknowledgeNoMixingWeightLossMeds: e.target.checked,
                      })
                    }
                    name="acknowledgeNoMixingWeightLossMeds"
                  />
                }
                label="I agree"
              />
            </FormControl>

            {/****** Do you understand that this medication may increase the risk of pancreatitis *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you understand that this medication may increase the risk of
                pancreatitis, gallbladder issues, and gallstones, and that you
                should seek medical advice if you experience any abdominal pain
                while using it? (Required)
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={answers.acknowledgePancreatitisRisk || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        acknowledgePancreatitisRisk: e.target.checked,
                      })
                    }
                    name="acknowledgePancreatitisRisk"
                  />
                }
                label="I agree"
              />
            </FormControl>

            {/****** Do you understand that this medication should not be used by men or women *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you understand that this medication should not be used by men
                or women who are trying to conceive or are within two months of
                planning to start trying for a child? (Required)
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={answers.acknowledgeConceptionRisk || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        acknowledgeConceptionRisk: e.target.checked,
                      })
                    }
                    name="acknowledgeConceptionRisk"
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

            {/****** Please upload a fully body photo. Max. file size: 80 MB. *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Box sx={{ marginTop: "10px" }}>
                <Typography variant="body1">
                  Please upload a fully body photo. Max. (file size: 80 MB.)
                </Typography>
                <input
                  type="file"
                  name="weightVerificationPhoto"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      bodyPhoto: e.target.files[0],
                    })
                  }
                  style={{ marginTop: "10px" }}
                />
              </Box>
            </FormControl>
          </>
        );
      case 4:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography
              variant="h3"
              className="stepHeading"
              sx={{
                margin: "30px",
              }}
            >
              Search and select your general practitioner (GP)
            </Typography>

            <GpSearch
              handleSubmit={(data) => {
                setAnswers({
                  ...answers,
                  gpResult: data,
                });
              }}
            />
          </Box>
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

export default WeightLossQuestion;
