import { ScrollView, StyleSheet } from "react-native";
import { useState, useContext, useRef } from "react";
import PopupContext from "../context/PopupContext";
import Title from "../components/Title";
import Timer from "../components/Timer";
import Btn from "../components/Btn";
import AppDataContext from "../context/AppDataContext";
import { useSendReq } from "../services/api";

const minimumFocusTime = process.env.EXPO_PUBLIC_MINFOCUS;

export default function FocusTimer({ task, setTask, setShowTimer }) {
  const [duration, setDuration] = useState(600);
  const { setNotice } = useContext(PopupContext);
  const { appData, updateAppData } = useContext(AppDataContext);
  const intervalRef = useRef(null);
  const sendReq = useSendReq();

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const stopTimer = () => {
    if (duration < minimumFocusTime) {
      setNotice(
        `Focus time under ${minimumFocusTime} seconds won't be recorded.`
      );
    } else {
      const record = {
        task: task,
        duration: duration,
        timestamp: Date.now(),
        sync: false,
      };
      sendReq("/record", "post", true, record)
        .then(() => {
          record.sync = true;
          setNotice("Your record has been saved");
        })
        .catch((msg) => {
          setNotice(`${msg}\nYour record has been saved locally`);
        })
        .then(() => {
          updateAppData({
            ...appData,
            records: [record, ...appData.records],
          });
        });
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
