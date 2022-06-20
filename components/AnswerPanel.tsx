import React, { useEffect, useState } from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import { QuestionInterface } from "../interfaces/question";
import { shuffle } from "../utils/shuffleArray";
import Button from "./Button";
import LoadingIndicator from "./LoadingIndicator";

type AnswerPanelProps = {
  question: QuestionInterface;
  next: (params: any) => any;
};

export interface OptionInterface {
  random: [string?];
  ai: [string?];
}

const AnswerPanel = ({ question, next }: AnswerPanelProps) => {
  const [choice, setChoice] = useState<any>({});
  const [options, setOptions] = useState<OptionInterface | null>(null);

  useEffect(() => {
    if (question) {
      setChoice({});
      let { random, ai } = question!;
      random = shuffle(random);
      ai = shuffle(ai);
      if (Math.random() > 0.5) {
        setOptions({
          random,
          ai,
        });
      } else {
        setOptions({
          ai,
          random,
        });
      }
    }
  }, [question]);

  return (
    <div className="py-8">
      <h2 className="px-8  pb-2">
        If you were to choose 3 photos from the 10 pictures on the left to{" "}
        <span className="font-semibold">
          tell your parents/children how you spent the day
        </span>
        , which of the following two sets are you{" "}
        <span className="font-semibold">more likely to choose?</span>
      </h2>
      {options != null ? (
        <div className="flex flex-col items-center justify-center pt-2 pb-4 md:gap-4">
          {Object.entries(options).map(([key, value]) => {
            return (
              <div
                key={key}
                className={`m-2 flex cursor-pointer rounded-xl bg-white p-4 transition ease-in-out hover:scale-105 hover:shadow-sm ${
                  choice[question?.type] == key
                    ? "scale-105 border-4 border-primary bg-opacity-70 shadow-sm "
                    : ""
                }`}
                onClick={() => {
                  const obj: any = {};
                  obj[question?.type] = key;
                  setChoice(obj);
                }}
              >
                {value.map((c: string) => (
                  <div
                    className="relative mx-1 h-24  w-16 sm:h-40 sm:w-32 md:h-24 md:w-16 lg:h-32 lg:w-24"
                    key={c}
                  >
                    <Image
                      src={`/imgs/${question?.type}/${c}.png`}
                      alt={c}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <LoadingIndicator />
      )}
      {Object.keys(choice).length !== 0 && (
        <Button text={"Next Task"} onClick={() => next(choice)}></Button>
      )}
    </div>
  );
};

export default AnswerPanel;
