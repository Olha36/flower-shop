"use client";

import Image from "next/image";
import gallery from "./gallery.json";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from "swiper/modules";

// styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

type GalleryItem = {
  id: number;
  src: string;
  alt: string;
};

const Gallery = () => {
  const images = gallery as GalleryItem[];

  return (
    <section className="w-full py-10 mb-[75px]">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
        spaceBetween={20}
        slidesPerView={1.2} 
        initialSlide={2}
        centeredSlides
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 2,
          slideShadows: false,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {images.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Gallery;
