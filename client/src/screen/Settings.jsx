import { useContext } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useTheme, Switch } from "react-native-paper";
import Slider from "@react-native-community/slider";
import Header from "../components/Header";
import ListItem from "../components/ListItem";
import { useNavigation } from "@react-navigation/native";
import PopupContext from "../context/PopupContext";
import AuthContext from "../context/AuthContext";
import AppConfigContext from "../context/AppConfigContext";
import AppDataContext from "../context/AppDataContext";

export default function Settings() {
  const { logout } = useContext(AuthContext);
  const { appConfig, updateAppConfig, resetAppConfig } =
    useContext(AppConfigContext);
  const { resetAppData } = useContext(AppDataContext);
  const { setNotice } = useContext(PopupContext);
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Application Settings" />
      <ScrollView>
        <ListItem
          title="Dark Mode"
          right={() => (
            <Switch
              value={appConfig.isDark}
              onValueChange={() =>
                updateAppConfig({ ...appConfig, isDark: !appConfig.isDark })
              }
            />
          )}
        />
        <ListItem
          title="Font Size"
          right={() => (
            <Slider
              style={styles.slide}
              minimumValue={1}
              maximumValue={1.5}
              step={0.25}
              value={appConfig.zoom}
              onValueChange={(value) => {
                updateAppConfig({ ...appConfig, zoom: value });
              }}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.primary}
              thumbTintColor={theme.colors.primary}
            />
          )}
        />
        <ListItem
          title="About"
          onPress={() => {
            navigation.navigate("About");
          }}
        />
        <ListItem
          title="Sign Out"
          onPress={async () => {
            await resetAppData();
            await resetAppConfig();
            await logout();
            setNotice("Log out success");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: { width: "40%" },
});
