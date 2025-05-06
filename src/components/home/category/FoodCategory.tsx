"use client";
import Image from "next/image";
import { foodCategories } from "./data/foodCategories";

const FoodCategory = () => {
  return (
    <section className="p-12 rounded-2xl  bg-gray-100 dark:bg-gray-800">
      <h2 className="text-3xl md:text-5xl font-bold text-center  text-primary md:pb-3">Search By Cuisine</h2>
      <p className="text-center text-gray-600 pb-6">Explore restaurants and cafes by your favorite cuisine</p>
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
