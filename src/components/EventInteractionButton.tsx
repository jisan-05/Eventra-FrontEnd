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
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <Button variant="secondary" onClick={() => router.push(`/dashboard/myevents/${eventId}/participants`)}>
          Join list & approvals
        </Button>
        <Button variant="outline" onClick={() => router.push(`/dashboard/edit-event/${eventId}`)}>
          Edit event
        </Button>
      </div>
    );
  }

  if (participationStatus === "APPROVED") {
    return <Button variant="outline" disabled className="text-black">You have Already joined</Button>;
  }

  if (participationStatus === "PENDING") {
    return (
      <div className="flex flex-col gap-2 w-full md:w-auto">
        <Button variant="outline" disabled className="w-full md:w-auto text-black">
          Request Pending Approval
        </Button>
        {fee > 0 && (
          <p className="text-sm text-gray-400">
            You have already paid for this event. The host still needs to approve your request.
          </p>
        )}
      </div>
    );
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
        method: "POST",
        credentials: "include",
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
