/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import SafeUserImage from "@/components/SafeUserImage";

export default function EditProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch current profile on mount (client-side)
  useEffect(() => {
    fetch("/api/v1/users/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load profile");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <div className="p-6 text-red-500">Profile not found</div>;

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/v1/users/me", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          image: user.image,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update profile");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Profile updated successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Image */}
        <div className="text-center">
          {user.image ? (
            <SafeUserImage
              src={user.image}
              alt="Profile"
              width={128}
              height={128}
              className="w-32 h-32 rounded-full mx-auto mb-2"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Email (Read-only) */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium mb-1">Image URL (optional)</label>
          <input
            type="text"
            value={user.image || ""}
            onChange={(e) => setUser({ ...user, image: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}