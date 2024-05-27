import { useContext } from "react";
import { Appbar } from "react-native-paper";
import AppContext from "../context/AppContext";
import { StyleSheet } from "react-native";

export default function Header({ title }) {
  const { appData } = useContext(AppContext);
  const styles = createStyles(appData.zoom);

  return (
    <Appbar>
      <Appbar.Content title={title} titleStyle={styles.title} />
    </Appbar>
  );
}

const createStyles = (zoom) =>
  StyleSheet.create({
    title: {
      fontSize: 20 * zoom,
    },
  });
