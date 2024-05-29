import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Focus from "../screen/Focus";
import History from "../screen/History";
import Statistics from "../screen/Statistics";
import { useTheme } from "react-native-paper";
import SettingsStack from "./SettingNavigation";

const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigation() {
  const theme = useTheme();

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator initialRouteName="Focus">
        <Tab.Screen
          name="Focus"
          component={Focus}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="timer" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="history" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Statistics"
          component={Statistics}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="chart-box" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStack}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="tools" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
