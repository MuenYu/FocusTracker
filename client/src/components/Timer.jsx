import { useContext } from "react";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useEffect, useState, useRef } from "react";
import { Seconds2Time } from "../util/format";
import AppConfigContext from "../context/AppConfigContext";

export default function Timer({
  duration,
  setDuration,
  intervalRef,
  resetInterval,
}) {
  const { appConfig } = useContext(AppConfigContext);
  const styles = createStyles(appConfig.zoom);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDuration((prevDuration) => prevDuration + 1);
    }, 1000);
    return resetInterval;
  }, []);

  return <Text style={styles.timerText}>{Seconds2Time(duration)}</Text>;
}

const createStyles = (zoom) =>
  StyleSheet.create({
    timerText: {
      fontSize: 80 * zoom,
    },
  });
