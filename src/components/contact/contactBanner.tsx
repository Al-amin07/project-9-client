import React from "react";
import Image from "next/image";

const ContactBanner = () => {
  return (
    <section className="relative w-full h-[400px]">
      <Image
        src="/image/contact-banner-img.jpg"
        alt="Contact Banner"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />

      <div className="absolute inset-0 bg-black opacity-70 z-10 "></div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4 md:pb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 ">Get in Touch</h1>
        <p className="text-lg md:text-xl ">
          We’re here to answer your questions and help you get started.
        </p>
      </div>
    </section>
  );
};

export default ContactBanner;
