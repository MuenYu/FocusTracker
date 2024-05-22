// src/screens/SettingsScreen.js
import React, { useContext } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import ConfigContext from '../context/ConfigContext';

export default function Settings() {
  const { config, setConfig } = useContext(ConfigContext);

  return (
    <View style={styles.container}>
      <Text>Dark Theme</Text>
      <Switch
        value={config.isDark}
        onValueChange={() => setConfig({...config, isDark: !config.isDark})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
