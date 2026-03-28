/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import ReviewCard from "./ReviewCard";


export default async function MyReviewsPage() {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/reviews/my-reviews`, {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  });
  const data = await res.json();
  const reviews = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>
      {reviews.length === 0 ? (
        <p className="text-gray-500">You have not written any reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev: any) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      )}
    </div>
  );
}
