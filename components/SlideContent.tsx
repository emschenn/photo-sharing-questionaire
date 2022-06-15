import React from "react";
import Image from "next/image";

type SlideContentProps = {
  src: string;
  caption: string;
};

const SlideContent = ({ src, caption }: SlideContentProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center pb-12">
      <div className="relative h-80 w-80  md:h-60 md:w-40">
        <Image src={src} alt={caption} layout="fill" objectFit="contain" />
      </div>
      <div className="m-2 font-light ">{caption}</div>
    </div>
  );
};

export default SlideContent;
