import { eventService } from "@/services/event.services";
import HomeHeroSlider, { type HomeFeaturedEvent } from "./HomeHeroSlider";

export default async function FeaturedHero() {
  const res = await eventService.getFeatured();
  const raw = res?.data;
  const featuredEvent: HomeFeaturedEvent | null =
    raw && typeof raw.id === "string" && typeof raw.title === "string" && raw.date
      ? {
          id: raw.id,
          title: raw.title,
          description: raw.description ?? null,
          date: typeof raw.date === "string" ? raw.date : String(raw.date),
          time: raw.time ?? null,
          venue: raw.venue ?? null,
        }
      : null;

  return <HomeHeroSlider featuredEvent={featuredEvent} />;
}
