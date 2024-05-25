import { useContext, useEffect, useState } from "react";
import { Button, List } from "react-native-paper";
import { View, StyleSheet, Alert } from "react-native";
import { Timestamp2Date } from "../util/format";
import AppContext from "../context/AppContext";
import ModelBox from "./ModelBox";
import TaskInput from "./TaskInput";

export default function RecordItem({ item, index }) {
  const { setAppData } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [task, setTask] = useState("");

  useEffect(() => {
    setTask(item.task);
  }, [visible]);

  const onEdit = () => {
    if (task.length === 0) {
      Alert.alert("Empty Task Name", "The task name cannot be empty.");
      return;
    }
    // TODO: sync with api
    setAppData((prev) => {
      const records = prev.records;
      records[index] = {
        ...records[index],
        task: task.trim(),
      };
      return {
        ...prev,
        records: records,
      };
    });
    setVisible(false);
  };

  const onDelete = () => {
    // TODO: delete from server
    setAppData((prev) => {
      prev.records.splice(index, 1);
      return {
        ...prev,
        records: prev.records,
      };
    });
    setVisible(false);
  };

  return (
    <View>
      <List.Item
        title={item.task}
        description={`Duration: ${Math.floor(
          item.duration / 60
        )} minutes | Date: ${Timestamp2Date(item.timestamp)}`}
        onPress={() => setVisible(true)}
      />
      <ModelBox visible={visible} setVisible={setVisible}>
        <TaskInput value={task} onChangeText={(text) => setTask(text)} />
        <View style={styles.buttonGroup}>
          <Button icon="pencil" onPress={onEdit} mode="contained">
            Update
          </Button>
          <Button icon="trash-can" onPress={onDelete} mode="contained">
            Delete
          </Button>
        </View>
      </ModelBox>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 5,
  },
});
