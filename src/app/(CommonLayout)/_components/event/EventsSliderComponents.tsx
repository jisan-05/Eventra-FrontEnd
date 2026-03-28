import { eventService } from "@/services/event.services";
import UpcomingEventsShell from "./UpcomingEventsShell";

export default async function EventsSliderComponents() {
  const events = await eventService.getEvents({ upcoming: "true" });
  const list = (events.data || []) as Array<{ type?: string; date?: string }>;
  const publicUpcoming = list
    .filter((e) => e.type?.startsWith("PUBLIC"))
    .sort((a, b) => new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime())
    .slice(0, 9);

  return <UpcomingEventsShell events={publicUpcoming} />;
}