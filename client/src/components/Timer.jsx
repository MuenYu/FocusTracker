import { Text, Button } from "react-native-paper";
import { View, StyleSheet, Alert } from "react-native";
import { useEffect, useState, useRef } from "react";

export default function Timer({ task, setTask, setShowTimer }) {
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef(null);

  /**
   * The function for time format
   * @param {*} time duration, seconds
   * @returns
   */
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  /**
   * if user press the stop button
   */
  const stop = async () => {
    resetInterval();
    if (duration < 300) {
      Alert.alert(
        "Short Focus Time",
        "Focus time under 5 minutes won't be recorded."
      );
    } else {
      const record = {
        task: task,
        duration: duration,
        timestamp: Date.now(),
      };
      // TODO: save the data to remote
      Alert.alert("Success", "Your record has been saved.");
    }
    setShowTimer(false);
    setTask("");
  };

  /**
   * clear the interval and reset the ref
   */
  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    resetInterval();
    intervalRef.current = setInterval(() => {
      setDuration((prevDuration) => prevDuration + 1);
    }, 1000);
    return resetInterval;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.taskTitle} numberOfLines={1} ellipsizeMode="tail">
        {task}
      </Text>
      <Text style={styles.timerText}>{formatTime(duration)}</Text>
      <Button icon="stop" mode="contained" onPress={stop}>
        Stop Focus
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
  taskTitle: {
    textAlign: "center",
    fontSize: 30,
  },
  timerText: {
    textAlign: "center",
    fontSize: 120,
  },
});
