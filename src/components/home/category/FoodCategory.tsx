
import TextSizer from "@/components/shared/TextSizer";
import { getAllHomePageCategory } from "@/services/category";
import CategorySwipper from "./CategorySwipper";



// import Navigation from "swiper";


const FoodCategory = async () => {
  const { data } = await getAllHomePageCategory()
  console.log({ data })
  return (
    <section className="bg-gray-50 relative p-5 md:p-8 lg:p-12    dark:bg-gray-800">
      <TextSizer title="Search By Cuisine" desc="Explore restaurants and cafes by your favorite cuisine" />
      <CategorySwipper data={data} />

    </section>
  );
};

export default FoodCategory;
