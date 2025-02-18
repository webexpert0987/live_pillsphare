import React, { useState } from "react";
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
import "../../../src/globalStyle.css";

import BmiCalculate from "../Questionnaire/Consultation"; // Import the BMI calculation component

const steps = ["1", "2", "3", "4"];

function MultiStepForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({
    agedBetween: "",
    AreYouPregnantBreastfeeding: "",
    eatingDisorder: "",
    injectionsOrMedications: "",
    allergicReaction: "",
    familyMembersDiagnosed: "",
    conditions: "",
    takingAnyMedications: "",
    takingSteroidsMedication: "",
    takenInjectableMedication: "",
    medicationFile: "",
    agreeToTerms: "",
    understandGLP1Effect: "",
    understandMoodEffect: "",
    understandNeckLumpsRisk: "",
    understandNoMixingWeightLossMeds: "",
    understandPancreatitisRisk: "",
    understandConceptionRisk: "",

    photoID: "",
    weightVerificationPhoto: "",
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    console.log("Form submitted with answers: ", answers);
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
            {/****** Are you aged between 17-74 years *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you aged between 17-74 years
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

            {/****** Are you pregnant or breastfeeding? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you pregnant or breastfeeding?
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

            {/****** Have you ever suffered with an eating disorder? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Have you ever suffered with an eating disorder?
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

            {/****** Are you currently using any injections or medications, aside from metformin, to manage your blood sugar if you have type 2 diabetes?" *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you currently using any injections or medications, aside
                from metformin, to manage your blood sugar if you have type 2
                diabetes?"
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

            {/****** Have you experienced an allergic reaction to Wegovy, Mounjaro, Semaglutide, Saxenda or Liraglutide before? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Have you experienced an allergic reaction to Wegovy, Mounjaro,
                Semaglutide, Saxenda or Liraglutide before?
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

            {/****** Have you or any family members ever been diagnosed with Medullary Thyroid Cancer, Thyroid Cancer, or Multiple Endocrine Neoplasia Type 2 (MEN2) syndrome? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Have you or any family members ever been diagnosed with
                Medullary Thyroid Cancer, Thyroid Cancer, or Multiple Endocrine
                Neoplasia Type 2 (MEN2) syndrome?
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

            {/****** Have you ever received a diagnosis or undergone surgery for any of the following conditions? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Have you ever received a diagnosis or undergone surgery for any
                of the following conditions?
              </Typography>

              {[
                "Pancreatitis",
                "Severe gastrointestinal disease (e.g. inflammatory bowel disease, ulcerative colitis, Crohn's disease)",
                "Type 1 Diabetes",
                "Kidney Disease",
                "Liver Disease",
                "Hypoglycaemia",
                "Heart Failure",
                "Gastric surgery (bariatric surgery)",
                "Gallbladder, Bile duct or Pancreas disease",
                "Chronic Malabsorption Syndrome",
                "Cushings Syndrome",
                "Acromegaly or any growth hormone problem",
                "None",
              ].map((condition, index) => (
                <FormControlLabel
                  className="checkbox2Col"
                  key={index}
                  control={
                    <Checkbox
                      checked={answers.conditions.includes(condition)}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        let newConditions = [...answers.conditions];

                        if (checked) {
                          newConditions.push(value);
                        } else {
                          newConditions = newConditions.filter(
                            (item) => item !== value
                          );
                        }

                        setAnswers({ ...answers, conditions: newConditions });
                      }}
                      value={condition}
                    />
                  }
                  label={condition}
                />
              ))}
            </FormControl>

            {/****** Are you taking any medications? (This can be over the counter, from your doctor, or any recreational drugs. *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you taking any medications? This can be over the counter,
                from your doctor, or any recreational drugs.
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

            {/****** Are you taking steroids or medication to treat your thyroid? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you taking steroids or medication to treat your thyroid?
                (Required)
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

            {/****** Have you taken injectable weight loss medication in the last 4 weeks? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Have you taken injectable weight loss medication in the last 4
                weeks? (Required)
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

              {/* Conditionally render file upload input when "Yes" is selected */}
              {answers.takenInjectableMedication === "Yes" && (
                <Box sx={{ marginTop: "10px" }}>
                  <Typography variant="body1">
                    Please upload your previous supply. It must show your name,
                    name and strength of the medication, and date of supply. You
                    can send it later.
                  </Typography>
                  <input
                    type="file"
                    name="medicationFile"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        medicationFile: e.target.files[0],
                      })
                    }
                    style={{ marginTop: "10px" }}
                  />
                </Box>
              )}
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
                    checked={answers.understandGLP1Effect || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        understandGLP1Effect: e.target.checked,
                      })
                    }
                    name="understandGLP1Effect"
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
                    checked={answers.understandMoodEffect || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        understandMoodEffect: e.target.checked,
                      })
                    }
                    name="understandMoodEffect"
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
                    checked={answers.understandNeckLumpsRisk || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        understandNeckLumpsRisk: e.target.checked,
                      })
                    }
                    name="understandNeckLumpsRisk"
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
                    checked={answers.understandNoMixingWeightLossMeds || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        understandNoMixingWeightLossMeds: e.target.checked,
                      })
                    }
                    name="understandNoMixingWeightLossMeds"
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
                    checked={answers.understandPancreatitisRisk || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        understandPancreatitisRisk: e.target.checked,
                      })
                    }
                    name="understandPancreatitisRisk"
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
                    checked={answers.understandConceptionRisk || false}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        understandConceptionRisk: e.target.checked,
                      })
                    }
                    name="understandConceptionRisk"
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
                      weightVerificationPhoto: e.target.files[0],
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

      <Box sx={{ padding: "20px" }}>
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
          >
            Back
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MultiStepForm;
