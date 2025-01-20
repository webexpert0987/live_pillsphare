import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

// Create the error context
const ErrorContext = createContext();

// Provider for error handling
export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState({ message: '', open: false });

  const showError = (message) => {
    setError({ message, open: true });
  };

  const hideError = () => {
    setError({ ...error, open: false });
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      <Snackbar
        open={error.open}
        autoHideDuration={6000}
        onClose={hideError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={hideError} severity="error" sx={{ width: '100%' }}>
          {error.message}
        </Alert>
      </Snackbar>
    </ErrorContext.Provider>
  );
};

// Custom hook to use the error context
export const useError = () => useContext(ErrorContext);
