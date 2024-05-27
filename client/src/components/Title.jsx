import { useContext } from "react";
import { Text } from "react-native-paper";
import AppContext from "../context/AppContext";
import { StyleSheet } from "react-native";

export default function Title({ children }) {
  const { appData } = useContext(AppContext);
  const styles = createStyle(appData.zoom);
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
