import Title from "../components/Title";
import { ScrollView, StyleSheet } from "react-native";
import TaskInput from "../components/TaskInput";
import { useContext } from "react";
import PopupContext from "../context/PopupContext";

export default function FocusInput({ task, setTask, setShowTimer }) {
  const { setNotice } = useContext(PopupContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title>Ready to keep focus?</Title>
      <TaskInput
        placeholder="Write down your task"
        value={task}
        onChangeText={(text) => setTask(text)}
        onBlur={() => {
          setTask(task.trim());
          if (task.length > 0) {
            setNotice("Start Focusing!");
            setShowTimer(true);
          }
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});
