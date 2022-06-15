import React, { useRef, useState, useEffect } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import Button from "../components/Button";

import { supabase } from "../utils/supabaseClient";
import Questionnaire from "../components/Questionnaire";
import CopyToClipboardText from "../components/CopyToClipboardText";

const Home: NextPage = () => {
  const [state, setState] = useState<number>(0);
  const [uid, setUid] = useState<string>("");

  const startTheSurvey = async () => {
    const { data, error } = await supabase.from("workers").insert([
      {
        study: null,
        work: null,
        travel: null,
        home: null,
      },
    ]);
    if (data != null) {
      setUid(data[0]["id"]);
      setState(1);
    }
  };

  return (
    <div className="h-screen w-screen">
      <Head>
        <title>Quick Survey</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="m-auto h-full w-4/5 md:w-3/5 lg:w-2/5">
        {state == 0 && (
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
              In a set of 10 photos of the day, you were asked to choose the set
              of photos that you would like to describe the day to others.
            </h2>
            <Button text={"Start"} onClick={startTheSurvey} />
          </div>
        )}
        {state == 1 && (
          <Questionnaire
            uid={uid}
            done={() => {
              setState(2);
            }}
          />
        )}
        {state == 2 && (
          <div className="flex h-full flex-col justify-center ">
            <h1 className=" text-2xl font-bold">Done 🎉</h1>
            <h2 className="py-4">
              Thank you for completing the survey! Don&apos;t forget to click
              and copy the survey code below and paste it to the mturk page.
            </h2>
            <div className="pb-12 md:w-4/5">
              <CopyToClipboardText text={uid} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
