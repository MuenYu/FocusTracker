import { useContext } from "react";
import { Text, Button } from "react-native-paper";
import { View, StyleSheet, Alert } from "react-native";
import { useEffect, useState, useRef } from "react";
import { Seconds2Time } from "../util/format";
import AppContext from "../context/AppContext";

export default function Timer({ task, setTask, setShowTimer }) {
  const { setAppData } = useContext(AppContext);
  const [duration, setDuration] = useState(1000);
  const intervalRef = useRef(null);

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
        sync: false,
      };
      // TODO: save the data to remote
      setAppData(prevAppData => ({
        ...prevAppData,
        records: [record, ...prevAppData.records],
      }));
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
      <Text style={styles.timerText}>{Seconds2Time(duration)}</Text>
      <Button
        icon="stop"
        mode="contained"
        onPress={stop}
        contentStyle={styles.button.content}
      >
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
  button: {
    content: {
      padding: 10,
    },
  },
});
