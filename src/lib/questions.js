export const questionsMap = {
  // AcidReflux page questionnaire
  "acid-reflux": {
    over50WithNewSymptoms:
      "Are you over 50 with any new or recently changed symptoms?",
    acidRefluxSymptoms: ` Do you experience acid reflux symptoms at least twice a week,
                including : <br></br>
                <ul>
                  <li>
                    
                    Burning sensation in the throat or sour/acidic taste.
                  </li>
                  <li> Chest pain after meals, when lying down, or bending.</li>
                  <li> Food sensation “sticking” in the chest or throat.</li>
                </ul>`,
    difficultySwallowing: ` Do you have any of these symptoms :
                <ul>
                  <li>Difficulty swallowing</li> <li>Unintended weight loss</li>
                  <li>Persistent vomiting</li>
                  <li>Severe/persistent diarrhea</li> <li>Vomiting blood</li>
                  <li>Blood in stools or black stools</li>
                  <li>Iron deficiency anemia</li>
                  <li>Severe liver problems or abdominal swelling</li>
                </ul>`,
    allergyToPPIs:
      "Do you have a known allergy to proton pump inhibitors (e.g., omeprazole, pantoprazole)",
    pregnantOrBreastfeeding:
      "Are you pregnant, possibly pregnant, or breastfeeding?",
    otherConditions: `Do you have any of the following conditions:
                <ul>
                  <li>Osteoporosis</li>
                  <li>Liver disease</li>
                  <li>Gastric cancer</li>
                  <li>Hypomagnesemia (low blood magnesium) </li>
                </ul>`,
    rashAfterPPIs:
      " Have you experienced a ring-shaped or plaque-shaped rash after sun exposure while taking a proton pump inhibitor?",
    takingMedications:
      "Are you taking any medication, including over-the-counter,prescription, or recreational drugs?",
    onSteroids: ` Are you on any of the following medications?
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
                </ul>`,
    healthyLifestyle: `Do you agree to :
                <ul>
                  <li>Read the patient information leaflet</li>
                  <li>Use the treatment for personal use only</li>
                  <li>
                    
                    Provide accurate and truthful answers for safe prescribing
                  </li>
                  <li>
                    Inform Medicus Express and your GP if you experience side
                    effects or change medications
                  </li>
                </ul>`,
    shortTermUse:
      " Do you understand that maintaining a healthy diet, reducing alcohol intake, achieving a healthy weight, and stopping smoking can improve symptoms?",
    contactGP:
      " Do you agree to use this medication for the short-term treatment of GORD (heartburn/acid indigestion) for up to 28 days only?",
    agree:
      "Do you agree to contact your GP if you have no symptom relief after 14 days or if symptoms persist beyond 28 days?",
    agreeToTerms:
      "You will read the patient information leaflet provided with your medication. You will notify us and inform your GP if youexperience any side effects, start new medication, or if yourmedical conditions change during treatment. The treatment is foryour personal use only. You confirm that all the answers youhave provided are accurate and truthful. You understand that our prescribers rely on your responses in good faith to makeprescribing decisions, and providing incorrect information couldpose a risk to your health.",
    photoID:
      "Please upload a photo ID which is within date and not expired.(Max. file size: 80 MB.)",
  },

  // Contraceptives page questionnaire
  contraceptives: {
    pregnancyStatus:
      "Are you pregnant, breastfeeding, trying to conceive, or have you given birth in the last six weeks?",
    contraceptionUsage:
      "Are you currently using any form of contraception, such as the pill?",
    previousContraceptivePill: "Have you previously used a contraceptive pill?",
    bloodPressure: "What is your blood pressure?",
    cervicalCancerScreening:
      "Have you had a cervical cancer screening test in the past 3-5 years?",
    diagnosedConditions: `Have you or any immediate family member been diagnosed with any
            of the following health conditions?
            <ul>
              <li>
                Blood clot in the legs (deep vein thrombosis, DVT), lungs
                (pulmonary embolism, PE), or other organs
              </li>
              <li>Diabetes</li>
              <li>Migraine</li>
              <li>
                Heart attack, stroke, angina, chest pain, mini-stroke (TIA),
                abnormal heart rhythm, or impaired heart function
              </li>
              <li>High blood pressure</li>
              <li>High cholesterol or triglycerides</li>
              <li>Cancer (breast, cervical, liver, etc.)</li>
              <li>Liver or gallbladder disease</li>
              <li>Epilepsy</li>
              <li>Systemic lupus erythematosus (SLE)</li>
              <li>Sickle cell disease or blood disorders</li>
              <li>
                Inflammatory bowel disease (e.g., Crohn’s or ulcerative
                colitis)
              </li>
            </ul>`,
    currentMedications: `Are you currently taking any of the following medications?
            <ul>
              <li>HIV Protease Inhibitors (e.g., Atazanavir, Ritonavir)</li>
              <li>Antifungals (e.g., Itraconazole, Ketoconazole)</li>
              <li>Antibiotics (e.g., Tetracycline, Ampicillin)</li>
              <li>Antiepileptics (e.g., Phenobarbital, Phenytoin)</li>
              <li>Herbal medications (e.g., St John's Wort)</li>
              <li>Imatinib, Rifampicin, Ciclosporin</li>
            </ul>`,
    recentSurgery:
      "Have you undergone any surgery in the past 12 months, or are you currently immobile? ",
    unusualBleeding:
      "Do you experience any unexpected or unusual vaginal bleeding (e.g., bleeding between periods, after sex, very heavy or painful periods)?",
    feelingVulnerable:
      "Do you feel vulnerable or under pressure to obtain treatment?",
    prescriptionUsage:
      "Are you currently taking or have you recently stopped any prescription, over-the-counter, herbal medications, or recreational drugs?",
    allergicSubstances:
      "Are you allergic to any medications or substances (e.g.,peanuts, soy)?",
    agreeToTerms1: `Do you agree with the following statements?  
            <ul>
              <li>
                You understand that vomiting or diarrhea may affect the
                effectiveness of the pill.
              </li>
              <li>
                You acknowledge the risks and possible side effects of
                contraception and agree to report any pain in the leg,
                breathing difficulties, or new migraines to your doctor.
              </li>
              <li>
                You have read and understood the information on the
                treatments and medications, including side effects,
                effectiveness, and available alternatives.
              </li>
              <li>
                You have answered all questions truthfully, and the
                treatment is for your personal use only.
              </li>
              <li>
                You will read and understand the patient information leaflet
                provided with the medication.
              </li>
              <li>
                You understand that, while not compulsory, it is important
                to inform your GP about this treatment so they can provide
                safe healthcare.
              </li>
              <li>
                You understand that prescribing decisions are based on your
                responses, and inaccurate information may lead to the
                rejection of your order or harm to your health.
              </li>
              <li>
                You are aware that a soft identity check will be conducted
                via LexisNexis, which does not affect your credit rating.
              </li>
              <li>
                You have read and agree to our Terms and Conditions, Terms
                of Use, and Privacy Policy.
              </li>
            </ul>`,
    agreeToTerms2: ` Do you agree to the following?  You will read the patient information leaflet provided with your
            medication. You will notify us and inform your GP if you
            experience any side effects, start new medication, or if your
            medical conditions change during treatment. The treatment is for
            your personal use only. You confirm that all the answers you
            have provided are accurate and truthful. You understand that our
            prescribers rely on your responses in good faith to make
            prescribing decisions, and providing incorrect information could
            pose a risk to your health.`,
    photoID: `Please upload a photo ID which is within date and not expired.
              (Max. file size: 80 MB.)`,
  },
  // Cystitis Page Questionnaire
  cystitis: {
    gender: `What is your gender? (Male N/A)`,
    canMakeHealthcareDecisions: ` Are you able to make decisions about your healthcare?`,
    hasDiagnosedMedicalConditions: `Do you have any diagnosed medical conditions?`,
    isTakingMedications: `Are you currently taking any medications, including
            prescription, over-the-counter, or homeopathic options?`,
    hasAllergies: `Do you have any known allergies?`,
    hasAdditionalInformation: ` Is there any additional information that would help us provide
            appropriate care?`,
    isOver65: `Are you over 65?`,
    hasPreviousUTIDiagnosis: `Have you previously been diagnosed with cystitis (UTI)?`,
    hasBloodInUrine: `Is there any blood in your urine?`,
    hasLowerBackPain: `Are you currently experiencing lower back pain?`,
    hasNauseaOrVomiting: `Are you feeling nauseous or vomiting?`,
    hasFever: `Do you have a fever (above 38°C)?`,
    hasUnusualFatigue: `Are you feeling unusually tired or sleepy?`,
    hasHeartKidneyOrLiverIssues: ` Do you have any heart, kidney, or liver issues?`,
    hasBloodDisorders: `Do you have any blood disorders?`,
    hasFolicAcidDeficiency: `Are you folic acid deficient?`,
    hasPorphyria: ` Have you been diagnosed with porphyria ( a condition which is
            couased by photosensitivity of the skin, muscle weakness and
            pain)?`,
    agreesToSeekAdviceForSymptoms: `Do you agree to seek urgent medical advice if back pain or
            flu-like symptoms arise?`,
    agreesNotToTakeUTIMedicationIfPregnant: `Do you agree not to take UTI medication if pregnant or
            breastfeeding?`,
    numberOfUTIsInLast6Months: `How many UTI have you had in last 6 months?`,
    hasAgreedToTerms: `You will read the patient information leaflet provided with your
            medication. You will notify us and inform your GP if you
            experience any side effects, start new medication, or if your
            medical conditions change during treatment. The treatment is for
            your personal use only. You confirm that all the answers you
            have provided are accurate and truthful. You understand that our
            prescribers rely on your responses in good faith to make
            prescribing decisions, and providing incorrect information could
            pose a risk to your health.`,
    gpResult: `Search and select your general practitioner (GP)`,
  },
  // ErectileDysfunction Page Questionnaire
  "erectile-dysfunction": {
    isAgedBetween18And75: `Are you aged between 18-75 years ?`,
    isSmoker: `Do you smoke?`,
    consumesAlcohol: `Do you consume alcohol?`,
    hasTakenEDMedicationsBefore: `Have you taken any of the following medications for erectile
            dysfunction (at least 4 times previously) without experiencing
            any adverse effects?
            <ul>
              <li>Levitra (vardenafil)</li>
              <li>Spedra</li>
              <li>Viagra (sildenafil)</li>
              <li>Nipatra</li>
              <li>Cialis (tadalafil)</li>
            </ul>`,
    hasErectionDifficulties: `Do you have difficulty achieving or maintaining an erection?`,
    hasHighBloodPressure: `Do you have high blood pressure (above 160/90) or are you
            currently receiving treatment for high blood pressure?
            <br></br>(If unsure, you can have your blood pressure measured
            at your local pharmacy or GP surgery.)`,
    hasLowBloodPressure: ` Do you have low blood pressure (below 90/50)?
            <br></br>(If unsure, you can have your blood pressure measured
            at your local pharmacy or GP surgery.)`,
    hasDifficultyWalking: `Do you have difficulty walking briskly for 5 minutes?`,
    advisedAgainstStrenuousExercise: `Have you been advised by a doctor to avoid strenuous exercise?`,
    hasUntreatedDepression: ` Do you suffer from depression but have not yet consulted a GP?`,
    hasAllergiesOrAdverseReactions: ` Do you have any allergies to Viagra (sildenafil), Levitra
            (vardenafil), Spedra (avanafil), Cialis (tadalafil), or any
            other erectile dysfunction medication? Or have you experienced
            any adverse reactions to these medications in the past?`,
    hasPreviousHealthConditions: `Have you ever had any of the following health conditions?
            <ul>
              <li>Kidney problems</li>
              <li>
                Heart problems (e.g., angina, chest pain, heart failure,
                irregular heartbeat, heart attack, myocardial infarction,
                cardiomyopathy, valvular heart disease)
              </li>
              <li>Inherited eye diseases (e.g., retinitis pigmentosa)</li>
              <li>Liver problems</li>
              <li>
                Blood disorders (e.g., haemophilia, sickle cell anaemia,
                leukaemia)
              </li>
              <li>Multiple myeloma (bone marrow cancer)</li>
              <li>Prolonged erections (lasting more than 4 hours)</li>
              <li>
                Physical conditions affecting the shape of the penis (e.g.,
                Peyronie’s disease)
              </li>
              <li>
                Galactose intolerance or glucose-galactose malabsorption
              </li>
              <li>Stomach ulcers (e.g., peptic/gastric ulcers)</li>
              <li>
                Sight loss due to poor circulation or Non-Arteritic Anterior
                Ischemic Optic Neuropathy (NAION)
              </li>
              <li>Stroke</li>
              <li>
                Any serious medical condition requiring hospitalisation
              </li>
            </ul>`,
    takesNitratesOrNitricOxideDonors: `Are you currently taking any of the following medications?
            <ul>
              <li>
                Nitrates (e.g., glyceryl trinitrate, isosorbide mononitrate,
                isosorbide dinitrate)
              </li>
              <li>Nitric oxide donors ('poppers') for chest pain/angina</li>
            </ul>`,

    takesOtherMedications: `Are you currently taking any other medication (including
            prescription, over-the-counter, or recreational drugs)?`,

    understandsUnderlyingConditions: ` Do you understand that erectile dysfunction may be related to
            underlying health conditions (e.g., hypertension, diabetes, high
            cholesterol, cardiovascular disease)? You should consult your
            doctor within 6 months of starting treatment for a clinical
            review.`,
    agreesToSeekHelpForProlongedErection: `In the rare event of obtaining a prolonged erection lasting more
            than 4 hours, or experiencing sudden visual impairment, I agree
            to seek immediate medical assistance?`,
    agreesToConditions: ` Do you agree to the following conditions?
            <ul>
              <li>
                You will read the patient information leaflet provided with
                your medication.
              </li>
              <li>
                You will inform your GP and us if you experience any side
                effects or changes in your medical conditions during
                treatment.
              </li>
              <li>The treatment is solely for your personal use.</li>
              <li>
                You have answered all questions truthfully and accurately.
                You understand that the prescriber's decisions are based on
                your responses, and that incorrect information can be
                harmful to your health.
              </li>
            </ul>`,
    confirmsAgeAndAgreesToTerms: `I confirm that I am over 18 years old and I agree to the terms
            and conditions.`,
    agreesToTerms: `You will read the patient information leaflet provided with your
            medication. You will notify us and inform your GP if you
            experience any side effects, start new medication, or if your
            medical conditions change during treatment. The treatment is for
            your personal use only. You confirm that all the answers you
            have provided are accurate and truthful. You understand that our
            prescribers rely on your responses in good faith to make
            prescribing decisions, and providing incorrect information could
            pose a risk to your health.`,
    photoIDFile: `Please upload a photo ID which is within date and not expired.
              (Max. file size: 80 MB.)`,
  },
  // HairLoss Page Questionnaire
  "hair-loss": {
    isAgedBetween17And74: `Are you aged between 17-74 years`,
    hasHairLossInPatchesOrScalpIssues: `Do you have hair loss in patches, or is your scalp itchy or
            sore?`,
    isHairLossLocalizedToTempleArea: `Is your hair loss localized to the temple area?`,
    hasHealthyScalp: `Do you have a healthy scalp?
            <br></br>
            Your scalp should not have any of the following:
            <ul>
              <li>Inflammation</li>
              <li>Redness</li>
              <li>Medical dressings</li>
              <li>Shaved areas</li>
            </ul>`,
    hasSuddenOrCompleteHairLoss: ` Are you experiencing sudden or complete hair loss?`,
    isHairLossRelatedToMedicationOrIllness: `Could your hair loss be related to medication, dietary factors,
            or an illness?`,
    hasDiagnosedMedicalConditions: `Have you ever been diagnosed with any of the following
            conditions?
            <ul>
              <li>
                Heart disease (including chest pain, angina, heart attack,
                or any history of cardiovascular events)
              </li>
              <li>
                Acute Porphyria (a rare hereditary disease affecting
                haemoglobin)
              </li>
              <li>Pheochromocytoma (cancer of the adrenal glands)</li>
              <li>
                Prostate problems (e.g., prostate enlargement, prostatitis,
                prostate cancer)
              </li>
              <li>Male breast cancer</li>
              <li>High blood pressure</li>
            </ul>`,
    hasHistoryOfDepressionOrMentalHealth: `Do you have a history of depression or any other mental health
            conditions?`,
    isTakingAnyMedication: `Are you currently taking any medication (including prescription,
            over-the-counter, or recreational drugs)?`,
    understandsFinasterideRisks: `Do you understand that if prescribed finasteride, and your
            partner is (or may be) pregnant, they should avoid handling
            crushed or broken tablets, and that you should always wear a
            condom during sex?`,
    understandsPSATestImplications: `Do you understand that if prescribed finasteride, you should
            inform your GP before undergoing a PSA blood test for your
            prostate?`,
    agreesToTermsAndConfirmsAge: `I agree to the terms and conditions, and I confirm that I am
            over 18 years of age.`,
    agreesToTermsAndConditions: `You will read the patient information leaflet provided with your
            medication. You will notify us and inform your GP if you
            experience any side effects, start new medication, or if your
            medical conditions change during treatment. The treatment is for
            your personal use only. You confirm that all the answers you
            have provided are accurate and truthful. You understand that our
            prescribers rely on your responses in good faith to make
            prescribing decisions, and providing incorrect information could
            pose a risk to your health.`,
    photoIDFile: `Please upload a photo ID which is within date and not expired.
              (Max. file size: 80 MB.)`,
  },
  // HighFver Page Questionnaire
  hayfever: {
    fullName: ` Whats is your full name?`,
    medicationDetails: `Are you purchasing this medication for personal use?`,
    agedBetween: `Are you 18 years of age or older?`,
    pregnancyDetails: `Are you currently pregnant, breastfeeding, or planning a
            pregnancy? (If yes, please provide more details.)`,
    smokeDetails: `Do you smoke?`,
    alcohalDetails: `Do you consume alcohal ?`,
    weightDetails: `Are you overweight?`,
    allergicDetails: ` Are you experiencing allergic rhinitis or hayfever?`,
    followingSymptomsCheckbox: ` Which of the following symptoms do you have? (List options like
            sneezing, runny nose, etc.) Here’s a shuffled version of the
            symptoms:`,
    currentSymptoms: `Are your current symptoms different from previous
            hayfever/allergic rhinitis episodes?`,
    otherTreatment1: `Have you previously tried other treatments for hayfever or
            allergic rhinitis?`,
    otherTreatment2: `Do you have any of the following additional symptoms? (List
                specific symptoms like nasal pain, eye discomfort, etc.)`,
    liverIssue: `Do you have any liver or kidney conditions?`,
    otherConditions: `  Do you have other medical conditions or past surgeries?`,
    currentMedication: `Are you currently or recently taking any medications, including
            prescription, over-the-counter, herbal, or recreational drugs?`,
    otherAllergy: `Do you have any allergies to medications or other substances
            (e.g., peanuts, soy)?`,
    gpDetails: ` Would you like us to inform your GP about your treatment?`,
    agreedTC: `Do you agree to follow the patient information, use the
            treatment solely for personal use, and understand that incorrect
            answers may impact treatment safety? 
            <ul>
              <li>
              " You confirm that you have reviewed the treatment
              information, including side effects, effectiveness, and
              available alternatives"
            </li>
            <li>
              "You agree to contact your GP if there’s no improvement after
              14 days or if symptoms persist beyond 28 days."
            </li>
            <li>
              "Your answers are truthful, and this treatment is intended
              solely for your own use."
            </li>
            <li>
              "You will read and understand the patient information leaflet
              provided."
            </li>
            <li>
              "While optional, you acknowledge the importance of informing
              your GP to ensure safe care."
            </li>
            <li>
              "You understand that prescriptions rely on accurate
              information, and orders may be declined if unsuitable.."
            </li>
          </ul>`,
    confirmTC: `I confirm I have read all the information in this questionnaire
            and will follow the advice in the patient information leaflet
            provided?`,
    agreeToTerms: `You will read the patient information leaflet provided with your
            medication. You will notify us and inform your GP if you
            experience any side effects, start new medication, or if your
            medical conditions change during treatment. The treatment is for
            your personal use only. You confirm that all the answers you
            have provided are accurate and truthful. You understand that our
            prescribers rely on your responses in good faith to make
            prescribing decisions, and providing incorrect information could
            pose a risk to your health.`,
    photoID: ` Please upload a photo ID which is within date and not expired.
              (Max. file size: 80 MB.)`,
  },
  // Migraine Page Questionnaire
  migraine: {
    agedBetween: `Are you between 18 and 65 years old?`,
    migrain: `Do your migraines follow a consistent pattern?`,
    migrainTime: `Do your migraines last less than 4 hours or longer than 24
            hours?`,
    experienceMigrain: `Do you experience migraines more than 10 days per month?`,
    anySymptoms: `Do you have any of the following symptoms
            <ul>
              <li>Coordination issues </li>
              <li>Back-of-head pain </li>
              <li>Ringing in ears </li>
              <li>Seizure-like episodes </li>
              <li>Recent rash with headache</li>
              <li>Reduced alertness </li>
              <li>Blurred/double vision </li>
              <li>
                Increased frequency, severity, or duration of migraines
              </li>
              <li>One-sided weakness </li>
            </ul>`,
    diagnosed: `Have you been diagnosed with migraines, and do triptans relieve
                them?`,
    otherAllergy: `Do you have an allergy to any of the following medications?
            <ul>
              <li>Sumatriptan </li>
              <li>Rizatriptan </li>
              <li>Zolmitriptan </li>
            </ul>`,
    triptans: ` Have you experienced any of the following after taking triptans?
            <ul>
              <li>Chest tightness </li>
              <li>Palpitations or dizziness </li>
              <li>Worsening nausea </li>
              <li>Increased blood pressure </li>
            </ul>`,
    diagnoseAny: `Have you been diagnosed with any of the following conditions?
            <ul>
              <li>Heart disease </li>
              <li>Stroke or mini-stroke </li>
              <li>High blood pressure </li>
              <li>Epilepsy </li>
              <li>Serious medical conditions requiring hospitalization </li>
            </ul>`,
    medicationAny1: `Are you currently taking any medications?`,
    agreedTC1: `Do you agree to the following terms?**
            <ul>
              <li> I will read the patient information leaflet </li>
              <li>
                I will inform Medicus Express and my GP about any side
                effects or changes in condition.
              </li>
              <li>The treatment is for my personal use. </li>
              <li>I confirm all answers are truthful. </li>
            </ul>`,
    agreeToTerms: `Do you agree to the following? You will read the patient information leaflet provided with your
            medication. You will notify us and inform your GP if you
            experience any side effects, start new medication, or if your
            medical conditions change during treatment. The treatment is for
            your personal use only. You confirm that all the answers you
            have provided are accurate and truthful. You understand that our
            prescribers rely on your responses in good faith to make
            prescribing decisions, and providing incorrect information could
            pose a risk to your health.`,
    photoID: `Please upload a photo ID which is within date and not expired.
              (Max. file size: 80 MB.)`,
  },
  // PeriodDelay Page Questionnaire
  "period-delay": {
    gender: `Are you female?`,
    agedBetween: `Are you aged 18 or over?`,
    followingHealCond: `Do you have any of the following health conditions?  "Pregnancy",
              "Breastfeeding",
              "Severe liver disease",
              "Severe kidney disease",
              "History of blood clots or stroke",
              "Hormonal disorders",
              "History of any types of cancer (e.g., breast or ovarian cancer)",
              "Severe high blood pressure",
              "Any serious health condition that requires immediate hospital treatment",
              "None",`,
    currentlyMedications: ` Are you currently taking any of the following medications? "Hormonal medication (e.g., contraceptive pills, HRT)",
              "Blood thinners (e.g., Warfarin)",
              "Steroids",
              "Anti-seizure medication",
              "Any other prescription or over-the-counter medications",
              "None",`,
    allergy: `Do you have any allergies to any medications or substances
            (e.g., peanuts, latex)?`,

    period: `Are you currently having a period or expecting your period soon?`,
    delayPeriod: `How long would you like to delay your period?`,
    periodDelay1: `Have you ever used period delay medication before?`,
    menstrualCyc: `Do you have a history of any of the following conditions that
            could affect your menstrual cycle? "Irregular periods",
            "Endometriosis",
            "Fibroids",
            "Polycystic Ovary Syndrome (PCOS)",
            "Menstrual disorders",
            "Other",`,
    periodDelay2: `When was the first day of your last period?`,
    periodTime: `How long does your typical period last?`,
    regularPeriod: `Are your periods regular?`,
    pregnant: `Are you currently pregnant or trying to conceive?`,
    breastfeeding: `Are you currently breastfeeding?`,
    delayingperiod: ` Do you understand that delaying your period may have potential
            side effects, and that you should consult your GP if you
            experience any issues?`,
    safeUse: `Do you understand that it is essential to follow the provided
            instructions for the medication to be effective and safe?`,
    confirmAll: `Do you confirm that all the information you have provided is
            accurate and complete to the best of your knowledge?`,
    agreeMedicus: `Do you agree to Medicus Express's terms and conditions and
            privacy policy for this consultation and treatment?`,
    confirmAge: `Do you confirm that you are over 18 years of age and fully
            understand the nature of the treatment prescribed?`,
    agreeToTerms: ` Do you agree to the following? You will read the patient information leaflet provided with your
            medication. You will notify us and inform your GP if you
            experience any side effects, start new medication, or if your
            medical conditions change during treatment. The treatment is for
            your personal use only. You confirm that all the answers you
            have provided are accurate and truthful. You understand that our
            prescribers rely on your responses in good faith to make
            prescribing decisions, and providing incorrect information could
            pose a risk to your health.`,
    photoID: `Please upload a photo ID which is within date and not expired.
              (Max. file size: 80 MB.)`,
  },
  // PeriodPain Page Questionnaire
  "period-pain": {
    agedBetween: `Are you female and aged between 18-65?`,
    periodPain: ` Do you currently experience period pain (dysmenorrhea)?`,
    experience: ` Do you experience moderate to severe pain during menstruation?`,
    symptomsPeriodPain: `Do you also experience any of the following symptoms with your
            period pain?`,
    experienceChange: `Have you experienced significant changes in the intensity or
                            duration of your period pain in the past 6 months?`,
    periodPain1: `Is your period pain accompanied by any other medical symptoms,
            such as pelvic pain, heavy bleeding, or irregular periods?`,
    diagnosedFollowCond: `Have you ever been diagnosed with any of the following
            conditions?`,
    knownAllergy: ` Do you have any known allergies to medications, especially pain
                            relief medications like NSAIDs (e.g., ibuprofen, aspirin)?`,
    otherMedication: `Are you currently on any of the following medications? <ul>
              <li>Birth control (oral contraceptives, IUD, etc.)</li>
              <li>Hormonal therapy</li>
              <li>Pain relief medication (e.g., ibuprofen, paracetamol)</li>
              <li>Antidepressants or antianxiety medication</li>
              <li>Any other relevant medications</li></ul>`,
    pastTreatments: `Have you used any treatments in the past for period pain, such
            as: "Over-the-counter pain relief (e.g., ibuprofen, paracetamol)" "Prescription medication (e.g., hormonal treatments, stronger painkillers)" "Surgery (e.g., laparoscopy for endometriosis)" "Other treatments (please specify): "`,
    anyTreatment: `Did any of the above treatments work for you?`,
    painseverity: `On a scale of 1-10, how severe is your period pain? (1 being
            mild and 10 being unbearable)`,
    painActivity: ` Do you experience any pain during activities such as exercising,
            working, or socializing due to your period pain?`,
    followingCondition: `Do you have any of the following conditions that could impact
            your health or treatment options? <ul>
                            <li>Asthma</li>
                            <br></br>
                            <li>Diabetes</li>
                            <br></br>
                            <li>Hypertension</li>
                            <br></br>
                            <li>Cardiovascular disease</li>
                            <br></br>
                            <li>Blood clotting disorders</li>
                            <br></br></ul>`,
    currPregnant: `Are you currently pregnant or breastfeeding?`,
    understandTO: `Do you understand that the treatment options available for
            period pain may have potential side effects, and you should
            consult your GP if you experience any adverse reactions?`,
    consentToPro: ` Do you consent to proceeding with treatment for period pain
            after reviewing the information provided?`,
    agreeToTerms: `Do you agree to the following? You will read the patient information leaflet provided with your
            medication. You will notify us and inform your GP if you
            experience any side effects, start new medication, or if your
            medical conditions change during treatment. The treatment is for
            your personal use only. You confirm that all the answers you
            have provided are accurate and truthful. You understand that our
            prescribers rely on your responses in good faith to make
            prescribing decisions, and providing incorrect information could
            pose a risk to your health.`,
    photoID: `Please upload a photo ID which is within date and not expired.
              (Max. file size: 80 MB.)`,
  },
  // Premature Page Questionnaire
  "premature-ejaculation": {
    gender: `Are you male?`,
    agedBetween: `Are you aged between 18 and 65 years?`,
    premature: `Do you often experience premature ejaculation?`,
    ejaculation: `Do you find it difficult to control ejaculation during sexual
            intercourse?`,
    allergy: `Do you have any allergies?`,
    ejaculateTime: `On average, how long does it take you to ejaculate during sexual
            intercourse ?`,
    persistentPre: `Have you experienced persistent premature ejaculation for more
                            than 6 months?`,
    healthCondition: ` Do you have any of the following health conditions? <ul>
            <li>Diabetes</li>
            <li>High blood pressure</li>
            <li>Heart disease</li>
            <li>Kidney Disease</li>
            <li>Liver Disease</li>
            <li>Epilepsy</li>
            <li>Depression</li>
            <li>Anxiety</li>
            <li>Mental health disorders</li>
          </ul>`,
    anyMedication: `Are you currently taking any medication for any of the
            following? Please select all that apply  <ul>
            <li>High blood pressure</li>
            <li>Depression or anxiety</li>
            <li>Erectile dysfunction</li>
            <li>Hormonal treatments</li> </ul>`,
    smoke: `Do you smoke?`,
    alcohal: `Do you drink alcohal`,
    healthyDiet: ` Do you have a healthy diet and exercise regularly?`,
    understandTM: `Do you understand that this treatment is not intended for
            individuals who have certain medical conditions or are taking
            specific medications, and that you should consult your GP if you
            have any concerns?`,
    agreeInstruc: `Do you agree to follow the instructions for use of the
            prescribed medication and understand the potential side effects
            associated with treatment?`,
    understandTreat1: `I understand that this treatment is for my personal use only and
            that I will not share any prescribed medication with others`,
    confirmAll: `I confirm that the information provided is accurate and complete
            to the best of my knowledge.`,
    agree_pillsphere: `I understand that pill sphere will treat my information in
            accordance with its Privacy Policy and Terms and Conditions.`,
    lastConfirm: `I confirm that I am over 18 years old and agree to the Terms and
            Conditions of Medicus Express.`,
    agreeToTerms: `You will read the patient information leaflet provided with your
            medication. You will notify us and inform your GP if you
            experience any side effects, start new medication, or if your
            medical conditions change during treatment. The treatment is for
            your personal use only. You confirm that all the answers you
            have provided are accurate and truthful. You understand that our
            prescribers rely on your responses in good faith to make
            prescribing decisions, and providing incorrect information could
            pose a risk to your health.`,
    photoID: `Please upload a photo ID which is within date and not expired.
              (Max. file size: 80 MB.)`,
  },
  // StopSmoking Page Questionnaire
  "stop-smoking": {
    purchaseMedication: `Are you purchasing this medication for yourself?`,
    agedBetween: `Are you aged between 18-75 years`,
    areYouBreastFeeding: `Are you breast feeding, pregnant or planning to become pregnant?`,
    varenicline: `Do you have allergy to varenicline?`,
    conditions: ` Please confirm the following box to confirm? "You are currently a smoker",
                      "You do not have a history of deliberate overdoses in the past 15 years",
                      "You do not have dependency to benzodiazepines",
                      "You do not suffer with any mental health conditions, such as depression and anxiety",`,
    sufferAnyFollowing: `Do you suffer from any of the following?
            <ul>
              <li>Kidney (renal) disease</li>
              <li>History of epilepsy/seizure</li>
              <li>Stroke</li>
              <li>Heart disease</li>
              <li>Diabetes</li>
              <li>
                Any serious medical condition which may require immediate
                hospitalisation
              </li>
            </ul>`,
    currTakingAnyMedi: `Are you currently taking any medication (including
            over-the-counter, prescriptions or recreational drugs) ?`,
    agreeToTheFollowing: ` Do you suffer from any of the following?
            <ul>
              <li>
                You will read the patient information leaflet supplied with
                your medication
              </li>
              <li>
                You will contact us and inform your GP of your medication if
                you experience any side effects of treatment, you start new
                medication and/or your medical conditions change during
                treatment
              </li>
              <li>The treatment is solely for your own use</li>
              <li>
                You have answered all the above questions accurately and
                truthfully
              </li>
              <li>
                You understand our prescribers take your answers in good
                faith and base their prescribing decisions accordingly, and
                that incorrect information can be hazardous to your health
              </li>
              <li>
                You understand that whilst decisions relating to your
                treatment are made jointly between you and the prescriber,
                the final decision to issue a prescription will always be
                with the prescriber
              </li>
            </ul>`,
    agreeToStartingVarenicline: `Do you understand that when starting varenicline treatment you
            should start with a 2-week starter pack`,
    agreeToVareniclineIncrease: ` Are you aware that varenicline increases your chances of
            quitting smoking, but you will also need willpower to succeed`,
    stopTakingVarenicline: ` Do you understand that you must stop taking varenicline and
            contact your GP or other urgent healthcare provider if you
            experience any of the following conditions?
            <ul>
              <li>
                new or worse heart or blood vessel (cardiovascular) problems
              </li>
              <li>seizures</li>
              <li>
                agitatation, depressed mood, changes in behaviour, suicidal
                thoughts
              </li>
              <li>swelling of face, mouth or neck</li>
              <li>skin rash or skin peeling</li>
            </ul>`,
    understandDevelopAgiation: `Do you understand that if you develop agitation, depressed mood,
            suicidal thoughts, behaviour changes while taking varenicline
            you should stop taking treatment and contact your doctor
            immediately?`,
    understandStartTakingVarenicline: `Do you understand that you should start taking varenicline 1 to
            2 weeks before you stop smoking ?`,
    discontinuationVarenicline: ` Do you understand that discontinuation of varenicline is
            associated with an increase in irritability, urge to smoke,
            depression and/or insomnia in up to 3% of patients.`,
    agreeToTerms: ` Do you agree to the following? You will read the patient information leaflet provided with your
            medication. You will notify us and inform your GP if you
            experience any side effects, start new medication, or if your
            medical conditions change during treatment. The treatment is for
            your personal use only. You confirm that all the answers you
            have provided are accurate and truthful. You understand that our
            prescribers rely on your responses in good faith to make
            prescribing decisions, and providing incorrect information could
            pose a risk to your health.`,
    photoID: `Please upload a photo ID which is within date and not expired.
              (Max. file size: 80 MB.)`,
  },
  // WeightLoss Page Questionnaire
  "weight-loss": {
    ageRange: `Are you aged between 17-74 years?`,
    isPregnantOrBreastfeeding: `Are you pregnant or breastfeeding?`,
    hasEatingDisorder: `Have you ever suffered from an eating disorder?`,
    usesBloodSugarMedications: `Are you currently using any injections or medications, aside
            from Metformin, to manage your blood sugar if you have Type 2
            diabetes?`,
    hadAllergicReaction: `Have you experienced an allergic reaction to Wegovy, Mounjaro,
            Semaglutide, Saxenda, or Liraglutide before?`,
    hasFamilyHistoryThyroidCancer: `Have you or any family members ever been diagnosed with
            Medullary Thyroid Cancer, Thyroid Cancer, or Multiple Endocrine
            Neoplasia Type 2 (MEN2) syndrome?`,
    isTakingMedications: ` Are you taking any medications? (Prescription, over-the-counter,
            or recreational drugs)`,
    isTakingSteroidsOrThyroidMeds: `Are you taking steroids or medication to treat your thyroid?`,
    usedInjectableWeightLossMedLast4Weeks: ` Have you taken injectable weight loss medication in the last 4
            weeks?`,
    agreedToTerms: `Do you agree to the following? You will read the patient information leaflet provided with your
            medication. You will notify us and inform your GP if you
            experience any side effects, start new medication, or if your
            medical conditions change during treatment. The treatment is for
            your personal use only. You confirm that all the answers you
            have provided are accurate and truthful. You understand that our
            prescribers rely on your responses in good faith to make
            prescribing decisions, and providing incorrect information could
            pose a risk to your health.`,
    acknowledgeGLP1Effects: ` Do you understand that GLP-1 injectable weight-loss medications
            (such as Mounjaro and Wegovy) may reduce the effectiveness of
            oral contraceptives, and that you will need to use additional
            non-oral contraception methods (e.g., condoms) while undergoing
            treatment? (Required)`,
    acknowledgeMoodEffects: `Do you understand that both weight loss and injectable
            weight-loss treatments have been linked to a lowering of mood?
            If you experience depression, thoughts of self-harm, or other
            mental health issues, you should stop the treatment and speak to
            your doctor immediately.`,
    acknowledgeNeckLumpRisk: `Do you understand that if you develop any lumps in your neck or
            experience a hoarse voice while taking this medication, you
            should stop using it and consult your doctor immediately?`,
    acknowledgeNoMixingWeightLossMeds: ` Do you understand that injectable weight-loss medications should
            not be used alongside other weight-loss medications? (Required)`,
    acknowledgePancreatitisRisk: ` Do you understand that this medication may increase the risk of
            pancreatitis, gallbladder issues, and gallstones, and that you
            should seek medical advice if you experience any abdominal pain
            while using it? (Required)`,
    acknowledgeConceptionRisk: ` Do you understand that this medication should not be used by men
            or women who are trying to conceive or are within two months of
            planning to start trying for a child? (Required)`,
    photoID: ` Please upload a photo ID which is within date and not expired.
              (Max. file size: 80 MB.)`,
    weightVerificationPhoto: ` Please upload a fully body photo. Max. (file size: 80 MB.)`,
    gpResult: `Search and select your general practitioner (GP)`,
  },
};
