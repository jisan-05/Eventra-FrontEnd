/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Row = {
  id: string;
  status: string;
  user: { name: string; email: string };
};

const ORDER = ["PENDING", "APPROVED", "REJECTED", "BANNED"];

const LABELS: Record<string, string> = {
  PENDING: "Waiting for you (paid or requested — not approved yet)",
  APPROVED: "Joined — approved attendees",
  REJECTED: "Rejected requests",
  BANNED: "Banned from this event",
};

function ParticipantTable({
  rows,
  onApprove,
  onReject,
  onBan,
}: {
  rows: Row[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onBan: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border overflow-hidden mb-6">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Status</th>
            <th className="text-right p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b last:border-0">
              <td className="p-3 font-medium">{r.user.name}</td>
              <td className="p-3 text-gray-600">{r.user.email}</td>
              <td className="p-3 font-mono text-xs">{r.status}</td>
              <td className="p-3 text-right space-x-1 flex flex-wrap justify-end gap-1">
                {r.status === "PENDING" && (
                  <>
                    <Button size="sm" variant="default" onClick={() => onApprove(r.id)}>
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onReject(r.id)}>
                      Reject
                    </Button>
                  </>
                )}
                {r.status === "APPROVED" && (
                  <Button size="sm" variant="destructive" onClick={() => onBan(r.id)}>
                    Ban
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ParticipantsClient({ eventId }: { eventId: string }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/participations/${eventId}/participants`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRows(data.data || []);
      } else {
        toast.error(data.message || "Could not load participants");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [eventId]);

  const setStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/v1/participations/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Updated");
        load();
      } else {
        toast.error(data.message || "Failed");
      }
    } catch {
      toast.error("Network error");
    }
  };

  const grouped = useMemo(() => {
    const m = new Map<string, Row[]>();
    for (const s of ORDER) m.set(s, []);
    for (const r of rows) {
      const list = m.get(r.status) || [];
      list.push(r);
      m.set(r.status, list);
    }
    return m;
  }, [rows]);

  if (loading) return <p className="text-gray-500">Loading join list…</p>;

  if (rows.length === 0) {
    return (
      <p className="text-gray-500">
        No one has joined or requested yet. When someone joins (or pays for a paid event), they will appear here as{" "}
        <strong>PENDING</strong> until you approve.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {ORDER.map((status) => {
        const list = grouped.get(status) || [];
        if (list.length === 0) return null;
        return (
          <div key={status}>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">{LABELS[status] || status}</h2>
            <p className="text-xs text-gray-500 mb-2">
              {list.length} person{list.length === 1 ? "" : "s"}
            </p>
            <ParticipantTable
              rows={list}
              onApprove={(id) => setStatus(id, "APPROVED")}
              onReject={(id) => setStatus(id, "REJECTED")}
              onBan={(id) => setStatus(id, "BANNED")}
            />
          </div>
        );
      })}
    </div>
  );
}
