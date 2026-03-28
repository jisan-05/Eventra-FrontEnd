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

  return (
    <Card className="h-full rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white to-slate-50 shadow-[0_4px_28px_-8px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-blue-300/60 hover:shadow-[0_22px_44px_-12px_rgba(30,58,138,0.12)]">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            isPaid
              ? "bg-blue-100 text-blue-950 ring-1 ring-blue-200/80"
              : "bg-slate-100 text-slate-800 ring-1 ring-slate-200/90"
          }`}
        >
          {isPaid ? "Paid" : "Free"}
        </span>

        <span className="text-sm text-slate-500">
          {new Date(event.date).toLocaleDateString()}
        </span>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-3">
        <h2 className="line-clamp-1 text-lg font-semibold text-slate-900">{event.title}</h2>
        <p className="text-xs text-slate-600">Organizer: {event.owner?.name ?? "—"}</p>

        <p className="line-clamp-2 text-sm text-slate-600">
          {event.description}
        </p>

        {/* Info */}
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarDays size={16} />
          <span>{event.time}</span>
        </div>

        {event.venue && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin size={16} />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3">
          <span className="text-sm font-medium text-slate-800">
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
