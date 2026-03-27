/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000";

export const eventServices = {
  // ✅ Get single event by id
  async getEventById(id: string) {
    const res = await fetch(`${BASE_URL}/api/v1/events/${id}`, {
      cache: "no-store",
    });

    return res.json();
  },

  // ✅ Delete event
  async deleteEvent(id: string, isAdmin = false) {
    const url = isAdmin
      ? `${BASE_URL}/api/v1/events/admin/${id}`
      : `${BASE_URL}/api/v1/events/owner/${id}`;

    const res = await fetch(url, { method: "DELETE" });
    return res.json();
  },
};