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
    <Card className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
      {/* Header */}
      <CardHeader className="flex flex-row justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            isPaid ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
          }`}
        >
          {isPaid ? "Paid" : "Free"}
        </span>

        <span className="text-sm text-gray-500">
          {new Date(event.date).toLocaleDateString()}
        </span>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-3">
        <h2 className="text-lg font-semibold line-clamp-1">{event.title}</h2>

        <p className="text-sm text-gray-600 line-clamp-2">
          {event.description}
        </p>

        {/* Info */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays size={16} />
          <span>{event.time}</span>
        </div>

        {event.venue && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={16} />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-3">
          <span className="text-sm font-medium text-gray-700">
            {isPaid ? `৳${event.fee}` : "Free"}
          </span>

          <Link href={`/events/${event.id}`}>
            <Button size="sm" className="rounded-full">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
