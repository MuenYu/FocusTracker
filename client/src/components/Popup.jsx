/**
 * the global popup components, used to show the message after operations
 * this component does not support font zoom in app config
 */

import React from "react";
import { StyleSheet } from "react-native";
import { Snackbar, Portal } from "react-native-paper";

export default function Popup({ notice, onDismiss }) {
  return (
    <Portal>
      <Snackbar
        visible={notice.length > 0}
        onDismiss={onDismiss}
        duration={3000}
        style={styles.popup}
        action={{
          label: "Close",
          onPress: onDismiss,
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
