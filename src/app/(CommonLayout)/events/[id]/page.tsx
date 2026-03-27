import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type Event = {
  id: string;
  title: string;
  description?: string | null;
  venue?: string | null;
  date?: string | null;
  time?: string | null;
  type?: "PUBLIC" | "PRIVATE";
  fee?: number | null;
  ownerId?: string;
};

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // Fetch single event directly in page
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/events/${id}`, {
    cache: "no-store",
  });

  const event: Event | null = (await res.json())?.data ?? null;

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

  // Participation button text
  const participationText = () => {
    if (event.type === "PUBLIC") {
      return event.fee && event.fee > 0
        ? "Payment required → Pending approval"
        : "Join instantly";
    } else {
      return event.fee && event.fee > 0
        ? "Payment required → Pending approval"
        : "Request to join → Pending approval";
    }
  };

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
              <p className="font-semibold">Venue</p>
              <p>{event.venue || "Online / TBD"}</p>
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
          <button className="w-full md:w-auto mt-6 px-6 py-3 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition">
            {participationText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;