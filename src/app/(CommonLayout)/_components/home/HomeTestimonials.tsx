"use client";

import { Reveal } from "@/components/motion/reveal";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "We sold out our charity gala in under a week. RSVPs and payments just worked — no spreadsheet chaos.",
    name: "Amira Rahman",
    role: "Event Director, Dhaka Community Fund",
    initials: "AR",
  },
  {
    quote:
      "As an attendee, I love that I can filter by category and pay in one flow. The dashboard keeps everything organized.",
    name: "Jordan Lee",
    role: "Marketing Lead",
    initials: "JL",
  },
  {
    quote:
      "Role-based access saved us. Admins manage events; our volunteers only see what they need. Huge win.",
    name: "Samira Noor",
    role: "Ops Manager, TechMeet BD",
    initials: "SN",
  },
];

export default function HomeTestimonials() {
  return (
    <section
      className="relative overflow-hidden border-y border-slate-200/80 bg-gradient-to-b from-white via-slate-50 to-blue-50/25 py-20 md:py-24"
      id="testimonials"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full bg-sky-200/35 blur-2xl"
        aria-hidden
      />

      <div className="container relative mx-auto px-4">
        <Reveal className="mb-14 text-center">
          <span className="inline-flex rounded-full border border-blue-200/90 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-900 shadow-sm">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-[2.35rem]">
            Trusted by hosts and attendees
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-slate-600">
            Real feedback from teams using Eventra to plan, sell, and join
            events without friction.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={0.06 + i * 0.06} y={18}>
              <figure className="group flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_4px_28px_-8px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-blue-200/90 hover:shadow-[0_22px_52px_-14px_rgba(30,58,138,0.12)]">
                <Quote
                  className="mb-4 size-9 text-blue-600 transition-transform duration-300 group-hover:scale-105"
                  aria-hidden
                />
                <blockquote className="flex-1 text-sm leading-relaxed text-slate-600">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-6">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-sky-100 text-sm font-semibold text-blue-950 ring-1 ring-blue-200/70 transition-transform duration-300 group-hover:scale-105"
                    aria-hidden
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-600">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
