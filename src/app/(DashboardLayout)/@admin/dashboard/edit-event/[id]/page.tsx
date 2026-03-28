import EventForm from "@/components/event-form";

export default async function AdminEditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EventForm eventId={id} title="Edit Event" />;
}
