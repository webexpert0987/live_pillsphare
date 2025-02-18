import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  LinearProgress,
  Grid2,
} from "@mui/material";
import BmiIcon from "../../pages/images/bmi-icon.png";

const BMI_Calculator = () => {
  const [isMetric, setIsMetric] = useState(true);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBmi] = useState(0);

  const handleToggle = (metric) => {
    setIsMetric(metric);
    setHeight(0);
    setWeight(0);
    setBmi(0);
  };

  const calculateBMI = () => {
    let calculatedBMI = 0;
    if (isMetric) {
      // Metric: BMI = weight (kg) / (height (m) * height (m))
      calculatedBMI = weight / ((height / 100) * (height / 100));
    } else {
      // Imperial: BMI = (weight (lbs) / (height (in) * height (in))) * 703
      const heightInInches = height.feet * 12 + height.inches;
      const weightInLbs = weight.stone * 14 + weight.lbs;
      calculatedBMI = (weightInLbs / (heightInInches * heightInInches)) * 703;
    }
    setBmi(calculatedBMI.toFixed(2));
  };

  const getProgressValue = () => {
    if (bmi < 18.5) return 15; // Underweight
    if (bmi >= 18.5 && bmi <= 24.9) return 30; // Normal weight
    if (bmi >= 25 && bmi <= 29.9) return 60; // Overweight
    return 90; // Obese
  };

  const BmiStyle = {
    switchButton: {
      borderRadius: "0",
      minWidth: "140px",
      margin: "0",
      padding: "9px 10px",
      fontWeight: "500",
      color: "#fff",
      transition: "background-color 0.3s ease",
      textTransform: "none",
      fontSize: "16px",
    },
    active: {
      backgroundColor: "#FD6400",
      color: "#fff",
    },
    inactive: {
      backgroundColor: "#F1F1F1",
      color: "#104239",
    },
    progressTxt: {
      color: "#104239",
      fontWeight: "600",
    },
    selectStyle: {
      "& .MuiSelect-select": {
        borderRadius: "50px",
        backgroundColor: "#FFF",
        border: "1px solid #EDEDED",
        padding: "14px 22px",
        fontSize: "16px",
        color: "#333",
        textAlign: "left",
      },
      "&.MuiOutlinedInput-root": {
        "& fieldset": {
          border: "none",
        },
      },
    },
  };

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "20px", sm: "24px", md: "28px" },
            color: "#333333",
            lineHeight: "1.3",
            marginBottom: "10px",
            marginTop: "30px",
            fontWeight: "700",
          }}
        >
          What is your current Body Mass Index (BMI)?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "15px", sm: "15px", md: "16px" },
            color: "#333333",
            fontWeight: "500",
          }}
        >
          Please note: Weight loss treatments are only licensed for patients
          with a BMI ≥30 kg/m² or ≥27 kg/m² with at least one weight-related
          comorbidity. If you are an existing patient using Mounjaro, please
          update your BMI.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "40px 0 30px 0",
          }}
        >
          <Button
            sx={{
              ...BmiStyle.switchButton,
              ...(isMetric ? BmiStyle.active : BmiStyle.inactive),
              borderRadius: "50px 0 0 50px",
            }}
            onClick={() => handleToggle(true)}
          >
            Metric
          </Button>
          <Button
            sx={{
              ...BmiStyle.switchButton,
              ...(!isMetric ? BmiStyle.active : BmiStyle.inactive),
              borderRadius: "0 50px 50px 0",
            }}
            onClick={() => handleToggle(false)}
          >
            Imperial
          </Button>
        </Box>

        <Box
          sx={{
            width: "515px",
            maxWidth: "100%",
            margin: "0 auto",
            backgroundColor: "#F7F7F7",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {isMetric ? (
            <>
              <Box
                sx={{
                  backgroundColor: "#104239",
                  padding: "15px 0 82px 0",
                }}
              >
                <Box
                  component="img"
                  src={BmiIcon}
                  alt="BMI Icon"
                  sx={{
                    height: "129px", // Adjust height as needed
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              </Box>
              <Box
                sx={{
                  backgroundColor: "#88C936",
                  width: "128px",
                  height: "128px",
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  border: "5px solid #FFF",
                  marginTop: "-70px",
                  color: "#FFF",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  Your BMI: <br />
                  <Box
                    sx={{
                      fontSize: "34px",
                      fontWeight: "700",
                      marginTop: "-5px",
                    }}
                  >
                    {bmi}
                  </Box>
                </Typography>
              </Box>
              <Box
                sx={{
                  padding: {
                    xs: "20px 15px 0px 15px",
                    sm: "20px 20px 0px 20px",
                    md: "20px 30px 0px 30px",
                  },
                }}
              >
                <Grid2 container spacing={4}>
                  <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                    <FormControl fullWidth sx={{ mt: 0 }}>
                      <Select
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        displayEmpty
                        renderValue={(selected) =>
                          selected ? `${selected} cm` : "Height (cm)"
                        }
                        sx={BmiStyle.selectStyle}
                      >
                        <MenuItem disabled value="">
                          Height (cm)
                        </MenuItem>
                        {[...Array(201).keys()].slice(50).map((h) => (
                          <MenuItem key={h} value={h}>
                            {h} cm
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                    <FormControl fullWidth sx={{ mt: 0 }}>
                      <Select
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        displayEmpty
                        renderValue={(selected) =>
                          selected ? `${selected} kg` : "Weight (kg)"
                        }
                        sx={BmiStyle.selectStyle}
                      >
                        <MenuItem disabled value="">
                          Weight (kg)
                        </MenuItem>
                        {[...Array(151).keys()].slice(30).map((w) => (
                          <MenuItem key={w} value={w}>
                            {w} kg
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid2>
                </Grid2>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  backgroundColor: "#104239",
                  padding: "15px 0 82px 0",
                }}
              >
                <Box
                  component="img"
                  src={BmiIcon}
                  alt="BMI Icon"
                  sx={{
                    height: "129px", // Adjust height as needed
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              </Box>
              <Box
                sx={{
                  backgroundColor: "#88C936",
                  width: "128px",
                  height: "128px",
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  border: "5px solid #FFF",
                  marginTop: "-70px",
                  color: "#FFF",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  Your BMI: <br />
                  <Box
                    sx={{
                      fontSize: "34px",
                      fontWeight: "700",
                      marginTop: "-5px",
                    }}
                  >
                    {bmi}
                  </Box>
                </Typography>
              </Box>
              <Box
                sx={{
                  padding: {
                    xs: "20px 15px 0px 15px",
                    sm: "20px 20px 0px 20px",
                    md: "20px 30px 0px 30px",
                  },
                }}
              >
                <Grid2 container spacing={4}>
                  <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                    <FormControl fullWidth sx={{ mt: 0 }}>
                      <Select
                        value={height.feet || 0}
                        onChange={(e) =>
                          setHeight({ ...height, feet: e.target.value })
                        }
                        displayEmpty
                        renderValue={(selected) =>
                          selected ? `${selected} ft` : "Height (ft)"
                        }
                        sx={BmiStyle.selectStyle}
                      >
                        <MenuItem disabled value="">
                          Height (ft)
                        </MenuItem>
                        {[...Array(9).keys()].slice(3).map((f) => (
                          <MenuItem key={f} value={f}>
                            {f} ft
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                    <FormControl fullWidth sx={{ mt: 0 }}>
                      <Select
                        value={height.inches || 0}
                        onChange={(e) =>
                          setHeight({ ...height, inches: e.target.value })
                        }
                        displayEmpty
                        renderValue={(selected) =>
                          selected ? `${selected} in` : "Height (in)"
                        }
                        sx={BmiStyle.selectStyle}
                      >
                        <MenuItem disabled value="">
                          Height (in)
                        </MenuItem>
                        {[...Array(12).keys()].map((i) => (
                          <MenuItem key={i} value={i}>
                            {i} in
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                    <FormControl fullWidth sx={{ mt: 0 }}>
                      <Select
                        value={weight.stone || 0}
                        onChange={(e) =>
                          setWeight({ ...weight, stone: e.target.value })
                        }
                        displayEmpty
                        renderValue={(selected) =>
                          selected ? `${selected} st` : "Weight (st)"
                        }
                        sx={BmiStyle.selectStyle}
                      >
                        <MenuItem disabled value="">
                          Weight (st)
                        </MenuItem>
                        {[...Array(20).keys()].slice(5).map((s) => (
                          <MenuItem key={s} value={s}>
                            {s} st
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                    <FormControl fullWidth sx={{ mt: 0 }}>
                      <Select
                        value={weight.lbs || 0}
                        onChange={(e) =>
                          setWeight({ ...weight, lbs: e.target.value })
                        }
                        displayEmpty
                        renderValue={(selected) =>
                          selected ? `${selected} lbs` : "Weight (lbs)"
                        }
                        sx={BmiStyle.selectStyle}
                      >
                        <MenuItem disabled value="">
                          Weight (lbs)
                        </MenuItem>
                        {[...Array(14).keys()].map((l) => (
                          <MenuItem key={l} value={l}>
                            {l} lbs
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid2>
                </Grid2>
              </Box>
            </>
          )}
          <Box
            sx={{
              padding: "0 25px",
              margin: "30px 0 10px 0",
            }}
          >
            <Button
              variant="contained"
              onClick={calculateBMI}
              sx={{
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "1.4",
                backgroundColor: "#FD6400",
                color: "#FFF",
                borderRadius: "50px",
                border: "none",
                padding: "12px 25px",
                width: "100%",
                textTransform: "uppercase",
                boxShadow: "none",
              }}
            >
              Proceed{" "}
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
          </Box>

          <Box
            sx={{
              width: "100%",
              backgroundColor: "#F6EFDF",
              padding: "35px 24px 15px 24px",
              marginTop: "40px",
            }}
          >
            <LinearProgress
              variant="determinate"
              value={getProgressValue()}
              sx={{
                height: 10,
                borderRadius: 5,
                background:
                  "linear-gradient(to right, #AFD858 0%, #AFD858 33%, #FFA132 33%, #FFA132 66%, #FA6464 66%, #FA6464 100%)",
              }}
            />
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography style={BmiStyle.progressTxt} variant="body2">
                Safest BMI
              </Typography>
              <Typography style={BmiStyle.progressTxt} variant="body2">
                Safer BMI
              </Typography>
              <Typography style={BmiStyle.progressTxt} variant="body2">
                High-Risk BMI
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BMI_Calculator;
