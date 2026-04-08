 /* eslint-disable @typescript-eslint/no-explicit-any */
import { eventService } from "@/services/event.services";
import EventCard from "./FeaturedEventCard";
import EventFilters from "./EventFilters";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function EventsPage({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const page = Math.max(1, Number(searchParams?.page || "1"));
  const perPage = 8;
  const sort = searchParams?.sort || "date-asc";
  const price = searchParams?.price || "ALL";
  const location = (searchParams?.location || "").toLowerCase();

  const baseQuery = {
    search: searchParams?.search || "",
    type: searchParams?.type || "",
  };

  const events = await eventService.getEvents(baseQuery);
  let list = (events.data || []) as any[];

  if (location) {
    list = list.filter((event) =>
      String(event.venue || event.eventLink || "")
        .toLowerCase()
        .includes(location),
    );
  }

  if (price === "FREE") {
    list = list.filter((event) => Number(event.fee || 0) <= 0);
  } else if (price === "PAID") {
    list = list.filter((event) => Number(event.fee || 0) > 0);
  }

  const sorted = [...list].sort((a, b) => {
    if (sort === "date-desc") return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
    if (sort === "price-asc") return Number(a.fee || 0) - Number(b.fee || 0);
    if (sort === "price-desc") return Number(b.fee || 0) - Number(a.fee || 0);
    if (sort === "title-asc") return String(a.title || "").localeCompare(String(b.title || ""));
    if (sort === "title-desc") return String(b.title || "").localeCompare(String(a.title || ""));
    return new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime();
  });

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * perPage;
  const pageItems = sorted.slice(start, start + perPage);

  const createPageHref = (nextPage: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams || {}).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    params.set("page", String(nextPage));
    return `/events?${params.toString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">All Events</h1>

      <EventFilters />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {pageItems.length === 0 ? (
           <p>No events found matching your criteria.</p>
        ) : (
           pageItems.map((event: any) => (
             <EventCard key={event.id} event={event} />
           ))
        )}
      </div>

      {total > 0 && (
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">
            Showing {start + 1}-{Math.min(start + perPage, total)} of {total} events
          </p>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" disabled={safePage <= 1}>
              <Link href={createPageHref(Math.max(1, safePage - 1))}>Previous</Link>
            </Button>
            <span className="text-sm px-3 py-1 rounded-md border border-border bg-card">
              Page {safePage} of {totalPages}
            </span>
            <Button asChild variant="outline" disabled={safePage >= totalPages}>
              <Link href={createPageHref(Math.min(totalPages, safePage + 1))}>Next</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}