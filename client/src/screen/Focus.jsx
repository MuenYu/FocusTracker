/**
 * the focus page
 * including the task input bar and focus timer
 */

import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import FocusInput from "./FocusInput";
import FocusTimer from "./FocusTimer";

export default function Focus() {
  const [task, setTask] = useState("");
  const [showTimer, setShowTimer] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {showTimer ? (
        <FocusTimer task={task} setTask={setTask} setShowTimer={setShowTimer} />
      ) : (
        <FocusInput task={task} setTask={setTask} setShowTimer={setShowTimer} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
