"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

const images = [
  "/image/slider/img-1.jpg",
  "/image/slider/img-2.jpg",
  "/image/slider/img3.jpg",
  "/image/slider/img-4.jpg",
  "/image/slider/img-5.jpg",
  "/image/slider/img-6.jpg",
  "/image/slider/img-7.jpg",
  "/image/slider/IMG_20200926_164118-01.jpeg",
  "/image/slider/img-9.jpg",
  "/image/slider/img-8.jpg",
  "/image/slider/img-1.jpg",
  "/image/slider/img-2.jpg",
  "/image/slider/img3.jpg",
  "/image/slider/img-4.jpg",
  "/image/slider/img-5.jpg",
];

export default function ImageCarousel() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={5}
        spaceBetween={40}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: true }}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <div className="w-full h-40 relative rounded-lg">
              <Image
                src={src}
                alt={`Slide ${idx + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
