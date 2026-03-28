import Link from "next/link";
import InviteByEmail from "@/components/InviteByEmail";
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
      <h1 className="text-2xl font-bold">Join list & approvals</h1>
      <p className="text-gray-600 text-sm max-w-2xl">
        This is the full list for your event. <strong>Pending</strong> means they paid (if applicable) or requested
        access and are waiting for you. <strong>Approved</strong> means they are on the attendee list. Reviews for
        this event stay on the public event page under &quot;Reviews & ratings&quot;.
      </p>
      <div className="max-w-xl">
        <InviteByEmail eventId={eventId} variant="light" />
      </div>
      <ParticipantsClient eventId={eventId} />
    </div>
  );
}
