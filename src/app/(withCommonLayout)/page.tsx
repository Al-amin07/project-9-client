import FoodCategory from "@/components/home/category/FoodCategory";
import Community from "@/components/home/community";
import Discover from "@/components/home/discover";
import FeatureFoodSpot from "@/components/home/FeatureFoodSpot/FeatureFoodSpot";
import { FoodEvents } from "@/components/home/food-event/FoodEvents";
import Gallery from "@/components/home/Gallery/gallery";
import Banner from "@/components/home/header/Banner";
import SubscriptionPlans from "@/components/home/subscription/SubscriptionPlans";
import HowItWorks from "@/components/home/HowItWorks/HowItWorks";
import Testimonial from "@/components/home/Testimonials/testimonial";
export default function Home() {
  return (
    <div className="space-y-10">
      <Banner />
      <div className="container  space-y-24 mx-auto">
        <FoodCategory />
        <FeatureFoodSpot />
        <FoodEvents />
        <SubscriptionPlans />
        <Testimonial />
        <HowItWorks />
        <Gallery />
        <Community />
      </div>
      <Discover />
    </div>
  );
}
