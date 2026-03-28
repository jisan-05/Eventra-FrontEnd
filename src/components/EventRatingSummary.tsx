import Link from "next/link";

const API = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000";

type ReviewRow = { rating: number };

export default async function EventRatingSummary({ eventId }: { eventId: string }) {
  const res = await fetch(`${API}/api/v1/reviews/event/${eventId}`, { cache: "no-store" });
  const json = await res.json();
  const list = (json?.data || []) as ReviewRow[];

  if (!list.length) {
    return (
      <p className="text-gray-400 text-sm">
        No reviews yet.{" "}
        <Link href="#event-reviews" className="text-amber-400 hover:underline">
          Be the first to review
        </Link>
        .
      </p>
    );
  }

  const avg = list.reduce((s, r) => s + r.rating, 0) / list.length;

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="text-amber-400 font-bold text-lg">{avg.toFixed(1)}</span>
      <span className="text-yellow-500">★</span>
      <span className="text-gray-400">
        {list.length} review{list.length === 1 ? "" : "s"}
      </span>
      <span className="text-gray-500">·</span>
      <Link href="#event-reviews" className="text-amber-400 hover:underline font-medium">
        Read all reviews
      </Link>
    </div>
  );
}
