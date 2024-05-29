import { sendReq } from "./common";

export async function login(data) {
  return await sendReq("/user/login", "post", false, data);
}

export async function register(data) {
  return await sendReq("/user/register", "post", false, data);
}
