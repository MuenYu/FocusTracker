// src/screens/SettingsScreen.js
import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Appbar, List, useTheme, Switch, Text } from "react-native-paper";
import AppContext from "../context/AppContext";
import Slider from "@react-native-community/slider";

export default function Settings() {
  const { appData, setAppData } = useContext(AppContext);
  const theme = useTheme();
  const styles = StyleSheet.create(createStyle(theme));

  return (
    <SafeAreaView style={styles.container}>
      <Appbar>
        <Appbar.Content title="Application Setting" />
      </Appbar>
      <ScrollView>
        <List.Item
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
        <List.Item
          title="Font Size"
          right={() => (
            <Slider
              style={{ width: "40%", height: 40 }}
              minimumValue={1}
              maximumValue={1.5}
              step={0.25}
              value={appData.zoom}
              onValueChange={(value)=>{
                setAppData({...appData, zoom: value })
              }}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.primary}
              thumbTintColor={theme.colors.primary}
            />
          )}
        />
        <Text>{JSON.stringify(appData)}</Text>
        <Text>{JSON.stringify(theme.fonts.title)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyle = (theme) => ({
  container: {
    flex: 1,
  },
});
