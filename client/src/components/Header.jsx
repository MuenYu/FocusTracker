import { useContext } from "react";
import { Appbar } from "react-native-paper";
import AppContext from "../context/AppContext";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Header({ title, back }) {
  const { appData } = useContext(AppContext);
  const styles = createStyles(appData.zoom);
  const navigation = useNavigation();

  return (
    <Appbar>
      {back && (
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}
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
