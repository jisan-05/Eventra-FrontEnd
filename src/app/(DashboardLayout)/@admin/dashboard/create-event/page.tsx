/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function EventForm() {
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    venue: "",
    eventLink: "",
    date: "",
    time: "",
    type: "",
    fee: ""
  })

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, type: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      let finalData: any = {
        ...formData,
        fee: parseFloat(formData.fee || "0"),
        date: new Date(formData.date).toISOString(),
      }

      // ✅ Auto handle FREE events
      if (formData.type.includes("FREE")) {
        finalData.fee = 0
      }

      const res = await fetch("/api/v1/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(finalData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Failed to create event")
      }

      console.log("Success:", data)

      // ✅ Reset form
      setFormData({
        title: "",
        description: "",
        venue: "",
        eventLink: "",
        date: "",
        time: "",
        type: "",
        fee: ""
      })

      alert("✅ Event created successfully!")
    } catch (err: any) {
      console.error(err)
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <div>
          <Label>Title</Label>
          <Input
            name="title"
            value={formData.title}
            placeholder="Tech Meetup 2026"
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            placeholder="Event description..."
            onChange={handleChange}
            required
          />
        </div>

        {/* Venue */}
        <div>
          <Label>Venue</Label>
          <Input
            name="venue"
            value={formData.venue}
            placeholder="Tech Hub, Downtown City"
            onChange={handleChange}
          />
        </div>

        {/* Event Link */}
        <div>
          <Label>Event Link</Label>
          <Input
            name="eventLink"
            value={formData.eventLink}
            placeholder="https://zoom.us/..."
            onChange={handleChange}
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Time</Label>
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Type */}
        <div>
          <Label>Event Type</Label>
          <Select onValueChange={handleSelectChange}>
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

        {/* Fee */}
        {!formData.type.includes("FREE") && (
          <div>
            <Label>Fee</Label>
            <Input
              type="number"
              name="fee"
              value={formData.fee}
              placeholder="10"
              onChange={handleChange}
            />
          </div>
        )}

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit Event"}
        </Button>
      </form>
    </div>
  )
}