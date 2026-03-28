"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  { title: "Public Free", type: "PUBLIC_FREE", desc: "Open to everyone, zero cost." },
  { title: "Public Paid", type: "PUBLIC_PAID", desc: "Premium events for everyone." },
  { title: "Private Free", type: "PRIVATE_FREE", desc: "Invite or request to join." },
  { title: "Private Paid", type: "PRIVATE_PAID", desc: "Exclusive premium events." },
];

export default function HomeCategories() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(219,234,254,0.35)_0%,transparent_45%,rgba(241,245,249,0.5)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl"
        aria-hidden
      />
      <div className="container relative mx-auto px-4">
        <Reveal className="mb-10 text-center md:mb-12">
          <span className="mb-3 inline-flex rounded-full border border-blue-200/90 bg-blue-50 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-widest text-blue-900">
            Browse
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Event categories
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-pretty text-slate-600">
            Browse by visibility and pricing — each link opens a filtered event
            list.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.type} delay={0.05 + i * 0.05} y={16}>
              <Link
                href={`/events?type=${cat.type}`}
                className="group block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <Card className="h-full cursor-pointer overflow-hidden border-slate-200/90 bg-gradient-to-br from-white to-slate-50 shadow-[0_4px_28px_-8px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 ease-out group-hover:-translate-y-1 group-hover:border-blue-300/70 group-hover:from-blue-50/80 group-hover:to-white group-hover:shadow-[0_22px_48px_-12px_rgba(30,58,138,0.14)]">
                  <div
                    className="h-1 w-full bg-gradient-to-r from-blue-500 via-sky-500 to-blue-600 opacity-85 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  <CardHeader className="pb-2">
                    <CardTitle className="text-center text-xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-blue-950">
                      {cat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-sm text-slate-600 transition-colors duration-300 group-hover:text-slate-800">
                      {cat.desc}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
