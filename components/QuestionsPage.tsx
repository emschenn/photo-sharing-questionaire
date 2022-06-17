import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import Subject from "./Subject";
import AnswerPanel from "./AnswerPanel";
import { QuestionInterface } from "../interfaces/question";

import { supabase } from "../utils/supabaseClient";
import { shuffle } from "../utils/shuffleArray";

type QuestionsPageProps = {
  done: () => any;
  uid: string;
};

const QuestionsPage = ({ done, uid }: QuestionsPageProps) => {
  const [questions, setQuestions] = useState<[QuestionInterface?]>([]);
  const [isDoneReading, setIsDoneReading] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<number>(0);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    const setQuestionsData = (data: any) => {
      let questions: [QuestionInterface?] = [];
      data.forEach((d: any) => {
        const { ai, subject, random, type } = d;
        const q: QuestionInterface = { ai, subject, random, type };
        questions?.push(q);
      });
      setQuestions(shuffle(questions));
    };

    const getQuestionsData = async () => {
      const { body } = await supabase.from("questions").select();
      setQuestionsData(body);
    };

    getQuestionsData();
  }, []);

  const updateChoiceAndGoNextTask = async (choice: any) => {
    if (currentTask == questions.length - 1) {
      const now = Math.floor(Date.now() / 1000);

      const { data, error } = await supabase
        .from("workers")
        .update({ ...choice, end_timestamp: now })
        .match({ id: uid });
      done();
      return;
    }
    const { data, error } = await supabase
      .from("workers")
      .update(choice)
      .match({ id: uid });
    if (data != null) setCurrentTask(currentTask + 1);
  };

  const getDescription = (task: string) => {
    let person = "a person";
    switch (task) {
      case "study":
        person = "a student";
        break;
      case "travel":
        person = "a traveler";
        break;
      case "work":
        person = "an office worker";
        break;
      case "home":
        person = "a homebody";
        break;
    }
    return (
      <>
        Here are 10 pictures collected from {person}&apos;s mobile album during
        a single day. Take a look at at these pictures and captions, and{" "}
        <span className="font-semibold">imagine your day like this.</span>
      </>
    );
  };

  const doneReading = (done: boolean) => {
    if (done) {
      setIsDoneReading(true);
      if (isMobile) window.scrollTo(0, document.body.scrollHeight + 100);
    } else {
      setIsDoneReading(false);
      if (isMobile) window.scrollTo(0, 0);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" m-auto flex h-fit w-full flex-col items-center justify-center gap-y-8 px-2 py-8 sm:px-4  md:h-full md:flex-row md:gap-8 md:px-8"
    >
      <div className="flex  w-full flex-col  md:w-1/2">
        <h1 className="flex items-center pb-2 text-2xl font-bold">
          Task {currentTask + 1}
          <span className="pl-2 text-xl font-normal">
            of {questions.length}
          </span>
        </h1>
        {questions[currentTask] && (
          <h2 className="pb-6 ">
            {getDescription(questions[currentTask]!.type)}
          </h2>
        )}
        <Subject
          isDoneReading={isDoneReading}
          question={questions[currentTask]}
          setIsDoneReading={doneReading}
        />
      </div>

      {isDoneReading && (
        <div className="w-4/5 rounded-xl bg-neutral md:w-1/3">
          <AnswerPanel
            question={questions[currentTask]!}
            next={updateChoiceAndGoNextTask}
          />
        </div>
      )}
    </motion.main>
  );
};

export default QuestionsPage;
