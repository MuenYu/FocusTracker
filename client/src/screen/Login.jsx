import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import InputControl from "../components/InputControl";
import { useContext, useState } from "react";
import Logo from "../components/Logo";
import Title from "../components/Title";
import Btn from "../components/Btn";
import PopupContext from "../context/PopupContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setNotice } = useContext(PopupContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.main}>
        <Logo />
        <Title>Focus Tracker</Title>
        <InputControl
          label="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <InputControl
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          hideText={true}
        />
        <Btn
          label="Login / Register"
          disabled={username.length === 0 || password.length === 0}
          onPress={() => setNotice("Login Success")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
});
