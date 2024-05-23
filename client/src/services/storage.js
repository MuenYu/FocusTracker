import AsyncStorage from "@react-native-async-storage/async-storage";

const UnsyncRecord = "UnsyncRecord"; // the key name for unsync records
const AppConfig = "AppConfig"; // the configuration of the app

/**
 * Save the record to local, which can be used for sync when the connection recovered
 * @param {*} record
 */
export async function PushUnsyncRecord(record) {
  const records = await GetUnsyncRecord();
  records.push(record);
  await AsyncStorage.setItem(UnsyncRecord, JSON.stringify(records));
}

/**
 * fetch all unsync records from async record
 * @returns 
 */
export async function GetUnsyncRecord() {
  const data = await AsyncStorage.getItem(UnsyncRecord);
  return data ? JSON.parse(data) : [];
}

export async function empty() {
    await AsyncStorage.setItem(UnsyncRecord, JSON.stringify([]));
}