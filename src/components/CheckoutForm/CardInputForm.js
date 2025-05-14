import React, { useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  InputAdornment,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { CalendarMonth, Password, Pin } from "@mui/icons-material";

function validateCardNumber(number) {
  const cleaned = number.replace(/\s+/g, "");
  const regex = /^[0-9]{16}$/;
  return regex.test(cleaned);
}

function CardInputForm({
  values,
  setValues,
  errors,
  setErrors,
  cardValidation,
}) {
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    value = value.replace(/(.{4})/g, "$1 ").trim();
    const newValues = { ...values, cardNumber: value };
    setValues(newValues);
    setErrors(cardValidation(newValues));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    // Validate expiry is not in the past
    let expiryError = "";
    if (value.length === 5) {
      const [mm, yy] = value.split("/").map(Number);
      const now = new Date();
      const currentYear = now.getFullYear() % 100;
      const currentMonth = now.getMonth() + 1;
      if (mm < 1 || mm > 12) {
        expiryError = "Invalid month in expiry date";
      } else if (
        yy < currentYear ||
        (yy === currentYear && mm < currentMonth)
      ) {
        expiryError = "Card has expired";
      }
    }
    const newValues = { ...values, expiryDate: value };
    setValues(newValues);
    const newErrors = cardValidation(newValues);
    if (expiryError) newErrors.expiryDate = expiryError;
    setErrors(newErrors);
  };

  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    const newValues = { ...values, securityCode: value };
    setValues(newValues);
    setErrors(cardValidation(newValues));
  };

  const handleCardholderNameChange = (e) => {
    const newValues = { ...values, cardholderName: e.target.value };
    setValues(newValues);
    setErrors(cardValidation(newValues));
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Cardholder Name"
        value={values.cardholderName}
        onChange={handleCardholderNameChange}
        margin="normal"
        error={!!errors.cardholderName}
        helperText={errors.cardholderName}
      />

      <TextField
        fullWidth
        label="Card Number"
        value={values.cardNumber}
        onChange={handleCardNumberChange}
        margin="normal"
        error={!!errors.cardNumber}
        helperText={errors.cardNumber}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CreditCardIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Expiry Date"
            value={values.expiryDate}
            onChange={handleExpiryChange}
            margin="normal"
            placeholder="MM/YY"
            error={!!errors.expiryDate}
            helperText={errors.expiryDate}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonth />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="CVC"
            value={values.securityCode}
            onChange={handleCvcChange}
            margin="normal"
            error={!!errors.securityCode}
            helperText={errors.securityCode}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Password />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CardInputForm;
