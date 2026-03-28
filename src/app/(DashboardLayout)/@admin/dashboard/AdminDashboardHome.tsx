import Link from "next/link";
import { Users, CalendarDays, PlusCircle, LayoutDashboard } from "lucide-react";

const links = [
  { href: "/dashboard/manage-users", title: "Manage users", desc: "Soft-delete accounts and monitor users.", icon: Users },
  { href: "/dashboard/manage-events", title: "Manage events", desc: "All events, feature on homepage, delete.", icon: CalendarDays },
  { href: "/dashboard/create-event", title: "Create event", desc: "Create an event as admin.", icon: PlusCircle },
];

export default function AdminDashboardHome() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold">Admin dashboard</h1>
          <p className="text-gray-600 text-sm">Moderation and platform tools.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {links.map(({ href, title, desc, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition flex gap-4"
          >
            <div className="rounded-xl bg-blue-50 p-3 h-fit">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">{title}</h2>
              <p className="text-sm text-gray-600 mt-1">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
