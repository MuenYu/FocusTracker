import { sendReq } from "./common";

export async function uploadRecordAPI(token, record) {
  return await sendReq("/record", "post", token, record);
}
