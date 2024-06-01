import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export async function SaveData(key, data, secure = false) {
  if (secure) await SecureStore.setItemAsync(key, JSON.stringify(data));
  else await AsyncStorage.setItem(key, JSON.stringify(data));
}

export async function LoadData(key, secure = false) {
  const data = secure
    ? await SecureStore.getItemAsync(key)
    : await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export async function RemoveData(key, secure = false) {
  if (secure) await SecureStore.deleteItemAsync(key);
  else await AsyncStorage.removeItem(key);
}
