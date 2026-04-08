"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HomeNewsletter() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-8 text-center shadow-sm md:p-10">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Get event updates in your inbox
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Subscribe for upcoming public events, product updates, and event
            planning tips.
          </p>

          <form className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-11"
              aria-label="Email"
            />
            <Button type="submit" className="h-11 px-6">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
