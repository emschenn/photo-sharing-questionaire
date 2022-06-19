import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import { QuestionInterface } from "../interfaces/question";
import Button from "./Button";
import LoadingIndicator from "./LoadingIndicator";

type SubjectProps = {
  question?: QuestionInterface;
  isDoneReading: boolean;
  setIsDoneReading: (params: boolean) => void;
};

const Subject = ({
  question,
  isDoneReading,
  setIsDoneReading,
}: SubjectProps) => {
  const [photos, setPhotos] = useState(question?.subject);

  useEffect(() => {
    setPhotos(question?.subject);
    setIsDoneReading(false);
  }, [question]);

  return photos ? (
    <>
      <div
        className={`grid  grid-flow-row  grid-cols-3 grid-rows-4 gap-2
         md:grid-cols-5 md:grid-rows-2`}
      >
        {photos?.map((s) => (
          <Zoom key={`${question?.type}-${s.id}`}>
            <div className=" flex w-full flex-col  items-center md:h-60 ">
              <div className="relative h-40 w-full ">
                <Image
                  src={`/imgs/${question?.type}/${s.id}.png`}
                  alt={s.caption}
                  layout="fill"
                  objectFit="contain"
                />
                <span className="absolute rounded-br-xl bg-white px-2 py-1 text-sm">
                  {s.id}
                </span>
              </div>

              <div className="my-2 text-center text-sm font-light ">
                {s.caption}
              </div>
            </div>
          </Zoom>
        ))}
      </div>
      {!isDoneReading && <Button text={"Done"} onClick={setIsDoneReading} />}
    </>
  ) : (
    <LoadingIndicator />
  );
};

export default Subject;
