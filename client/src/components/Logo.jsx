/**
 * The app logo
 */

import { StyleSheet, Image } from "react-native";
import Icon from "../../assets/icon.png";

export default function Logo() {
  return <Image source={Icon} style={styles.logo} />;
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    marginHorizontal: "auto",
  },
});
