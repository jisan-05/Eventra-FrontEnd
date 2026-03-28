/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import InvitationActions from "./InvitationActions";


export default async function InvitationsPage() {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/invitations/my-invitations`, {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  });
  const data = await res.json();
  const all = (data.data || []) as any[];
  const invitations = all.filter((inv) => inv.status === "PENDING");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Invitations</h1>
      <p className="text-gray-600 text-sm mb-6">Pending invites to private or paid events. Accept, decline, or pay when required.</p>
      {invitations.length === 0 ? (
        <p className="text-gray-500">You have no pending invitations.</p>
      ) : (
        <div className="space-y-4">
          {invitations.map((inv: any) => (
            <div key={inv.id} className="p-4 bg-white border rounded-xl shadow-sm flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="font-semibold text-lg">{inv.event.title}</h3>
                <p className="text-sm text-gray-600">Invited by: {inv.inviter?.name} ({inv.inviter?.email})</p>
                <div className="mt-1 flex gap-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{inv.event.type.replace("_", " ")}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Fee: ৳{inv.event.fee}</span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Status: {inv.status}</span>
                </div>
              </div>
              <InvitationActions 
                invitationId={inv.id} 
                eventId={inv.event.id}
                status={inv.status} 
                eventType={inv.event.type} 
                fee={inv.event.fee} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
