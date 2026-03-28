/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckoutButton from "../../../../components/CheckoutButton";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import EventInteractionButton from "@/components/EventInteractionButton";
import ReviewsSection from "@/components/ReviewsSection";
import InviteByEmail from "@/components/InviteByEmail";
import EventRatingSummary from "@/components/EventRatingSummary";
import StripePaymentConfirmClient from "@/components/StripePaymentConfirmClient";
import { userService } from "@/services/user.services";
import { cookies } from "next/headers";

type Event = {
  id: string;
  title: string;
  description?: string | null;
  venue?: string | null;
  eventLink?: string | null;
  date?: string | null;
  time?: string | null;
  type?: string;
  fee?: number | null;
  ownerId?: string;
};

const EventDetailsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await params;
  const searchParamsData = searchParams ? await searchParams : {};
  const isSuccess = searchParamsData.success === "true";
  const isCanceled = searchParamsData.canceled === "true";
  const rawStripeSession = searchParamsData.session_id;
  const stripeSessionId =
    typeof rawStripeSession === "string"
      ? rawStripeSession
      : Array.isArray(rawStripeSession)
        ? rawStripeSession[0]
        : undefined;

  // Fetch single event directly in page
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/events/${id}`, {
    cache: "no-store",
    headers: { Cookie: cookieStore.toString() },
  });

  const payload = await res.json();
  const event: Event | null = res.ok && payload?.success !== false ? payload?.data ?? null : null;

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
        <div className="text-center max-w-md mx-auto">
          <p className="mb-4 text-lg">
            {res.status === 403 || res.status === 401
              ? "This is a private event. Sign in with an invited account to view it."
              : "Event not found"}
          </p>
          <Link
            href="/events"
            className="text-yellow-500 hover:underline inline-flex items-center gap-1"
          >
            <ChevronLeft size={18} /> Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const { data: sessionData } = await userService.getSession();
  const currentUser = sessionData?.user;

  const apiBase = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000";
  let paymentConfirmAlreadyRecorded = false;
  if (isSuccess && stripeSessionId && currentUser) {
    try {
      const confirmRes = await fetch(`${apiBase}/api/v1/payments/confirm-stripe-session`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: stripeSessionId }),
        cache: "no-store",
      });
      const confirmJson = await confirmRes.json().catch(() => ({}));
      const msg = typeof confirmJson?.message === "string" ? confirmJson.message : "";
      paymentConfirmAlreadyRecorded = msg.toLowerCase().includes("already");
    } catch {
      /* confirmation is best-effort; webhook may have run */
    }
  }

  let participationStatus = null;
  if (currentUser) {
    try {
      const pRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/participations/my-participations`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      const myParticipations = await pRes.json();
      const currentP = myParticipations?.data?.find((p: any) => p.eventId === id);
      participationStatus = currentP ? currentP.status : null;
    } catch (e) {
      console.error(e);
    }
  }

  const isOwner = currentUser?.id === event.ownerId;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-10 px-4">
      <StripePaymentConfirmClient />
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6"
        >
          <ChevronLeft size={18} /> Back
        </Link>

        {isSuccess && (
          <div
            className={`mb-6 px-4 py-3 rounded-xl border ${
              paymentConfirmAlreadyRecorded
                ? "bg-sky-900/40 border-sky-500 text-sky-100"
                : "bg-green-900/50 border-green-500 text-green-200"
            }`}
          >
            {paymentConfirmAlreadyRecorded ? (
              <>
                You have already paid for this event. Your request stays <strong>pending</strong> until the host
                approves you on the join list.
              </>
            ) : (
              <>
                Payment successful. For paid events, your spot is <strong>pending</strong> until the host approves you
                in their join list. If you just returned from checkout, your request should appear for the host now.
              </>
            )}
          </div>
        )}
        
        {isCanceled && (
          <div className="mb-6 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-xl">
            Payment was canceled. You can try again when you are ready.
          </div>
        )}

        {/* Event Card */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
          <h1 className="text-4xl font-bold text-yellow-400">{event.title}</h1>
          <div className="py-2">
            <EventRatingSummary eventId={event.id} />
          </div>
          <p className="text-gray-300 text-lg">{event.description || "No description available."}</p>

          {isOwner && (
            <div className="rounded-xl border border-amber-500/50 bg-amber-950/30 p-4 text-sm">
              <p className="font-semibold text-amber-300 mb-2">You are the host</p>
              <p className="text-gray-300 mb-3">
                See everyone who requested to join, paid and is waiting, or is already approved on the{" "}
                <strong>join list</strong>.
              </p>
              <Link
                href={`/dashboard/myevents/${event.id}/participants`}
                className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-black font-semibold hover:bg-amber-400"
              >
                Open join list & approvals
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
            <div>
              <p className="font-semibold">Date</p>
              <p>{event.date ? new Date(event.date).toLocaleDateString() : "N/A"}</p>
            </div>

            <div>
              <p className="font-semibold">Time</p>
              <p>{event.time || "N/A"}</p>
            </div>

            <div>
              <p className="font-semibold">Venue / Link</p>
              <p>
                {event.venue ||
                  (event.eventLink ? (
                    <a href={event.eventLink} className="text-amber-400 hover:underline break-all">
                      {event.eventLink}
                    </a>
                  ) : (
                    "TBD"
                  ))}
              </p>
            </div>

            <div>
              <p className="font-semibold">Type</p>
              <p>{event.type?.replace("_", " ") || "N/A"}</p>
            </div>

            <div>
              <p className="font-semibold">Fee</p>
              <p>{event.fee != null ? (event.fee > 0 ? `৳${event.fee}` : "Free") : "N/A"}</p>
            </div>
          </div>

          {/* Participation Button */}
          {(event.fee ?? 0) > 0 && !isOwner && !participationStatus ? (
             <div className="flex flex-col gap-2">
               <p className="text-gray-400">
                 This event requires a payment of ৳{event.fee}. After payment, your request stays pending until the host approves.
               </p>
               <CheckoutButton
                 eventId={event.id}
                 fee={event.fee ?? 0}
                 label={event.type?.startsWith("PRIVATE") ? "Pay & Request" : "Pay & Join"}
               />
             </div>
          ) : (
            <EventInteractionButton 
              eventId={event.id}
              type={event.type || "PUBLIC_FREE"}
              isOwner={isOwner}
              participationStatus={participationStatus}
              fee={event.fee || 0}
            />
          )}

          {isOwner && (
            <InviteByEmail eventId={event.id} />
          )}

          <ReviewsSection eventId={event.id} isLogged={!!currentUser} />
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;