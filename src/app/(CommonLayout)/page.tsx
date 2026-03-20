import HeroSlider from "@/components/HeroSlider";
import { userService } from "@/services/user.services";

export default async function Home() {
  const res = await userService.getSession();
  console.log("user info ", res);
  return (
    <div className="w-full ">
        <HeroSlider></HeroSlider>
    </div>
  );
}
