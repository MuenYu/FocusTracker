import { TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import AppContext from "../context/AppContext";

export default function TaskInput({
  placeholder,
  value,
  onChangeText,
  onBlur,
}) {
  const { appData } = useContext(AppContext);
  const styles = createStyles(appData.zoom);

  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      contentStyle={styles.content}
      onBlur={onBlur}
      numberOfLines={1}
      multiline={false}
    />
  );
}

const createStyles = (zoom) =>
  StyleSheet.create({
    input: {
      backgroundColor: "transparent",
      fontSize: 20 * zoom,
    },
    content: {
      textAlign: "auto",
    },
  });
