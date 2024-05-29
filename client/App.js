import { StatusBar } from "react-native";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import BottomNavigation from "./src/navigators/BottomNavigation";
import { AppProvider } from "./src/context/AppContext";
import { PopupProvider } from "./src/context/PopupContext";
import Login from "./src/screen/Login";

export default function App() {
  return (
    <AppProvider>
      <PopupProvider>
        <StatusBar />
        <BottomNavigation />
        {/* <Login /> */}
      </PopupProvider>
    </AppProvider>
  );
}
