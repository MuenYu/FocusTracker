import { Text } from "react-native-paper";
import ListItem from "../components/ListItem";
import { ranking } from "../services/statistics";
import { FlatList, StyleSheet } from "react-native";

export default function TaskStats({ records }) {
  return (
    <FlatList
      contentContainerStyle={styles.flatListContainer}
      data={ranking(records)}
      renderItem={({ item }) => (
        <ListItem
          title={item.task}
          description={`Total Time Consumption: ${Math.floor(
            item.duration / 60
          )} minutes`}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    flexGrow: 1,
  },
});
