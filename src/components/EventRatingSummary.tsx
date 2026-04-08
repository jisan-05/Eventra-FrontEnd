import Link from "next/link";

const API = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000";

type ReviewRow = { rating: number };

export default async function EventRatingSummary({ eventId }: { eventId: string }) {
  const res = await fetch(`${API}/api/v1/reviews/event/${eventId}`, { cache: "no-store" });
  const json = await res.json();
  const list = (json?.data || []) as ReviewRow[];

  if (!list.length) {
    return (
      <p className="text-muted-foreground text-sm">
        No reviews yet.{" "}
        <Link href="#event-reviews" className="text-primary hover:underline">
          Be the first to review
        </Link>
        .
      </p>
    );
  }

  const avg = list.reduce((s, r) => s + r.rating, 0) / list.length;

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="text-primary font-bold text-lg">{avg.toFixed(1)}</span>
      <span className="text-primary">★</span>
      <span className="text-muted-foreground">
        {list.length} review{list.length === 1 ? "" : "s"}
      </span>
      <span className="text-muted-foreground">·</span>
      <Link href="#event-reviews" className="text-primary hover:underline font-medium">
        Read all reviews
      </Link>
    </div>
  );
}
