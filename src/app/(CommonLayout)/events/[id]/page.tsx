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
import { getForwardedCookieHeader } from "@/lib/get-cookie-header";
import EventCard from "@/app/(CommonLayout)/_components/event/FeaturedEventCard";

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
  image?: string | null;
  banner?: string | null;
  gallery?: string[] | null;
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

  const cookieHeader = await getForwardedCookieHeader();
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/events/${id}`, {
    cache: "no-store",
    headers: { Cookie: cookieHeader },
  });
  const payload = await res.json();
  const event: Event | null = res.ok && payload?.success !== false ? payload?.data ?? null : null;

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        <div className="text-center max-w-md mx-auto">
          <p className="mb-4 text-lg">
            {res.status === 403 || res.status === 401
              ? "This is a private event. Sign in with an invited account to view it."
              : "Event not found"}
          </p>
          <Link href="/events" className="text-primary hover:underline inline-flex items-center gap-1">
            <ChevronLeft size={18} /> Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const { data: sessionData } = await userService.getSession();
  const currentUser = sessionData?.user;
  const isOwner = currentUser?.id === event.ownerId;

  const media: string[] = Array.from(
    new Set(
      [event.image, event.banner, ...(Array.isArray(event.gallery) ? event.gallery : [])].filter(
        (value): value is string => typeof value === "string" && value.trim().length > 0,
      ),
    ),
  );
  const mediaItems = media.length ? media : ["/logo.avif", "/logo.avif", "/logo.avif"];

  const apiBase = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000";
  let paymentConfirmAlreadyRecorded = false;
  if (isSuccess && stripeSessionId && currentUser) {
    try {
      const confirmRes = await fetch(`${apiBase}/api/v1/payments/confirm-stripe-session`, {
        method: "POST",
        headers: {
          Cookie: cookieHeader,
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

  let participationStatus: string | null = null;
  if (currentUser) {
    try {
      const pRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/participations/my-participations`, {
        headers: { Cookie: cookieHeader },
        cache: "no-store",
      });
      const myParticipations = await pRes.json();
      const list = myParticipations?.data;
      const currentP = Array.isArray(list)
        ? list.find(
            (p: { eventId?: string; event?: { id?: string } }) =>
              p.eventId === id || p.event?.id === id,
          )
        : undefined;
      participationStatus = currentP?.status ?? null;
    } catch (e) {
      console.error(e);
    }
  }

  let hasSuccessfulPayment = false;
  const paidEvent = (event.fee ?? 0) > 0;
  if (currentUser && paidEvent) {
    try {
      const payRes = await fetch(`${apiBase}/api/v1/payments/event/${id}/status`, {
        headers: { Cookie: cookieHeader, Accept: "application/json" },
        cache: "no-store",
      });
      const payJson = await payRes.json();
      hasSuccessfulPayment = !!payJson?.data?.hasSuccessfulPayment;
    } catch {
      /* ignore */
    }
  }

  if (!participationStatus && hasSuccessfulPayment && paidEvent) {
    participationStatus = "PENDING";
  }

  const showPaidCheckout = paidEvent && !isOwner && participationStatus == null;
  const relatedRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/events?upcoming=true`, {
    cache: "no-store",
    headers: { Cookie: cookieHeader },
  });
  const relatedJson = await relatedRes.json().catch(() => ({}));
  const relatedEvents = Array.isArray(relatedJson?.data)
    ? relatedJson.data.filter((row: Event) => row?.id !== event.id).slice(0, 4)
    : [];

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4">
      <StripePaymentConfirmClient />
      <div className="max-w-5xl mx-auto">
        <Link href="/events" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
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
          <div className="mb-6 bg-destructive/15 border border-destructive/50 text-destructive px-4 py-3 rounded-xl">
            Payment was canceled. You can try again when you are ready.
          </div>
        )}

        <div className="space-y-8">
          <section className="rounded-2xl border border-border bg-card p-4 md:p-6">
            <h2 className="mb-4 text-xl font-semibold">Media</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="md:col-span-2 overflow-hidden rounded-xl border border-border bg-muted">
                <img src={mediaItems[0]} alt={event.title} className="h-72 w-full object-cover md:h-80" />
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
                {mediaItems.slice(1, 3).map((src, index) => (
                  <div key={`${src}-${index}`} className="overflow-hidden rounded-xl border border-border bg-muted">
                    <img
                      src={src}
                      alt={`${event.title} media ${index + 2}`}
                      className="h-36 w-full object-cover md:h-[9.75rem]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4">
            <h1 className="text-3xl font-bold md:text-4xl">{event.title}</h1>
            <div className="py-1">
              <EventRatingSummary eventId={event.id} />
            </div>
            <h2 className="text-xl font-semibold">Description / Overview</h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              {event.description || "No description available."}
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-5">
            <h2 className="text-xl font-semibold">Key Information / Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground">
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="font-semibold">Date</p>
                <p className="text-muted-foreground">
                  {event.date ? new Date(event.date).toLocaleDateString() : "N/A"}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="font-semibold">Time</p>
                <p className="text-muted-foreground">{event.time || "N/A"}</p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="font-semibold">Venue / Link</p>
                <p className="text-muted-foreground break-all">
                  {event.venue ||
                    (event.eventLink ? (
                      <a href={event.eventLink} className="text-primary hover:underline">
                        {event.eventLink}
                      </a>
                    ) : (
                      "TBD"
                    ))}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="font-semibold">Type</p>
                <p className="text-muted-foreground">{event.type?.replace("_", " ") || "N/A"}</p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="font-semibold">Fee</p>
                <p className="text-muted-foreground">
                  {event.fee != null ? (event.fee > 0 ? `$ ${event.fee}` : "Free") : "N/A"}
                </p>
              </div>
            </div>

            {showPaidCheckout ? (
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground">
                  This event requires a payment of ${event.fee}. After payment, your request stays pending until the
                  host approves.
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
          </section>

          {isOwner && (
            <section className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
              <p className="font-semibold text-amber-600 dark:text-amber-400 mb-2">You are the host</p>
              <p className="text-muted-foreground mb-3">
                See everyone who requested to join, paid and is waiting, or is already approved on the{" "}
                <strong>join list</strong>.
              </p>
              <Link
                href={`/dashboard/myevents/${event.id}/participants`}
                className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-black font-semibold hover:bg-amber-400"
              >
                Open join list & approvals
              </Link>
            </section>
          )}

          {isOwner && <InviteByEmail eventId={event.id} />}

          <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <ReviewsSection eventId={event.id} isLogged={!!currentUser} />
          </section>

          {relatedEvents.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Related Events</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedEvents.map((item: Event) => (
                  <EventCard key={item.id} event={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;