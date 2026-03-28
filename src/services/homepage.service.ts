const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000";

export type SiteStats = {
  totalEvents: number;
  totalParticipations: number;
  totalUsers: number;
  totalReviews: number;
  avgRating: number;
};

/** Full `/api/v1/stats` payload (admin reports + homepage headline numbers). */
export type PlatformStats = SiteStats & {
  activeUsers: number;
  adminUsers: number;
  regularUsers: number;
  deletedUsers: number;
  participationsPending: number;
  participationsRejected: number;
  participationsBanned: number;
  successfulPaymentsCount: number;
  revenueTotal: number;
  eventsByType: Record<string, number>;
};

export type RecentReview = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: { name: string | null; image: string | null };
  event: { id: string; title: string };
};

export const homepageService = {
  async getStats(): Promise<SiteStats | null> {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/stats`, {
        cache: "no-store",
      });
      const json = await res.json();
      return json?.data ?? null;
    } catch {
      return null;
    }
  },

  async getPlatformStats(): Promise<PlatformStats | null> {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/stats`, {
        cache: "no-store",
      });
      const json = await res.json();
      return json?.data ?? null;
    } catch {
      return null;
    }
  },

  async getRecentReviews(): Promise<RecentReview[]> {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/reviews/recent`, {
        cache: "no-store",
      });
      const json = await res.json();
      return json?.data ?? [];
    } catch {
      return [];
    }
  },
};
