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

function ErectileDysfunctionQuestion() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({
    agedBetween: "",
    agreeToTerms: "",
    photoID: "",
    smoke: "",
    alcohal: "",
    erectileCount: "",
    erection: "",
    bloodPressure: "",
    bloodPressure90: "",
    walking: "",
    strenuous: "",
    depression: "",
    allergies: "",
    healthCd: "",
    medication1: "",
    medication2: "",
    dysfunction: "",
    proErection: "",
    agreeFollowing: "",
    agreeTC: "",

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
            {/****** Are you aged between 18-75 years *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you aged between 18-75 years ?
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

            {/****** 2.	Do you smoke? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you smoke?
              </Typography>
              <RadioGroup
                row
                name="smoke"
                value={answers.smoke}
                onChange={(e) =>
                  setAnswers({ ...answers, smoke: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/****** 3.	Do you consume alcohol?*****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you consume alcohol?
              </Typography>
              <RadioGroup
                row
                name="alcohal"
                value={answers.alcohal}
                onChange={(e) =>
                  setAnswers({ ...answers, alcohal: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.alcohal === "Yes" && (
                <div>
                  <Typography>
                    "You are eligible for treatment, however, please be aware that alcohol consumption and smoking may worsen erectile difficulties. We recommend consulting your GP for advice on quitting smoking."
                  </Typography>
                </div>
              )}
            </FormControl>

            {/****** 4.	Have you taken any of the following medications for erectile dysfunction (at least 4 times previously) without experiencing any adverse effects? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Have you taken any of the following medications for erectile dysfunction (at least 4 times previously) without experiencing any adverse effects?
                <ul>
                  <li>
                    Levitra (vardenafil)
                  </li>
                  <li>
                    Spedra
                  </li>
                  <li>
                    Viagra (sildenafil)
                  </li>
                  <li>
                    Nipatra
                  </li>
                  <li>
                    Cialis (tadalafil)
                  </li>
                </ul>
              </Typography>
              <RadioGroup
                row
                name="erectileCount"
                value={answers.erectileCount}
                onChange={(e) =>
                  setAnswers({ ...answers, erectileCount: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>

            </FormControl>


            {/****** 5.	Do you have difficulty achieving or maintaining an erection?*****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have difficulty achieving or maintaining an erection?
              </Typography>
              <RadioGroup
                row
                name="erection"
                value={answers.erection}
                onChange={(e) =>
                  setAnswers({ ...answers, erection: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.erection === "No" && (
                <div>
                  <Typography>
                    "It does not appear that you have erectile dysfunction. We are unable to provide you with treatment. Please consult your GP for further information."
                    <br></br><br></br>Please Do not proceed.
                  </Typography>
                </div>
              )}
            </FormControl>

            {/****** 6.	Do you have high blood pressure (above 160/90) or are you currently receiving treatment for high blood pressure? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have high blood pressure (above 160/90) or are you currently receiving treatment for high blood pressure?
                <br></br>(If unsure, you can have your blood pressure measured at your local pharmacy or GP surgery.)
              </Typography>
              <RadioGroup
                row
                name="bloodPressure"
                value={answers.bloodPressure}
                onChange={(e) =>
                  setAnswers({ ...answers, bloodPressure: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.bloodPressure === "Yes" && (
                <div>
                  <Typography>
                    "We are unable to provide you with treatment if you have high blood pressure. Please consult your GP for further information."
                    <br></br><br></br>Please Do not proceed.
                  </Typography>
                </div>
              )}
            </FormControl>

            {/******7.	Do you have low blood pressure (below 90/50)? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have low blood pressure (below 90/50)?
                <br></br>(If unsure, you can have your blood pressure measured at your local pharmacy or GP surgery.)
              </Typography>
              <RadioGroup
                row
                name="bloodPressure90"
                value={answers.bloodPressure90}
                onChange={(e) =>
                  setAnswers({ ...answers, bloodPressure90: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.bloodPressure90 === "Yes" && (
                <div>
                  <Typography>
                    "We are unable to provide you with treatment if you have low blood pressure. Please consult your GP for further information."
                    <br></br><br></br>Please Do not proceed.
                  </Typography>
                </div>
              )}
            </FormControl>

            {/****** 8.	Do you have difficulty walking briskly for 5 minutes? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have difficulty walking briskly for 5 minutes?
              </Typography>
              <RadioGroup
                row
                name="walking"
                value={answers.walking}
                onChange={(e) =>
                  setAnswers({ ...answers, walking: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.walking === "Yes" && (
                <div>
                  "We are unable to provide you with treatment at this time. Please consult your GP."
                  <br></br><br></br>Please Do not proceed.

                </div>
              )}
            </FormControl>

            {/****** 9.	Have you been advised by a doctor to avoid strenuous exercise? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Have you been advised by a doctor to avoid strenuous exercise?
              </Typography>
              <RadioGroup
                row
                name="strenuous"
                value={answers.strenuous}
                onChange={(e) =>
                  setAnswers({ ...answers, strenuous: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.strenuous === "Yes" && (
                <div>
                  "We are unable to provide you with treatment at this time. Please consult your GP."
                  <br></br><br></br>Please Do not proceed.

                </div>
              )}
            </FormControl>

            {/******10.	Do you suffer from depression but have not yet consulted a GP? *****/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you suffer from depression but have not yet consulted a GP?
              </Typography>
              <RadioGroup
                row
                name="depression"
                value={answers.depression}
                onChange={(e) =>
                  setAnswers({ ...answers, depression: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.depression === "Yes" && (
                <div>
                  "We are unable to provide you with treatment at this time. Please consult your GP."
                  <br></br><br></br>Please Do not proceed.

                </div>
              )}
            </FormControl>

            {/*****11.	Do you have any allergies to Viagra (sildenafil), Levitra (vardenafil), Spedra (avanafil), Cialis (tadalafil), or any other erectile dysfunction medication? Or have you experienced any adverse reactions to these medications in the past?******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you have any allergies to Viagra (sildenafil), Levitra (vardenafil), Spedra (avanafil), Cialis (tadalafil), or any other erectile dysfunction medication? Or have you experienced any adverse reactions to these medications in the past?
              </Typography>
              <RadioGroup
                row
                name="allergies"
                value={answers.allergies}
                onChange={(e) =>
                  setAnswers({ ...answers, allergies: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.allergies === "Yes" && (
                <div>
                  "We are unable to provide you with treatment at this time. Please consult your GP."
                  <br></br><br></br>Please Do not proceed.

                </div>
              )}
            </FormControl>

            {/*****12.	Have you ever had any of the following health conditions?******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Have you ever had any of the following health conditions?
                <ul>
                  <li>Kidney problems</li>
                  <li>Heart problems (e.g., angina, chest pain, heart failure, irregular heartbeat, heart attack, myocardial infarction, cardiomyopathy, valvular heart disease)</li>
                  <li>Inherited eye diseases (e.g., retinitis pigmentosa)</li>
                  <li>Liver problems</li>
                  <li>Blood disorders (e.g., haemophilia, sickle cell anaemia, leukaemia)</li>
                  <li>Multiple myeloma (bone marrow cancer)</li>
                  <li>Prolonged erections (lasting more than 4 hours)</li>
                  <li>Physical conditions affecting the shape of the penis (e.g., Peyronie’s disease)</li>
                  <li>Galactose intolerance or glucose-galactose malabsorption</li>
                  <li>Stomach ulcers (e.g., peptic/gastric ulcers)</li>
                  <li>Sight loss due to poor circulation or Non-Arteritic Anterior Ischemic Optic Neuropathy (NAION)</li>
                  <li>Stroke</li>
                  <li>Any serious medical condition requiring hospitalisation</li>
                </ul>
              </Typography>
              <RadioGroup
                row
                name="healthCd"
                value={answers.healthCd}
                onChange={(e) =>
                  setAnswers({ ...answers, healthCd: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.healthCd === "Yes" && (
                <div>
                  "We are unable to provide you with treatment at this time. Please consult your GP."
                  <br></br><br></br>Please Do not proceed.

                </div>
              )}
            </FormControl>

            {/*****13.	Are you currently taking any of the following medications?******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you currently taking any of the following medications?
                <ul>
                  <li>
                    Nitrates (e.g., glyceryl trinitrate, isosorbide mononitrate, isosorbide dinitrate)
                  </li>
                  <li>
                    Nitric oxide donors ('poppers') for chest pain/angina
                  </li>
                </ul>
              </Typography>
              <RadioGroup
                row
                name="medication1"
                value={answers.medication1}
                onChange={(e) =>
                  setAnswers({ ...answers, medication1: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.medication1 === "Yes" && (
                <div>
                  "We do not recommend using recreational drugs with PDE5 inhibitors, especially nitric oxide donors ('poppers'), as they may cause a dangerous drop in blood pressure. We are unable to provide you with treatment. Please consult your doctor for more information".
                  <br></br><br></br>Please Do not proceed.

                </div>
              )}
            </FormControl>
            {/*****14.Are you currently taking any other medication (including prescription, over-the-counter, or recreational drugs)?******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Are you currently taking any other medication (including prescription, over-the-counter, or recreational drugs)?
              </Typography>
              <RadioGroup
                row
                name="medication2"
                value={answers.medication2}
                onChange={(e) =>
                  setAnswers({ ...answers, medication2: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.medication2 === "Yes" && (
                <ul>

                  <FormControlLabel
                    control={<Checkbox />}
                    label="Treatment for erectile dysfunction (apart from Viagra, Levitra, Cialis, Spedra)"
                  />

                  <FormControlLabel
                    control={<Checkbox />}
                    label="Anti-virals (e.g., atazanavir, ritonavir)"
                  />
<br></br>                  
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Recreational drugs (Class A, B, or C)"
                  />
<br></br>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Quinidine, procainamide, amiodarone"
                  />
<br></br>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Alpha-blockers (e.g., tamsulosin)"
                  />
<br></br>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Recreational nitrates ('poppers')"
                  />
<br></br>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Theophylline"
                  />
<br></br>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Anti-fungals (e.g., ketoconazole)"
                  />
<br></br>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Nicorandil"
                  />
<br></br>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Warfarin"
                  />
<br></br>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="High blood pressure medications"
                  />
<br></br>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Erythromycin, clarithromycin, cimetidine"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Medicinal nitrates (e.g., glyceryl trinitrate, isosorbide mononitrate)"
                  />
<br></br>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Rifampicin"
                  />
<br></br>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Riociguat"
                  />
                  <br></br>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Anticonvulsants (e.g., phenobarbital, phenytoin)"
                  />
                </ul>
              )}
            </FormControl>
            {/*****15.	Do you understand that erectile dysfunction may be related to underlying health conditions (e.g., hypertension, diabetes, high cholesterol, cardiovascular disease)? You should consult your doctor within 6 months of starting treatment for a clinical review.******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you understand that erectile dysfunction may be related to underlying health conditions (e.g., hypertension, diabetes, high cholesterol, cardiovascular disease)? You should consult your doctor within 6 months of starting treatment for a clinical review.
              </Typography>
              <RadioGroup
                row
                name="dysfunction"
                value={answers.dysfunction}
                onChange={(e) =>
                  setAnswers({ ...answers, dysfunction: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.dysfunction === "No" && (
                <div>
                  "You must agree to this before continuing. If you need assistance, please contact customer support."
                </div>
              )}
            </FormControl>

            {/*****16.	In the rare event of obtaining a prolonged erection lasting more than 4 hours, or experiencing sudden visual impairment, I agree to seek immediate medical assistance?******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                In the rare event of obtaining a prolonged erection lasting more than 4 hours, or experiencing sudden visual impairment, I agree to seek immediate medical assistance?
              </Typography>
              <RadioGroup
                row
                name="proErection"
                value={answers.proErection}
                onChange={(e) =>
                  setAnswers({ ...answers, proErection: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.proErection === "No" && (
                <div>
                  "You must agree to this before continuing. If you need assistance, please contact customer support."
                </div>
              )}
            </FormControl>

            {/*****17.	Do you agree to the following conditions?******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                Do you agree to the following conditions?
                <ul>
                <li>You will read the patient information leaflet provided with your medication.</li>
                <li>You will inform your GP and us if you experience any side effects or changes in your medical conditions during treatment.</li>
                <li>The treatment is solely for your personal use.</li>
                <li>You have answered all questions truthfully and accurately. You understand that the prescriber's decisions are based on your responses, and that incorrect information can be harmful to your health.</li>
                </ul>
              </Typography>
              <RadioGroup
                row
                name="agreeFollowing"
                value={answers.agreeFollowing}
                onChange={(e) =>
                  setAnswers({ ...answers, agreeFollowing: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {answers.agreeFollowing === "No" && (
                <div>
                  "You must agree to this before continuing. If you need assistance, please contact customer support."
                </div>
              )}
            </FormControl>

            {/*****18.	I confirm that I am over 18 years old and I agree to the terms and conditions.******/}

            <FormControl component="fieldset" className="QuestionBox">
              <Typography variant="h4" className="labelOne">
                I confirm that I am over 18 years old and I agree to the terms and conditions.
              </Typography>
              <RadioGroup
                row
                name="agreeTC"
                value={answers.agreeTC}
                onChange={(e) =>
                  setAnswers({ ...answers, agreeTC: e.target.value })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="I Confirm" />
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

export default ErectileDysfunctionQuestion;
