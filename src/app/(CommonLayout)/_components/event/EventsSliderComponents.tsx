import { eventService } from "@/services/event.services";
import EventsSlider from "./EventsSlider";

export default async function EventsSliderComponents() {
  const events = await eventService.getEvents();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Featured Events</h1>

      <EventsSlider events={events.data || []} />
    </div>
  );
}