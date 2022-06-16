import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    const { data, error } = await supabase
      .from("workers")
      .update(choice)
      .match({ id: uid });
    if (currentTask == questions.length - 1) {
      done();
      return;
    }
    if (data != null) setCurrentTask(currentTask + 1);
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
        <h2 className="pb-4 ">Read the following... </h2>
        <Subject
          isDoneReading={isDoneReading}
          question={questions[currentTask]}
          setIsDoneReading={setIsDoneReading}
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
