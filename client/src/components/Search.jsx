/**
 * the general search app in the app
 * supporting font zoom in app config including user input
 */

import { Searchbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import AppConfigContext from "../context/AppConfigContext";

export default function Search({ keyword, setKeyword }) {
  const { appConfig } = useContext(AppConfigContext);
  const styles = createStyles(appConfig.zoom);

  return (
    <Searchbar
      style={styles.searchBar}
      inputStyle={styles.searchBar.input}
      onChangeText={setKeyword}
      value={keyword}
    />
  );
}

const createStyles = (zoom) =>
  StyleSheet.create({
    searchBar: {
      margin: 10,
      input: {
        fontSize: 20 * zoom,
      },
    },
  });
