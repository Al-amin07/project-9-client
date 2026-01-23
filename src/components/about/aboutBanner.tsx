import React from "react";
import Image from "next/image";

const AboutBanner = () => {
  return (
    <section className="relative w-full h-[400px]">
      <Image
        src="/image/about-banner.jpg"
        alt="Contact Banner"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />

      <div className="absolute inset-0 bg-black opacity-70 z-10 "></div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4 md:pb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 ">
          {" "}
          About <span className="text-[#FF3C48]">Rate My Bite</span>
        </h1>
        <div className="w-2/3 mx-auto">
        <p className="text-xl ">
          We’re a passionate community of food lovers, explorers, and street
          snack fanatics. Our goal is simple — to connect foodies with the best
          local street food across cities.
        </p>
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;
