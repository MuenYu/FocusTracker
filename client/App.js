import { StatusBar } from "react-native";
import BottomNavigation from "./src/navigators/BottomNavigation";
import Login from "./src/screen/Login";
import AppDataContext, { AppDataProvider } from "./src/context/AppDataContext";
import AppConfigContext, {
  AppConfigProvider,
} from "./src/context/AppConfigContext";
import { PopupProvider } from "./src/context/PopupContext";
import AuthContext, { AuthProvider } from "./src/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <AuthProvider>
      <AppConfigProvider>
        <AppDataProvider>
          <Root />
        </AppDataProvider>
      </AppConfigProvider>
    </AuthProvider>
  );
}

const Root = () => {
  const { loadToken, token } = useContext(AuthContext);
  const { loadAppConfig, appConfig } = useContext(AppConfigContext);
  const { loadAppData } = useContext(AppDataContext);
  const [loading, setLoading] = useState(false);

  // load everything
  useEffect(() => {
    new Promise.all([loadToken(), loadAppConfig(), loadAppData()]).then(() => {
      setLoading(true);
      SplashScreen.hideAsync();
    });
  }, []);

  if (loading)
    return (
      <PaperProvider theme={appConfig.isDark ? MD3DarkTheme : MD3LightTheme}>
        <PopupProvider>
          <StatusBar />
          {token ? <BottomNavigation /> : <Login />}
        </PopupProvider>
      </PaperProvider>
    );
};
