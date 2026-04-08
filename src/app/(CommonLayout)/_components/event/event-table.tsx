/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EventTableProps {
  events: any[];
}

export default function EventTable({ events }: EventTableProps) {
  const [eventList, setEventList] = useState(events);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 8;

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

  const filtered = useMemo(() => {
    return eventList.filter((event) => {
      const matchQuery =
        String(event.title || "").toLowerCase().includes(query.toLowerCase()) ||
        String(event.owner?.name || "").toLowerCase().includes(query.toLowerCase());
      const matchType = typeFilter === "ALL" ? true : event.type === typeFilter;
      return matchQuery && matchType;
    });
  }, [eventList, query, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="bg-card rounded-2xl shadow-md border border-border">
      <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Filter by title or organizer..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="md:max-w-sm"
        />
        <Select
          value={typeFilter}
          onValueChange={(value) => {
            setTypeFilter(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full md:w-52">
            <SelectValue placeholder="Filter by event type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All types</SelectItem>
            <SelectItem value="PUBLIC_FREE">Public Free</SelectItem>
            <SelectItem value="PUBLIC_PAID">Public Paid</SelectItem>
            <SelectItem value="PRIVATE_FREE">Private Free</SelectItem>
            <SelectItem value="PRIVATE_PAID">Private Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
          {paginated.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No events found
              </TableCell>
            </TableRow>
          )}

          {paginated.map((event) => (
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
      <div className="flex items-center justify-between border-t border-border p-4 text-sm">
        <p className="text-muted-foreground">
          Showing {(safePage - 1) * pageSize + (paginated.length ? 1 : 0)}-
          {(safePage - 1) * pageSize + paginated.length} of {filtered.length}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={safePage <= 1}
          >
            Prev
          </Button>
          <span className="px-2 text-muted-foreground">
            {safePage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={safePage >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}