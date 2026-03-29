import { getForwardedCookieHeader } from "@/lib/get-cookie-header";
import { getSiteOrigin } from "@/lib/site-url";

const API_URL = process.env.NEXT_PUBLIC_APP_URL;

export const userService = {
  getSession: async function () {
    try {
      // Same as backend fetches: cookieStore.toString() is unreliable in App Router.
      const cookieHeader = await getForwardedCookieHeader();
      // Session cookie is set on the Next origin (e.g. :3000), not the API port (:5000).
      const authOrigin = getSiteOrigin();
      const res = await fetch(`${authOrigin}/api/auth/get-session`, {
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null || session === undefined) {
        return { data: null, error: { message: "session is missing" } };
      }
      return { data: session, error: null };
    } catch (error) {
        console.error(error)
      return {data:null,error:{message:"Something went wrong"}}
    }
  },




  getAllUser: async function () {
  try {
    const cookieHeader = await getForwardedCookieHeader();

    const res = await fetch(`${API_URL}/api/v1/users`, {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    const data = await res.json();

    return { data: data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Something wrong" } };
  }
},
 
  

};
