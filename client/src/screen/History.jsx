import { useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Appbar, List, useTheme, Searchbar } from "react-native-paper";
import { Timestamp2Date } from "../util/format";
import Empty from "../components/Empty";
import AppContext from "../context/AppContext";

export default function History() {
  const theme = useTheme();
  const { appData, setAppData } = useContext(AppContext);
  const [refreshing, setRefreshing] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [keyword, setKeyword] = useState("");

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredRecords = appData.records.filter((record) =>
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
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.onBackground}
          />
        }
      >
        {filteredRecords.length > 0 ? (
          filteredRecords.map((item, index) => (
            <List.Item
              title={item.task}
              key={index}
              description={`Duration: ${Math.floor(
                item.duration / 60
              )} minutes | Date: ${Timestamp2Date(item.timestamp)}`}
              onPress={() => {}}
            />
          ))
        ) : (
          <Empty name={"focus records"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
