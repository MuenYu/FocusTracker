import { Timestamp2Date } from "../util/format";
import { List } from "react-native-paper";

export default function RecordItem({ item, index }) {
  return (
    <List.Item
      title={item.task}
      description={`Duration: ${Math.floor(
        item.duration / 60
      )} minutes | Date: ${Timestamp2Date(item.timestamp)}`}
      onPress={() => {}}
    />
  );
}
