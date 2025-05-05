"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";

export default function Banner() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full rounded-2xl  bg-secondary py-18 px-6 my-12 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div
        className={`space-y-6 transition-all duration-700 ease-out ${
          animate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#FF3C48] leading-tight">
          Delicious Food, Delivered To You
        </h1>
        <p className="text-lg text-black dark:text-white max-w-md">
          Experience mouth-watering meals made with love and delivered fresh to
          your doorstep. Order now and enjoy exclusive deals!
        </p>

        <Button className="p-5 cursor-pointer bg-white rounded-full border-2 border-[#FF3C48] text-[#FF3C48] hover:bg-[#FF3C48] hover:text-white font-semibold transition duration-300 flex  text-lg items-center gap-2">
          Order Now <FaCartArrowDown />
        </Button>
      </div>

      <div
        className={`transition-all duration-700 ease-out flex justify-center ${
          animate ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
        }`}
      >
        <Image
          src="/image/home/banner.jpg"
          alt="Delicious Food"
          width={500}
          height={400}
          className="rounded-2xl shadow-xl"
          priority
        />
      </div>
    </section>
  );
}
