"use client";

import { Reveal } from "@/components/motion/reveal";
import {
  ShieldCheck,
  Zap,
  Globe,
  BellRing,
  BarChart2,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    desc: "Stripe-powered checkout with full SSL encryption. Your money and your data are always protected.",
    color: "text-blue-900",
    bg: "bg-blue-100/90",
    border: "border-blue-300/50",
  },
  {
    icon: Zap,
    title: "Instant RSVPs",
    desc: "Attendees join in seconds. Hosts get real-time notifications for every new registration.",
    color: "text-sky-900",
    bg: "bg-sky-100/90",
    border: "border-sky-300/50",
  },
  {
    icon: Globe,
    title: "Public & Private Events",
    desc: "Open your event to the world or keep it exclusive. You control visibility and who gets in.",
    color: "text-blue-950",
    bg: "bg-blue-50",
    border: "border-blue-200/80",
  },
  {
    icon: BellRing,
    title: "Smart Notifications",
    desc: "Stay informed with automated alerts for approvals, payments, reminders, and cancellations.",
    color: "text-sky-950",
    bg: "bg-sky-50/95",
    border: "border-sky-200/75",
  },
  {
    icon: BarChart2,
    title: "Host Dashboard",
    desc: "Track attendees, revenue, and engagement from a single, clean analytics view.",
    color: "text-slate-800",
    bg: "bg-slate-200/70",
    border: "border-slate-400/35",
  },
  {
    icon: Lock,
    title: "Role-Based Access",
    desc: "Admins, organizers, and attendees each get the right permissions — nothing more, nothing less.",
    color: "text-blue-950",
    bg: "bg-blue-100/80",
    border: "border-blue-400/35",
  },
];

export default function FeaturesSection() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-slate-100/80 via-white to-blue-50/30 py-20 md:py-24"
      id="features"
    >
      <div
        className="pointer-events-none absolute -left-24 top-16 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-28 bottom-8 h-96 w-96 rounded-full bg-sky-300/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(219,234,254,0.45)_50%,transparent_60%)]"
        aria-hidden
      />

      <div className="container relative mx-auto px-4">
        <Reveal className="mb-14 text-center">
          <span className="inline-flex rounded-full border border-blue-200/80 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-900 shadow-sm shadow-slate-900/5">
            Platform Features
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-[2.35rem]">
            Everything you need to run great events
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-slate-600">
            Eventra brings together the tools that hosts and attendees actually
            need — without the bloat.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={0.06 + i * 0.05} y={18}>
              <div className="group relative flex h-full flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-7 shadow-[0_2px_28px_-6px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-blue-300/55 hover:bg-blue-50/30 hover:shadow-[0_20px_50px_-12px_rgba(30,58,138,0.12)]">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border ${f.border} ${f.bg} ${f.color} transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3`}
                >
                  <f.icon className="size-5" />
                </div>
                <h3 className="text-[0.9375rem] font-semibold text-slate-900">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
