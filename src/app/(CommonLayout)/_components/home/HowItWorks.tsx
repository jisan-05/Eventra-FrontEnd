"use client";

import type { ElementType } from "react";
import { Reveal } from "@/components/motion/reveal";
import { CalendarPlus, Users, CreditCard, Search, Ticket, Star } from "lucide-react";

const hostSteps = [
  {
    icon: CalendarPlus,
    step: "01",
    title: "Create Your Event",
    desc: "Set your title, date, venue, pricing, and visibility. Public or private — you decide who can join.",
    color: "text-blue-950",
    bg: "bg-blue-100/90",
  },
  {
    icon: Users,
    step: "02",
    title: "Manage Participants",
    desc: "Review join requests, approve attendees, and send invitations directly from your dashboard.",
    color: "text-sky-950",
    bg: "bg-sky-100/90",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "Collect Payments",
    desc: "Accept payments via Stripe securely. Track revenue and participation in real time.",
    color: "text-blue-900",
    bg: "bg-blue-50",
  },
];

const attendeeSteps = [
  {
    icon: Search,
    step: "01",
    title: "Discover Events",
    desc: "Browse public or private events filtered by category, date, and location.",
    color: "text-slate-800",
    bg: "bg-slate-200/80",
  },
  {
    icon: Ticket,
    step: "02",
    title: "Register & Pay",
    desc: "Request to join or register instantly. Pay securely through our integrated payment system.",
    color: "text-sky-950",
    bg: "bg-sky-50/95",
  },
  {
    icon: Star,
    step: "03",
    title: "Review & Repeat",
    desc: "Leave ratings and reviews after the event to help others find great experiences.",
    color: "text-blue-950",
    bg: "bg-blue-100/80",
  },
];

function StepCard({
  icon: Icon,
  step,
  title,
  desc,
  color,
  bg,
}: {
  icon: ElementType;
  step: string;
  title: string;
  desc: string;
  color: string;
  bg: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-7 shadow-[0_2px_24px_-6px_rgba(15,23,42,0.07)] backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-blue-200/80 hover:shadow-[0_18px_44px_-12px_rgba(30,58,138,0.1)]">
      <div className="flex items-center gap-4">
        <span className="select-none text-4xl font-black leading-none text-blue-100">{step}</span>
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-slate-900/10 ${bg} ${color}`}
        >
          <Icon className="size-5" />
        </div>
      </div>
      <h3 className="text-[0.9375rem] font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section
      className="relative overflow-hidden bg-background py-20 md:py-24"
      id="how-it-works"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-64 w-64 translate-x-1/3 rounded-full bg-sky-200/30 blur-3xl"
        aria-hidden
      />
      <div className="container relative mx-auto px-4">
        <Reveal className="mb-14 text-center">
          <span className="inline-flex rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm">
            Simple Process
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[2.35rem]">
            How Eventra Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-muted-foreground">
            Whether you&apos;re hosting or attending, the process is designed
            to be frictionless from start to finish.
          </p>
        </Reveal>

        <div className="mb-12 md:mb-14">
          <Reveal delay={0.04}>
            <div className="mb-5 flex items-center gap-3">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-950 ring-1 ring-blue-200/80">
                For Hosts
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-200/80 to-transparent" />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {hostSteps.map((s, i) => (
              <Reveal key={s.step} delay={0.07 + i * 0.06} y={16}>
                <StepCard {...s} />
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <Reveal delay={0.04}>
            <div className="mb-5 flex items-center gap-3">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground shadow-sm ring-1 ring-border">
                For Attendees
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-300/80 to-transparent" />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {attendeeSteps.map((s, i) => (
              <Reveal key={s.step} delay={0.07 + i * 0.06} y={16}>
                <StepCard {...s} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
