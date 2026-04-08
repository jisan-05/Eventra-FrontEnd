// import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

// export const authClient = createAuthClient({
//   //you can pass client configuration here
//   // baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth`,
//   baseURL: process.env.NEXT_PUBLIC_APP_URL
//     ? process.env.NEXT_PUBLIC_APP_URL
//     : "/api/auth",
//   fetchOptions: { credentials: "include" },

//   plugins: [
//     {
//       id: "next-cookies-request",
//       fetchPlugins: [
//         {
//           id: "next-cookies-request-plugin",
//           name: "next-cookies-request-plugin",
//           hooks: {
//             async onRequest(ctx) {
//               if (typeof window === "undefined") {
//                 const { cookies } = await import("next/headers");
//                 const headers = await cookies();
//                 ctx.headers.set("cookie", headers.toString());
//               }
//             },
//           },
//         },
//       ],
//     },
//   ],
// });

// export const signInWithGoogle = async () => {
//   return await authClient.signIn.social({
//     provider: "google",
//     callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/private`,
//   });
// };



// A-4 Code ---------

  
import { createAuthClient } from "better-auth/react";

const FRONTEND_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

export const authClient = createAuthClient({
  // Keep auth on same origin so Next rewrites handle backend proxying.
  baseURL: `${FRONTEND_URL}/api/auth`,
  fetchOptions: {
    credentials: "include",
  },
});

