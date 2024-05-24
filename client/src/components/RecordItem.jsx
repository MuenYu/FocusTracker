import React, { useContext, useState } from "react";
import { Modal, Portal, Button, TextInput } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { Timestamp2Date } from "../util/format";
import { List } from "react-native-paper";
import AppContext from "../context/AppContext";

export default function RecordItem({ item, index }) {
  const { appData, setAppData } = useContext(AppContext);
  const [visible, setVisible] = useState(false);

  const updateRecord = (text) => {
    setAppData((prev) => {
      const records = prev.records;
      records[index] = {
        ...records[index],
        task: text,
      };
      return {
        ...appData,
        records: records,
      };
    });
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
            value={item.task}
            onChangeText={updateRecord}
          />
          <Button onPress={() => setVisible(false)} mode="contained">
            Submit
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    gap: 15,
  },
});
