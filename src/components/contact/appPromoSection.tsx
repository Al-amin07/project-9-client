"use client";

import Image from "next/image";
import React from "react";

const AppPromoSection = () => {
  return (
    <section className="w-full bg-[#FF3C48] py-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="text-center md:text-left md:max-w-md">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Install our app to get updates!
          </h2>
          <p className="text-white text-lg mb-6">
            Find our app on Google Play store and Apple App store.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Image
              src="/image/google-play-img.png"
              alt="Google Play"
              width={180}
              height={50}
            />

            <Image
              src="/image/app-store-img.png"
              alt="App Store"
              width={180}
              height={50}
            />
          </div>
        </div>

        <div className="mb-8 md:mb-0">
          <Image
            src="/image/app-preview.png"
            alt="Mobile App Preview"
            width={320}
            height={640}
            className="mx-auto md:mx-0"
          />
        </div>
      </div>
    </section>
  );
};

export default AppPromoSection;
