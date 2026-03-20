import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_APP_URL; 


export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/auth/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "session is missing" } };
      }
      return {data:session,error:null}
    } catch (error) {
        console.error(error)
      return {data:null,error:{message:"Something went wrong"}}
    }
  },




//   getAllUser:async function () {
//      try {
//       const res = await fetch(`${API_URL}/users`);
//       const data = await res.json();

//       return { data: data, error: null };
//     } catch (error) {}
//     return { data: null, error: { message: "Something wrong " } };
//   },
//   updateUserStatus:async function (payload:any) {
//    const res = await fetch(`${API_URL}/users`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
        
//       },
//       credentials:"include",
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       throw new Error("Failed to update meal");
//     }

//     return res.json();
//   }
};
