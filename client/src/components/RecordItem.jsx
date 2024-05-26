import { useContext, useState } from "react";
import { Button, List } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { Timestamp2Date } from "../util/format";
import AppContext from "../context/AppContext";
import PopupContext from "../context/PopupContext";
import ModelBox from "./ModelBox";
import TaskInput from "./TaskInput";

export default function RecordItem({ item, index }) {
  const { setAppData } = useContext(AppContext);
  const { setNotice } = useContext(PopupContext);
  const [visible, setVisible] = useState(false);
  const [task, setTask] = useState(item.task);

  const onEdit = () => {
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
    setNotice("Update success!");
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
    setNotice("Delete success!");
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
        <TaskInput
          placeholder="Task name cannot be empty"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <View style={styles.buttonGroup}>
          <Button
            icon="pencil"
            disabled={task.length === 0}
            onPress={onEdit}
            mode="contained"
          >
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
