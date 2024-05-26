import { Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function StatCard({ prefix, counter, unit, units }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge">{prefix}</Text>
        <Text style={styles.counter} variant="displayLarge">
          {counter} {counter > 1 ? units : unit}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 5,
  },
  counter: {
    textAlign: "center",
  },
});
