import { TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function TaskInput({ value, onChangeText, onBlur }) {
  return (
    <TextInput
      placeholder="Write down your task"
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

const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
  },
  content: {
    textAlign: 'auto',
  }
});
