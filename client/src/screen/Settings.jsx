// src/screens/SettingsScreen.js
import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useTheme, Switch, Text } from "react-native-paper";
import AppContext from "../context/AppContext";
import Slider from "@react-native-community/slider";
import Header from "../components/Header";
import ListItem from "../components/ListItem";

export default function Settings() {
  const { appData, setAppData } = useContext(AppContext);
  const theme = useTheme();
  const styles = StyleSheet.create(createStyle(theme));

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
              style={{ width: "40%", height: 40 }}
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
        <Text>{JSON.stringify(appData)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyle = (theme) => ({
  container: {
    flex: 1,
  },
});
