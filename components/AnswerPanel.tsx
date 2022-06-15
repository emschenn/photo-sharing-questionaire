import React, { useEffect, useState } from "react";
import Image from "next/image";

import { ThreeDots } from "svg-loaders-react";
import { QuestionInterface } from "../interfaces/question";
import { shuffle } from "../utils/shuffleArray";
import Button from "./Button";

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
    <div className="pt-4">
      <h2>
        <b>Click</b> to select the photo set you want to share when you want to
        tell others about how you spent the day.
      </h2>
      {options != null ? (
        <div className="flex flex-col items-center justify-center pt-2 pb-4  md:flex-row  md:space-x-8">
          {Object.entries(options).map(([key, value]) => {
            return (
              <div
                key={key}
                className={`m-2 flex cursor-pointer rounded-lg bg-neutral p-2 transition ease-in-out ${
                  choice[question?.type] == key
                    ? "scale-105 border-4 border-primary bg-opacity-70"
                    : "fff"
                }`}
                onClick={() => {
                  console.log(key);
                  const obj: any = {};
                  obj[question?.type] = key;
                  setChoice(obj);
                }}
              >
                {value.map((c: string) => (
                  <div className="relative mx-1 h-32 w-20" key={c}>
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
        <ThreeDots fill="#e7e5db" width="80" />
      )}
      {choice != null && (
        <Button text={"Next"} onClick={() => next(choice)}></Button>
      )}
    </div>
  );
};

export default AnswerPanel;
