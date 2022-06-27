import React from "react";
import { ResultInterface } from "../interfaces/result";

type ResultsDetailProps = {
  result: [ResultInterface?];
};

const ResultsDetail = ({ result }: ResultsDetailProps) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Uid</th>
          <th>Duration</th>
          <th>Results</th>
        </tr>
      </thead>
      <tbody>
        {result.map((r: any) => (
          <tr key={r.id}>
            <td className="pr-6">{r.id}</td>
            <td className="pr-10">{r.end_timestamp - r.start_timestamp}</td>
            <td>{`${r.travel}, ${r.study}, ${r.home}, ${r.work}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsDetail;
