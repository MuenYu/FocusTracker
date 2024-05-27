import { Searchbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import AppContext from "../context/AppContext";

export default function Search({ keyword, setKeyword }) {
  const { appData } = useContext(AppContext);
  const styles = createStyles(appData.zoom);

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
