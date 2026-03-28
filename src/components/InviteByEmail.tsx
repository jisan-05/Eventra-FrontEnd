"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function InviteByEmail({
  eventId,
  variant = "dark",
}: {
  eventId: string;
  variant?: "dark" | "light";
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      toast.error("Enter an email address");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/v1/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ eventId, email: trimmed }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Invitation sent");
        setEmail("");
      } else {
        toast.error(data.message || "Could not send invitation");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const box =
    variant === "light"
      ? "rounded-xl border border-gray-200 bg-white p-4 space-y-3 shadow-sm"
      : "rounded-xl border border-gray-600 bg-gray-900/50 p-4 space-y-3";

  return (
    <form onSubmit={submit} className={box}>
      <h3 className={`font-semibold ${variant === "light" ? "text-gray-900" : "text-amber-400"}`}>
        Invite someone by email
      </h3>
      <p className={`text-sm ${variant === "light" ? "text-gray-600" : "text-gray-400"}`}>
        They must already have a Eventra account. They will see the invite under Dashboard → Invitations.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
        <div className="flex-1 space-y-1">
          <Label htmlFor="invite-email" className={variant === "light" ? "text-gray-700" : "text-gray-300"}>
            Email
          </Label>
          <Input
            id="invite-email"
            type="email"
            placeholder="friend@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={variant === "light" ? "bg-white border-gray-300" : "bg-gray-950 border-gray-600"}
          />
        </div>
        <Button type="submit" disabled={loading} className="bg-amber-500 text-black hover:bg-amber-400">
          {loading ? "Sending…" : "Send invite"}
        </Button>
      </div>
    </form>
  );
}
