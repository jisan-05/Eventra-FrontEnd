"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CheckoutButton({
  eventId,
  fee,
  label,
}: {
  eventId: string;
  fee: number;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/v1/payments/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          eventId,
        }),
      });

      const data = await res.json();

      if (res.status === 401) {
        const next = encodeURIComponent(`/events/${eventId}`);
        router.push(`/login?callbackUrl=${next}`);
        setLoading(false);
        return;
      }

      if (data.success && data.data?.url) {
        window.location.href = data.data.url;
        return;
      }

      toast.error(data.message || "Failed to initiate checkout");
    } catch (err) {
      console.error(err);
      toast.error("Error initiating checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full md:w-auto mt-6 px-6 py-3 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition disabled:opacity-50"
    >
      {loading ? "Processing..." : label ?? "Pay & Join"}
    </button>
  );
}
