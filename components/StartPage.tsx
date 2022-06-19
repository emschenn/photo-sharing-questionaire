import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import Button from "./Button";

type StartPageProps = {
  startTheSurvey: (age: string, gender: string) => any;
};

const StartPage = ({ startTheSurvey }: StartPageProps) => {
  const [buttonText, setButtonText] = useState<string>("Start");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const onButtonClick = async (age: string, gender: string) => {
    setButtonText("Loading...");
    startTheSurvey(age, gender);
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
          photos that you would like to describe the day to others.{" "}
          <span className="font-medium">
            Before started, please select your <i>gender</i> and{" "}
            <i>age range</i>:
          </span>
        </h2>
        <div className="flex flex-row justify-center gap-x-4 py-2">
          <select
            className="form-select m-0 block appearance-none rounded border border-solid 
            border-gray-300 bg-white bg-clip-padding bg-no-repeat px-3 py-1.5 
            focus:bg-white  focus:outline-none"
            onChange={(e) => setGender(e.target.value)}
            value={gender || "Select Gender"}
          >
            <option selected disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select
            className="form-select m-0 block appearance-none rounded border border-solid 
            border-gray-300 bg-white bg-clip-padding bg-no-repeat px-3 py-1.5 
            focus:bg-white  focus:outline-none"
            onChange={(e) => setAge(e.target.value)}
            value={age || "Select Age Range"}
          >
            <option selected disabled>
              Select Age Range
            </option>
            <option value="<20">Under 20</option>
            <option value="21-25">21 - 25</option>
            <option value="26-30">26 - 30</option>
            <option value="31-35">31 - 35</option>
            <option value="36-40">36 - 40</option>
            <option value="41-45">41 - 45</option>
            <option value="46-50">46 - 50</option>
            <option value="51-55">51 - 55</option>
            <option value="56-60">56 - 60</option>
            <option value="61-65">61 - 65</option>
            <option value="66-70">66 - 70</option>
            <option value=">71">71 and over</option>
          </select>
        </div>
        <Button
          text={buttonText}
          onClick={() => onButtonClick(age, gender)}
          disabled={age == "" || gender == ""}
        />
      </div>
    </motion.main>
  );
};

export default StartPage;
