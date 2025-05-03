import FoodCategory from "@/components/home/category/FoodCategory";
import Gallery from "@/components/home/Gallery/gallery";
import Banner from "@/components/home/header/Banner";
import Testimonial from "@/components/home/Testimonials/testimonial";

export default function Home() {
  return (
    <div className="mx-10">
      <Banner />
      <FoodCategory />

      <Testimonial />

      <Gallery />
    </div>
  );
}
