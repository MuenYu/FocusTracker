import React, { useEffect, useState } from "react";
import { LoadData, RemoveData, SaveData } from "../services/storage";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";

const AppConfigContext = React.createContext();
const key = "config";
const defaultConfig = {
  isDark: false, // true: dark, false: light
  zoom: 1,
};

export const AppConfigProvider = ({ children }) => {
  const [appConfig, setAppConfig] = useState(null);

  useEffect(() => {
    loadAppConfig();
  }, []);

  const loadAppConfig = async () => {
    const config = await LoadData(key);
    setAppConfig(config ?? {...defaultConfig});
  };

  const updateAppConfig = async (config) => {
    await SaveData(key, config);
    setAppConfig(config);
  };

  const resetAppConfig = async () => {
    await RemoveData(key);
    setAppConfig({...defaultConfig});
  };

  if (appConfig)
    return (
      <AppConfigContext.Provider
        value={{ appConfig, updateAppConfig, resetAppConfig }}
      >
        <PaperProvider theme={appConfig.isDark ? MD3DarkTheme : MD3LightTheme}>
          {children}
        </PaperProvider>
      </AppConfigContext.Provider>
    );
};

export default AppConfigContext;
