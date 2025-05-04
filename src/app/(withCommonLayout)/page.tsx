import FoodCategory from "@/components/home/category/FoodCategory";
import Gallery from "@/components/home/Gallery/gallery";
import Banner from "@/components/home/header/Banner";
import Testimonial from "@/components/home/Testimonials/testimonial";
import { NewsletterSignup } from "@/components/newsLetter/newsLetter";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <FoodCategory />

      <Testimonial />

      <Gallery />
      <NewsletterSignup />
    </div>
  );
}
