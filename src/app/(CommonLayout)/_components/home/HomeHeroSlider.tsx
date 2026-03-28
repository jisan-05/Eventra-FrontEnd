"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";



export type HomeFeaturedEvent = {
  id: string;
  title: string;
  description?: string | null;
  date: string;
  time?: string | null;
  venue?: string | null;
};

function HeroSlideFrame({
  children,
  bgImage,
}: {
  children: React.ReactNode;
  bgImage?: string;
}) {
  return (
    <div className="relative min-h-[min(70vh,680px)] w-full overflow-hidden text-zinc-50">
      
      {/* Background Image */}
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[8000ms]"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}

      {/* Dark overlay (IMPORTANT) */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Your existing gradient (keep it = premium look) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_15%_-10%,rgba(245,158,11,0.08),transparent_52%),radial-gradient(90%_60%_at_100%_0%,rgba(39,39,42,0.9),transparent_55%)]" />

      {/* Bottom line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[min(70vh,680px)] max-w-6xl flex-col justify-center px-6 py-20 md:px-12 lg:px-16">
        {children}
      </div>
    </div>
  );
}

function HeroSlideContent({
  label,
  title,
  titleAccent,
  description,
  primary,
  secondary,
}: {
  label: string;
  title: string;
  titleAccent?: string;
  description: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-amber-500/90">{label}</p>
      <h1 className="mt-5 text-3xl font-semibold leading-[1.15] tracking-tight text-zinc-50 sm:text-4xl md:text-[2.625rem]">
        {title}
        {titleAccent ? (
          <>
            {" "}
            <span className="text-amber-400/95">{titleAccent}</span>
          </>
        ) : null}
      </h1>
      <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400 md:text-[1.0625rem]">{description}</p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Button
          asChild
          size="lg"
          className="h-11 border-0 bg-amber-500 px-6 font-medium text-zinc-950 hover:text-white shadow-none hover:bg-amber-600"
        >
          <Link href={primary.href} className="inline-flex items-center gap-2 ">
            {primary.label}
            <ArrowRight className="size-4 opacity-90" />
          </Link>
        </Button>
        {secondary ? (
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-11 border-zinc-700 bg-transparent px-6 font-medium text-zinc-200 hover:bg-zinc-800/80 hover:text-white"
          >
            <Link href={secondary.href}>{secondary.label}</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default function HomeHeroSlider({ featuredEvent }: { featuredEvent: HomeFeaturedEvent | null }) {
  return (
    <section className="relative w-full bg-zinc-950" aria-label="Featured highlights">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={640}
        loop
        autoplay={{
          delay: 7200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          bulletClass:
            "home-hero-bullet !inline-block !mx-[5px] !h-1 !w-1 !rounded-full !bg-zinc-600 !opacity-100 !transition-[width,background-color] !duration-300",
          bulletActiveClass: "!w-6 !rounded-sm !bg-amber-500",
        }}
        className="home-hero-swiper"
      >
        <SwiperSlide>
          <HeroSlideFrame bgImage="/event1.webp">
            <HeroSlideContent
              label="Planora"
              title="Event management that stays clear from invite to"
              titleAccent="checkout."
              description="Browse public programs, run paid or private events, and keep RSVPs and approvals in one workflow built for hosts and guests."
              primary={{ href: "/events", label: "Browse events" }}
              secondary={{ href: "/signup", label: "Create account" }}
            />
          </HeroSlideFrame>
        </SwiperSlide>

        <SwiperSlide>
          <HeroSlideFrame bgImage="/event1.webp">
            <HeroSlideContent
              label="For attendees"
              title="Find sessions and venues that match how you actually"
              titleAccent="spend your time."
              description="Filter what’s coming up, understand fees upfront, and follow through with a consistent join experience across events."
              primary={{ href: "/events", label: "View calendar" }}
            />
          </HeroSlideFrame>
        </SwiperSlide>

        <SwiperSlide>
          <HeroSlideFrame bgImage="/event1.webp">
            <HeroSlideContent
              label="For organizers"
              title="Publish, price, and approve participants without juggling"
              titleAccent="spreadsheets."
              description="Use your dashboard for listings, join requests, and payments—so you stay focused on the event itself."
              primary={{ href: "/dashboard", label: "Open dashboard" }}
              secondary={{ href: "/signup", label: "Get started" }}
            />
          </HeroSlideFrame>
        </SwiperSlide>

        <SwiperSlide>
          <HeroSlideFrame bgImage="/event1.webp">
            {featuredEvent ? (
              <div className="max-w-2xl rounded-xl border border-zinc-800/80 bg-zinc-900/35 p-8 md:p-10">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-amber-500/90">
                  Featured event
                </p>
                <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-zinc-50 md:text-3xl">
                  {featuredEvent.title}
                </h2>
                <p className="mt-4 line-clamp-3 text-base leading-relaxed text-zinc-400">
                  {featuredEvent.description?.trim() || "Details for this featured event are available on the listing page."}
                </p>
                <dl className="mt-6 flex flex-col gap-3 text-sm text-zinc-400 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3">
                  <div className="flex items-start gap-2">
                    <CalendarDays className="mt-0.5 size-4 shrink-0 text-zinc-500" aria-hidden />
                    <div>
                      <dt className="sr-only">Date and time</dt>
                      <dd>
                        {new Date(featuredEvent.date).toLocaleDateString(undefined, {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        {featuredEvent.time ? ` · ${featuredEvent.time}` : null}
                      </dd>
                    </div>
                  </div>
                  {featuredEvent.venue ? (
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-zinc-500" aria-hidden />
                      <div>
                        <dt className="sr-only">Venue</dt>
                        <dd>{featuredEvent.venue}</dd>
                      </div>
                    </div>
                  ) : null}
                </dl>
                <Button
                  asChild
                  size="lg"
                  className="mt-8 h-11 border-0 bg-amber-500 px-6 font-medium text-zinc-950 hover:bg-amber-400"
                >
                  <Link href={`/events/${featuredEvent.id}`} className="inline-flex items-center gap-2">
                    View event details
                    <ArrowRight className="size-4 opacity-90" />
                  </Link>
                </Button>
              </div>
            ) : (
              <HeroSlideContent
                label="Get started"
                title="Create your first listing in minutes and invite your"
                titleAccent="audience."
                description="Register for free, set visibility and pricing, then share your event link. Approval flows keep private and paid registrations orderly."
                primary={{ href: "/signup", label: "Sign up free" }}
                secondary={{ href: "/events", label: "Explore events" }}
              />
            )}
          </HeroSlideFrame>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
