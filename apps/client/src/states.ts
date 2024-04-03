import van from "vanjs-core";
import { app } from "./client";

interface Session {
  username: string;
  expires: number;
}
export const session = van.state<Session | null>(null);

const key = "session";

export async function checkSession() {
  // Check Cache
  const cache = localStorage.getItem(key);
  if (cache) {
    try {
      const cacheVal = JSON.parse(cache) as Session;
      if (cacheVal.expires > Date.now()) {
        console.log("Cache Found");
        session.val = cacheVal;
        return;
      }
    } catch (e) {
      console.error(e);
    }
  }

  // If cache not found or expired, fetch credential
  localStorage.removeItem(key);
  const { data, status } = await app.api.auth.username.get();
  if (status === 200) {
    session.val = data;
    localStorage.setItem(key, JSON.stringify(data));
  }
}
