import FeaturedHero from "./_components/home/FeaturedHero";
import FeaturesSection from "./_components/home/FeaturesSection";
import EventsPage from "./_components/event/EventsSliderComponents";
import HowItWorks from "./_components/home/HowItWorks";
import HomeCategories from "./_components/home/HomeCategories";
import HomeTestimonials from "./_components/home/HomeTestimonials";
import CallToAction from "./_components/home/CallToAction";

export default async function Home() {
  return (
    <div className="w-full bg-background">
      <FeaturedHero />
      <FeaturesSection />
      <EventsPage />
      <HowItWorks />
      <HomeCategories />
      <HomeTestimonials />
      <CallToAction />
    </div>
  );
}
