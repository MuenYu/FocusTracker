/**
 * the global user data in app
 * which are persistent in asyncstorage
 */

import React from "react";
import { LoadData, RemoveData, SaveData } from "../services/storage";
import { useEffect, useState } from "react";

const AppDataContext = React.createContext();
const key = "data";
const defaultAppData = {
  records: new Array(),
};

export const AppDataProvider = ({ children }) => {
  const [appData, setAppData] = useState(null);

  const loadAppData = async () => {
    const data = await LoadData(key);
    setAppData(data ?? { ...defaultAppData });
  };

  const updateAppData = async (data) => {
    await SaveData(key, data);
    setAppData(data);
  };

  const resetAppData = async () => {
    await RemoveData(key);
    setAppData({ ...defaultAppData });
  };

  return (
    <AppDataContext.Provider value={{ appData, updateAppData, resetAppData, loadAppData }}>
      {children}
    </AppDataContext.Provider>
  );
};

export default AppDataContext;
