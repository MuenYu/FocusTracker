/**
 * the general input text box in the app
 * supporting app font zoom in app config
 */

import { TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import AppConfigContext from "../context/AppConfigContext";

export default function InputControl({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  hideText = false,
}) {
  const { appConfig } = useContext(AppConfigContext);
  const styles = createStyles(appConfig.zoom);

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      defaultValue={value}
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
