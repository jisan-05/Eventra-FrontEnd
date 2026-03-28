import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="bg-primary/10 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-6">Ready to Experience Planora?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Whether you want to host an unforgettable event or discover new experiences, Planora has everything you need.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/events">
            <Button size="lg" variant="default">Browse Events</Button>
          </Link>
          <Link href="/dashboard/create-event">
            <Button size="lg" variant="outline">Create an Event</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
