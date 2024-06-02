/**
 * the modal for focus record update, 
 */

import { Modal, Portal, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useContext, useState } from "react";
import InputControl from "./InputControl";
import PopupContext from "../context/PopupContext";
import Btn from "./Btn";
import AppDataContext from "../context/AppDataContext";
import { useSendReq } from "../services/api";

export default function EditModal({ editItem, setEditItem }) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const { appData, updateAppData } = useContext(AppDataContext);
  const { setNotice } = useContext(PopupContext);
  const [task, setTask] = useState(editItem.task);
  const sendReq = useSendReq();

  const onEdit = () => {
    editItem.task = task.trim();
    sendReq("/record", "put", true, editItem)
      .then(() => {
        setNotice("Update success");
      })
      .catch((msg) => {
        editItem.sync = false;
        setNotice(`${msg}\nUpdate success locally`);
      })
      .then(async () => {
        await updateAppData({
          ...appData,
        });
        setEditItem(null);
      });
  };

  const onDelete = async () => {
    const records = appData.records;
    sendReq("/record", "delete", true, editItem)
      .then(() => {
        setNotice("Delete success");
      })
      .catch((msg) => {
        setNotice(`${msg}\nDelete success locally`);
      })
      .then(async () => {
        const index = records.indexOf(editItem);
        records.splice(index, 1);
        await updateAppData({
          ...appData,
          records: records,
        });
        setEditItem(null);
      });
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
