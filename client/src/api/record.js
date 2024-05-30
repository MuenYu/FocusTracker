import { sendReq } from "./common";

export async function uploadRecordAPI(token, record) {
  return await sendReq("/record", "post", token, record);
}

export async function editRecordAPI(token, record) {
  return await sendReq("/record", "put", token, record);
}

export async function deleteRecordAPI(token, record) {
  return await sendReq("/record", "delete", token, record);
}
