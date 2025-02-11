import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  LinearProgress,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import BmiCalculate from "../Questionnaire/Consultation"; // Import the BMI calculation component
import ImageIcon from "@mui/icons-material/Image";

const defaultStepsData = [
  {},
  {},
  {
    type: "checkbox",
    question: "We would like to know about your lifestyle",
    note: "(Please select all that apply)",
    name: "lifestyle",
    options: [
      "I eat snacks, crisps, cakes, chocolates, biscuits, or other food that are high in saturated fats a few times a week.",
      "I eat snacks, crisps, cakes, chocolates, biscuits, or other food that are high in saturated fats most days of the week.",
      "I do 150 minutes or more of moderate intensity exercise each week – any activity which gets you out of breath (e.g., brisk walking, riding a bike, water aerobics).",
      "I do 75 minutes or more of vigorous intensity exercise each week – any activity in which you are not able to say more than one or two words (e.g., running, swimming fast, sports, skipping rope).",
      "I eat takeaway/fast food on most days of the week.",
      "I eat takeaway/fast food a few times a week.",
    ],
  },
  {
    type: "radio",
    group_name: "Summary Care Record",
    note: "This is optional for most conditions, however for some chronic conditions we cannot treat you without seeing this.",
    question:
      "Do you consent to our clinicians viewing your NHS medical record through the NHS Summary Care Record Online Service?",
    name: "consentToNhsRecord",
    options: ["Yes", "No"],
  },
  {
    type: "radio",
    group_name: "Your NHS Doctor's Info",
    note: "This is optional for most conditions, however for some chronic conditions we cannot treat you unless we have permission to inform your NHS GP",
    question:
      "Would you like us to contact your doctor informing them of what medicine we have provided after your treatment plan is shipped?",
    name: "contactDoctor",
    options: ["Yes", "No"],
  },
  {
    type: "address",
    question: "Your NHS Doctor's Info",
    name: "surgeryAddress",
    fields: [
      { label: "Start Typing GP Surgery Name", name: "gpSurgeryName" },
      { label: "Address Line 1", name: "addressLine1" },
      { label: "Postal Code", name: "postalCode" },
      { label: "City", name: "city" },
      { label: "Country/Region", name: "country" },
    ],
  },
];

