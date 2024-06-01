import { useContext } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import {
  totalFocusTime,
  longestFocus,
  shortestFocus,
  avgFocusTime,
} from "../services/statistics";
import Prompt from "../components/Prompt";
import StatCard from "../components/StatCard";
import Header from "../components/Header";
import AppDataContext from "../context/AppDataContext";

export default function Statistics() {
  const { appData } = useContext(AppDataContext);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Focus Statistics" />
      {appData.records.length > 0 ? (
        <ScrollView contentContainerStyle={styles.main}>
          <StatCard
            prefix="Your total focus time"
            counter={Math.floor(totalFocusTime(appData.records) / 3600)}
            unit="hour"
            units="hours"
          />
          <StatCard
            prefix="Your Focus Counter"
            counter={appData.records.length}
            unit="time"
            units="times"
          />
          <StatCard
            prefix="Your Longest Focus Time"
            counter={Math.floor(longestFocus(appData.records) / 60)}
            unit="minute"
            units="minutes"
          />
          <StatCard
            prefix="Your Shortest Focus Time"
            counter={Math.floor(shortestFocus(appData.records) / 60)}
            unit="minute"
            units="minutes"
          />
          <StatCard
            prefix="Your Average Focus Time"
            counter={Math.floor(avgFocusTime(appData.records) / 60)}
            unit="minute"
            units="minutes"
          />
        </ScrollView>
      ) : (
        <Prompt prompt={"No statistics info yet"} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    gap: 5,
    paddingVertical: 5,
  },
});
