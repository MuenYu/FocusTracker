import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import BottomNavigation from "./src/navigators/BottomNavigation";
import ConfigContext from "./src/context/AppContext";
import PopupContext from "./src/context/PopupContext";
import { LoadData, ResetData, SaveData } from "./src/services/storage";
import Popup from "./src/components/Popup";

export default function App() {
  const [appData, setAppData] = useState(null);
  const [notice, setNotice] = useState("");

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
    }
  }, [appData]);

  if (appData)
    return (
      <ConfigContext.Provider value={{ appData, setAppData }}>
        <PopupContext.Provider value={{ notice, setNotice }}>
          <PaperProvider theme={appData.isDark ? MD3DarkTheme : MD3LightTheme}>
            <StatusBar />
            <BottomNavigation />
            <Popup notice={notice} setNotice={setNotice} />
          </PaperProvider>
        </PopupContext.Provider>
      </ConfigContext.Provider>
    );
}
