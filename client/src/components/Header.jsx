/**
 * the header component for each page
 * used to show the title of the page
 * supporting the font zoom in app config
 */

import { useContext } from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppConfigContext from "../context/AppConfigContext";

export default function Header({ title, back }) {
  const {appConfig} = useContext(AppConfigContext)
  const styles = createStyles(appConfig.zoom);
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
