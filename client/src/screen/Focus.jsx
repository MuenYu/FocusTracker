import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Timer from "../components/Timer";
import TaskInput from "../components/TaskInput";

export default function Focus() {
  const [task, setTask] = useState("");
  const [showTimer, setShowTimer] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {!showTimer && (
        <TaskInput task={task} setTask={setTask} setShowTimer={setShowTimer} />
      )}
      {showTimer && (
        <Timer task={task} setTask={setTask} setShowTimer={setShowTimer} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
