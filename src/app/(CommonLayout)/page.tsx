import HeroSlider from "@/components/HeroSlider";
import EventsPage from "./_components/event/EventsSliderComponents";

export default async function Home() {
  return (
    <div className="w-full ">
      <HeroSlider></HeroSlider>
      <EventsPage></EventsPage>
    </div>
  );
}
