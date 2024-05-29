import { StatusBar } from "react-native";
import BottomNavigation from "./src/navigators/BottomNavigation";
import Login from "./src/screen/Login";
import { AppDataProvider } from "./src/context/AppDataContext";
import { AppConfigProvider } from "./src/context/AppConfigContext";
import { PopupProvider } from "./src/context/PopupContext";
import AuthContext, { AuthProvider } from "./src/context/AuthContext";
import { useContext } from "react";

export default function App() {
  return (
    <AuthProvider>
      <AppConfigProvider>
        <AppDataProvider>
          <PopupProvider>
            <StatusBar />
            <Root />
          </PopupProvider>
        </AppDataProvider>
      </AppConfigProvider>
    </AuthProvider>
  );
}

const Root = () => {
  const { token } = useContext(AuthContext);
  if (token) return <BottomNavigation />;
  else return <Login />;
};
