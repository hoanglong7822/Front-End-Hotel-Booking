import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

/**
 * Provides authentication state and user details to the application.
 * @namespace AuthProvider
 * @component
 */
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [authCheckTrigger, setAuthCheckTrigger] = useState(false);
  const [response, setResponse] = useState({});
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (response && response.data) {
        setIsAuthenticated(response.data.isAuthenticated);
        setUserDetails(response.data.userDetails);
      }
    };
    checkAuthStatus();
  }, [authCheckTrigger, response]);

  const triggerAuthCheck = () => {
    setAuthCheckTrigger((prev) => !prev);
  };
  const handleUpdateUser = (response) => {
    setResponse(response);
  };
  const handleLogout = () => {
    setResponse((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        isAuthenticated: false,
      },
    }));
    setAuthCheckTrigger((prev) => !prev);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userDetails,
        handleUpdateUser,
        handleLogout,
        triggerAuthCheck,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
