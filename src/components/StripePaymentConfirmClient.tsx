"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * Backup: confirms Stripe Checkout on the client when the URL includes success + session_id.
 * Primary confirmation runs on the server; this catches edge cases and refreshes the UI.
 */
export default function StripePaymentConfirmClient() {
  const router = useRouter();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current || typeof window === "undefined") return;
    const u = new URLSearchParams(window.location.search);
    if (u.get("success") !== "true") return;
    const sid = u.get("session_id");
    if (!sid) return;
    ran.current = true;

    fetch("/api/v1/payments/confirm-stripe-session", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sid }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d?.success) router.refresh();
      })
      .catch(() => {});
  }, [router]);

  return null;
}
