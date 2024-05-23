import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function Empty({ name }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No existing {name} yet</Text>
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
