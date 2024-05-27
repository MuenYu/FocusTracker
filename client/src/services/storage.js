import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "AppData";

export async function SaveData(appData) {
  await AsyncStorage.setItem(key, JSON.stringify(appData));
}

export async function LoadData() {
  const data = JSON.parse(await AsyncStorage.getItem(key));
  return data ? data : defaultAppData;
}

export async function ResetData() {
  await AsyncStorage.removeItem(key);
}

export const defaultAppData = {
  isDark: false, // true: dark, false: light
  zoom: 1,
  records: [], // local record state
};
