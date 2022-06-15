import React, { useRef, useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { ThreeDots } from "svg-loaders-react";
import { useMediaQuery } from "react-responsive";

import "@splidejs/react-splide/css";

import SlideContent from "./SlideContent";
import { QuestionInterface } from "../interfaces/question";

type SlideShowProps = {
  question?: QuestionInterface;
  setIsSlideEnd: (params: boolean) => void;
};

const SlideShow = ({ question, setIsSlideEnd }: SlideShowProps) => {
  const [slides, setSlides] = useState(question?.subject);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    document.documentElement.style.setProperty("--swiper-theme-color", "#000");
  }, []);

  useEffect(() => {
    setSlides(question?.subject);
    setIsSlideEnd(false);
  }, [question]);

  return slides ? (
    <Splide
      className="w-full"
      aria-label="My Favorite Images"
      onMoved={(slide) => {
        if (slide.index == slides.length - 1) {
          setIsSlideEnd(true);
        }
      }}
      options={{
        perPage: isMobile ? 1 : 3,
        focus: "center",
      }}
    >
      {slides?.map((s, index) => (
        <SplideSlide key={s.id}>
          <SlideContent
            src={`/imgs/${question?.type}/${s.id}.png`}
            caption={s.caption}
          />
        </SplideSlide>
      ))}
    </Splide>
  ) : (
    <ThreeDots fill="#e7e5db" width="80" />
  );
};

export default SlideShow;
