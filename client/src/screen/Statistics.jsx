import { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import AppContext from "../context/AppContext";
import { statistic } from "../services/statistics";
import Prompt from "../components/Prompt";
import StatCard from "../components/StatCard";

export default function Statistics() {
  const { appData } = useContext(AppContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(statistic(appData.records));
  }, [appData]);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar>
        <Appbar.Content title="My Focus Statistics" />
      </Appbar>
      {stats ? (
        <ScrollView contentContainerStyle={styles.main}>
          <StatCard
            prefix="Your total focus time is"
            counter={Math.floor(stats.totalTime / 3600)}
            unit="hour"
            units="hours"
          />
          <StatCard
            prefix="You keep focused for"
            counter={stats.totalCount}
            unit="time"
            units="times"
          />
          <StatCard
            prefix="Your longest focus record is"
            counter={Math.floor(stats.longestFocus / 60)}
            unit="minute"
            units="minutes"
          />
          <StatCard
            prefix="Your shortest focus record is"
            counter={Math.floor(stats.shortestFocus / 60)}
            unit="minute"
            units="minutes"
          />
          <StatCard
            prefix="Your average focus period is"
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
