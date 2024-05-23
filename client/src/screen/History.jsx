import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Text, Appbar, List, useTheme } from "react-native-paper";
import { Seconds2Time, Timestamp2Date } from "../util/format";

export default function History() {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar>
        <Appbar.Content title="My Focus History" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.onBackground}
          />
        }
      >
        {histories.map((item, index) => (
          <List.Item
            title={item.task}
            key={index}
            description={`You focused for ${Seconds2Time(
              item.duration
            )} on ${Timestamp2Date(item.timestamp)}`}
            onPress={() => {
              console.log(item);
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const histories = [
  { id: 1, duration: 3600, task: "exercise", timestamp: 1716442301665 },
  { id: 2, duration: 4800, task: "study", timestamp: 1716442351541 },
  { id: 3, duration: 3600, task: "gaming", timestamp: 1716442388340 },
  { id: 4, duration: 1200, task: "cooking", timestamp: 1716442441363 },
  { id: 5, duration: 4200, task: "watch movie", timestamp: 1716442538959 },
  { id: 6, duration: 3000, task: "reading", timestamp: 1716442567227 },
  { id: 7, duration: 1500, task: "gaming", timestamp: 1716442618714 },
  { id: 8, duration: 3600, task: "exercise", timestamp: 1716442301665 },
  { id: 9, duration: 4800, task: "study", timestamp: 1716442351541 },
  { id: 10, duration: 3600, task: "gaming", timestamp: 1716442388340 },
  { id: 11, duration: 1200, task: "cooking", timestamp: 1716442441363 },
  { id: 12, duration: 4200, task: "watch movie", timestamp: 1716442538959 },
  { id: 13, duration: 3000, task: "reading", timestamp: 1716442567227 },
  { id: 14, duration: 1500, task: "gaming", timestamp: 1716442618714 },
];
