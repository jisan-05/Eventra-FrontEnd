"use client";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { eventServices } from "@/services/event.service";


interface EventActionsProps {
  eventId: string;
  isAdmin?: boolean;
}

export default function EventActions({ eventId, isAdmin = false }: EventActionsProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await eventServices.deleteEvent(eventId, isAdmin);
      if (res.success) {
        toast.success("Event deleted successfully!");
        // Optionally redirect to events list
        window.location.href = "/dashboard/manage-events";
      } else {
        toast.error(res.message || "Failed to delete event");
      }
    } catch (err) {
      toast.error("Error deleting event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex space-x-2">
      <Link href={`/dashboard/edit-event/${eventId}`}>
        <Button size="sm" variant="secondary">
          <Pencil className="w-4 h-4 mr-1" /> Edit
        </Button>
      </Link>
      <ConfirmDialog
        title="Delete this event?"
        description="This permanently removes the event. You can’t undo this."
        confirmLabel="Delete"
        variant="destructive"
        trigger={
          <Button size="sm" variant="destructive" disabled={loading} type="button">
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </Button>
        }
        onConfirm={handleDelete}
      />
    </div>
  );
}