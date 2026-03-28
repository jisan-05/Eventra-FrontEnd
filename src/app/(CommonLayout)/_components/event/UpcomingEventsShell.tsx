/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Reveal } from "@/components/motion/reveal";
import EventsSlider from "./EventsSlider";

export default function UpcomingEventsShell({ events }: { events: any[] }) {
  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_65%_at_50%_-35%,rgba(59,130,246,0.12),transparent_55%),linear-gradient(to_bottom,rgba(255,255,255,0.98),rgba(239,246,255,0.5)_42%,transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-sky-200/25 blur-3xl"
        aria-hidden
      />
      <div className="container relative mx-auto px-4">
        <Reveal className="mb-10 text-center">
          <span className="mb-3 inline-flex rounded-full border border-blue-200/90 bg-blue-50 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-widest text-blue-900">
            Live soon
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Upcoming public events
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-slate-600">
            Nine upcoming public events — swipe or scroll to explore.
          </p>
        </Reveal>
        <Reveal delay={0.08} y={16}>
          <EventsSlider events={events} />
        </Reveal>
      </div>
    </section>
  );
}
