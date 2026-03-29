/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Eye, Pencil, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface EventTableProps {
  events: any[];
}

export default function EventTable({ events }: EventTableProps) {
  const [eventList, setEventList] = useState(events);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleFeature = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/events/feature/${id}`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Featured event updated");
      } else {
        toast.error(data.message || "Could not feature event (public events only)");
      }
    } catch {
      toast.error("Request failed");
    }
  };

  const handleDelete = async (id: string) => {
  try {
    setLoadingId(id);

    const res = await fetch(`/api/v1/events/admin/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      // 🔥 UI update
      setEventList((prev) => prev.filter((event) => event.id !== id));

      // ✅ SUCCESS TOAST
      toast.success("Event deleted successfully 🚀");
    } else {
      toast.error(data.message || "Failed to delete event");
    }
  } catch (err) {
    toast.error("Something went wrong ❌");
  } finally {
    setLoadingId(null);
  }
};

  return (
    <div className="bg-white rounded-2xl shadow-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {eventList.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No events found
              </TableCell>
            </TableRow>
          )}

          {eventList.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">
                {event.title}
              </TableCell>

              <TableCell>
                {new Date(event.date).toLocaleDateString()}
              </TableCell>

              <TableCell>
                {event.type.replace("_", " ")}
              </TableCell>

              <TableCell>
                {event.fee > 0 ? `$${event.fee}` : "Free"}
              </TableCell>

              <TableCell className="text-right space-x-2">
                <Link href={`/events/${event.id}`}>
                  <Button size="icon" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                </Link>

                <Button
                  size="icon"
                  variant="secondary"
                  title="Feature on homepage"
                  onClick={() => handleFeature(event.id)}
                >
                  <Star className="w-4 h-4" />
                </Button>

                

                {/* 🗑️ */}
                <ConfirmDialog
                  title="Delete this event?"
                  description="This permanently removes the event from the platform."
                  confirmLabel="Delete"
                  variant="destructive"
                  trigger={
                    <Button
                      size="icon"
                      variant="destructive"
                      disabled={loadingId === event.id}
                      type="button"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  }
                  onConfirm={() => handleDelete(event.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}