import Link from "next/link";
import { cookies } from "next/headers";

const BASE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000";

export default async function JoinedEventsPage() {
  const cookieStore = await cookies();
  const res = await fetch(`${BASE}/api/v1/participations/my-participations`, {
    cache: "no-store",
    headers: { Cookie: cookieStore.toString() },
  });
  const json = await res.json();
  const list = (json.data || []) as Array<{ id: string; status: string; event: { id: string; title: string; date: string } }>;

  const approved = list.filter((p) => p.status === "APPROVED");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Joined events</h1>
      <p className="text-gray-600 text-sm">Events you are approved to attend.</p>
      {approved.length === 0 ? (
        <p className="text-gray-500">No joined events yet.</p>
      ) : (
        <ul className="space-y-3">
          {approved.map((p) => (
            <li key={p.id} className="bg-white border rounded-xl p-4 flex justify-between items-center gap-4">
              <div>
                <h2 className="font-semibold">{p.event.title}</h2>
                <p className="text-sm text-gray-500">{new Date(p.event.date).toLocaleString()}</p>
              </div>
              <Link href={`/events/${p.event.id}`} className="text-amber-600 text-sm font-medium hover:underline">
                Open
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
