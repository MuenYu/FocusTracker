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

  // load records at the beginning
  useEffect(() => {
    loadAppData();
  }, []);

  const loadAppData = async () => {
    const data = await LoadData(key);
    setAppData(data ?? {...defaultAppData});
  };

  const updateAppData = async (data) => {
    await SaveData(key, data);
    setAppData(data);
  };

  const resetAppData = async () => {
    await RemoveData(key);
    setAppData({...defaultAppData});
  };

  if (appData)
    return (
      <AppDataContext.Provider value={{ appData, updateAppData, resetAppData }}>
        {children}
      </AppDataContext.Provider>
    );
};

export default AppDataContext;
