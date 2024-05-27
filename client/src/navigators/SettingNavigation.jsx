import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../screen/Settings";
import About from "../screen/About";

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator initialRouteName="AppSettings" options={{headerShown: false}}>
      <Stack.Screen
        name="AppSettings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
