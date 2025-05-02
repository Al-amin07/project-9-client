import FoodCategory from "@/components/home/category/FoodCategory";
import FoodDiscoveries from "@/components/home/discoveies/FoodDiscoveries";
// import Galary from "@/components/home/galary/Galary";
import Banner from "@/components/home/header/Banner";
import Pricing from "@/components/home/pricing/Pricing";
import TopFoodSection from "@/components/home/topFoodSection/TopFoodSection";

export default function Home() {
  return (
    <div>
      <Banner />
      <FoodCategory />
      <Pricing />
      {/* <Galary /> */}
      <FoodDiscoveries />
      <TopFoodSection/>
    </div>
  );
}
