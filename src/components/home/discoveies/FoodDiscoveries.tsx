"use client";

import Image from "next/image";

const foodImages = [
  { src: "/image/home/gallery/1.jpg", width: 400, height: 301 },
  { src: "/image/home/gallery/2.jpg", width: 500, height: 301 },
  { src: "/image/home/gallery/3.jpg", width: 500, height: 361 },
  { src: "/image/home/gallery/4.jpg", width: 601, height: 361 },
  { src: "/image/home/gallery/5.jpg", width: 501, height: 301 },
  { src: "/image/home/gallery/6.jpg", width: 501, height: 301 },
];

const FoodDiscoveries = () => {
  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Food Discoveries</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Discover a world of flavors through our curated food
            gallery—featuring iconic classics, global tastes, and fresh
            innovations. Let your taste buds explore beyond borders.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {foodImages.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl shadow hover:shadow-lg transition duration-300"
            >
              <Image
                src={item.src}
                alt='alternative'
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodDiscoveries;
