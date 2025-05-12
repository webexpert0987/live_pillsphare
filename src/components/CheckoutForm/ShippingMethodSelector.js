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

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const response = await getShippingMethods();
        // Transform shipping methods into required format
        const methods = [
          {
            id: "tracked24",
            name: "tracked24",
            label: "Royal Mail Tracked 24",
            price: "£3.95",
            description: "Next working day tracked delivery",
          },
          {
            id: "standard",
            name: "standard",
            label: "Standard Delivery",
            price: "£2.95",
            description: "3-5 working days",
          },
          {
            id: "special_delivery_1pm",
            name: "special_delivery_1pm",
            label: "Next day by 1pm",
            price: "£5.95",
            description: "Next working day before 1pm",
          },
          {
            id: "next_day_9am",
            name: "next_day_9am",
            label: "Next day by 9am",
            price: "£13.95",
            description: "Next working day before 9am (Monday-Saturday)",
          },
          {
            id: "free_shipping",
            name: "free_shipping",
            label: "Free Shipping",
            price: "FREE",
            description: "Orders over £30 (3-5 working days)",
          },
        ];
        setShippingMethods(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shipping methods:", error);
        setLoading(false);
      }
    };

    fetchShippingMethods();
  }, []);

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
          value={selectedMethod}
          onChange={(e) => { onMethodSelect(e.target.value)         
          }}
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
