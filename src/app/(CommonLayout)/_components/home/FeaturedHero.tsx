import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin } from "lucide-react";
import { eventService } from "@/services/event.services";

export default async function FeaturedHero() {
  const res = await eventService.getFeatured();
  const event = res?.data;

  if (!event) {
    return (
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-amber-400">Planora</h1>
        <p className="max-w-xl text-slate-300 mb-8">
          Discover events, host your own, and connect with your community. An admin can feature a spotlight event on the homepage.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="bg-amber-500 text-black hover:bg-amber-400">
            <Link href="/events">Browse events</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-slate-500 text-white hover:bg-slate-800">
            <Link href="/signup">Get started</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-[70vh] flex flex-col justify-center px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950/40 text-white">
      <div className="max-w-4xl mx-auto w-full py-16">
        <p className="text-amber-400/90 text-sm font-semibold tracking-widest uppercase mb-3">Featured by admin</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{event.title}</h1>
        <p className="text-slate-300 text-lg mb-6 line-clamp-3">{event.description}</p>
        <div className="flex flex-wrap gap-6 text-slate-200 mb-8">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-amber-400" />
            {new Date(event.date).toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "short", day: "numeric" })}
            <span className="text-slate-400">·</span>
            {event.time}
          </span>
          {event.venue && (
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              {event.venue}
            </span>
          )}
        </div>
        <Button asChild size="lg" className="bg-amber-500 text-black hover:bg-amber-400 font-semibold">
          <Link href={`/events/${event.id}`}>Join event</Link>
        </Button>
      </div>
    </section>
  );
}
