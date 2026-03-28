"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ name: "", image: "" });
  const [notifyInvites, setNotifyInvites] = useState(true);
  const [notifyEvents, setNotifyEvents] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const a = localStorage.getItem("planora_notify_invites");
      const b = localStorage.getItem("planora_notify_events");
      if (a !== null) setNotifyInvites(a === "1");
      if (b !== null) setNotifyEvents(b === "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    fetch("/api/v1/users/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const u = data?.data ?? data;
        if (u?.name != null) {
          setProfile({ name: u.name || "", image: u.image || "" });
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
        credentials: "include",
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (res.ok && (data.success !== false)) {
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

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">Notifications (local preferences)</h2>
        <p className="text-sm text-gray-500 mb-4">
          Stored in this browser only. Use as a reminder for what you care about; email delivery is not wired yet.
        </p>
        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifyInvites}
              onChange={(e) => {
                const v = e.target.checked;
                setNotifyInvites(v);
                try {
                  localStorage.setItem("planora_notify_invites", v ? "1" : "0");
                } catch {
                  /* ignore */
                }
              }}
              className="h-4 w-4"
            />
            <span className="text-sm">Remind me about event invitations</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifyEvents}
              onChange={(e) => {
                const v = e.target.checked;
                setNotifyEvents(v);
                try {
                  localStorage.setItem("planora_notify_events", v ? "1" : "0");
                } catch {
                  /* ignore */
                }
              }}
              className="h-4 w-4"
            />
            <span className="text-sm">Remind me about events I joined</span>
          </label>
        </div>
      </div>
    </div>
  );
}
