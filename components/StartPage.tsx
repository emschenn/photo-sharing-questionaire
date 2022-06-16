import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import Button from "./Button";

type StartPageProps = {
  startTheSurvey: () => any;
};

const StartPage = ({ startTheSurvey }: StartPageProps) => {
  const [buttonText, setButtonText] = useState<string>("Start");

  const onButtonClick = async () => {
    setButtonText("Loading...");
    startTheSurvey();
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: -1000 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="m-auto h-full w-4/5 md:w-3/5 lg:w-2/5"
    >
      <div className="flex h-full flex-col justify-center ">
        <div className="relative h-1/4 md:h-1/3">
          <Image
            src={"/imgs/main.png"}
            alt="main"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <h1 className="pt-4 text-xl font-bold">
          A Quick Survey about your Opinions on Photo Sharing
        </h1>
        <h2 className="py-4">
          In a set of 10 photos of the day, you were asked to choose the set of
          photos that you would like to describe the day to others.
        </h2>
        <Button text={buttonText} onClick={onButtonClick} />
      </div>
    </motion.main>
  );
};

export default StartPage;
