import React, { useRef, useState, useEffect } from "react";
import SlideShow from "./SlideShow";
import AnswerPanel from "./AnswerPanel";
import { QuestionInterface } from "../interfaces/question";
import { supabase } from "../utils/supabaseClient";
import { shuffle } from "../utils/shuffleArray";

type QuestionnaireProps = {
  done: () => any;
  uid: string;
};

const Questionnaire = ({ done, uid }: QuestionnaireProps) => {
  const [questions, setQuestions] = useState<[QuestionInterface?]>([]);
  const [isSlideEnd, setIsSlideEnd] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<number>(0);

  useEffect(() => {
    const setQuestionsData = (data: any) => {
      let questions: [QuestionInterface?] = [];
      data.forEach((d: any) => {
        const { ai, subject, random, type } = d;
        const q: QuestionInterface = { ai, subject, random, type };
        console.log(q);
        questions?.push(q);
      });
      setQuestions(shuffle(questions));
      console.log(questions);
    };

    const getQuestionsData = async () => {
      const { body } = await supabase.from("questions").select();
      console.log(body);
      setQuestionsData(body);
    };

    getQuestionsData();
  }, []);

  const nextTask = async (choice: any) => {
    console.log(choice);
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
    <div className="my-4 flex h-full flex-col justify-center ">
      <h1 className="pb-4 text-2xl font-bold">
        Task {currentTask + 1}
        <span className="text-xl font-normal"> of {questions.length}</span>
      </h1>
      <h2 className="pb-4 ">Read the following... </h2>
      <SlideShow
        question={questions[currentTask]}
        setIsSlideEnd={setIsSlideEnd}
      />
      {isSlideEnd && (
        <AnswerPanel question={questions[currentTask]} next={nextTask} />
      )}
    </div>
  );
};

export default Questionnaire;
