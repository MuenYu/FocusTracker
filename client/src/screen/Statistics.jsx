import { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import AppContext from "../context/AppContext";
import { statistic } from "../services/statistics";
import Prompt from "../components/Prompt";
import StatCard from "../components/StatCard";
import Header from "../components/Header";

export default function Statistics() {
  const { appData } = useContext(AppContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(statistic(appData.records));
  }, [appData]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Focus Statistics" />
      {stats ? (
        <ScrollView contentContainerStyle={styles.main}>
          <StatCard
            prefix="Your total focus time"
            counter={Math.floor(stats.totalTime / 3600)}
            unit="hour"
            units="hours"
          />
          <StatCard
            prefix="Your Focus Counter"
            counter={stats.totalCount}
            unit="time"
            units="times"
          />
          <StatCard
            prefix="Your Longest Focus Time"
            counter={Math.floor(stats.longestFocus / 60)}
            unit="minute"
            units="minutes"
          />
          <StatCard
            prefix="Your Shortest Focus Time"
            counter={Math.floor(stats.shortestFocus / 60)}
            unit="minute"
            units="minutes"
          />
          <StatCard
            prefix="Your Average Focus Time"
            counter={Math.floor(stats.avgPeriod / 60)}
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
