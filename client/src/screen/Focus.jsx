import { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Timer from "../components/Timer";
import TaskInput from "../components/TaskInput";
import { Text } from "react-native-paper";
import PopupContext from "../context/PopupContext";

export default function Focus() {
  const [task, setTask] = useState("");
  const [showTimer, setShowTimer] = useState(false);
  const {setNotice} = useContext(PopupContext);

  return (
    <SafeAreaView style={styles.container}>
      {!showTimer && (
        <View style={styles.subContainer}>
          <Text style={styles.title}>Ready to keep focus?</Text>
          <TaskInput
            placeholder="Write down your task"
            value={task}
            onChangeText={(text) => setTask(text)}
            onBlur={() => {
              setTask(task.trim());
              if (task.length > 0) {
                setNotice('Start Focusing!');
                setShowTimer(true)
              }
            }}
          />
        </View>
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
  subContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  title: {
    fontSize: 30,
  },
});
