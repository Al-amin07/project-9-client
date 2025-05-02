"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Counter = ({ end, trigger }: { end: number; trigger: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 10);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 10);

    return () => clearInterval(timer);
  }, [end, trigger]);

  return (
    <span className="text-3xl font-bold text-orange-600">
      {count.toLocaleString()}
    </span>
  );
};

const TopFoodSection = () => {
  const stats = [
    { label: "Burgers Sold", value: 48230 },
    { label: "Happy Customers", value: 39120 },
    { label: "Branches", value: 128 },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-orange-50 to-white text-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Top Foods of the Week</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Taste the bestsellers our customers can’t get enough of. From juicy
            burgers to mouthwatering desserts, these are our most loved dishes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {["burger", "drinks", "pizza"].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden shadow-md h-48"
            >
              <Image
                src={`/image/home/category/${item}.jpg`}
                width={500}
                height={200}
                alt={item}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-6">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
              <Counter end={item.value} trigger={inView} />
              <p className="mt-2 text-gray-700 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopFoodSection;
