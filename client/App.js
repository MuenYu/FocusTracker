import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import BottomNavigation from "./src/navigators/BottomNavigation";
import ConfigContext from "./src/context/AppContext";
import {
  LoadData,
  ResetData,
  SaveData,
} from "./src/services/storage";

export default function App() {
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);

  // load records at the beginning
  useEffect(() => {
    async function loadAppData() {
      // ResetData()
      const data = await LoadData();
      setAppData(data);
    }
    loadAppData();
  }, []);

  // every time state changes, it will update the asyncstorage
  useEffect(() => {
    async function saveAppData(appData) {
      SaveData(appData);
    }
    if (appData) {
      saveAppData(appData);
      setLoading(false);
    }
  }, [appData]);

  if (!loading)
    return (
      <ConfigContext.Provider value={{ appData, setAppData }}>
        <PaperProvider theme={appData.isDark ? MD3DarkTheme : MD3LightTheme}>
          <StatusBar />
          <BottomNavigation />
        </PaperProvider>
      </ConfigContext.Provider>
    );
}
