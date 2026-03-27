/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Autoplay } from "swiper/modules";
import EventCard from "./FeaturedEventCard";

export default function EventsSlider({ events }: { events: any[] }) {
  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={24}
        loop={true}
        speed={800}
        grabCursor={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2.5 },
          1280: { slidesPerView: 3 },
        }}
        className="!pb-6"
      >
        {events?.map((event) => (
          <SwiperSlide key={event.id} className="!h-auto">
            <div className="h-full">
              <EventCard event={event} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}