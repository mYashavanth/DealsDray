import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [EmployeesData, setEmployeesData] = useState([]);
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null
  });
  function login(user) {
    setAuth({
      isAuthenticated: true,
      user,
    });
  }
  function logout() {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
  }

  const authDetails = {
    auth,
    login,
    logout,
  };
  console.log(authDetails);

  return (
    <AuthContext.Provider value={{ authDetails, setEmployeesData, EmployeesData }}>
      {children}
    </AuthContext.Provider>
  );
}
