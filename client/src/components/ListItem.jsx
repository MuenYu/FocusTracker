import { useContext } from "react";
import { List } from "react-native-paper";
import AppContext from "../context/AppContext";
import { StyleSheet } from "react-native";

export default function ListItem({ title, description, onPress, right }) {
  const { appData } = useContext(AppContext);
  const styles = createStyles(appData.zoom);

  return (
    <List.Item
      title={title}
      description={description}
      onPress={onPress}
      titleStyle={styles.title}
      descriptionStyle={styles.description}
      right={right}
    />
  );
}

const createStyles = (zoom) =>
  StyleSheet.create({
    title: {
      fontSize: 18 * zoom,
    },
    description: {
      fontSize: 12 * zoom,
    },
  });
