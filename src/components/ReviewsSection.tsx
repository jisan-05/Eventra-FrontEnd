"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DEFAULT_AVATAR_SRC, getSafeAvatarSrc } from "@/lib/safe-image-src";

function ReviewUserAvatar({ name, image }: { name: string; image: string | null }) {
  const [src, setSrc] = useState(() => getSafeAvatarSrc(image));
  useEffect(() => {
    setSrc(getSafeAvatarSrc(image));
  }, [image]);

  return (
    <Avatar className="h-10 w-10">
      <AvatarImage
        src={src}
        onLoadingStatusChange={(s) => {
          if (s === "error") setSrc(DEFAULT_AVATAR_SRC);
        }}
      />
      <AvatarFallback>{name[0] ?? "?"}</AvatarFallback>
    </Avatar>
  );
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: { name: string; image: string | null };
}

export default function ReviewsSection({
  eventId,
  isLogged,
}: {
  eventId: string;
  isLogged: boolean;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/v1/reviews/event/${eventId}`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/v1/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ eventId, rating: parseInt(rating), comment })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Review added!");
        setComment("");
        fetchReviews();
      } else {
        toast.error(data.message || "Failed to add review. Did you join this event?");
      }
    } catch (e) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="event-reviews" className="space-y-8 scroll-mt-24 animate-fade-in">
      <h2 className="text-3xl font-bold text-foreground">Reviews & ratings</h2>
      <p className="text-muted-foreground text-sm -mt-4">
        Everyone sees reviews here. Your own reviews also appear under Dashboard → My reviews.
      </p>
      
      {isLogged ? (
        <form onSubmit={handleSubmit} className="bg-background p-6 rounded-2xl border border-border shadow-sm space-y-4">
          <h3 className="text-xl font-semibold mb-2">Leave a Review</h3>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-muted-foreground">Rating (1-5):</span>
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map(v => <SelectItem key={v} value={v.toString()}>{v} ⭐️</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Textarea 
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      ) : (
        <p className="text-muted-foreground">Please log in to leave a review.</p>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet. Be the first!</p>
        ) : (
          reviews.map(r => (
            <div key={r.id} className="bg-background p-6 rounded-xl border border-border flex gap-4">
              <ReviewUserAvatar name={r.user.name} image={r.user.image} />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-foreground">{r.user.name}</h4>
                    <p className="text-sm text-muted-foreground">{new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-primary font-bold">
                    {r.rating}/5 ⭐️
                  </div>
                </div>
                <p className="mt-2 text-muted-foreground">{r.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
