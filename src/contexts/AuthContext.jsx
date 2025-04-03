import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    // JSON.parse(localStorage.getItem("isAuth")) || false
    true
  );

  useEffect(() => {
    localStorage.setItem("isAuth", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuth", JSON.stringify(true));
   
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuth");
    localStorage.removeItem("auditor_id")
    localStorage.removeItem("auditor_name")

  };



  // console.log(isAuth);
  // console.log(isAuthenticated);
  
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};