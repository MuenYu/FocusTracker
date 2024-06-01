/**
 * the card component used in statistics page
 * used to show content and number matrics
 * supporting font zoom in app config
 */

import { Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import AppConfigContext from "../context/AppConfigContext";

export default function StatCard({ prefix, counter, unit, units }) {
  const { appConfig } = useContext(AppConfigContext);
  const styles = createStyles(appConfig.zoom);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>{prefix}</Text>
        <Text style={styles.value}>
          {counter} {counter > 1 ? units : unit}
        </Text>
      </Card.Content>
    </Card>
  );
}

const createStyles = (zoom) =>
  StyleSheet.create({
    card: {
      marginHorizontal: 5,
    },
    title: {
      fontSize: 20 * zoom,
    },
    value: {
      textAlign: "center",
      fontSize: 40 * zoom,
    },
  });
