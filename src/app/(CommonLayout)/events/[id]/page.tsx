import CheckoutButton from "../../../../components/CheckoutButton";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import EventInteractionButton from "@/components/EventInteractionButton";
import ReviewsSection from "@/components/ReviewsSection";
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

  // Fetch single event directly in page
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/events/${id}`, {
    cache: "no-store",
  });

  const payload = await res.json();
  const event: Event | null = payload?.data ?? null;

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
        <div className="text-center">
          <p className="mb-4 text-lg">Event not found</p>
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

  let participationStatus = null;
  if (currentUser) {
    try {
      const cookieStore = await cookies();
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
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6"
        >
          <ChevronLeft size={18} /> Back
        </Link>

        {isSuccess && (
          <div className="mb-6 bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded-xl">
            Payment successful! You are now participating in this event.
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
          <p className="text-gray-300 text-lg">{event.description || "No description available."}</p>

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

          <ReviewsSection eventId={event.id} isLogged={!!currentUser} />
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;