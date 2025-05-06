"use client";

import Image from "next/image";

export default function Banner() {


  return (

    <div className="w-full h-screen relative inset-0 z-10 pt-28 md:pb-0">
      {/* Background Image */}
      <div className="absolute min-h-screen inset-0 -z-10">
        <Image
          src="/image/banner/home-banner.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="container mx-auto pt-10 relative z-10 text-white">
        <div className="h-full grid   items-center text-center">
          <div className=" mx-auto pb-8">
            <Image
              src="/image/logo/🦆 icon _dish spoon knife_.png"
              height={100}
              width={100}
              alt="logo icon"
            />
            <span className=" text-lg font-mono">Rate My Bite</span>
          </div>
          <h1 className="lg:text-5xl text-4xl font-medium text-primary pb-2">
            Find Restaurants Around You
          </h1>
          <p>
            Explore honest reviews and ratings to find the best places to eat.
            Discover, review, and share your food experiences!
          </p>

          <div className="w-full relative  md:mt-24 mt-6 overflow-hidden">
            {/* <Slider></Slider> */}
          </div>
        </div>
      </div>

      {/* Divider at bottom */}
      {/* <div className="absolute inset-x-0 -bottom-0.5 -z-10 text-gray-100">
        <Divider />
      </div> */}
    </div>
  );
}
