/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Props = {
  eventId?: string;
  title?: string;
};

export default function EventForm({ eventId, title = "Create Event" }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(!!eventId);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    venue: "",
    eventLink: "",
    date: "",
    time: "",
    type: "",
    fee: "",
  });

  useEffect(() => {
    if (!eventId) return;
    (async () => {
      try {
        const res = await fetch(`/api/v1/events/${eventId}`, { credentials: "include" });
        const json = await res.json();
        const ev = json.data;
        if (!ev) {
          toast.error("Event not found");
          return;
        }
        const d = new Date(ev.date);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        setFormData({
          title: ev.title || "",
          description: ev.description || "",
          venue: ev.venue || "",
          eventLink: ev.eventLink || "",
          date: `${y}-${m}-${day}`,
          time: ev.time || "",
          type: ev.type || "",
          fee: ev.fee > 0 ? String(ev.fee) : "",
        });
      } catch {
        toast.error("Failed to load event");
      } finally {
        setLoadingEvent(false);
      }
    })();
  }, [eventId]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, type: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.type) {
      toast.error("Please select an event type");
      return;
    }
    setLoading(true);

    try {
      const finalData: any = {
        title: formData.title,
        description: formData.description,
        venue: formData.venue || null,
        eventLink: formData.eventLink || null,
        fee: parseFloat(formData.fee || "0"),
        date: new Date(formData.date).toISOString(),
        time: formData.time,
        type: formData.type,
      };

      if (formData.type.includes("FREE")) {
        finalData.fee = 0;
      }

      const url = eventId ? `/api/v1/events/${eventId}` : "/api/v1/events";
      const res = await fetch(url, {
        method: eventId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(finalData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Request failed");
      }

      toast.success(eventId ? "Event updated" : "Event created");
      router.push("/dashboard/myevents");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loadingEvent) {
    return <div className="max-w-2xl mx-auto p-6 text-center text-gray-600">Loading event…</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div>
          <Label>Venue</Label>
          <Input name="venue" value={formData.venue} onChange={handleChange} />
        </div>

        <div>
          <Label>Event Link</Label>
          <Input name="eventLink" value={formData.eventLink} onChange={handleChange} placeholder="https://…" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Date</Label>
            <Input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div>
            <Label>Time</Label>
            <Input type="time" name="time" value={formData.time} onChange={handleChange} required />
          </div>
        </div>

        <div>
          <Label>Event Type</Label>
          <Select value={formData.type || undefined} onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PUBLIC_FREE">Public Free</SelectItem>
              <SelectItem value="PUBLIC_PAID">Public Paid</SelectItem>
              <SelectItem value="PRIVATE_FREE">Private Free</SelectItem>
              <SelectItem value="PRIVATE_PAID">Private Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.type && !formData.type.includes("FREE") && (
          <div>
            <Label>Registration fee</Label>
            <Input type="number" name="fee" value={formData.fee} onChange={handleChange} min={0} step="0.01" />
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Saving…" : eventId ? "Update event" : "Create event"}
        </Button>
      </form>
    </div>
  );
}
