import AsyncStorage from "@react-native-async-storage/async-storage";

const RecordCache = "RecordCache"; // the key name for unsync records
const AppConfig = "AppConfig"; // the configuration of the app

/**
 * Save the record to local, which can be used for sync when the connection recovered
 * @param {*} record
 */
export async function PushRecord2Cache(record) {
  const records = await GetRecordCache();
  records.shift(record);
  await AsyncStorage.setItem(RecordCache, JSON.stringify(records));
}

/**
 * fetch all unsync records from async record
 * @returns 
 */
export async function GetRecordCache() {
  const data = await AsyncStorage.getItem(RecordCache);
  return data ? JSON.parse(data) : [];
}
