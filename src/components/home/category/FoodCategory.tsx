"use client";
import Image from "next/image";
import { foodCategories } from "./data/foodCategories";

const FoodCategory = () => {
  return (
<section className="py-12 rounded-2xl px-6 md:px-16 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-8">
        Food <span className="text-[#FF3C48]">Categories</span>
      </h2>
      <div className="grid mt-8 grid-cols-2 md:grid-cols-4 gap-6">
        {foodCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white shadow rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={400}
              height={300}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-[#FF3C48]">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoodCategory;
