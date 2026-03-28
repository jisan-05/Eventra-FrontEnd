import Link from "next/link";
import { cookies } from "next/headers";
import {
  CalendarDays,
  Mail,
  Star,
  Users,
  Settings,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000";

export default async function UserDashboardHome() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const headers = { Cookie: cookieHeader };

  const [eventsRes, invRes, partRes, revRes] = await Promise.all([
    fetch(`${API}/api/v1/events/my-events`, { headers, cache: "no-store" }),
    fetch(`${API}/api/v1/invitations/my-invitations`, { headers, cache: "no-store" }),
    fetch(`${API}/api/v1/participations/my-participations`, { headers, cache: "no-store" }),
    fetch(`${API}/api/v1/reviews/my-reviews`, { headers, cache: "no-store" }),
  ]);

  const [eventsJson, invJson, partJson, revJson] = await Promise.all([
    eventsRes.json(),
    invRes.json(),
    partRes.json(),
    revRes.json(),
  ]);

  const hostedCount = (eventsJson?.data || []).length;
  const pendingInvites = (invJson?.data || []).filter((i: { status: string }) => i.status === "PENDING").length;
  const joinedCount = (partJson?.data || []).filter(
    (p: { status: string }) => p.status === "APPROVED",
  ).length;
  const reviewsWritten = (revJson?.data || []).length;

  const cards = [
    {
      title: "My events",
      count: hostedCount,
      desc: "Events you host. Open one to see the join list and pending requests.",
      href: "/dashboard/myevents",
      icon: CalendarDays,
      cta: "Open my events",
    },
    {
      title: "Join list & approvals",
      desc: "For each hosted event: My events → Join list & approvals. See who paid or requested access, approve or reject, and who has joined.",
      href: "/dashboard/myevents",
      icon: ClipboardList,
      cta: "Go to my events",
      highlight: true,
    },
    {
      title: "Joined events",
      count: joinedCount,
      desc: "Events you are approved to attend.",
      href: "/dashboard/joined-events",
      icon: Users,
      cta: "View joined",
    },
    {
      title: "Invitations",
      count: pendingInvites,
      desc: pendingInvites ? `${pendingInvites} pending invite(s).` : "No pending invites.",
      href: "/dashboard/invitations",
      icon: Mail,
      cta: "View invitations",
    },
    {
      title: "My reviews",
      count: reviewsWritten,
      desc: "Reviews you wrote. Event pages also show all reviews for that event.",
      href: "/dashboard/reviews",
      icon: Star,
      cta: "Manage reviews",
    },
    {
      title: "Settings",
      desc: "Profile name and image.",
      href: "/dashboard/settings",
      icon: Settings,
      cta: "Open settings",
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Everything you need for hosting, joining, invitations, and reviews.
        </p>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-sm text-gray-800">
        <p className="font-semibold text-amber-900 mb-2">Where is the join list?</p>
        <p className="leading-relaxed">
          Go to <strong>My events</strong>, pick your event, then click <strong>Join list & approvals</strong>.
          You will see <strong>Pending</strong> (payment done or request sent, waiting on you) and{" "}
          <strong>Approved</strong> (people who have joined). You can also open the event page as host and use the
          shortcut link there.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.title}
              href={c.href}
              className={`group rounded-2xl border p-5 shadow-sm transition hover:shadow-md hover:border-gray-300 bg-white ${
                c.highlight ? "ring-2 ring-amber-400/40 border-amber-200" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-gray-100 p-2.5">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{c.title}</h2>
                    {typeof c.count === "number" && (
                      <p className="text-2xl font-bold text-gray-900 mt-0.5">{c.count}</p>
                    )}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700 shrink-0 mt-1" />
              </div>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{c.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 mt-3">
                {c.cta}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
