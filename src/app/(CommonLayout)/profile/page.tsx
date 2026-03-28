import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import SafeUserImage from "@/components/SafeUserImage";

// Server-side fetch for logged-in user's profile
async function getMyProfile() {
  const cookieStore = await cookies();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/users/me`,
    {
      cache: "no-store", // always fetch fresh data
      headers: {
        Cookie: cookieStore.toString(), // send auth cookie
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json(); // returns the user object
}

// Main server component
export default async function MyProfilePage() {
  const user = await getMyProfile();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>

      <div className="border rounded-lg p-6 shadow-md max-w-md mx-auto">
        {user.image ? (
          <SafeUserImage
            src={user.image}
            alt="Profile"
            width={128}
            height={128}
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        <h2 className="text-xl font-bold mb-2 text-center">{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}</p>
        <p><strong>Role:</strong> {user.role}</p>
        
        <Link href="/profile/edit">
          <Button variant="outline">Edit Profile</Button>
        </Link>
      </div>
    </div>
  );
}