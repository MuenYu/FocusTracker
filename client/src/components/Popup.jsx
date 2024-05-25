import { StyleSheet } from "react-native";
import { Snackbar, Portal } from "react-native-paper";

export default function Popup({ notice, setNotice }) {
  const close = () => {
    setNotice("");
  };

  return (
    <Portal>
      <Snackbar
        visible={notice.length > 0}
        onDismiss={close}
        duration={3000}
        style={styles.popup}
        action={{
          label: "Close",
          onPress: close,
        }}
      >
        {notice}
      </Snackbar>
    </Portal>
  );
}

const styles = StyleSheet.create({
  popup: {
    position: "relative",
    bottom: 100,
  },
});
