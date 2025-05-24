"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Button } from '@/components/ui/button'
export default function Banner({ image, title, desc }: { image?: string | StaticImageData, title?: string, desc?: string }) {


  return (

    <div className="w-full h-[calc(100vh-5rem)] cursor-pointer relative inset-0 z-10 pt-5 lg:pt-28 md:pb-0">
      <div className="absolute min-h-[calc(100vh-5rem)]   inset-0 -z-10">
        <Image
          src={image || "/image/banner/home-banner.jpg"}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container mx-auto pt-10 relative z-10 text-white">
        <div className="h-full grid   items-center text-center">
          <div className="relative z-10 text-center flex flex-col items-center">
            <div className=" mx-auto pb-4">
              <Image
                src="/image/logo/🦆 icon _dish spoon knife_.png"
                height={100}
                width={100}
                alt="logo icon"
              />
              <span className=" text-lg font-mono">Rate My Bite</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              {title || "Discover the Best Street Food Spots!"}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-100/90">
              {desc || "Join our community to explore, rate, and share your favorite street food experiences. From hidden gems to popular stalls, find the best bites in your city!"}
            </p>


            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                <Link href="/posts">Explore Food Spots</Link>
              </Button>
              <Button size="lg" variant="secondary" className="">
                <Link href="/signup">Join Community</Link>
              </Button>
            </div>
          </div>


        </div>
      </div>

    </div>
  );
}
