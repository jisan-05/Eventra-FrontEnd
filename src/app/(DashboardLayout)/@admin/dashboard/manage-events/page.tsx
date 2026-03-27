import EventTable from "@/app/(CommonLayout)/_components/event/event-table";
import { eventService } from "@/services/event.services";


export default async function ManageEventsPage() {
  const events = await eventService.getEvents();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Events</h1>

      <EventTable events={events.data || []} />
    </div>
  );
}