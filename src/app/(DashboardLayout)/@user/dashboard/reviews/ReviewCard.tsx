"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export default function ReviewCard({ review }: { review: any }) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState(review.comment);
  const [rating, setRating] = useState(review.rating);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Delete this review?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/reviews/${review.id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Review deleted");
        router.refresh();
      }
    } catch {
      toast.error("Error deleting review");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/reviews/${review.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: Number(rating), comment })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Review updated");
        setEditing(false);
        router.refresh();
      }
    } catch {
      toast.error("Error updating review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm p-4">
      <h3 className="font-semibold text-lg">{review.event?.title}</h3>
      <p className="text-sm text-gray-500 mb-2">{new Date(review.createdAt).toLocaleDateString()}</p>
      
      {editing ? (
        <div className="space-y-3">
          <select value={rating} onChange={(e) => setRating(e.target.value)} className="border rounded p-1">
            {[1,2,3,4,5].map(v => <option key={v} value={v}>{v} Stars</option>)}
          </select>
          <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleUpdate} disabled={loading}>Save</Button>
            <Button size="sm" variant="outline" onClick={() => setEditing(false)} disabled={loading}>Cancel</Button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-yellow-600 font-bold">{review.rating} / 5 ⭐️</p>
          <p className="text-gray-700 mt-1">{review.comment}</p>
          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setEditing(true)}>Edit</Button>
            <Button size="sm" variant="destructive" onClick={handleDelete} disabled={loading}>Delete</Button>
          </div>
        </>
      )}
    </div>
  );
}
