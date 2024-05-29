import { ScrollView, StyleSheet } from "react-native";
import { useState, useContext, useRef } from "react";
import PopupContext from "../context/PopupContext";
import Title from "../components/Title";
import Timer from "../components/Timer";
import Btn from "../components/Btn";
import AppDataContext from "../context/AppDataContext";

const minimumFocusTime = 2;

export default function FocusTimer({ task, setTask, setShowTimer }) {
  const [duration, setDuration] = useState(0);
  const { setNotice } = useContext(PopupContext);
  const { appData, updateAppData } = useContext(AppDataContext);
  const intervalRef = useRef(null);

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const stopTimer = () => {
    resetInterval();
    if (duration < minimumFocusTime * 60) {
      setNotice(
        `Focus time under ${minimumFocusTime} minutes won't be recorded.`
      );
    } else {
      const record = {
        task: task,
        duration: duration,
        timestamp: Date.now(),
        sync: false,
      };
      // TODO: save the data to remote
      updateAppData({
        ...appData,
        records: [record, ...appData.records],
      });
      setNotice("Your record has been saved.");
    }
    setShowTimer(false);
    setTask("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title>{task}</Title>
      <Timer
        duration={duration}
        setDuration={setDuration}
        intervalRef={intervalRef}
        resetInterval={resetInterval}
      />
      <Btn icon="stop" label="Stop Focus" onPress={stopTimer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
});
