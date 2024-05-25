import { Modal, Portal, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function ModelBox({ visible, setVisible, children }) {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        padding: 20,
        margin: 20,
        borderRadius: 10,
        gap: 15,
    }
  });

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={styles.container}
      >
        {children}
      </Modal>
    </Portal>
  );
}
