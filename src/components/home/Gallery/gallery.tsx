"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TextSizer from "@/components/shared/TextSizer";

const localImages = [
  "https://i.postimg.cc/J0tJ4D8N/1.jpg",
  "https://i.postimg.cc/xdwTbXLG/2.jpg",
  "https://i.postimg.cc/52GfZXKc/3.jpg",
  "https://i.postimg.cc/QtDZ31pz/4.jpg",
  "https://i.postimg.cc/J4Fwh9NZ/5.jpg",
  "https://i.postimg.cc/0yS4yr21/6.jpg",
  "https://i.postimg.cc/J4D6ptXH/7.jpg",
  "https://i.postimg.cc/QM0J8r5r/8.jpg",
  "https://i.postimg.cc/G2fPDJq7/9.jpg",
  "https://i.postimg.cc/23R4cjpn/10.jpg",
];

const GalleryPictureSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showingPictures, setShowingPictures] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % localImages.length;
      const nextPictures = localImages.slice(nextIndex, nextIndex + 4);
      setCurrentIndex(nextIndex);
      setShowingPictures(nextPictures);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="px-4 md:px-0">
      <TextSizer title="Gallery" />

      <div className="grid  gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {showingPictures.map((image, index) => (
          <div
            key={index}
            className="relative cursor-pointer w-full h-[280px] md:h-[340px] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-500 transform hover:scale-105"
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        ))}
      </div>


    </div>
  );
};

export default GalleryPictureSlider;
