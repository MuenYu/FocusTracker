import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import InputControl from "../components/InputControl";
import { useContext, useState } from "react";
import Logo from "../components/Logo";
import Title from "../components/Title";
import Btn from "../components/Btn";
import PopupContext from "../context/PopupContext";
import { login, register } from "../api/user";
import AppContext from "../context/AppContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAppData } = useContext(AppContext);
  const { setNotice } = useContext(PopupContext);
  const theme = useTheme();
  const styles = createStyles(theme);

  const onPress = (mode) => {
    const action = mode ? login : register;
    action({ username, password })
      .then((token) => {
        setAppData((prev) => ({
          ...prev,
          jwt: token,
        }));
        setNotice("Login success");
      })
      .catch((msg) => {
        setNotice(msg);
      });
  };

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
        <View style={styles.btngrp}>
          <Btn
            label={"Sign in"}
            disabled={username.length === 0 || password.length === 0}
            onPress={() => onPress(true)}
          />
          <Btn
            label={"Sign up"}
            disabled={username.length === 0 || password.length === 0}
            onPress={() => onPress(false)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    main: {
      flex: 1,
      alignItems: "center",
      gap: 10,
    },
    btngrp: {
      gap: 10,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
