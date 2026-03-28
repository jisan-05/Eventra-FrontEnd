/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000";

export const eventService = {
  // ✅ Get All Events (SSR)
  async getEvents(query?: Record<string, string>) {
    const cookieStore = await cookies();
    const queryString = query ? '?' + new URLSearchParams(query as Record<string, string>).toString() : '';

    const res = await fetch(`${BASE_URL}/api/v1/events${queryString}`, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.json();
  },

  
  // ✅ Create Event
  async createEvent(data: any) {
    const res = await fetch(`/api/v1/events`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    return res.json();
  },
  
  // ✅ Update Event
  async updateEvent(id: string, data: any) {
    const res = await fetch(`/api/v1/events/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    return res.json();
  },
  
  // ✅ Get Single Event 
  async getEventById(id: string) {
    const cookieStore = await cookies();

    const res = await fetch(`${BASE_URL}/api/v1/events/${id}`, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.json();
  },
  // ✅ Delete Event
  async deleteEvent(id: string) {
    const res = await fetch(`/api/v1/events/${id}`, {
      method: "DELETE",
    });
    
    return res.json();
  },
};