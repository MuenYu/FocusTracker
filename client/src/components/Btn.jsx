import { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import AppContext from "../context/AppDataContext";
import AppConfigContext from "../context/AppConfigContext";

export default function Btn({ icon, label, disabled, onPress }) {
  const { appConfig } = useContext(AppConfigContext);
  const styles = createStyles(appConfig.zoom);

  return (
    <Button
      icon={icon}
      mode="contained"
      onPress={onPress}
      disabled={disabled}
      labelStyle={styles.buttonLabel}
    >
      {label}
    </Button>
  );
}

const createStyles = (zoom) =>
  StyleSheet.create({
    buttonLabel: {
      fontSize: 20 * zoom,
      lineHeight: 20 * zoom,
    },
  });
