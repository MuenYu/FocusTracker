/**
 * the statistics page, including two sub statistics tabs
 */

import { useContext } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Prompt from "../components/Prompt";
import Header from "../components/Header";
import AppDataContext from "../context/AppDataContext";
import AppConfigContext from "../context/AppConfigContext";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import OverallStats from "./OverallStats";
import TaskStats from "./TaskStats";

export default function Statistics() {
  const { appData } = useContext(AppDataContext);
  const { appConfig } = useContext(AppConfigContext);

  const styles = createStyles(appConfig.zoom);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Focus Statistics" />
      {appData.records.length > 0 ? (
        <TabsProvider>
          <Tabs tabLabelStyle={styles.tabs}>
            <TabScreen label="Overall">
              <OverallStats records={appData.records} />
            </TabScreen>
            <TabScreen label="By Tasks">
              <TaskStats records={appData.records} />
            </TabScreen>
          </Tabs>
        </TabsProvider>
      ) : (
        <Prompt prompt={"No statistics info yet"} />
      )}
    </SafeAreaView>
  );
}

const createStyles = (zoom) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    tabs: {
      fontSize: 14 * zoom,
    },
  });
