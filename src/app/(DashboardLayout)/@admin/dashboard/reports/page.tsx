import { homepageService } from "@/services/homepage.service";
import {
  BarChart3,
  CalendarDays,
  CreditCard,
  Star,
  Users,
  UserCheck,
  Clock,
  XCircle,
  Ban,
} from "lucide-react";

export const dynamic = "force-dynamic";

const EVENT_LABELS: Record<string, string> = {
  PUBLIC_FREE: "Public · Free",
  PUBLIC_PAID: "Public · Paid",
  PRIVATE_FREE: "Private · Free",
  PRIVATE_PAID: "Private · Paid",
};

function StatCard({
  title,
  value,
  sub,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  sub?: string;
  icon: typeof Users;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
          {sub ? (
            <p className="mt-1 text-xs text-slate-500">{sub}</p>
          ) : null}
        </div>
        <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export default async function AdminReportsPage() {
  const [stats, recentReviews] = await Promise.all([
    homepageService.getPlatformStats(),
    homepageService.getRecentReviews(),
  ]);

  if (!stats) {
    return (
      <div className="max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900">
        <h1 className="text-lg font-semibold">Could not load reports</h1>
        <p className="mt-2 text-sm">
          Check that the API is running and{" "}
          <code className="rounded bg-red-100 px-1">NEXT_PUBLIC_APP_URL</code>{" "}
          points to your backend.
        </p>
      </div>
    );
  }

  const chartRows = Object.entries(stats.eventsByType).map(([type, count]) => ({
    type: EVENT_LABELS[type] ?? type,
    count,
  }));
  const maxTypeCount = Math.max(...chartRows.map((row) => row.count), 1);
  const pieTotal = chartRows.reduce((sum, row) => sum + row.count, 0) || 1;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex items-center gap-3">
        <BarChart3 className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
          <p className="text-sm text-slate-600">
            Live metrics from your database — totals, participation pipeline,
            events breakdown, and recent reviews.
          </p>
        </div>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Overview
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total events"
            value={stats.totalEvents}
            icon={CalendarDays}
          />
          <StatCard
            title="Active users"
            value={stats.activeUsers}
            sub={`${stats.adminUsers} admin · ${stats.regularUsers} user${
              stats.deletedUsers > 0
                ? ` · ${stats.deletedUsers} deleted (in DB)`
                : ""
            }`}
            icon={Users}
          />
          <StatCard
            title="Approved join requests"
            value={stats.totalParticipations}
            icon={UserCheck}
          />
          <StatCard
            title="Reviews · avg rating"
            value={stats.totalReviews}
            sub={`Average ${stats.avgRating} / 5`}
            icon={Star}
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Participation status
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Pending"
            value={stats.participationsPending}
            icon={Clock}
          />
          <StatCard
            title="Rejected"
            value={stats.participationsRejected}
            icon={XCircle}
          />
          <StatCard
            title="Banned"
            value={stats.participationsBanned}
            icon={Ban}
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Payments (successful)
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard
            title="Successful checkouts"
            value={stats.successfulPaymentsCount}
            icon={CreditCard}
          />
          <StatCard
            title="Total revenue (charged)"
            value={`$${stats.revenueTotal.toLocaleString()}`}
            sub="Sum of SUCCESS payment amounts in the database"
            icon={CreditCard}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="font-semibold text-slate-900">Events by type</h2>
          <p className="text-sm text-slate-500">
            Count of events per visibility / pricing category.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-600">
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium text-right">Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats.eventsByType).map(([type, count]) => (
                <tr
                  key={type}
                  className="border-b border-slate-50 last:border-0"
                >
                  <td className="px-5 py-3 text-slate-800">
                    {EVENT_LABELS[type] ?? type}
                  </td>
                  <td className="px-5 py-3 text-right font-medium tabular-nums text-slate-900">
                    {count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Bar Chart · Events by Type</h3>
          <div className="space-y-3">
            {chartRows.map((row) => (
              <div key={row.type}>
                <div className="mb-1 flex items-center justify-between text-xs text-slate-600">
                  <span>{row.type}</span>
                  <span>{row.count}</span>
                </div>
                <div className="h-2 w-full rounded bg-slate-100">
                  <div
                    className="h-2 rounded bg-blue-500"
                    style={{ width: `${Math.max((row.count / maxTypeCount) * 100, 4)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Pie Chart · Event Type Share</h3>
          <div className="space-y-3">
            {chartRows.map((row) => {
              const pct = ((row.count / pieTotal) * 100).toFixed(1);
              return (
                <div key={row.type} className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">{row.type}</span>
                  <span className="font-medium text-slate-900">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="font-semibold text-slate-900">Recent reviews</h2>
          <p className="text-sm text-slate-500">
            Latest {recentReviews.length} reviews from the API.
          </p>
        </div>
        {recentReviews.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slate-500">
            No reviews yet.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recentReviews.map((r) => (
              <li key={r.id} className="px-5 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-medium text-slate-900">
                    {r.event.title}
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    {r.rating}★ ·{" "}
                    {new Date(r.createdAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {r.user.name ?? "User"} — {r.comment || "—"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
