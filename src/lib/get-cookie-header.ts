import { cookies } from "next/headers";

/**
 * Builds a Cookie header for server-side fetch() to the backend so better-auth
 * session is recognized (RequestCookies.toString() is unreliable across Next versions).
 */
export async function getForwardedCookieHeader(): Promise<string> {
  const store = await cookies();
  return store.getAll().map(({ name, value }) => `${name}=${value}`).join("; ");
}
