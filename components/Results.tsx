import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { ResultInterface } from "../interfaces/result";

ChartJS.register(ArcElement, Tooltip, Legend);

type ButtonProps = {
  result: [ResultInterface?];
};

const Results = ({ result }: ButtonProps) => {
  const [datas, setDatas] = useState<any>({});
  const [total, setTotal] = useState<any>({ ai: 0, random: 0 });

  useEffect(() => {
    let aiTotal = 0;
    let randomTotal = 0;
    let subject = {
      travel: { ai: 0, random: 0 },
      study: { ai: 0, random: 0 },
      home: { ai: 0, random: 0 },
      work: { ai: 0, random: 0 },
    };
    result.forEach((r: any) => {
      for (const [key, value] of Object.entries(subject)) {
        if (r[key] == "random") {
          value.random++;
          randomTotal++;
        } else {
          value.ai++;
          aiTotal++;
        }
      }
    });
    console.log(subject);
    setDatas(subject);
    setTotal({ ai: aiTotal, random: randomTotal });
  }, [result]);

  return (
    <div className="flex w-80  flex-row justify-center">
      <div className="flex flex-col rounded-xl bg-gray-100 py-4">
        <h1 className="text-center font-medium capitalize">Total</h1>
        <Pie
          data={{
            labels: ["ai", "random"],
            datasets: [
              {
                label: "# of Votes",
                data: [total.ai, total.random],
                backgroundColor: ["#CB5B3F", "#DFC344"],
                borderColor: ["#ffffff", "#ffffff"],
                borderWidth: 2,
              },
            ],
          }}
          className="h-40 w-40"
        />
      </div>
      {Object.keys(datas).map((key) => {
        const data = {
          labels: ["ai", "random"],
          datasets: [
            {
              label: "# of Votes",
              data: [datas[key].ai, datas[key].random],
              backgroundColor: ["#CB5B3F", "#DFC344"],
              borderColor: ["#ffffff", "#ffffff"],
              borderWidth: 2,
            },
          ],
        };
        return (
          <div className="flex flex-col  py-4" key={key}>
            <h1 className="text-center font-medium capitalize">{key}</h1>
            <Pie data={data} className="h-40 w-40" />
          </div>
        );
      })}
    </div>
  );
};

export default Results;
