/**
 * the global app configuration context
 * configuration are persistent in asyncstorage
 */

import React, { useEffect, useState } from "react";
import { LoadData, RemoveData, SaveData } from "../services/storage";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";

const AppConfigContext = React.createContext();
const key = "config";
const defaultConfig = {
  isDark: false, // true: dark, false: light
  zoom: 1,
};

SplashScreen.preventAutoHideAsync();

export const AppConfigProvider = ({ children }) => {
  const [appConfig, setAppConfig] = useState(null);

  useEffect(() => {
    loadAppConfig().then(() => {
      SplashScreen.hideAsync();
    });
  }, []);

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

  if (!appConfig) return null;

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
