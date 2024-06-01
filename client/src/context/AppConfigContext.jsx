/**
 * the global app configuration context
 * configuration are persistent in asyncstorage
 */

import React, { useState } from "react";
import { LoadData, RemoveData, SaveData } from "../services/storage";

const AppConfigContext = React.createContext();
const key = "config";
const defaultConfig = {
  isDark: false, // true: dark, false: light
  zoom: 1,
};

export const AppConfigProvider = ({ children }) => {
  const [appConfig, setAppConfig] = useState(null);

  const loadAppConfig = async () => {
    const config = await LoadData(key);
    setAppConfig(config ?? { ...defaultConfig });
  };

  const updateAppConfig = async (config) => {
    await SaveData(key, config);
    setAppConfig(config);
  };

  const resetAppConfig = async () => {
    await RemoveData(key);
    setAppConfig({ ...defaultConfig });
  };

  return (
    <AppConfigContext.Provider
      value={{ appConfig, updateAppConfig, resetAppConfig, loadAppConfig }}
    >
      {children}
    </AppConfigContext.Provider>
  );
};

export default AppConfigContext;
