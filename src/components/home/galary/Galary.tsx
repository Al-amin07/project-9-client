"use client";

import Image from "next/image";

const Galary = () => {
  const images = [
    { src: "/image/home/gallery/1.jpg", width: 400, height: 301 },
    { src: "/image/home/gallery/2.jpg", width: 500, height: 301 },
    { src: "/image/home/gallery/3.jpg", width: 500, height: 361 },
    { src: "/image/home/gallery/4.jpg", width: 601, height: 361 },
    { src: "/image/home/gallery/5.jpg", width: 501, height: 301 },
    { src: "/image/home/gallery/6.jpg", width: 501, height: 301 },
  ];

  return (
    <section className="text-gray-600 body-font ">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex w-full mb-20 flex-wrap">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-[#FF3C48] lg:w-1/3 lg:mb-0 mb-4">
            Food Gallery
          </h1>
          <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base dark:text-white">
            Discover a world of flavors through our curated food
            gallery—featuring iconic classics, global tastes, and fresh
            innovations. Let your taste buds explore beyond borders.
          </p>
        </div>
        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-1/2">
              <Image
                alt="gallery"
                src={images[0].src}
                width={images[0].width}
                height={images[0].height}
                className="object-cover h-full object-center block w-full"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <Image
                alt="Galary"
                src={images[1].src}
                width={images[1].width}
                height={images[1].height}
                className="object-cover h-full object-center block w-full"
              />
            </div>
            <div className="md:p-2 p-1 w-full">
              <Image
                alt="Galary"
                src={images[2].src}
                width={images[2].width}
                height={images[2].height}
                className="object-cover h-full object-center block w-full"
              />
            </div>
          </div>
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-full">
              <Image
                alt="Galary"
                src={images[3].src}
                width={images[3].width}
                height={images[3].height}
                className="object-cover h-full object-center block w-full"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <Image
                alt="Galary"
                src={images[4].src}
                width={images[4].width}
                height={images[4].height}
                className="object-cover h-full object-center block w-full"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <Image
                alt="Galary"
                src={images[5].src}
                width={images[5].width}
                height={images[5].height}
                className="object-cover h-full object-center block w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Galary;
