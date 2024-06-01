/**
 * the login and register page
 */

import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import InputControl from "../components/InputControl";
import { useContext, useEffect, useState } from "react";
import Logo from "../components/Logo";
import Title from "../components/Title";
import Btn from "../components/Btn";
import PopupContext from "../context/PopupContext";
import AuthContext from "../context/AuthContext";
import AppDataContext from "../context/AppDataContext";
import { useSendReq } from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const { setNotice } = useContext(PopupContext);
  const theme = useTheme();
  const styles = createStyles(theme);
  const sendReq = useSendReq();
  const { resetAppData } = useContext(AppDataContext);

  const onPress = (mode) => {
    sendReq(mode ? "/user/login" : "/user/register", "post", false, {
      username,
      password,
    })
      .then(async (token) => {
        await login(token);
        setNotice("Login success");
      })
      .catch((msg) => {
        setNotice(msg);
      });
  };

  useEffect(() => {
    resetAppData();
  }, []);

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
