/**
 * a white screen to show prompt to user
 * supporting font zoom in app config
 */

import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import AppConfigContext from "../context/AppConfigContext";

export default function Prompt({ prompt }) {
  const {appConfig} = useContext(AppConfigContext)
  const styles = createStyles(appConfig.zoom)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{prompt}</Text>
    </View>
  );
}

const createStyles = (zoom) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20 * zoom,
  },
});
