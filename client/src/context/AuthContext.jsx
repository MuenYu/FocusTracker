/**
 * the global authentication info context
 * which is persistent in secure storage
 */

import React, { useEffect, useState } from "react";
import { LoadData, RemoveData, SaveData } from "../services/storage";

const AuthContext = React.createContext();
const key = "jwt";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const loadToken = async () => {
    const token = await LoadData(key, true);
    setToken(token);
  };

  const login = async (token) => {
    await SaveData(key, token, true);
    setToken(token);
  };

  const logout = async () => {
    await RemoveData(key, true);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loadToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
