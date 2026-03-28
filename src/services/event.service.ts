/* eslint-disable @typescript-eslint/no-explicit-any */

export const eventServices = {
  async getEventById(id: string) {
    const res = await fetch(`/api/v1/events/${id}`, {
      cache: "no-store",
      credentials: "include",
    });
    return res.json();
  },

  async deleteEvent(id: string, isAdmin = false) {
    const url = isAdmin ? `/api/v1/events/admin/${id}` : `/api/v1/events/owner/${id}`;
    const res = await fetch(url, { method: "DELETE", credentials: "include" });
    return res.json();
  },
};