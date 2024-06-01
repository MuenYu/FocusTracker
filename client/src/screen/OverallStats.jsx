import {
  totalFocusTime,
  longestFocus,
  shortestFocus,
  avgFocusTime,
} from "../services/statistics";
import StatCard from "../components/StatCard";
import { StyleSheet,ScrollView } from "react-native";

export default function OverallStats({ records }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatCard
        prefix="Your total focus time"
        counter={Math.floor(totalFocusTime(records) / 3600)}
        unit="hour"
        units="hours"
      />
      <StatCard
        prefix="Your Focus Counter"
        counter={records.length}
        unit="time"
        units="times"
      />
      <StatCard
        prefix="Your Longest Focus Time"
        counter={Math.floor(longestFocus(records) / 60)}
        unit="minute"
        units="minutes"
      />
      <StatCard
        prefix="Your Shortest Focus Time"
        counter={Math.floor(shortestFocus(records) / 60)}
        unit="minute"
        units="minutes"
      />
      <StatCard
        prefix="Your Average Focus Time"
        counter={Math.floor(avgFocusTime(records) / 60)}
        unit="minute"
        units="minutes"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    paddingVertical: 5,
  },
});
