/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";

interface EventCardProps {
  event: any;
}

export default function EventCard({ event }: EventCardProps) {
  const isPaid = event.fee > 0;
  const imageUrl = event.image || event.banner || "/logo.avif";
  const rating =
    typeof event.averageRating === "number"
      ? event.averageRating.toFixed(1)
      : typeof event.rating === "number"
      ? event.rating.toFixed(1)
      : "N/A";

  return (
    <Card className="h-full overflow-hidden rounded-2xl border border-border bg-card shadow-[0_4px_28px_-8px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-blue-300/60 hover:shadow-[0_22px_44px_-12px_rgba(30,58,138,0.12)]">
      <div className="h-44 w-full bg-muted">
        <img
          src={imageUrl}
          alt={event.title || "Event image"}
          className="h-full w-full object-cover"
        />
      </div>
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            isPaid
              ? "bg-blue-100 text-blue-200 ring-1 ring-blue-200/80"
              : "bg-muted text-foreground ring-1 ring-border"
          }`}
        >
          {isPaid ? "Paid" : "Free"}
        </span>

        <span className="text-sm text-muted-foreground">
          {new Date(event.date).toLocaleDateString()}
        </span>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-3">
        <h2 className="line-clamp-1 text-lg font-semibold text-foreground">{event.title}</h2>
        <p className="text-xs text-muted-foreground">Organizer: {event.owner?.name ?? "—"}</p>

        <p className="line-clamp-2 min-h-10 text-sm text-muted-foreground">
          {event.description || "No description provided for this event."}
        </p>

        {/* Info */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays size={16} />
          <span>{event.time}</span>
        </div>

        {event.venue && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={16} />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
          <span>Price: {isPaid ? `$${event.fee}` : "Free"}</span>
          <span>Rating: {rating}</span>
          <span className="col-span-2 line-clamp-1">Location: {event.venue || "Online / TBA"}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-medium text-foreground">
            {isPaid ? `$${event.fee}` : "Free"}
          </span>

          <Link href={`/events/${event.id}`}>
            <Button
              size="sm"
              className="rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
