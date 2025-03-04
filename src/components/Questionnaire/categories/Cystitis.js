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
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "../../../../src/globalStyle.css";

import BmiCalculate from "../Consultation"; // Import the BMI calculation component
import { useApp } from "../../../Context/AppContext";
import { useMessage } from "../../../Context/MessageContext";
import GpSearch from "../GpSeacrch";
const steps = ["1", "2", "3"];

function CystitisQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [questionnaireResponses, setQuestionnaireResponses] = useState({
    gender: "",
    requiresAssistance: "",
    canMakeHealthcareDecisions: "",
    hasDiagnosedMedicalConditions: "",
    diagnosisDetails: "",
    prescripDetails: "",
    isTakingMedications: "",
    hasAllergies: "",
    allergyDetails: "",
    hasAdditionalInformation: "",
    additionalDetails: "",
    isOver65: "",
    hasPreviousUTIDiagnosis: "",
    uti1: "",
    uti2: "",
    uti3: "",
    uti4: "",
    hasBloodInUrine: "",
    hasLowerBackPain: "",
    painDetails: "",
    hasNauseaOrVomiting: "",
    hasFever: "",
    hasUnusualFatigue: "",
    hasHeartKidneyOrLiverIssues: "",
    infoIssue: "",
    hasBloodDisorders: "",
    infobloodDis: "",
    hasFolicAcidDeficiency: "",
    folicDefMore: "",
    hasPorphyria: "",
    porphyriaDetails: "",
    agreesToSeekAdviceForSymptoms: "",
    agreesNotToTakeUTIMedicationIfPregnant: "",
    numberOfUTIsInLast6Months: "",
    hasAgreedToTerms: "",
    photoIDFile: "",
    gpResult: null,
  });
  const boxRef = useRef(null);
  const { setSelectedTab } = useApp();
  const { showMessage } = useMessage();
  const [gpResult, setGpResult] = useState(null);
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

  const goToNextStep = () => {
    const qaData = JSON.parse(
      localStorage.getItem("questionnaire_info") || "{}"
    );
    const { bmiData } = qaData;

    // Validation logic
    if (currentStep === 0) {
      const requiredFields = [
        "gender",
        // "requiresAssistance",
        "canMakeHealthcareDecisions",
        "hasDiagnosedMedicalConditions",
        "isTakingMedications",
        "hasAllergies",
        "hasAdditionalInformation",
        "isOver65",
        "hasPreviousUTIDiagnosis",
        "hasBloodInUrine",
        "hasLowerBackPain",
        "hasNauseaOrVomiting",
        "hasFever",
        "hasUnusualFatigue",
        "hasHeartKidneyOrLiverIssues",
        "hasBloodDisorders",
        "hasFolicAcidDeficiency",
        "hasPorphyria",
        "agreesToSeekAdviceForSymptoms",
        "agreesNotToTakeUTIMedicationIfPregnant",
        "numberOfUTIsInLast6Months",
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
        { field: "canMakeHealthcareDecisions", condition: "No" },
        { field: "isOver65", condition: "Yes" },
        { field: "agreesToSeekAdviceForSymptoms", condition: "No" },
        { field: "agreesNotToTakeUTIMedicationIfPregnant", condition: "No" },
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
  
      const preventinputCondition = [
        { field: "hasDiagnosedMedicalConditions", condition: "Yes",subField:"diagnosisDetails" },
        { field: "isTakingMedications", condition: "Yes" ,subField:"prescripDetails"},
        { field: "hasAllergies", condition: "Yes",subField:"allergyDetails"},
        { field: "hasAdditionalInformation", condition: "Yes",subField:"additionalDetails"},
        { field: "hasLowerBackPain", condition: "Yes",subField:"painDetails"},
        { field: "hasHeartKidneyOrLiverIssues", condition: "Yes",subField:"infoIssue"},
        { field: "hasBloodDisorders", condition: "Yes",subField:"infobloodDis"},
        { field: "hasFolicAcidDeficiency", condition: "Yes",subField:"folicDefMore"},
        { field: "hasPorphyria", condition: "Yes",subField:"porphyriaDetails"},
      ];

      for (const item of preventinputCondition) {
       const { field, condition,subField } = item

        if (questionnaireResponses[field] === condition && !questionnaireResponses[subField]) {

          showMessage(
            "Please provide all the details first to proceed to further",
            "error"
          );
          return;
        }
      }

    } else if (currentStep === 1) {
      const requiredAgreements = ["hasAgreedToTerms"];

      for (const field of requiredAgreements) {
        if (!questionnaireResponses[field]) {
          showMessage(
            "Please fill all details before proceeding to the next step.",
            "error"
          );
          return;
        }
      }
    } else if (currentStep === 2) {
      if (!questionnaireResponses.hasAgreedToTerms) {
        showMessage(
          "Please fill all details before proceeding to the next step.",
          "error"
        );
        return;
      }
    }

    setCurrentStep((prevStep) => prevStep + 1);
    handleScroll();
  };

  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    handleScroll();
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

  const submitQuestionnaire = () => {
    if (!questionnaireResponses.gpResult) {
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
            {/****** 1st What is your gender? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("gender")}
            >
              <Typography variant="h4" className="labelOne">
                What is your gender? (Male N/A)
              </Typography>
              <RadioGroup
                row
                name="gender"
                value={questionnaireResponses.gender}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    gender: e.target.value,
                  })
                }
              >
                {/* <FormControlLabel value="Male" control={<Radio />} label="Male" /> */}
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>

            {/****** Do you need assistance with this questionnaire? *****/}

            {/* <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you need assistance with this questionnaire?
              </Typography>
              <RadioGroup
                row
                name="requiresAssistance"
                value={questionnaireResponses.requiresAssistance}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    requiresAssistance: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.requiresAssistance === "Yes" && (
                <div>
                  <Typography variant="h4">Call us : 1234567890</Typography>
                  <Typography variant="h4">
                    Mail us : help@medicusexpress.com
                  </Typography>
                </div>
              )}
            </FormControl> */}

            {/****** Are you able to make decisions about your healthcare? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("canMakeHealthcareDecisions")}
            >
              <Typography variant="h4" className="labelOne">
                Are you able to make decisions about your healthcare?
              </Typography>
              <RadioGroup
                row
                name="canMakeHealthcareDecisions"
                value={questionnaireResponses.canMakeHealthcareDecisions}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.canMakeHealthcareDecisions === "No" && (
                <div>
                  <Typography variant="h4">
                    Sorry we can’t offer you this treatment, please contact your
                    GP or on 111 and not proceed .
                  </Typography>
                </div>
              )}
            </FormControl>

            {/****** Do you have any diagnosed medical conditions? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasDiagnosedMedicalConditions")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have any diagnosed medical conditions?
              </Typography>
              <RadioGroup
                row
                name="hasDiagnosedMedicalConditions"
                value={questionnaireResponses.hasDiagnosedMedicalConditions}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    hasDiagnosedMedicalConditions: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasDiagnosedMedicalConditions ===
                "Yes" && (
                <TextField
                  multiline
                  line={3}
                  value={questionnaireResponses.diagnosisDetails}
                  onChange={(e) =>
                    setQuestionnaireResponses({
                      ...questionnaireResponses,
                      diagnosisDetails: e.target.value,
                    })
                  }
                  fullWidth
                  placeholder="Please write here"
                />
              )}
            </FormControl>

            {/******.** Are you currently taking any medications, including prescription, over-the-counter, or homeopathic options? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("isTakingMedications")}
            >
              <Typography variant="h4" className="labelOne">
                Are you currently taking any medications, including
                prescription, over-the-counter, or homeopathic options?
              </Typography>
              <RadioGroup
                row
                name="isTakingMedications"
                value={questionnaireResponses.isTakingMedications}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    isTakingMedications: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.isTakingMedications === "Yes" && (
                <TextField
                  multiline
                  line={3}
                  value={questionnaireResponses.prescripDetails}
                  onChange={(e) =>
                    setQuestionnaireResponses({
                      ...questionnaireResponses,
                      prescripDetails: e.target.value,
                    })
                  }
                  fullWidth
                  placeholder="Provide details about your prescriptions"
                />
              )}
            </FormControl>

            {/****** Do you have any known allergies? *****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasAllergies")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have any known allergies?
              </Typography>
              <RadioGroup
                row
                name="hasAllergies"
                value={questionnaireResponses.hasAllergies}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    hasAllergies: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasAllergies === "Yes" && (
                <TextField
                  multiline
                  line={3}
                  value={questionnaireResponses.allergyDetails}
                  onChange={(e) =>
                    setQuestionnaireResponses({
                      ...questionnaireResponses,
                      allergyDetails: e.target.value,
                    })
                  }
                  fullWidth
                  placeholder="Provide details about your allergies"
                />
              )}
            </FormControl>

            {/****** Is there any additional information that would help us provide appropriate care?*****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasAdditionalInformation")}
            >
              <Typography variant="h4" className="labelOne">
                Is there any additional information that would help us provide
                appropriate care?
              </Typography>
              <RadioGroup
                row
                name="hasAdditionalInformation"
                value={questionnaireResponses.hasAdditionalInformation}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    hasAdditionalInformation: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasAdditionalInformation === "Yes" && (
                <TextField
                  multiline
                  line={3}
                  value={questionnaireResponses.additionalDetails}
                  onChange={(e) =>
                    setQuestionnaireResponses({
                      ...questionnaireResponses,
                      additionalDetails: e.target.value,
                    })
                  }
                  fullWidth
                  placeholder="Provide additional details about you"
                />
              )}
            </FormControl>

            {/****** Are you over 65?*****/}

            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("isOver65")}
            >
              <Typography variant="h4" className="labelOne">
                Are you over 65?
              </Typography>
              <RadioGroup
                row
                name="isOver65"
                value={questionnaireResponses.isOver65}
                onChange={(e) => handleChange(e, "Yes")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.isOver65 === "Yes" && (
                <div>
                  <Typography variant="h4">
                    Note that over the age 65 are more likely to require longer
                    duration and closer monitoring. Therefore please see your GP
                    if unable call 111.
                  </Typography>
                </div>
              )}
            </FormControl>
            {/* ---- Have you previously been diagnosed with cystitis (UTI)?--- */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasPreviousUTIDiagnosis")}
            >
              <Typography variant="h4" className="labelOne">
                Have you previously been diagnosed with cystitis (UTI)?
              </Typography>
              <RadioGroup
                row
                name="hasPreviousUTIDiagnosis"
                value={questionnaireResponses.hasPreviousUTIDiagnosis}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    hasPreviousUTIDiagnosis: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasPreviousUTIDiagnosis === "Yes" && (
                <div>
                  {" "}
                  <Typography variant="h4">
                    1. Are you passing urine more frequently than usually do?
                  </Typography>
                  <RadioGroup
                    row
                    name="uti1"
                    value={questionnaireResponses.uti1}
                    onChange={(e) =>
                      setQuestionnaireResponses({
                        ...questionnaireResponses,
                        uti1: e.target.value,
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
                  <Typography variant="h4">
                    2. Have you got strong desire to urinate and empty bladder
                  </Typography>
                  <RadioGroup
                    row
                    name="uti2"
                    value={questionnaireResponses.uti2}
                    onChange={(e) =>
                      setQuestionnaireResponses({
                        ...questionnaireResponses,
                        uti2: e.target.value,
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
                  <Typography variant="h4">
                    3. Is your urine cloudy or smell strong
                  </Typography>
                  <RadioGroup
                    row
                    name="uti3"
                    value={questionnaireResponses.uti3}
                    onChange={(e) =>
                      setQuestionnaireResponses({
                        ...questionnaireResponses,
                        uti3: e.target.value,
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
                  <Typography variant="h4">
                    4. Are you experiencing lower abdominal pain and or
                    discomfort?
                  </Typography>
                  <RadioGroup
                    row
                    name="uti4"
                    value={questionnaireResponses.uti4}
                    onChange={(e) =>
                      setQuestionnaireResponses({
                        ...questionnaireResponses,
                        uti4: e.target.value,
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

            {/* ---- Is there any blood in your urine?--- */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasBloodInUrine")}
            >
              <Typography variant="h4" className="labelOne">
                Is there any blood in your urine?
              </Typography>
              <RadioGroup
                row
                name="hasBloodInUrine"
                value={questionnaireResponses.hasBloodInUrine}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    hasBloodInUrine: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/* .** Are you currently experiencing lower back pain? */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasLowerBackPain")}
            >
              <Typography variant="h4" className="labelOne">
                Are you currently experiencing lower back pain?
              </Typography>
              <RadioGroup
                row
                name="hasLowerBackPain"
                value={questionnaireResponses.hasLowerBackPain}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    hasLowerBackPain: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasLowerBackPain === "Yes" && (
                <TextField
                  multiline
                  line={3}
                  value={questionnaireResponses.painDetails}
                  onChange={(e) =>
                    setQuestionnaireResponses({
                      ...questionnaireResponses,
                      painDetails: e.target.value,
                    })
                  }
                  fullWidth
                  placeholder="Tell us exactly at what location you're having the pain"
                />
              )}
            </FormControl>
            {/* Are you feeling nauseous or vomiting? */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasNauseaOrVomiting")}
            >
              <Typography variant="h4" className="labelOne">
                Are you feeling nauseous or vomiting?
              </Typography>
              <RadioGroup
                row
                name="hasNauseaOrVomiting"
                value={questionnaireResponses.hasNauseaOrVomiting}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    hasNauseaOrVomiting: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {/* .** Do you have a fever (above 38°C)? */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasFever")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have a fever (above 38°C)?
              </Typography>
              <RadioGroup
                row
                name="hasFever"
                value={questionnaireResponses.hasFever}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    hasFever: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {/* .Are you feeling unusually tired or sleepy? */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasUnusualFatigue")}
            >
              <Typography variant="h4" className="labelOne">
                Are you feeling unusually tired or sleepy?
              </Typography>
              <RadioGroup
                row
                name="hasUnusualFatigue"
                value={questionnaireResponses.hasUnusualFatigue}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    hasUnusualFatigue: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {/* .** Do you have any heart, kidney, or liver issues? */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasHeartKidneyOrLiverIssues")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have any heart, kidney, or liver issues?
              </Typography>
              <RadioGroup
                row
                name="hasHeartKidneyOrLiverIssues"
                value={questionnaireResponses.hasHeartKidneyOrLiverIssues}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    hasHeartKidneyOrLiverIssues: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasHeartKidneyOrLiverIssues === "Yes" && (
                <TextField
                  multiline
                  line={3}
                  value={questionnaireResponses.infoIssue}
                  onChange={(e) =>
                    setQuestionnaireResponses({
                      ...questionnaireResponses,
                      infoIssue: e.target.value,
                    })
                  }
                  fullWidth
                  placeholder="Tell us more about your issue type and locatin"
                />
              )}
            </FormControl>
            {/* .** Do you have any blood disorders? */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasBloodDisorders")}
            >
              <Typography variant="h4" className="labelOne">
                Do you have any blood disorders?
              </Typography>
              <RadioGroup
                row
                name="hasBloodDisorders"
                value={questionnaireResponses.hasBloodDisorders}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    hasBloodDisorders: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasBloodDisorders === "Yes" && (
                <TextField
                  multiline
                  lline={3}
                  value={questionnaireResponses.infobloodDis}
                  onChange={(e) =>
                    setQuestionnaireResponses({
                      ...questionnaireResponses,
                      infobloodDis: e.target.value,
                    })
                  }
                  fullWidth
                  placeholder="Tell us more about your blood disorder"
                />
              )}
            </FormControl>
            {/* Are you folic acid deficient? */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasFolicAcidDeficiency")}
            >
              <Typography variant="h4" className="labelOne">
                Are you folic acid deficient?
              </Typography>
              <RadioGroup
                row
                name="hasFolicAcidDeficiency"
                value={questionnaireResponses.hasFolicAcidDeficiency}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    hasFolicAcidDeficiency: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasFolicAcidDeficiency === "Yes" && (
                <TextField
                  multiline
                  lline={3}
                  value={questionnaireResponses.folicDefMore}
                  onChange={(e) =>
                    setQuestionnaireResponses({
                      ...questionnaireResponses,
                      folicDefMore: e.target.value,
                    })
                  }
                  fullWidth
                  placeholder="Tell us more about acid deficient"
                />
              )}
            </FormControl>
            {/*  Have you been diagnosed with porphyria ( a condition which is couased by photosensitivity of the skin, muscle weakness and pain? */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("hasPorphyria")}
            >
              <Typography variant="h4" className="labelOne">
                Have you been diagnosed with porphyria ( a condition which is
                couased by photosensitivity of the skin, muscle weakness and
                pain)?
              </Typography>
              <RadioGroup
                row
                name="hasPorphyria"
                value={questionnaireResponses.hasPorphyria}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    hasPorphyria: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasPorphyria === "Yes" && (
                <TextField
                  multiline
                  lline={3}
                  value={questionnaireResponses.porphyriaDetails}
                  onChange={(e) =>
                    setQuestionnaireResponses({
                      ...questionnaireResponses,
                      porphyriaDetails: e.target.value,
                    })
                  }
                  fullWidth
                  placeholder="Please provide more informations"
                />
              )}
            </FormControl>
            {/* Do you agree to seek urgent medical advice if back pain or flu-like symptoms arise?*/}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("agreesToSeekAdviceForSymptoms")}
            >
              <Typography variant="h4" className="labelOne">
                Do you agree to seek urgent medical advice if back pain or
                flu-like symptoms arise?
              </Typography>
              <RadioGroup
                row
                name="agreesToSeekAdviceForSymptoms"
                value={questionnaireResponses.agreesToSeekAdviceForSymptoms}
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.agreesToSeekAdviceForSymptoms ===
                "No" && (
                <div>
                  we are unable to provide you with treatment at this time.
                  Please consult your GP.
                </div>
              )}
            </FormControl>
            {/* Do you agree not to take UTI medication if pregnant or breastfeeding? */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("agreesNotToTakeUTIMedicationIfPregnant")}
            >
              <Typography variant="h4" className="labelOne">
                Do you agree not to take UTI medication if pregnant or
                breastfeeding?
              </Typography>
              <RadioGroup
                row
                name="agreesNotToTakeUTIMedicationIfPregnant"
                value={
                  questionnaireResponses.agreesNotToTakeUTIMedicationIfPregnant
                }
                onChange={(e) => handleChange(e, "No")}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.agreesNotToTakeUTIMedicationIfPregnant ===
                "No" && (
                <div>
                  we are unable to provide you with treatment at this time.
                  Please consult your GP.
                </div>
              )}
            </FormControl>
            {/* How many UTIs have you had in the last 6 months? */}
            <FormControl
              component="fieldset"
              className="QuestionBox"
              disabled={checkDisabled("numberOfUTIsInLast6Months")}
            >
              <Typography variant="h4" className="labelOne">
                How many UTI have you had in last 6 months?
              </Typography>
              <Select
                width="500"
                //  labelId=""
                //  id=""
                name="numberOfUTIsInLast6Months"
                value={questionnaireResponses.numberOfUTIsInLast6Months}
                label="Select"
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    numberOfUTIsInLast6Months: e.target.value,
                  })
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Less than 3 months">
                  Less than 3 months
                </MenuItem>
                <MenuItem value="More than 6 months">
                  More than 6 months
                </MenuItem>
              </Select>
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
                    checked={questionnaireResponses.hasAgreedToTerms || false}
                    onChange={(e) =>
                      setQuestionnaireResponses({
                        ...questionnaireResponses,
                        hasAgreedToTerms: e.target.checked,
                      })
                    }
                    name="hasAgreedToTerms"
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
                setQuestionnaireResponses({
                  ...questionnaireResponses,
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
                onClick={submitQuestionnaire}
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

export default CystitisQuestionnaire;
