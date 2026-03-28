"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "Join Amazing Events Around You",
    description:
      "Discover public and private events, connect with people, and grow your network.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 2,
    title: "Create & Manage Your Own Events",
    description:
      "Host events, manage participants, and build your community easily.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    title: "Secure Payments & Private Access",
    description:
      "Paid or private events? Eventra makes everything simple and secure.",
    image:
      "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=1920&q=80",
  },
];

export default function HeroSlider() {
  return (
    <section className="w-full h-[80vh] relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[80vh]">

              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-in">
                  {slide.title}
                </h1>

                <p className="max-w-2xl text-sm md:text-lg mb-6 text-gray-200 animate-fade-in delay-200">
                  {slide.description}
                </p>

                <div className="flex flex-col md:flex-row gap-4 animate-fade-in delay-400">
                  <Button className="px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700">
                    Explore Events
                  </Button>
                  <Button variant="outline" className="px-6 py-3 text-lg bg-white hover:bg-gray-300 text-black">
                    Create Event
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}