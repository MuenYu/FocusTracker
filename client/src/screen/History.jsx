import { useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import { Appbar, useTheme, Searchbar } from "react-native-paper";
import Empty from "../components/Empty";
import AppContext from "../context/AppContext";
import RecordItem from "../components/RecordItem";

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

  const renderItem = ({ item }) => <RecordItem item={item} />;

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
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={filteredRecords}
        renderItem={({ item, index }) => (
          <RecordItem item={item} index={index} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.onBackground}
          />
        }
        ListEmptyComponent={<Empty name={"focus records"} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    flexGrow: 1,
  },
});