const MultiStepForm = ({ stepsData = [] }) => {
  const data = stepsData.length > 0 ? stepsData : defaultStepsData; // Use dynamic data if available, otherwise fallback to dummy data
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      if (type === "checkbox") {
        // Ensure previous state exists and is an array
        const prevValues = prevData[name] || [];

        return {
          ...prevData,
          [name]: checked
            ? [...prevValues, value] // Add value if checked
            : prevValues.filter((v) => v !== value), // Remove value if unchecked
        };
      }

      return { ...prevData, [name]: value };
    });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    console.log("Form Submitted", formData);
  };

  // Adjusting progress bar to exclude Step 1 (BMI calculation)
  const progress = activeStep > 0 ? (activeStep / (data.length - 1)) * 100 : 0;

  const multiStepQue = {
    nextBtn: {
      fontSize: "18px",
      fontWeight: "600",
      lineHeight: "1.4",
      backgroundColor: "#FD6400",
      color: "#FFF",
      borderRadius: "50px",
      border: "none",
      padding: "12px 25px",
      textTransform: "uppercase",
      boxShadow: "none",
      marginLeft: "10px",
    },
    prevBtn: {
      fontSize: "18px",
      fontWeight: "600",
      lineHeight: "1.4",
      backgroundColor: "#104239",
      color: "#FFF",
      borderRadius: "50px",
      border: "none",
      padding: "12px 25px",
      textTransform: "uppercase",
      boxShadow: "none",
      marginRight: "10px",
    },
    boldLabel: {
      fontSize: "28px",
      fontWeight: "700",
      letterSpacing: "-0.5px",
      color: "#333",
      marginBottom: "5px",
    },
    noteSubTitle: {
      fontSize: "16px",
      fontWeight: "500",
      color: "#747474",
      lineHeight: "1.4",
      margin: "10px 0 15px 0",
    },
    label: {
      fontSize: "20px",
      fontWeight: "500",
      color: "#333333",
      lineHeight: "1.4",
    },
    checkboxStyle: {
        justifyContent: "top",
        fontSize: "20px",
        fontWeight: "500",
        color: "#333333",
        lineHeight: "1.4",
    },
    radioStyle: {
      display: "flex",
      flexWrap: "nowrap",
      flexDirection: "row",
      paddingBottom: "35px",
      marginBottom: "40px",
      borderBottom: "1px solid #ddd",
    },
    typeFields: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "20px",
    },
  };

  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); 
    }
  };

  return (
    <Box sx={{ border: "none" }}>
      {activeStep > 0 && (
        <LinearProgress variant="determinate" value={progress} sx={{ mb: 3 }} />
      )}

      <Box sx={{ mt: 3 }}>
        {/* Step 1: Add BMI Calculation Component */}
        {activeStep === 0 && <BmiCalculate />}
        
        {/* Step 2: Upload Images */}
        {activeStep === 1 && 
          <Card sx={{ maxWidth: 600, margin: "auto", padding: 2, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Upload and Preview Image
            </Typography>
            <input
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="upload-button"
            />
            <label htmlFor="upload-button">
              <Button variant="contained" component="span" startIcon={<ImageIcon />}>
                Upload Image
              </Button>
            </label>
            {image && (
              <Box mt={2}>
                <Typography variant="body2">Preview:</Typography>
                <img src={image} alt="Uploaded Preview" style={{ width: "100%", borderRadius: "8px" }} />
              </Box>
            )}
          </CardContent>
        </Card>
        }

        {/* Step 2: Lifestyle questions */}
        {activeStep === 2 && (
          <FormControl>
            <FormLabel style={multiStepQue.boldLabel}>
              {data[activeStep].question}
            </FormLabel>
            <Typography style={multiStepQue.noteSubTitle}>
              {data[activeStep].note}
            </Typography>
            {data[activeStep].options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    style={multiStepQue.checkboxStyle}
                    name={data[activeStep].name} // Use group name
                    value={option} // Set value
                    checked={(formData[data[activeStep].name] || []).includes(
                      option
                    )}
                    onChange={handleChange}
                  />
                }
                label={option}
              />
            ))}
          </FormControl>
        )}

        {/* Step 3: NHS Summary Care Record and Doctor's Info */}
        {activeStep === 3 && (
          <Box>
            {/* NHS Record Consent */}
            <FormControl>
              <Typography style={multiStepQue.boldLabel}>
                {data[activeStep].group_name}
              </Typography>
              <FormLabel style={multiStepQue.label}>
                {data[activeStep].question}
              </FormLabel>
              <FormLabel style={multiStepQue.noteSubTitle}>
                {data[activeStep].note}
              </FormLabel>

              <RadioGroup
                style={multiStepQue.radioStyle}
                name={data[activeStep].name}
                value={formData[data[activeStep].name] || ""}
                onChange={handleChange}
              >
                {data[activeStep].options.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            {/* Contact Doctor Consent */}
            <FormControl>
              <Typography style={multiStepQue.boldLabel}>
                {data[activeStep + 1].group_name}
              </Typography>
              <FormLabel style={multiStepQue.label}>
                {data[activeStep + 1].question}
              </FormLabel>
              <FormLabel style={multiStepQue.noteSubTitle}>
                {data[activeStep + 1].note}
              </FormLabel>
              <RadioGroup
                style={multiStepQue.radioStyle}
                name={data[activeStep + 1].name}
                value={formData[data[activeStep + 1].name] || ""}
                onChange={handleChange}
              >
                {data[activeStep + 1].options.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            {/* Surgery Address Fields */}

            <Box style={multiStepQue.typeFields}>
              {data[activeStep + 2].fields.map((field) => (
                <TextField
                  key={field.name}
                  fullWidth
                  label={field.label}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  margin="normal"
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>
         {/* Next Prev Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 4 }}>
        <Button
          style={multiStepQue.prevBtn}
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="contained"
        >
          <svg
            style={{ marginRight: "10px" }}
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 7L7 1M1 7L7 13M1 7L11.5 7M17 7L14.5 7"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Back
        </Button>
        {activeStep === data.length - 1 ? (
          <Button onClick={handleSubmit} variant="contained" color="success">
            Submit
          </Button>
        ) : (
          <Button
            style={multiStepQue.nextBtn}
            onClick={handleNext}
            variant="contained"
            color="primary"
          >
            Next
            <svg
              style={{ marginLeft: "10px" }}
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 7L11 1M17 7L11 13M17 7L6.5 7M1 7L3.5 7"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default MultiStepForm;
