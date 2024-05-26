import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function Prompt({ prompt }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{prompt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});
