import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ResultInterface } from "../interfaces/result";
import { shuffle } from "../utils/shuffleArray";

ChartJS.register(ArcElement, Tooltip, Legend);

type DemographicResultsProps = {
  result: [ResultInterface?];
};

const DemographicResults = ({ result }: DemographicResultsProps) => {
  const [genderData, setGenderData] = useState<any>({});
  const [ageData, setAgeData] = useState<any>({});

  useEffect(() => {
    let gender: any = {
      female: 0,
      male: 0,
    };
    let age: any = {
      "<20": 0,
      "21-25": 0,
      "26-30": 0,
      "31-35": 0,
      "36-40": 0,
      "41-45": 0,
      "46-50": 0,
      "51-55": 0,
      "56-60": 0,
      "61-65": 0,
      "66-70": 0,
      ">71": 0,
    };
    result.forEach((r: any) => {
      gender[r.gender]++;
      age[r.age]++;
    });
    setAgeData(age);
    setGenderData(gender);
  }, [result]);

  return (
    <div className="flex w-72 flex-row justify-center">
      <Doughnut
        data={{
          labels: Object.keys(ageData),
          datasets: [
            {
              label: "# of Votes",
              data: Object.values(ageData),
              backgroundColor: shuffle([
                "#609732",
                "#BAE397",
                "#8ABD5F",
                "#3E7213",
                "#277553",
                "#75AF96",
                "#0F5738",
                "#499272",
                "#91A437",
                "#E8F6A4",
                "#BCCD67",
                "#6A7B15",
                "#445200",
              ]),
              borderColor: Array.from(
                { length: Object.keys(ageData).length },
                () => "#ffffff"
              ),
              borderWidth: 2,
            },
          ],
        }}
      />
      <Doughnut
        data={{
          labels: Object.keys(genderData),
          datasets: [
            {
              label: "# of Votes",
              data: Object.values(genderData),
              backgroundColor: ["#AA3939", "#28536C"],
              borderColor: Array.from(
                { length: Object.keys(genderData).length },
                () => "#ffffff"
              ),
              borderWidth: 2,
            },
          ],
        }}
      />
    </div>
  );
};

export default DemographicResults;
