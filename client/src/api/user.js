import { sendReq } from "./common";

export async function loginAPI(data) {
  return await sendReq("/user/login", "post", false, data);
}

export async function registerAPI(data) {
  return await sendReq("/user/register", "post", false, data);
}
