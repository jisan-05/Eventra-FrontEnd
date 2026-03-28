"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ name: "", image: "" });
  const router = useRouter();

  useEffect(() => {
    fetch("/api/v1/users/me")
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setProfile({ name: data.data.name || "", image: data.data.image || "" });
        }
      });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/v1/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Profile updated!");
        router.refresh();
      } else {
        toast.error("Failed to update profile");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <form onSubmit={handleUpdate} className="space-y-4 bg-white p-6 rounded-xl border shadow-sm">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input 
            value={profile.name} 
            onChange={(e) => setProfile({...profile, name: e.target.value})} 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Profile Image URL</label>
          <Input 
            value={profile.image} 
            onChange={(e) => setProfile({...profile, image: e.target.value})} 
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
}
