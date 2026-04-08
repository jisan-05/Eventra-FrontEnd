"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SafeUserImage from "@/components/SafeUserImage";

type ProfileState = {
  name: string;
  email: string;
  image: string;
  role: string;
};

export default function ManagerProfilePage() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileState>({
    name: "",
    email: "",
    image: "",
    role: "MANAGER",
  });
  const router = useRouter();

  useEffect(() => {
    fetch("/api/v1/users/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const user = data?.data ?? data;
        if (!user) return;
        setProfile({
          name: user.name || "",
          email: user.email || "",
          image: user.image || "",
          role: user.role || "MANAGER",
        });
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
        body: JSON.stringify({ name: profile.name, image: profile.image }),
      });
      const json = await res.json();
      if (!res.ok || json?.success === false) {
        toast.error(json?.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully");
        router.refresh();
      }
    } catch {
      toast.error("An error occurred while updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manager Profile</h1>
        <p className="text-sm text-muted-foreground">
          Update your manager account information and avatar.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-20 w-20 overflow-hidden rounded-full border border-border bg-muted">
            <SafeUserImage
              src={profile.image}
              alt={profile.name || "Manager"}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">{profile.name || "Manager"}</p>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
            <p className="text-xs font-medium text-primary mt-1">{profile.role}</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Full Name</label>
            <Input
              value={profile.name}
              onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <Input value={profile.email} disabled />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Profile Image URL</label>
            <Input
              value={profile.image}
              onChange={(e) => setProfile((prev) => ({ ...prev, image: e.target.value }))}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}
