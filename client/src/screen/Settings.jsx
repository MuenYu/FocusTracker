// src/screens/SettingsScreen.js
import React, { useContext } from 'react';
import { SafeAreaView, Switch, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import AppContext from '../context/AppContext';

export default function Settings() {
  const { appData, setAppData } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Dark Theme</Text>
      <Switch
        value={appData.isDark}
        onValueChange={() => setAppData({...appData, isDark: !appData.isDark})}
      />
      <Text>{JSON.stringify(appData)}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
});
