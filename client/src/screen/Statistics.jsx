import { useContext } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import AppContext from "../context/AppContext";

export default function Statistics() {
  const {appData} = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text>{JSON.stringify(appData)}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
