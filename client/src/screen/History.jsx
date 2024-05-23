import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Appbar, List, useTheme, Searchbar } from "react-native-paper";
import { Timestamp2Date } from "../util/format";
import Empty from "../components/Empty";

export default function History() {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [records, setRecords] = useState(histories);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [keyword, setKeyword] = useState("");

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const filteredRecords = records.filter((record) =>
    record.task.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar>
        <Appbar.Content title="My Focus History" />
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            setShowSearchBar(!showSearchBar);
          }}
        />
      </Appbar>
      {showSearchBar && (
        <Searchbar mode="view" onChangeText={setKeyword} value={keyword} />
      )}
      {filteredRecords.length > 0 ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.onBackground}
            />
          }
        >
          {filteredRecords.map((item, index) => (
            <List.Item
              title={item.task}
              key={index}
              description={`You focused for ${Math.floor(
                item.duration / 60
              )} minutes on ${Timestamp2Date(item.timestamp)}`}
              onPress={() => {
              }}
            />
          ))}
        </ScrollView>
      ) : (
        <Empty name={"focus records"} />
      )}
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
];
