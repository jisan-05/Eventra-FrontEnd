"use client";

import { Button } from "@/components/ui/button";
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
    if (!confirm("Are you sure you want to delete this event?")) return;

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
      <Button
        size="sm"
        variant="destructive"
        onClick={handleDelete}
        disabled={loading}
      >
        <Trash2 className="w-4 h-4 mr-1" /> Delete
      </Button>
    </div>
  );
}