/**
 * the list item components used in list (e.g., flatlist)
 * supporting the font zoom in app config
 */

import { useContext } from "react";
import { List } from "react-native-paper";
import { StyleSheet } from "react-native";
import AppConfigContext from "../context/AppConfigContext";

export default function ListItem({ title, description, onPress, right }) {
  const { appConfig } = useContext(AppConfigContext);
  const styles = createStyles(appConfig.zoom);

  return (
    <List.Item
      title={title}
      description={description}
      style={styles.body}
      onPress={onPress}
      titleStyle={styles.title}
      descriptionStyle={styles.description}
      right={right}
    />
  );
}

const createStyles = (zoom) =>
  StyleSheet.create({
    body: {
      justifyContent: 'center',
      minHeight: 60,
    },
    title: {
      fontSize: 18 * zoom,
    },
    description: {
      fontSize: 12 * zoom,
    },
  });
