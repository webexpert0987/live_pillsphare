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

import BmiCalculate from "../Consultation"; // Import the BMI calculation component
import { useApp } from "../../../Context/AppContext";
import { useMessage } from "../../../Context/MessageContext";
const steps = ["1", "2"];

// Rename the main function
function ErectileDysfunctionQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [questionnaireResponses, setQuestionnaireResponses] = useState({
    isAgedBetween18And75: "",
    agreesToTerms: "",
    photoIDFile: "",
    isSmoker: "",
    consumesAlcohol: "",
    hasTakenEDMedicationsBefore: "",
    hasErectionDifficulties: "",
    hasHighBloodPressure: "",
    hasLowBloodPressure: "",
    hasDifficultyWalking: "",
    advisedAgainstStrenuousExercise: "",
    hasUntreatedDepression: "",
    hasAllergiesOrAdverseReactions: "",
    hasPreviousHealthConditions: "",
    takesNitratesOrNitricOxideDonors: "",
    takesOtherMedications: "",
    takesOtherMedicationsCheckbox: "",
    understandsUnderlyingConditions: "",
    agreesToSeekHelpForProlongedErection: "",
    agreesToConditions: "",
    confirmsAgeAndAgreesToTerms: "",
    conditions: [],
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
  
  const isValidSelection =
    ( (questionnaireResponses.takesOtherMedications=="Yes" && questionnaireResponses.conditions.length == 0));
   
  const handleNext = () => {
    const qaData = JSON.parse(
      localStorage.getItem("questionnaire_info") || "{}"
    );
    const { bmiData } = qaData;
    // Validation logic
    if (currentStep === 0) {
      const requiredFields = [
        "isAgedBetween18And75",
        "isSmoker",
        "consumesAlcohol",
        "hasTakenEDMedicationsBefore",
        "hasErectionDifficulties",
        "hasHighBloodPressure",
        "hasLowBloodPressure",
        "hasDifficultyWalking",
        "advisedAgainstStrenuousExercise",
        "hasUntreatedDepression",
        "hasAllergiesOrAdverseReactions",
        "hasPreviousHealthConditions",
        "takesNitratesOrNitricOxideDonors",
        "takesOtherMedications",
        // "takesOtherMedicationsCheckbox",
        "understandsUnderlyingConditions",
        "agreesToSeekHelpForProlongedErection",
        "agreesToConditions",
        "confirmsAgeAndAgreesToTerms",
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
        { field: "isAgedBetween18And75", condition: "No" },
        { field: "hasErectionDifficulties", condition: "No" },
        { field: "hasHighBloodPressure", condition: "Yes" },
        { field: "hasLowBloodPressure", condition: "Yes" },
        { field: "hasDifficultyWalking", condition: "Yes" },
        { field: "advisedAgainstStrenuousExercise", condition: "Yes" },
        { field: "hasUntreatedDepression", condition: "Yes" },
        { field: "hasAllergiesOrAdverseReactions", condition: "Yes" },
        { field: "hasPreviousHealthConditions", condition: "Yes" },
        { field: "takesNitratesOrNitricOxideDonors", condition: "Yes" },
        { field: "understandsUnderlyingConditions", condition: "No" },
        { field: "agreesToSeekHelpForProlongedErection", condition: "No" },
        { field: "agreesToSeekHelpForProlongedErection", condition: "No" },
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
      if (isValidSelection) {
        console.log('isvalidsection ',isValidSelection);
        console.log('responses ',questionnaireResponses);
        showMessage(
          "Please provide complete details and fill all the necessary section",
          "error"
        );
        return;
      }

    } else if (currentStep === 1) {
      const requiredAgreements = ["agreesToTerms"];

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
  };
  const handleBack = () => {
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

  const handleSubmit = () => {
    if (!questionnaireResponses.agreesToTerms) {
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

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      //============= Step 01 =============//
      case 0:
        return (
          <>
            {/****** Are you aged between 18-75 years *****/}

            <FormControl component="fieldset" className="QuestionBox" disabled={checkDisabled("isAgedBetween18And75")}>
              <Typography variant="h4" className="labelOne">
                Are you aged between 18-75 years ?
              </Typography>
              <RadioGroup
                row
                name="isAgedBetween18And75"
                value={questionnaireResponses.isAgedBetween18And75}
                onChange={(e) =>
                 handleChange(e,"No")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.isAgedBetween18And75 === "No" && (
                 <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
    
                  We are unable to provide you with treatment at this time.
                  Please consult your GP.
                
                </Typography>
              )}
            </FormControl>

            {/****** 2.	Do you smoke? *****/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("isSmoker")}>
              <Typography variant="h4" className="labelOne">
                Do you smoke?
              </Typography>
              <RadioGroup
                row
                name="isSmoker"
                value={questionnaireResponses.isSmoker}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    isSmoker: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/****** 3.	Do you consume alcohol?*****/}

            <FormControl component="fieldset" className="QuestionBox" disabled={checkDisabled("consumesAlcohol")}>
              <Typography variant="h4" className="labelOne">
                Do you consume alcohol?
              </Typography>
              <RadioGroup
                row
                name="consumesAlcohol"
                value={questionnaireResponses.consumesAlcohol}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    consumesAlcohol: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.consumesAlcohol === "Yes" && (
                <div>
                  <Typography sx={{ mt: 1, fontSize: "0.9rem" }}>
                    You are eligible for treatment, however, please be aware
                    that alcohol consumption and smoking may worsen erectile
                    difficulties. We recommend consulting your GP for advice on
                    quitting smoking.
                  </Typography>
                </div>
              )}
            </FormControl>

            {/****** 4.	Have you taken any of the following medications for erectile dysfunction (at least 4 times previously) without experiencing any adverse effects? *****/}

            <FormControl component="fieldset" className="QuestionBox" disabled={checkDisabled("hasTakenEDMedicationsBefore")}>
              <Typography variant="h4" className="labelOne">
                Have you taken any of the following medications for erectile
                dysfunction (at least 4 times previously) without experiencing
                any adverse effects?
                <ul>
                   <li style={{ fontSize: "1rem" }}>Levitra (vardenafil)</li>
                   <li style={{ fontSize: "1rem" }}>Spedra</li>
                   <li style={{ fontSize: "1rem" }}>Viagra (sildenafil)</li>
                 <li style={{ fontSize: "1rem" }}>Nipatra</li>
                   <li style={{ fontSize: "1rem" }}>Cialis (tadalafil)</li>
                </ul>
              </Typography>
              <RadioGroup
                row
                name="hasTakenEDMedicationsBefore"
                value={questionnaireResponses.hasTakenEDMedicationsBefore}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    hasTakenEDMedicationsBefore: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/****** 5.	Do you have difficulty achieving or maintaining an erection?*****/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("hasErectionDifficulties")}>
              <Typography variant="h4" className="labelOne">
                Do you have difficulty achieving or maintaining an erection?
              </Typography>
              <RadioGroup
                row
                name="hasErectionDifficulties"
                value={questionnaireResponses.hasErectionDifficulties}
                onChange={(e) =>
                 handleChange(e,"No")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasErectionDifficulties === "No" && (
               <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                    It does not appear that you have erectile dysfunction. We
                    are unable to provide you with treatment. Please consult
                    your GP for further information.
                  </Typography>
   
              )}
            </FormControl>

            {/****** 6.	Do you have high blood pressure (above 160/90) or are you currently receiving treatment for high blood pressure? *****/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("hasHighBloodPressure")}>
              <Typography variant="h4" className="labelOne">
                Do you have high blood pressure (above 160/90) or are you
                currently receiving treatment for high blood pressure?
                <br></br>
                <Typography sx={{ mt: 1, fontSize: "0.9rem" }}>If unsure, you can have your blood pressure measured
                at your local pharmacy or GP surgery. </Typography>
              </Typography>
              <RadioGroup
                row
                name="hasHighBloodPressure"
                value={questionnaireResponses.hasHighBloodPressure}
                onChange={(e) =>
               handleChange(e,"Yes")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasHighBloodPressure === "Yes" && (
                 <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                    We are unable to provide you with treatment if you have
                    high blood pressure. Please consult your GP for further
                    information.
                  </Typography>
              )}
            </FormControl>

            {/******7.	Do you have low blood pressure (below 90/50)? *****/}

            <FormControl component="fieldset" className="QuestionBox" disabled={checkDisabled("hasLowBloodPressure")}>
              <Typography variant="h4" className="labelOne">
                Do you have low blood pressure (below 90/50)?
                <br></br> <Typography sx={{ mt: 1, fontSize: "0.9rem" }}>If unsure, you can have your blood pressure measured
                  at your local pharmacy or GP surgery. </Typography>
              </Typography>
              <RadioGroup
                row
                name="hasLowBloodPressure"
                value={questionnaireResponses.hasLowBloodPressure}
                onChange={(e) =>
                handleChange(e,"Yes")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasLowBloodPressure === "Yes" && (
                <div>
                  <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                    We are unable to provide you with treatment if you have low
                    blood pressure. Please consult your GP for further
                    information.
                  </Typography>
                </div>
              )}
            </FormControl>

            {/****** 8.	Do you have difficulty walking briskly for 5 minutes? *****/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("hasDifficultyWalking")}>
              <Typography variant="h4" className="labelOne">
                Do you have difficulty walking briskly for 5 minutes?
              </Typography>
              <RadioGroup
                row
                name="hasDifficultyWalking"
                value={questionnaireResponses.hasDifficultyWalking}
                onChange={(e) =>
               handleChange(e,"Yes")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasDifficultyWalking === "Yes" && (
                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  We are unable to provide you with treatment at this time.
                  Please consult your GP.
                  </Typography>
              )}
            </FormControl>

            {/****** 9.	Have you been advised by a doctor to avoid strenuous exercise? *****/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("advisedAgainstStrenuousExercise")}>
              <Typography variant="h4" className="labelOne">
                Have you been advised by a doctor to avoid strenuous exercise?
              </Typography>
              <RadioGroup
                row
                name="advisedAgainstStrenuousExercise"
                value={questionnaireResponses.advisedAgainstStrenuousExercise}
                onChange={(e) =>
               handleChange(e,"Yes")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.advisedAgainstStrenuousExercise ===
                "Yes" && (
                  <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  We are unable to provide you with treatment at this time.
                  Please consult your GP.
              </Typography>
              )}
            </FormControl>

            {/******10.	Do you suffer from depression but have not yet consulted a GP? *****/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("hasUntreatedDepression")}>
              <Typography variant="h4" className="labelOne">
                Do you suffer from depression but have not yet consulted a GP?
              </Typography>
              <RadioGroup
                row
                name="hasUntreatedDepression"
                value={questionnaireResponses.hasUntreatedDepression}
                onChange={(e) =>
              handleChange(e,"Yes")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasUntreatedDepression === "Yes" && (
            <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  We are unable to provide you with treatment at this time.
                  Please consult your GP.
                </Typography>
              )}
            </FormControl>

            {/*****11.	Do you have any allergies to Viagra (sildenafil), Levitra (vardenafil), Spedra (avanafil), Cialis (tadalafil), or any other erectile dysfunction medication? Or have you experienced any adverse reactions to these medications in the past?******/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("hasAllergiesOrAdverseReactions")}>
              <Typography variant="h4" className="labelOne">
                Do you have any allergies to Viagra (sildenafil), Levitra
                (vardenafil), Spedra (avanafil), Cialis (tadalafil), or any
                other erectile dysfunction medication? Or have you experienced
                any adverse reactions to these medications in the past?
              </Typography>
              <RadioGroup
                row
                name="hasAllergiesOrAdverseReactions"
                value={questionnaireResponses.hasAllergiesOrAdverseReactions}
                onChange={(e) =>
           handleChange(e,"Yes")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasAllergiesOrAdverseReactions ===
                "Yes" && (
                  <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  We are unable to provide you with treatment at this time.
                  Please consult your GP.
                  </Typography>
              )}
            </FormControl>

            {/*****12.	Have you ever had any of the following health conditions?******/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("hasPreviousHealthConditions")}>
              <Typography variant="h4" className="labelOne">
                Have you ever had any of the following health conditions?
                <ul>
                     <li style={{ fontSize: "1rem" }}>Kidney problems</li>
                     <li style={{ fontSize: "1rem" }}>
                    Heart problems (e.g., angina, chest pain, heart failure,
                    irregular heartbeat, heart attack, myocardial infarction,
                    cardiomyopathy, valvular heart disease)
                  </li>
                     <li style={{ fontSize: "1rem" }}>Inherited eye diseases (e.g., retinitis pigmentosa)</li>
                     <li style={{ fontSize: "1rem" }}>Liver problems</li>
                     <li style={{ fontSize: "1rem" }}>
                    Blood disorders (e.g., haemophilia, sickle cell anaemia,
                    leukaemia)
                  </li>
                     <li style={{ fontSize: "1rem" }}>Multiple myeloma (bone marrow cancer)</li>
                     <li style={{ fontSize: "1rem" }}>Prolonged erections (lasting more than 4 hours)</li>
                     <li style={{ fontSize: "1rem" }}>
                    Physical conditions affecting the shape of the penis (e.g.,
                    Peyronie’s disease)
                  </li>
                     <li style={{ fontSize: "1rem" }}>
                    Galactose intolerance or glucose-galactose malabsorption
                  </li>
                     <li style={{ fontSize: "1rem" }}>Stomach ulcers (e.g., peptic/gastric ulcers)</li>
                     <li style={{ fontSize: "1rem" }}>
                    Sight loss due to poor circulation or Non-Arteritic Anterior
                    Ischemic Optic Neuropathy (NAION)
                  </li>
                     <li style={{ fontSize: "1rem" }}>Stroke</li>
                     <li style={{ fontSize: "1rem" }}>
                    Any serious medical condition requiring hospitalisation
                  </li>
                </ul>
              </Typography>
              <RadioGroup
                row
                name="hasPreviousHealthConditions"
                value={questionnaireResponses.hasPreviousHealthConditions}
                onChange={(e) =>
                  handleChange(e,"Yes")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.hasPreviousHealthConditions === "Yes" && (
                                  <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>

                  We are unable to provide you with treatment at this time.
                  Please consult your GP.
               </Typography>
              )}
            </FormControl>

            {/*****13.	Are you currently taking any of the following medications?******/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("takesNitratesOrNitricOxideDonors")}>
              <Typography variant="h4" className="labelOne">
                Are you currently taking any of the following medications?
                <ul>
                <li style={{ fontSize: "1rem" }}>
                    Nitrates (e.g., glyceryl trinitrate, isosorbide mononitrate,
                    isosorbide dinitrate)
                  </li>
                  <li style={{ fontSize: "1rem" }}>Nitric oxide donors ('poppers') for chest pain/angina</li>
                </ul>
              </Typography>
              <RadioGroup
                row
                name="takesNitratesOrNitricOxideDonors"
                value={questionnaireResponses.takesNitratesOrNitricOxideDonors}
                onChange={(e) =>
         handleChange(e,"Yes")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.takesNitratesOrNitricOxideDonors ===
                "Yes" && (
                  <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  We do not recommend using recreational drugs with PDE5
                  inhibitors, especially nitric oxide donors ('poppers'), as
                  they may cause a dangerous drop in blood pressure. We are
                  unable to provide you with treatment. Please consult your
                  doctor for more information.
                 </Typography>
              )}
            </FormControl>
            {/*****14.Are you currently taking any other medication (including prescription, over-the-counter, or recreational drugs)?******/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("takesOtherMedications")}>
              <Typography variant="h4" className="labelOne">
                Are you currently taking any other medication (including
                prescription, over-the-counter, or recreational drugs)?
              </Typography>
              <RadioGroup
                row
                name="takesOtherMedications"
                value={questionnaireResponses.takesOtherMedications}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    takesOtherMedications: e.target.value,
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.takesOtherMedications === "Yes" && (
                <FormControl component="fieldset" className="NestedQuestionBox"  disabled={checkDisabled("conditions")}>
                  {[
                    "Diabetes",
                    "High blood pressure",
                    "Heart disease",
                    "Kidney Disease",
                    "Liver Disease",
                    "Epilepsy",
                    "Depression",
                    "Anxiety",
                    "Mental health disorders",
                    "Any other medical conditions",
                  ].map((condition, index) => (
                    <FormControlLabel
                      className="checkbox2Col"
                      sx={{pl:3}}
                      key={index}
                      control={
                        <Checkbox
                          checked={questionnaireResponses.conditions?.includes(
                            condition
                          )}
                          onChange={(e) => {
                            const { value, checked } = e.target;
                            let newConditions = [
                              ...(questionnaireResponses.conditions || []),
                            ];

                            if (checked) {
                              newConditions.push(value);
                            } else {
                              newConditions = newConditions.filter(
                                (item) => item !== value
                              );
                            }

                            setQuestionnaireResponses({
                              ...questionnaireResponses,
                              conditions: newConditions,
                            });
                          }}
                          value={condition}
                        />
                      }
                      label={condition}
                    />
                  ))}
                </FormControl>
              )}
            </FormControl>
            {/*****15.	Do you understand that erectile dysfunction may be related to underlying health conditions (e.g., hypertension, diabetes, high cholesterol, cardiovascular disease)? You should consult your doctor within 6 months of starting treatment for a clinical review.******/}

            <FormControl component="fieldset" className="QuestionBox"  disabled={checkDisabled("understandsUnderlyingConditions")}>
              <Typography variant="h4" className="labelOne">
                Do you understand that erectile dysfunction may be related to
                underlying health conditions (e.g., hypertension, diabetes, high
                cholesterol, cardiovascular disease)? You should consult your
                doctor within 6 months of starting treatment for a clinical
                review.
              </Typography>
              <RadioGroup
                row
                name="understandsUnderlyingConditions"
                value={questionnaireResponses.understandsUnderlyingConditions}
                onChange={(e) =>
                handleChange(e,"No")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.understandsUnderlyingConditions ===
                "No" && (
                  <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                You must agree to this before continuing. If you need
                  assistance, please contact customer support.
               </Typography>
              )}
            </FormControl>

            {/*****16.	In the rare event of obtaining a prolonged erection lasting more than 4 hours, or experiencing sudden visual impairment, I agree to seek immediate medical assistance?******/}

            <FormControl component="fieldset" className="QuestionBox" disabled={checkDisabled("agreesToSeekHelpForProlongedErection")}>
              <Typography variant="h4" className="labelOne">
                In the rare event of obtaining a prolonged erection lasting more
                than 4 hours, or experiencing sudden visual impairment, I agree
                to seek immediate medical assistance?
              </Typography>
              <RadioGroup
                row
                name="agreesToSeekHelpForProlongedErection"
                value={
                  questionnaireResponses.agreesToSeekHelpForProlongedErection
                }
                onChange={(e) =>
                  handleChange(e,"No")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.agreesToSeekHelpForProlongedErection ===
                "No" && (
                  <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  You must agree to this before continuing. If you need
                  assistance, please contact customer support.
               </Typography>
              )}
            </FormControl>

            {/*****17.	Do you agree to the following conditions?******/}

            <FormControl component="fieldset" className="QuestionBox" disabled={checkDisabled("agreesToConditions")}>
              <Typography variant="h4" className="labelOne">
                Do you agree to the following conditions?
                <ul>
                <li style={{ fontSize: "1rem" }}>
                    You will read the patient information leaflet provided with
                    your medication.
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    You will inform your GP and us if you experience any side
                    effects or changes in your medical conditions during
                    treatment.
                  </li>
                  <li style={{ fontSize: "1rem" }}>The treatment is solely for your personal use.</li>
                  <li style={{ fontSize: "1rem" }}>
                    You have answered all questions truthfully and accurately.
                    You understand that the prescriber's decisions are based on
                    your responses, and that incorrect information can be
                    harmful to your health.
                  </li>
                </ul>
              </Typography>
              <RadioGroup
                row
                name="agreesToConditions"
                value={questionnaireResponses.agreesToConditions}
                onChange={(e) =>
                  handleChange(e,"No")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {questionnaireResponses.agreesToConditions === "No" && (
                                <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                  You must agree to this before continuing. If you need
                  assistance, please contact customer support.
               </Typography>
              )}
            </FormControl>

            {/*****18.	I confirm that I am over 18 years old and I agree to the terms and conditions.******/}

            <FormControl component="fieldset" className="QuestionBox" disabled={checkDisabled("confirmsAgeAndAgreesToTerms")}>
              <Typography variant="h4" className="labelOne">
                I confirm that I am over 18 years old and I agree to the terms
                and conditions.
              </Typography>
              <RadioGroup
                row
                name="confirmsAgeAndAgreesToTerms"
                value={questionnaireResponses.confirmsAgeAndAgreesToTerms}
                onChange={(e) =>
                  setQuestionnaireResponses({
                    ...questionnaireResponses,
                    confirmsAgeAndAgreesToTerms: e.target.value,
                  })
                }
              >
                <FormControlLabel
                  value="Yes"
                  control={<Radio />}
                  label="I Confirm"
                />
              </RadioGroup>
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
                    checked={questionnaireResponses.agreesToTerms || false}
                    onChange={(e) =>
                      setQuestionnaireResponses({
                        ...questionnaireResponses,
                        agreesToTerms: e.target.checked,
                      })
                    }
                    name="agreesToTerms"
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
        {renderStepContent(currentStep)}
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

export default ErectileDysfunctionQuestionnaire;
