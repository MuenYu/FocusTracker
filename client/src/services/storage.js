import AsyncStorage from "@react-native-async-storage/async-storage";

export async function SaveData(key, appData) {
  await AsyncStorage.setItem(key, JSON.stringify(appData));
}

export async function LoadData(key) {
  const data = JSON.parse(await AsyncStorage.getItem(key));
  return data ? data : null;
}

export async function RemoveData(key) {
  await AsyncStorage.removeItem(key);
}
