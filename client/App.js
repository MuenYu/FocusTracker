import { StatusBar } from "react-native";
import BottomNavigation from "./src/navigators/BottomNavigation";
import { AppProvider } from "./src/context/AppContext";
import { PopupProvider } from "./src/context/PopupContext";
import Login from "./src/screen/Login";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  


  return (
    <AppProvider>
      <PopupProvider>
        <StatusBar />
        <AuthProvider app={<BottomNavigation />} login={<Login />} />
      </PopupProvider>
    </AppProvider>
  );
}
