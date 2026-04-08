import FeaturedHero from "./_components/home/FeaturedHero";
import FeaturesSection from "./_components/home/FeaturesSection";
import EventsPage from "./_components/event/EventsSliderComponents";
import HowItWorks from "./_components/home/HowItWorks";
import HomeCategories from "./_components/home/HomeCategories";
import HomeTestimonials from "./_components/home/HomeTestimonials";
import CallToAction from "./_components/home/CallToAction";
import HomeStats from "./_components/home/HomeStats";
import HomeFaq from "./_components/home/HomeFaq";
import HomeNewsletter from "./_components/home/HomeNewsletter";

export default async function Home() {
  return (
    <div className="w-full bg-background">
      <FeaturedHero />
      <HomeStats />
      <FeaturesSection />
      <EventsPage />
      <HowItWorks />
      <HomeCategories />
      <HomeTestimonials />
      <HomeFaq />
      <HomeNewsletter />
      <CallToAction />
    </div>
  );
}
