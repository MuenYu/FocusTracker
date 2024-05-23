import { Text, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function TaskInput({ task, setTask, setShowTimer }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ready to keep focus?</Text>
      <TextInput
        placeholder="What to do next?"
        mode="flat"
        value={task}
        onChangeText={setTask}
        style={styles.input}
        onBlur={() => {
          if (task.length > 0) {
            setTask(task.trim());
            setShowTimer(true);
          }
        }}
        contentStyle={styles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  title: {
    fontSize: 30,
  },
  input: {
    minWidth: "50%",
    maxWidth: "75%",
    backgroundColor: "transparent",
  },
  content: {
    textAlign: "center",
  },
});
