import { eventService } from "@/services/event.services";
import EventsSlider from "./EventsSlider";

export default async function EventsSliderComponents() {
  const events = await eventService.getEvents({ upcoming: "true" });
  const list = (events.data || []) as Array<{ type?: string; date?: string }>;
  const publicUpcoming = list
    .filter((e) => e.type?.startsWith("PUBLIC"))
    .sort((a, b) => new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime())
    .slice(0, 9);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-2 text-center">Upcoming public events</h2>
      <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
        Nine upcoming public events — swipe or scroll to explore.
      </p>

      <EventsSlider events={publicUpcoming} />
    </div>
  );
}