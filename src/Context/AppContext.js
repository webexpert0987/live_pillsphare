import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the app context
const AppContext = createContext();

// Provider for app state
export const AppProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserDetails(JSON.parse(storedUser));
    }
  }, []);

  const login = (userInfo) => {
    setUserDetails(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo)); // Persist user info
  };

  const logout = () => {
    setUserDetails(null);
    localStorage.removeItem('user'); // Clear user info
  };

  return (
    <AppContext.Provider value={{ userDetails, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useApp = () => useContext(AppContext);
