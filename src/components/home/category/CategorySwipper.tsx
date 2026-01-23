"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { ICategory } from "@/types/category.type";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useRef } from "react";
// gdg
export default function CategorySwipper({ data }: { data: ICategory[] }) {
    const swiperRef = useRef<any>(null);
    return (
        <div className="relative"       >
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                speed={1000}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                spaceBetween={20}
                slidesPerView={6}

                breakpoints={{
                    320: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper max-w-[1460px] max-h-[600px]  lg:max-h-[800px] "
            >
                {data?.map((category: ICategory) => (
                    <SwiperSlide key={category.id}>
                        <Link
                            href={`/posts?category=${category.name}`}
                            className="bg-white group h-[200px] relative shadow cursor-pointer overflow-hidden hover:scale-105 transition-transform duration-400"
                        >
                            <Image
                                src={category.image}
                                alt={category.name}
                                width={400}
                                height={300}
                                className="w-full h-[200px] object-cover"
                            />
                            <div className="px-3 py-1 z-10 translate-y-4 group-hover:-translate-y-5 transition-all duration-500 flex flex-col gap-1 items-center justify-center w-full absolute bottom-0 text-center">
                                <h3 className="text-xl font-bold text-white">{category.name}</h3>
                                <span className="block transition-all duration-500 opacity-0 rounded-full p-1 border hover:bg-primary hover:text-white group-hover:opacity-100 hover:border-primary">
                                    <ArrowRight className="h-6 w-6 text-white" />
                                </span>
                            </div>
                            <div className="absolute inset-0 bg-black opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                        </Link>
                    </SwiperSlide>
                ))}


            </Swiper>
            {/* Custom Arrows */}
            <button
                className="absolute top-1/2 -left-7 border hover:border-primary  -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-primary hover:text-white transition z-10 duration-300"
                onClick={() => swiperRef.current?.slidePrev()}
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                className="absolute top-1/2 -right-7 border hover:border-primary -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-primary hover:text-white transition z-10 duration-300"
                onClick={() => swiperRef.current?.slideNext()}
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    )
}
