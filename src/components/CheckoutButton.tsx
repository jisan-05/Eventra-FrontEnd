"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

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
  const { data: session, isPending } = authClient.useSession();

  const handleCheckout = async () => {
    if (!session?.user) {
      router.push("/login");
      return;
    }

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
      
      if (data.success && data.data?.url) {
        window.location.href = data.data.url;
      } else {
        alert(data.message || "Failed to initiate checkout");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error initiating checkout");
      setLoading(false);
    }
  };

  if (isPending) return <button disabled className="w-full md:w-auto mt-6 px-6 py-3 rounded-xl bg-yellow-500/50 text-black font-semibold">Loading...</button>;

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
