import { useEffect, useRef, useState } from "react";
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

// import BmiCalculate from "../Consultation"; // Import the BMI calculation component
import { useApp } from "../../../Context/AppContext";
import { useMessage } from "../../../Context/MessageContext";
const steps = ["1", "2"];

function HairLossQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [questionnaireResponses, setQuestionnaireResponses] = useState({
    isAgedBetween17And74: "",
    agreesToTermsAndConditions: "",
    photoIDFile: "",
    hasHairLossInPatchesOrScalpIssues: "",
    isHairLossLocalizedToTempleArea: "",
    hasHealthyScalp: "",
    hasSuddenOrCompleteHairLoss: "",
    isHairLossRelatedToMedicationOrIllness: "",
    hasDiagnosedMedicalConditions: "",
    hasHistoryOfDepressionOrMentalHealth: "",
    isTakingAnyMedication: "",
    isTakingSpecificMedications: "",
    understandsFinasterideRisks: "",
    understandsPSATestImplications: "",
    agreesToTermsAndConfirmsAge: "",
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
          // behavior: "auto",
        });
      }
    },0);
  };
//  console.log('currentscroling ',handleScroll,handleScroll);
  const goToNextStep = () => {
    // const qaData = JSON.parse(
    //   localStorage.getItem("questionnaire_info") || "{}"
    // );
    // const { bmiData } = qaData;
    if (currentStep === 0) {
      const requiredFields = [
        "isAgedBetween17And74",
        "hasHairLossInPatchesOrScalpIssues",
        "isHairLossLocalizedToTempleArea",
        "hasHealthyScalp",
        "hasSuddenOrCompleteHairLoss",
        "isHairLossRelatedToMedicationOrIllness",
        "hasDiagnosedMedicalConditions",
        "hasHistoryOfDepressionOrMentalHealth",
        "isTakingAnyMedication",
        // "isTakingSpecificMedications",
        "understandsFinasterideRisks",
        "understandsPSATestImplications",
        "agreesToTermsAndConfirmsAge",
      ];

      for (const field of requiredFields) {
        if (
          Array.isArray(questionnaireResponses[field])
            ? questionnaireResponses[field].length === 0
            : !questionnaireResponses[field]
        ) {
          showMessage(
            "Please fill all details before proceeding to the next step.",
            "error"
          );
          return;
        }
      }

      const preventProceedConditions = [
        { field: "isAgedBetween17And74", condition: "No" },
        { field: "hasHairLossInPatchesOrScalpIssues", condition: "Yes" },
        { field: "hasHealthyScalp", condition: "No" },
        { field: "hasSuddenOrCompleteHairLoss", condition: "Yes" },
        { field: "isHairLossRelatedToMedicationOrIllness", condition: "Yes" },
        { field: "hasDiagnosedMedicalConditions", condition: "Yes" },
        { field: "isTakingSpecificMedications", condition: "Yes" },
        { field: "understandsFinasterideRisks", condition: "No" },
        { field: "understandsPSATestImplications", condition: "No" },
        { field: "agreesToTermsAndConfirmsAge", condition: "No" },
      ];

      for (const { field, condition } of preventProceedConditions) {
        if (questionnaireResponses[field] === condition) {
          showMessage(
            "Based on your answers, we are unable to provide you with treatment at this time. Please consult your GP.",
            "error"
          );
          return;
        }
      }

      if (questionnaireResponses.isTakingAnyMedication === "Yes") {
        if (!questionnaireResponses.isTakingSpecificMedications) {
          showMessage(
            "Please provide contraception usage details to proceed",
            "error"
          );
          return;
        }
      }
    } else if (currentStep === 1) {
      const requiredAgreements = ["agreesToTermsAndConditions"];

      for (const field of requiredAgreements) {
        if (!questionnaireResponses[field]) {
          showMessage(
            "Please fill all details before proceeding to the next step.",
            "error"
          );
          return;
        }
      }
    }

    setCurrentStep((prevStep) => prevStep + 1);
    handleScroll();
    // setTimeout(() => handleScroll(), 100);
  };
  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    handleScroll();
    // setTimeout(() => handleScroll(), 100);

  };

  const handleChange = (e, condition) => {
    const { name, value } = e.target;
    setCurrentQue(name);
    setQuestionnaireResponses({ ...questionnaireResponses, [name]: value });
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
    if (!questionnaireResponses.agreesToTermsAndConditions) {
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
        answers: questionnaireResponses,
        ...parsedData,
      })
    );
    setSelectedTab(2);
  };

  const displayStepContent = (stepIndex) => {
    switch (stepIndex) {
      //============= Step 01 =============//

      case 0:
        return (
          <>
            {/****** Are you aged between 17-74 years *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("isAgedBetween17And74")}
            >
              <Typography variant="h4" className="labelOne">
                Are you aged between 17-74 years
              </Typography>
              <RadioGroup
                row
                name="isAgedBetween17And74"
                value={questionnaireResponses.isAgedBetween17And74}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.isAgedBetween17And74 === "No" && (
              <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  This treatment is not suitable for women or individuals under
                  18 or over 65. Do not proceed.
                </Typography>
              )}
            </FormControl>
            {/*****•	•	Do you have hair loss in patches, or is your scalp itchy or sore?*****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasHairLossInPatchesOrScalpIssues")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have hair loss in patches, or is your scalp itchy or
                sore?
              </Typography>
              <RadioGroup
                row
                name="hasHairLossInPatchesOrScalpIssues"
                value={questionnaireResponses.hasHairLossInPatchesOrScalpIssues}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasHairLossInPatchesOrScalpIssues ===
                "Yes" && (
                  <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>

                  This treatment may not be suitable for you. We recommend
                  contacting your GP for further advice." [Do not proceed]
                </Typography>
              )}
            </FormControl>
            {/****•	Is your hair loss localized to the temple area?******/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("isHairLossLocalizedToTempleArea")}
            >
              <Typography variant="h4" className="labelOne">
                Is your hair loss localized to the temple area?
              </Typography>
              <RadioGroup
                row
                name="isHairLossLocalizedToTempleArea"
                value={questionnaireResponses.isHairLossLocalizedToTempleArea}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    isHairLossLocalizedToTempleArea: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.isHairLossLocalizedToTempleArea ===
                "No" && (
                  <Typography  sx={{ mt: 1, fontSize: "14px" }}>
                  We can still offer treatment, but the range of available
                  medications may be limited.
                </Typography>
              )}
            </FormControl>
            {/****** •	Do you have a healthy scalp? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasHealthyScalp")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have a healthy scalp?
                 </Typography>
                <Typography sx={{mt:1,fontSize:"15px"}} >
                Your scalp should not have any of the following :   </Typography>
                <ul>
                <li style={{ fontSize: "15px" }}>Inflammation</li>
                <li style={{ fontSize: "15px" }}>Redness</li>
                <li style={{ fontSize: "15px" }}>Medical dressings</li>
                <li style={{ fontSize: "15px" }}>Shaved areas</li>
                </ul>
           
              <RadioGroup
              sx={{pl:2}}
                row
                name="hasHealthyScalp"
                value={questionnaireResponses.hasHealthyScalp}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasHealthyScalp === "No" && (
                                  <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>

                  We are unable to supply treatment. Please consult your GP.
                  Do not proceed.
                </Typography>
              )}
            </FormControl>
            {/****** Are you experiencing sudden or complete hair loss? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasSuddenOrCompleteHairLoss")}
            >
              <Typography variant="h4" className="labelOne">
                Are you experiencing sudden or complete hair loss?
              </Typography>
              <RadioGroup
                row
                name="hasSuddenOrCompleteHairLoss"
                value={questionnaireResponses.hasSuddenOrCompleteHairLoss}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasSuddenOrCompleteHairLoss === "Yes" && (
                                 <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>

                  This treatment is not suitable for this type of hair loss. We
                  recommend speaking to your GP for further advice. Do not
                  proceed.
                </Typography>
              )}
            </FormControl>
            {/****** 	Could your hair loss be related to medication, dietary factors, or an illness? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("isHairLossRelatedToMedicationOrIllness")}
            >
              <Typography variant="h4" className="labelOne">
                Could your hair loss be related to medication, dietary factors,
                or an illness?
              </Typography>
              <RadioGroup
                row
                name="isHairLossRelatedToMedicationOrIllness"
                value={
                  questionnaireResponses.isHairLossRelatedToMedicationOrIllness
                }
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.isHairLossRelatedToMedicationOrIllness ===
                "Yes" && (
                               <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>

                  If your hair loss is caused by lifestyle or health factors,
                  we recommend discussing it with your GP. Do not proceed.
                </Typography>
              )}
            </FormControl>
            {/******•	Have you ever been diagnosed with any of the following conditions?  *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasDiagnosedMedicalConditions")}
            >
              <Typography variant="h4" className="labelOne">
                Have you ever been diagnosed with any of the following
                conditions?
                <ul>
                <li style={{ fontSize: "1rem" }}>
                    Heart disease (including chest pain, angina, heart attack,
                    or any history of cardiovascular events)
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    Acute Porphyria (a rare hereditary disease affecting
                    haemoglobin)
                  </li>
                  <li style={{ fontSize: "1rem" }}>Pheochromocytoma (cancer of the adrenal glands)</li>
                  <li style={{ fontSize: "1rem" }}>
                    Prostate problems (e.g., prostate enlargement, prostatitis,
                    prostate cancer)
                  </li>
                  <li style={{ fontSize: "1rem" }}>Male breast cancer</li>
                  <li style={{ fontSize: "1rem" }}>High blood pressure</li>
                </ul>
              </Typography>
              <RadioGroup
                row
                name="hasDiagnosedMedicalConditions"
                value={questionnaireResponses.hasDiagnosedMedicalConditions}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasDiagnosedMedicalConditions ===
                "Yes" && (
                  <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>

                  This treatment is not suitable for you. Do not proceed.
                </Typography>
              )}
            </FormControl>
            {/******•	Do you have a history of depression or any other mental health conditions?  *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasHistoryOfDepressionOrMentalHealth")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have a history of depression or any other mental health
                conditions?
              </Typography>
              <RadioGroup
                row
                name="hasHistoryOfDepressionOrMentalHealth"
                value={
                  questionnaireResponses.hasHistoryOfDepressionOrMentalHealth
                }
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    hasHistoryOfDepressionOrMentalHealth: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasHistoryOfDepressionOrMentalHealth ===
                "Yes" && (
                  <Typography sx={{ mt: 1, fontSize: "14px" }}>
                  We can still offer treatment, but with a limited product
                  range.
                </Typography>
              )}
            </FormControl>
            {/****** •	Are you currently taking any medication (including prescription, over-the-counter, or recreational drugs)? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("isTakingAnyMedication")}
            >
              <Typography variant="h4" className="labelOne">
                Are you currently taking any medication (including prescription,
                over-the-counter, or recreational drugs)?
              </Typography>
              <RadioGroup
                row
                name="isTakingAnyMedication"
                value={questionnaireResponses.isTakingAnyMedication}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    isTakingAnyMedication: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.isTakingAnyMedication === "Yes" && (
                <Box>
                    <Typography sx={{fontSize:"1rem"}}>
                      Are you taking any of the following medications?
                    </Typography>
                    <ul>
                    <li style={{ fontSize: "15px" }}>Dithranol (used to treat psoriasis)</li>
                    <li style={{ fontSize: "15px" }}>
                        Tretinoin (used to treat acne or other skin disorders)
                      </li>
                      <li style={{ fontSize: "15px" }}>
                        Corticosteroids (e.g., hydrocortisone, betamethasone
                        dipropionate)
                      </li>
                      <li style={{ fontSize: "15px" }}>
                        Petrolatum (a common ingredient in hair wax and gel)
                      </li>
                    </ul>

                    <RadioGroup
                    sx={{pl:3}}
                      row
                      name="isTakingSpecificMedications"
                      value={questionnaireResponses.isTakingSpecificMedications}
                      onChange={(e) =>
                        setQuestionnaireResponses({
                          ...questionnaireResponses,
                          isTakingSpecificMedications: e.target.value,
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
                    {questionnaireResponses.isTakingSpecificMedications ===
                      "Yes" && (
                        <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                        We are unable to supply you with treatment. Please
                        consult your GP. Do not proceed.
                      </Typography>
                    )}
                    </Box>
              )}
            </FormControl>
            {/****** •	Do you understand that if prescribed finasteride, and your partner is (or may be) pregnant, they should avoid handling crushed or broken tablets, and that you should always wear a condom during sex?*****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("understandsFinasterideRisks")}
            >
              <Typography variant="h4" className="labelOne">
                Do you understand that if prescribed finasteride, and your
                partner is (or may be) pregnant, they should avoid handling
                crushed or broken tablets, and that you should always wear a
                condom during sex?
              </Typography>
              <RadioGroup
                row
                name="understandsFinasterideRisks"
                value={questionnaireResponses.understandsFinasterideRisks}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.understandsFinasterideRisks === "No" && (
                                       <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>

                  We are unable to supply you with medication unless you
                  understand and agree to this condition. Do not proceed.
             </Typography>
              )}
            </FormControl>
            {/******	Do you understand that if prescribed finasteride, you should inform your GP before undergoing a PSA blood test for your prostate?  *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("understandsPSATestImplications")}
            >
              <Typography variant="h4" className="labelOne">
                Do you understand that if prescribed finasteride, you should
                inform your GP before undergoing a PSA blood test for your
                prostate?
              </Typography>
              <RadioGroup
                row
                name="understandsPSATestImplications"
                value={questionnaireResponses.understandsPSATestImplications}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.understandsPSATestImplications ===
                "No" && (
                  <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  We are unable to supply you with medication unless you
                  understand and agree to this condition. Do not proceed.
                </Typography>
              )}
            </FormControl>
            {/****** •	I agree to the terms and conditions, and I confirm that I am over 18 years of age. *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("agreesToTermsAndConfirmsAge")}
            >
              <Typography variant="h4" className="labelOne">
                I agree to the terms and conditions, and I confirm that I am
                over 18 years of age.
              </Typography>
              <RadioGroup
                row
                name="agreesToTermsAndConfirmsAge"
                value={questionnaireResponses.agreesToTermsAndConfirmsAge}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.agreesToTermsAndConfirmsAge === "No" && (
                                        <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>

                  We are unable to supply you with medication unless you
                  understand and agree to this condition. Do not proceed.
                </Typography>
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
                    checked={
                      questionnaireResponses.agreesToTermsAndConditions || false
                    }
                    onChange={(e) =>
                      setQuestionnaireResponses({
                        ...questionnaireResponses,
                        agreesToTermsAndConditions: e.target.checked,
                      })
                    }
                    name="agreesToTermsAndConditions"
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
                  name="photoIDFile"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) =>
                    setQuestionnaireResponses({
                      ...questionnaireResponses,
                      photoIDFile: e.target.files[0],
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
        setQuestionnaireResponses(answers);
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
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{/** {label}*/}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ padding: "20px" }} ref={boxRef}>
        {displayStepContent(currentStep)}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            onClick={goToPreviousStep}
            disabled={currentStep === 0}
            sx={{
              fontSize: { xs: "13px", sm: "15px", md: "16px" },
            }}
          >
            Back
          </Button>
          <Box>
            {currentStep === steps.length - 1 ? (
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
                onClick={goToNextStep}
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

export default HairLossQuestionnaire;
