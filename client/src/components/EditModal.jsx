import { Modal, Portal, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useContext, useState } from "react";
import InputControl from "./InputControl";
import PopupContext from "../context/PopupContext";
import Btn from "./Btn";
import AppDataContext from "../context/AppDataContext";

export default function EditModal({ editItem, setEditItem }) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const { appData, updateAppData } = useContext(AppDataContext);
  const { setNotice } = useContext(PopupContext);
  const [task, setTask] = useState(editItem.task);

  const onEdit = async () => {
    if (task.trim() === editItem.task) {
      setEditItem(null);
      return;
    }
    const records = appData.records;
    const index = records.indexOf(editItem);
    records[index] = {
      ...records[index],
      task: task.trim(),
    };
    await updateAppData({
      ...appData,
      records: records,
    });
    setNotice("Update success!");
    setEditItem(null);
  };

  const onDelete = async () => {
    const records = appData.records;
    const index = records.indexOf(editItem);
    records.splice(index, 1);
    await updateAppData({
      ...appData,
      records: records,
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
