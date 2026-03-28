 /* eslint-disable @typescript-eslint/no-explicit-any */
import { eventService } from "@/services/event.services";
import EventCard from "./FeaturedEventCard";
import EventFilters from "./EventFilters";

export default async function EventsPage({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const events = await eventService.getEvents(searchParams);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">All Events</h1>

      <EventFilters />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.data?.length === 0 ? (
           <p>No events found matching your criteria.</p>
        ) : (
           events.data?.map((event: any) => (
             <EventCard key={event.id} event={event} />
           ))
        )}
      </div>
    </div>
  );
}