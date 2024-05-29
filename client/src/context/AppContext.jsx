import React from "react";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { LoadData, SaveData } from "../services/storage";
import { useEffect, useState } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [appData, setAppData] = useState(null);

  // load records at the beginning
  useEffect(() => {
    LoadData().then((data) => {
      setAppData(data);
    });
  }, []);

  // every time state changes, it will update the asyncstorage
  useEffect(() => {
    if (appData) {
      SaveData(appData);
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
