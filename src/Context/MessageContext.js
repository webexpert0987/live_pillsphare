import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

// Create the context
const MessageContext = createContext();

// Provider component
export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState({
    text: '',
    type: '',
    open: false,
  });

  const showMessage = (text, type) => {
    setMessage({ text, type, open: true });
  };

  const hideMessage = () => {
    setMessage({ ...message, open: false });
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={message.open}
        autoHideDuration={6000}
        onClose={hideMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={hideMessage}
          severity={message.type} // 'success' or 'error'
          sx={{ width: '100%' }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </MessageContext.Provider>
  );
};

// Custom hook for consuming the context
export const useMessage = () => useContext(MessageContext);
