"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  eventId: string;
  type: string;
  isOwner: boolean;
  participationStatus: string | null;
  fee: number;
}

export default function EventInteractionButton({ eventId, type, isOwner, participationStatus, fee }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (isOwner) {
    return (
      <Button variant="secondary" onClick={() => router.push(`/dashboard/manage-events`)}>
        Manage Your Event
      </Button>
    );
  }

  if (participationStatus === "APPROVED") {
    return <Button variant="outline" disabled>You have joined</Button>;
  }

  if (participationStatus === "PENDING") {
    return <Button variant="outline" disabled>Request Pending Approval</Button>;
  }

  if (participationStatus === "BANNED") {
    return <Button variant="destructive" disabled>You are banned</Button>;
  }

  if (participationStatus === "REJECTED") {
    return <Button variant="destructive" disabled>Request Rejected</Button>;
  }

  const handleJoin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/participations/${eventId}/join`, {
        method: "POST"
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(data.message || "Request sent successfully!");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to join event. Are you logged in?");
      }
    } catch (e) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (fee > 0) {
    // Return to the CheckoutButton if paid, handled in page.tsx
    return null;
  }

  const buttonText = type === "PUBLIC_FREE" ? "Join Instantly" : "Request to Join";

  return (
    <Button onClick={handleJoin} disabled={loading} size="lg" className="w-full md:w-auto">
      {loading ? "Processing..." : buttonText}
    </Button>
  );
}
