import Image from "next/image";
import TextSizer from "@/components/shared/TextSizer";
import { getAllHomePageCategory } from "@/services/category";
import { ICategory } from "@/types/category.type";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FoodCategory = async () => {
  const { data } = await getAllHomePageCategory()
  console.log({ data })
  return (
    <section className="p-4 md:p-8 lg:p-12    dark:bg-gray-800">
      <TextSizer title="Search By Cuisine" desc="Explore restaurants and cafes by your favorite cuisine" />

      <div className="grid  grid-cols-2 md:grid-cols-4 gap-6">
        {data?.slice(0, 8)?.map((category: ICategory) => (
          <Link
            href={`/posts?category=${category?.name}`}
            key={category?.id}
            className="bg-white group min-h-[300px] relative shadow cursor-pointer  overflow-hidden hover:scale-105 transition-transform duration-400"
          >
            <Image
              src={category?.image}
              alt={category?.name}
              width={400}
              height={300}
              className="w-full min-h-[300px] object-cover"
            />
            <div className="px-3 py-1 z-10 translate-y-4 group-hover:-translate-y-5 transition-all duration-500 flex flex-col gap-1 items-center justify-center w-full absolute bottom-0 text-center">
              <h3 className="text-2xl  font-bold text-white">
                {category?.name}
              </h3>
              <span className=" block transition-all duration-500 opacity-0 rounded-full p-1 border hover:bg-primary hover:text-white group-hover:opacity-100 hover:border-primary"	><ArrowRight className="h-6 w-6 text-white" /></span>
            </div>
            <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-30 transition-opacity duration-300"></div>


          </Link>
        ))}
      </div>
    </section>
  );
};

export default FoodCategory;
