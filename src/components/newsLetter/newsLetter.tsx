"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const  NewsletterSignup=()=> {
  return (
    <section className="relative bg-[#FFF5F5] py-16 overflow-hidden">
      <h2 className="text-5xl font-extrabold text-center text-[#FF3C48]  ">
        Our Newsletter
      </h2>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
        <div className="flex justify-center md:justify-start">
          <div className="relative w-full h-[400px]">
            <Image
              src="/image/envelope.png"
              alt="Newsletter"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Sign up to receive the <br /> latest updates and news
          </h2>
          <form className="flex flex-col sm:flex-row gap-4 items-center sm:items-stretch">
            <Input
              type="email"
              placeholder="Your Email Address"
              className="rounded-full border border-gray-300 focus-visible:ring-[#FF3C48]"
            />
            <Button
              type="submit"
              className="bg-[#FF3C48] hover:bg-[#e0353f] text-white px-6 py-3 rounded-full font-semibold"
            >
              SUBSCRIBE
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
