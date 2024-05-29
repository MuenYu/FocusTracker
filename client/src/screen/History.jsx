import { useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import { useTheme } from "react-native-paper";
import AppDataContext from "../context/AppDataContext";
import Header from "../components/Header";
import Search from "../components/Search";
import Prompt from "../components/Prompt";
import ListItem from "../components/ListItem";
import { Timestamp2Date } from "../util/format";
import EditModal from "../components/EditModal";

export default function History() {
  const theme = useTheme();
  const { appData, updateAppData } = useContext(AppDataContext);
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [editItem, setEditItem] = useState(null);

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
      <Header title="My Focus History" />
      {appData.records.length > 0 && (
        <Search keyword={keyword} setKeyword={setKeyword} />
      )}
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={filteredRecords}
        renderItem={({ item }) => (
          <ListItem
            title={item.task}
            description={`Duration: ${Math.floor(
              item.duration / 60
            )} minutes | Date: ${Timestamp2Date(item.timestamp)}`}
            onPress={() => setEditItem(item)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.onBackground}
          />
        }
        ListEmptyComponent={<Prompt prompt={"No existing focus records"} />}
      />
      {editItem && <EditModal editItem={editItem} setEditItem={setEditItem} />}
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
