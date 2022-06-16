import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";

import { supabase } from "../utils/supabaseClient";
import QuestionsPage from "../components/QuestionsPage";
import StartPage from "../components/StartPage";
import EndPage from "../components/EndPage";

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

  const completeTheSurvey = () => {
    setState(2);
  };

  return (
    <div className="h-screen w-screen">
      <Head>
        <title>Quick Survey</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AnimatePresence>
        {state == 0 && <StartPage startTheSurvey={startTheSurvey} />}
      </AnimatePresence>
      <AnimatePresence>
        {state == 1 && <QuestionsPage uid={uid} done={completeTheSurvey} />}
      </AnimatePresence>
      <AnimatePresence>{state == 2 && <EndPage uid={uid} />}</AnimatePresence>
    </div>
  );
};

export default Home;
