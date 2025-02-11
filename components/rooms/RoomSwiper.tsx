"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from 'swiper/modules';
import Image from "next/image";

type RoomSwiperProps = {
  images: string[]; // รับ array ของรูปภาพ
};

const RoomSwiper = ({ images }: RoomSwiperProps) => {
  return (
    <Swiper
      pagination={{ type: "fraction" }}
      navigation
      modules={[Pagination, Navigation]}
      className="mySwiper "
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>

          <Image className="w-full h-60 md:h-[400px]" src={image} width={600} height={200} alt={`Room Image ${index}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RoomSwiper;
