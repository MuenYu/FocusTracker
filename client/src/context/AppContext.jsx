import React from "react";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { LoadData, SaveData } from "../services/storage";
import { useEffect, useState } from "react";

const key = "AppData";
const AppContext = React.createContext();

const defaultAppData = {
  isDark: false, // true: dark, false: light
  jwt: null,
  zoom: 1,
  records: [], // local record state
};

export const AppProvider = ({ children }) => {
  const [appData, setAppData] = useState(null);

  // load records at the beginning
  useEffect(() => {
    LoadData(key).then((data) => {
      setAppData(data);
    });
  }, []);

  // every time state changes, it will update the asyncstorage
  useEffect(() => {
    if (appData) {
      SaveData(key, appData);
    } else {
      setAppData(defaultAppData);
    }
  }, [appData]);

  if (appData)
    return (
      <AppContext.Provider value={{ appData, setAppData }}>
        <PaperProvider theme={appData.isDark ? MD3DarkTheme : MD3LightTheme}>
          {children}
        </PaperProvider>
      </AppContext.Provider>
    );
};

export default AppContext;
