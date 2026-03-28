"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl [animation:home-soft-glow_14s_ease-in-out_infinite]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl [animation:home-soft-glow_18s_ease-in-out_infinite]"
        style={{ animationDelay: "2s" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-25%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(14,165,233,0.1),transparent_50%)]"
        aria-hidden
      />

      <div className="container relative mx-auto px-4 text-center">
        <Reveal y={20}>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-[2.4rem]">
            Ready to experience Eventra?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
            Whether you want to host an unforgettable event or discover new
            experiences, Eventra has everything you need.
          </p>
        </Reveal>
        <Reveal delay={0.1} y={16} className="mt-10">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/events" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-12 w-full border-0 bg-blue-600 px-8 font-medium text-white shadow-lg shadow-blue-950/30 transition-[transform,background-color,box-shadow] duration-300 ease-out hover:scale-[1.02] hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-950/35 active:scale-[0.99] sm:w-auto"
              >
                Browse events
              </Button>
            </Link>
            <Link href="/dashboard/create-event" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full border-white/25 bg-white/5 px-8 font-medium text-white backdrop-blur-sm transition-[transform,background-color,border-color,color] duration-300 ease-out hover:scale-[1.02] hover:border-blue-400/50 hover:bg-white/10 hover:text-white active:scale-[0.99] sm:w-auto"
              >
                Create an event
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
