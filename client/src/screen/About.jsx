import { SafeAreaView, ScrollView, Linking } from "react-native";
import Header from "../components/Header";
import { StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import Logo from "../../assets/icon.png";
import Title from "../components/Title";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import licenses from "../../assets/licenses.json";

export default function About() {
  const { appData } = useContext(AppContext);
  const styles = createStyles(appData.zoom);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="About" back={true} />
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Image source={Logo} style={styles.logo} />
        <Title>Focus Tracker</Title>
        <Text style={styles.content}>
          Focus Tracker is an Application with cloud sync to record your focus
          time and encourage you to keep focus status.
        </Text>
        <Text style={styles.content}>
          The birth of this project is inseparable from the help of the
          following libraries:
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
    logo: {
      width: 200,
      height: 200,
      marginHorizontal: "auto",
    },
    content: {
      fontSize: 14 * zoom,
      marginVertical: 10,
    },
    license: {
      fontSize: 14 * zoom,
    },
  });
