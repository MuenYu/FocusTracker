import { sendReq } from "./common";

export async function loginAPI(data) {
  return await sendReq("/user/login", "post", undefined, data);
}

export async function registerAPI(data) {
  return await sendReq("/user/register", "post", undefined, data);
}
