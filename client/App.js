import * as React from "react";
import { StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";
import BottomNavigation from "./src/navigators/BottomNavigation";

export default function App() {
  return (
    <PaperProvider>
      <StatusBar barStyle={"light"} />
      <BottomNavigation />
    </PaperProvider>
  );
}
