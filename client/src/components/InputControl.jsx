import { TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

export default function InputControl({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  hideText = false,
}) {
  const { appData } = useContext(AppContext);
  const styles = createStyles(appData.zoom);

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      contentStyle={styles.content}
      onBlur={onBlur}
      numberOfLines={1}
      multiline={false}
      secureTextEntry={hideText}
    />
  );
}

const createStyles = (zoom) =>
  StyleSheet.create({
    input: {
      backgroundColor: "transparent",
      fontSize: 20 * zoom,
      minWidth: "60%",
    },
    content: {
      textAlign: "auto",
    },
  });