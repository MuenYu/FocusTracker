import React, { useContext, useEffect, useState } from "react";
import { LoadData, RemoveData, SaveData } from "../services/storage";

const AuthContext = React.createContext();
const key = "jwt";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    const token = await LoadData(key);
    setToken(token);
  };

  const login = async (token) => {
    await SaveData(key, token);
    setToken(token);
  };

  const logout = async () => {
    await RemoveData(key);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
