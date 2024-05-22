import * as React from "react";
import { StatusBar } from "react-native";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import BottomNavigation from "./src/navigators/BottomNavigation";
import ConfigContext from "./src/context/ConfigContext";

export default function App() {
  const defaultConfig = {
    isDark: false // true: dark, false: light
  }

  const [config, setConfig] = React.useState(defaultConfig); 

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      <PaperProvider theme={config.isDark ? MD3DarkTheme : MD3LightTheme}>
        <StatusBar />
        <BottomNavigation />
      </PaperProvider>
    </ConfigContext.Provider>
  );
}
