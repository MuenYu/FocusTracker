import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import AppContext from "../context/AppContext";

export default function Prompt({ prompt }) {
  const {appData} = useContext(AppContext)
  const styles = createStyles(appData.zoom)

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
