/**
 * the title component of the app
 * used to show the title in page section (not the title of the whole page)
 * supporting font zoom in app config
 */

import { useContext } from "react";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import AppConfigContext from "../context/AppConfigContext";

export default function Title({ children }) {
  const { appConfig } = useContext(AppConfigContext);
  const styles = createStyle(appConfig.zoom);
  return (
    <Text style={styles.text} numberOfLines={1}>
      {children}
    </Text>
  );
}

const createStyle = (zoom) =>
  StyleSheet.create({
    text: {
      fontSize: 24 * zoom,
    },
  });
