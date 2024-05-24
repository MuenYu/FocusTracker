import { useContext, useState } from "react";
import {
  Modal,
  Portal,
  Button,
  TextInput,
  List,
  useTheme,
} from "react-native-paper";
import { View, StyleSheet, Alert } from "react-native";
import { Timestamp2Date } from "../util/format";
import AppContext from "../context/AppContext";

export default function RecordItem({ item, index }) {
  const theme = useTheme();
  const { setAppData } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [task, setTask] = useState(item.task);

  const styles = StyleSheet.create({
    modalContainer: {
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

  const onEdit = () => {
    if (task.length === 0 || task.length > 50) {
      Alert.alert(
        "Wrong Input",
        "The task name should be 1~50 characters long."
      );
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
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <TextInput
            mode="outlined"
            label="Task name"
            value={task}
            onChangeText={(text) => setTask(text)}
          />
          <View style={styles.buttonGroup}>
            <Button icon="pencil" onPress={onEdit} mode="contained">
              Update
            </Button>
            <Button icon="trash-can" onPress={onDelete} mode="contained">
              Delete
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}
