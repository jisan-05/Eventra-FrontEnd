import Link from "next/link";
import ParticipantsClient from "./ParticipantsClient";

export default async function ParticipantsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  return (
    <div className="space-y-6">
      <Link href="/dashboard/myevents" className="text-sm text-gray-600 hover:text-black">
        ← Back to my events
      </Link>
      <h1 className="text-2xl font-bold">Manage participants</h1>
      <ParticipantsClient eventId={eventId} />
    </div>
  );
}
