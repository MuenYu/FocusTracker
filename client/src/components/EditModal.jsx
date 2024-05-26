import { Modal, Portal, useTheme, Button } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import TaskInput from "./TaskInput";
import PopupContext from "../context/PopupContext";

export default function EditModal({ editItem, setEditItem }) {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      padding: 20,
      margin: 20,
      borderRadius: 10,
      gap: 15,
    },
    buttonGroup: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      gap: 5,
    },
  });

  const { appData, setAppData } = useContext(AppContext);
  const { setNotice } = useContext(PopupContext);
  const [task, setTask] = useState(editItem.task);

  const onEdit = () => {
    if (task.trim() === editItem.task) return;
    const index = appData.records.indexOf(editItem);
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
    setEditItem(null)
  };

  const onDelete = () => {
    const index = appData.records.indexOf(editItem);
    // TODO: delete from server
    setAppData((prev) => {
      prev.records.splice(index, 1);
      return {
        ...prev,
        records: prev.records,
      };
    });
    setNotice("Delete success!");
    setEditItem(null)
  };

  return (
    <Portal>
      <Modal
        visible={true}
        onDismiss={() => setEditItem(null)}
        contentContainerStyle={styles.container}
      >
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
      </Modal>
    </Portal>
  );
}
