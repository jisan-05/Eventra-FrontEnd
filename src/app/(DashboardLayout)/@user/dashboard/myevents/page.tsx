import Link from "next/link";
import { Button } from "@/components/ui/button";
import { eventService } from "@/services/event.services";

export default async function MyEventsPage() {
  const res = await eventService.getMyEvents();
  const events = (res.data || []) as Array<{
    id: string;
    title: string;
    date: string;
    type: string;
    fee: number;
  }>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My events</h1>
          <p className="text-muted-foreground text-sm">
            Use <strong>Join list & approvals</strong> to see who joined, who paid, and who is waiting for your
            approval.
          </p>
        </div>
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/dashboard/create-event">Create event</Link>
        </Button>
      </div>

      {events.length === 0 ? (
        <p className="text-muted-foreground">You have not created any events yet.</p>
      ) : (
        <ul className="grid gap-4">
          {events.map((ev) => (
            <li
              key={ev.id}
              className="bg-card rounded-xl border border-border p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div>
                <h2 className="font-semibold text-lg">{ev.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {new Date(ev.date).toLocaleString()} · {ev.type.replace(/_/g, " ")} ·{" "}
                  {ev.fee > 0 ? `$${ev.fee}` : "Free"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/events/${ev.id}`}>View</Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/dashboard/edit-event/${ev.id}`}>Edit</Link>
                </Button>
                <Button asChild size="sm" className="bg-amber-500 text-black hover:bg-amber-400">
                  <Link href={`/dashboard/myevents/${ev.id}/participants`}>Join list & approvals</Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
