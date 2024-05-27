import { useContext } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useTheme, Switch } from "react-native-paper";
import AppContext from "../context/AppContext";
import Slider from "@react-native-community/slider";
import Header from "../components/Header";
import ListItem from "../components/ListItem";
import { useNavigation } from "@react-navigation/native";
import { defaultAppData } from "../services/storage";

export default function Settings() {
  const { appData, setAppData } = useContext(AppContext);
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
              value={appData.isDark}
              onValueChange={() =>
                setAppData({ ...appData, isDark: !appData.isDark })
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
              value={appData.zoom}
              onValueChange={(value) => {
                setAppData({ ...appData, zoom: value });
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
          onPress={() => {
            setAppData(defaultAppData);
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
  slide: { width: "40%", height: 20 },
});
