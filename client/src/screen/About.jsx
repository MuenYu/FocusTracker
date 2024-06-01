import { SafeAreaView, ScrollView, Linking } from "react-native";
import Header from "../components/Header";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Title from "../components/Title";
import { useContext } from "react";
import licenses from "../../assets/licenses.json";
import Logo from "../components/Logo";
import AppConfigContext from "../context/AppConfigContext";

export default function About() {
  const { appConfig } = useContext(AppConfigContext);
  const styles = createStyles(appConfig.zoom);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="About" back={true} />
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Logo />
        <Title>About Focus Tracker</Title>
        <Text style={styles.content}>
          Focus Tracker is an Application with cloud sync to record your focus
          time and encourage you to keep focus status.
        </Text>
        <Title>Dependency List</Title>
        <Text style={styles.content}>
          The birth of this project is inseparable from the help of the
          following libraries (only direct dependencies are listed):
        </Text>
        {Object.entries(licenses).map(([name, item], index) => (
          <Text
            style={styles.license}
            key={index}
            onPress={() => Linking.openURL(item.licenseUrl)}
          >
            {name} {item.licenses}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (zoom) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    subContainer: {
      padding: 5,
    },
    content: {
      fontSize: 14 * zoom,
      marginVertical: 10,
    },
    license: {
      fontSize: 14 * zoom,
    },
  });
