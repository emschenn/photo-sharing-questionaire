import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { supabase } from "../utils/supabaseClient";
import Results from "../components/Results";
import { ResultInterface } from "../interfaces/result";
import DemographicResults from "../components/DemographicResults";
import Button from "../components/Button";
import ResultsDetail from "../components/ResultsDetail";

const ResultPage: NextPage = () => {
  const [goodResults, setGoodResults] = useState<[ResultInterface?]>([]);
  const [badResults, setBadResults] = useState<[ResultInterface?]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);

  useEffect(() => {
    const setResults = (data: any) => {
      let good: [ResultInterface?] = [],
        bad: [ResultInterface?] = [];
      data.forEach((d: ResultInterface) => {
        const {
          study,
          travel,
          home,
          work,
          start_timestamp,
          end_timestamp,
          age,
        } = d;
        if (study == null || travel == null || home == null || work == null) {
          return;
        }
        if (
          end_timestamp - start_timestamp < 60 ||
          age == "<20" ||
          age == ">71"
        ) {
          //   good.push(d);
          bad.push(d);
        } else {
          good.push(d);
        }
      });
      setBadResults(bad);
      setGoodResults(good);

      console.log(bad);
      console.log(good);
    };

    const getResultsData = async () => {
      const { body } = await supabase.from("workers").select();
      setResults(body);
    };

    getResultsData();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center ">
      <div className="w-1/2 pt-4 text-sm ">
        <span className=" font-medium">Valid Results:</span>
        {"  "}
        {goodResults.length}
        {";    "}
        <span className="font-medium">Invalid Results:</span>{" "}
        {badResults.length}
        {"  "}
        <span className="text-xs font-light italic">
          (complete duration less than 60 s)
        </span>
      </div>
      <h1 className="pt-4 text-2xl font-bold">Results</h1>
      <Results result={goodResults} />
      <h1 className="pt-12 pb-4 text-2xl font-bold">
        Workers&apos; Demographic
      </h1>
      <DemographicResults result={goodResults} />
      <div className="py-8">
        <Button
          color="bg-gray-400"
          text={showMore ? "Hide Details" : "Show More Details"}
          onClick={() => setShowMore(!showMore)}
        />{" "}
      </div>

      {showMore && (
        <>
          <h1 className="py-2 text-xl font-bold underline">Valid</h1>
          <ResultsDetail result={goodResults} />
          <h1 className="pt-6 pb-2  text-xl font-bold underline">Invalid</h1>
          <ResultsDetail result={badResults} />
        </>
      )}
    </div>
  );
};

export default ResultPage;
