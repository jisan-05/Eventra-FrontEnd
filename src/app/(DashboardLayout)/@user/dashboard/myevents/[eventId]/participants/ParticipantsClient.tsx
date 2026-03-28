/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Row = {
  id: string;
  status: string;
  user: { name: string; email: string };
};

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

  if (loading) return <p className="text-gray-500">Loading…</p>;

  if (rows.length === 0) return <p className="text-gray-500">No participants yet.</p>;

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
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
              <td className="p-3">{r.status}</td>
              <td className="p-3 text-right space-x-1 flex flex-wrap justify-end gap-1">
                {r.status === "PENDING" && (
                  <>
                    <Button size="sm" variant="default" onClick={() => setStatus(r.id, "APPROVED")}>
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setStatus(r.id, "REJECTED")}>
                      Reject
                    </Button>
                  </>
                )}
                {r.status === "APPROVED" && (
                  <Button size="sm" variant="destructive" onClick={() => setStatus(r.id, "BANNED")}>
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
