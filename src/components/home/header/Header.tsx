"use client";
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import Banner from './Banner';
import b1 from '@/assets/banner/6.jpg'
import b2 from '@/assets/banner/b2.avif'
import b3 from '@/assets/banner/b5.avif'
export default function Header() {
    const imageLists = [


        {
            src: b2,
            alt: "Banner 1",
            title: "Find the Best Bites Near You",
            desc: "Instantly discover top-reviewed places to eat in your area. Compare dishes, see photos, and leave your own ratings to guide fellow foodies."
        },
        {
            src: b1,
            alt: "Banner 2",
            title: "Share Your Food Experience",
            desc: "Upload photos, write reviews, and rate meals to help others find the tastiest dishes in town."
        },
        {
            src: b3,
            alt: "Banner 3",
            title: "Discover Hidden Gems",
            desc: "Explore underrated restaurants and unique local eats recommended by real food lovers."
        },

    ];

    return (
        <>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                speed={1400}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                spaceBetween={0}
                slidesPerView={1}
                modules={[Pagination]}
                className="mySwiper max-w-[1460px] min-h-[calc(100vh-4rem)] md:min-h-screen"
            >
                {
                    imageLists?.map(el => <SwiperSlide key={el.alt}>
                        <Banner title={el.title} desc={el.desc} image={el.src} />
                    </SwiperSlide>)
                }


            </Swiper>
        </>
    );
}
