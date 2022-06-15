import React, { useRef, useState, useEffect } from "react";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { ThreeDots } from "svg-loaders-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SlideContent from "./SlideContent";
import { QuestionInterface } from "../interfaces/question";

SwiperCore.use([Virtual, Navigation, Pagination]);

type SlideShowProps = {
  question?: QuestionInterface;
  setIsSlideEnd: (params: boolean) => void;
};

const SlideShow = ({ question, setIsSlideEnd }: SlideShowProps) => {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [slides, setSlides] = useState(question?.subject);

  useEffect(() => {
    document.documentElement.style.setProperty("--swiper-theme-color", "#000");
  }, []);

  useEffect(() => {
    setSlides(question?.subject);
    setIsSlideEnd(false);
    swiperRef?.slideTo(0, 0);
  }, [question]);

  return slides ? (
    <Swiper
      onSlideChange={() => {
        if (swiperRef?.activeIndex == slides.length - 1) {
          setIsSlideEnd(true);
        }
      }}
      onSwiper={setSwiperRef}
      slidesPerView={3}
      centeredSlides={true}
      spaceBetween={30}
      pagination={{
        type: "fraction",
      }}
      navigation={true}
      className="w-full"
      virtual
    >
      {slides?.map((s, index) => (
        <SwiperSlide key={s.id} virtualIndex={index}>
          <SlideContent
            src={`/imgs/${question?.type}/${s.id}.png`}
            caption={s.caption}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <ThreeDots fill="#e7e5db" width="80" />
  );
};

export default SlideShow;
