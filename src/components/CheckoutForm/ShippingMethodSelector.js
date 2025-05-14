import React, { useState, useEffect } from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
  CircularProgress,
  FormControl,
} from "@mui/material";
import { getShippingMethods } from "../../apis/apisList/orderApi";

const ShippingMethodSelector = ({ selectedMethod, onMethodSelect }) => {
  const [shippingMethods, setShippingMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const response = await getShippingMethods();

        const transformed = response.flatMap((item) =>
          item.methods.map((method) => ({
            id: method.settings?.title,
            zoneName: item.name,
            name: method.settings?.title || method.title,
            price: method.cost || "0",
          }))
        );

        setShippingMethods(transformed);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shipping methods:", error);
        setLoading(false);
      }
    };

    fetchShippingMethods();
  }, []);

  const handleChange = (e) => {
    let methodId = e.target.value;
    setValue(methodId);
    const method = shippingMethods.find((m) => m.id == methodId);
    onMethodSelect(method);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={2}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        border: "1px solid #d1cbcb",
        padding: "20px",
        borderRadius: "10px",
        width: "100%",
        mb: "15px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Shipping options
      </Typography>

      <FormControl
        component="fieldset"
        sx={{
          width: "100%",
        }}
      >
        <RadioGroup
          value={value}
          onChange={handleChange}
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          {shippingMethods.length ? (
            shippingMethods.map((method) => (
              <FormControlLabel
                key={method.id}
                value={method.id}
                control={<Radio />}
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  mb: 1,
                  p: 1,
                  width: "100%",
                  m: 0,
                  ".MuiFormControlLabel-label": { width: "100%" },
                }}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography variant="subtitle1">
                      {method?.name || "N/A"}
                      <span
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        {" "}
                        ({method?.zoneName || "N/A"})
                      </span>
                    </Typography>

                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      £{method?.price || "0.00"}
                    </Typography>
                  </Box>
                }
              />
            ))
          ) : (
            <Box>
              <Typography variant="subtitle1" color="red">
                No shipping options found.
              </Typography>
            </Box>
          )}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default ShippingMethodSelector;
