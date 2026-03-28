import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  { title: "Public Free", type: "PUBLIC_FREE", desc: "Open to everyone, zero cost." },
  { title: "Public Paid", type: "PUBLIC_PAID", desc: "Premium events for everyone." },
  { title: "Private Free", type: "PRIVATE_FREE", desc: "Invite or request to join." },
  { title: "Private Paid", type: "PRIVATE_PAID", desc: "Exclusive premium events." },
];

export default function HomeCategories() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Event Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link key={cat.type} href={`/events?type=${cat.type}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-xl text-center">{cat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">{cat.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
