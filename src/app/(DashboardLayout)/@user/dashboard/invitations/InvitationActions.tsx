"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  invitationId: string;
  eventId: string;
  status: string;
  eventType: string;
  fee: number;
}

export default function InvitationActions({ invitationId, eventId, status, eventType, fee }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (status !== "PENDING") return null;

  const handleRespond = async (responseStatus: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/invitations/${invitationId}/respond`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: responseStatus })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Invitation ${responseStatus.toLowerCase()} successfully!`);
        router.refresh();
      } else {
        toast.error(data.message || "Failed to respond");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handlePayAndAccept = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/payments/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, invitationId }), // Passing invitationId to webhook
      });
      const data = await res.json();
      if (res.ok && data.data?.url) {
        window.location.href = data.data.url;
      } else {
        toast.error(data.message || "Payment initiation failed");
        setLoading(false);
      }
    } catch {
      toast.error("An error occurred during payment");
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      {fee > 0 ? (
        <Button onClick={handlePayAndAccept} disabled={loading} variant="default">
          Pay & Accept
        </Button>
      ) : (
        <Button onClick={() => handleRespond("ACCEPTED")} disabled={loading} variant="default">
          Accept
        </Button>
      )}
      <Button onClick={() => handleRespond("DECLINED")} disabled={loading} variant="destructive">
        Decline
      </Button>
    </div>
  );
}
