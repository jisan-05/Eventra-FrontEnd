import FeaturedHero from "./_components/home/FeaturedHero";
import EventsPage from "./_components/event/EventsSliderComponents";
import HomeCategories from "./_components/home/HomeCategories";
import CallToAction from "./_components/home/CallToAction";

export default async function Home() {
  return (
    <div className="w-full">
      <FeaturedHero />
      <EventsPage />
      <HomeCategories />
      <CallToAction />
    </div>
  );
}
