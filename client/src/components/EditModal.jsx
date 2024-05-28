import { Modal, Portal, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import InputControl from "./InputControl";
import PopupContext from "../context/PopupContext";
import Btn from "./Btn";

export default function EditModal({ editItem, setEditItem }) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const { appData, setAppData } = useContext(AppContext);
  const { setNotice } = useContext(PopupContext);
  const [task, setTask] = useState(editItem.task);

  const onEdit = () => {
    if (task.trim() === editItem.task) {
      setEditItem(null);
      return;
    }
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
    setEditItem(null);
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
    setEditItem(null);
  };

  return (
    <Portal>
      <Modal
        visible={true}
        onDismiss={() => setEditItem(null)}
        contentContainerStyle={styles.container}
      >
        <InputControl
          placeholder="Task name cannot be empty"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <View style={styles.buttonGroup}>
          <Btn disabled={task.length === 0} onPress={onEdit} label="Update" />
          <Btn onPress={onDelete} label="Delete" />
        </View>
      </Modal>
    </Portal>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
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
      marginTop: 15,
    },
  });
