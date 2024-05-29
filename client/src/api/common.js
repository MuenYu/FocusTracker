const api = process.env.EXPO_PUBLIC_API;
const timeout = process.env.EXPO_PUBLIC_TIMEOUT; 

export const sendReq = async (path, method, auth = false, data = null) => {
  const fetchPromise = fetch(`${api}${path}`, {
    method: method,
    headers: {
      "Content-Type": data ? "application/json" : undefined,
      Authorization: auth ? `Bearer ${token}` : undefined,
    },
    body: data ? JSON.stringify(data) : null,
  });
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(
      () => reject("You cannot access the server now, please try again later"),
      timeout
    );
  });

  const resp = await Promise.race([fetchPromise, timeoutPromise]);

  if (!resp.ok) throw await resp.json();
  return await resp.json();
};
