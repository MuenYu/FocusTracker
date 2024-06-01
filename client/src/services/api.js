import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const api = process.env.EXPO_PUBLIC_API;
const timeout = process.env.EXPO_PUBLIC_TIMEOUT;

export const useSendReq = () => {
  const { token, logout } = useContext(AuthContext);

  const sendReq = async (path, method, auth = false, data = undefined) => {
    const fetchPromise = fetch(`${api}${path}`, {
      method: method,
      headers: {
        ...(data && { "Content-Type": "application/json" }),
        ...(auth && { Authorization: `Bearer ${token}` }),
      },
      body: data ? JSON.stringify(data) : null,
    });
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject("You cannot access the server now"), timeout);
    });

    const resp = await Promise.race([fetchPromise, timeoutPromise]);

    if (resp.ok) return await resp.json();
    if (resp.status === 401) logout();
    throw await resp.json();
  };

  return sendReq;
};
