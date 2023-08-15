import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Chart from "chart.js/auto";
import { months } from "../../constants/month";
import { bgcolors } from "../../constants/colors";
import { CategoryScale } from "chart.js";
import PieChart from "./PieChart";
import { BarChart } from "./BarChart";
import ClipSpinner from "../common/ClipSpinner";
// import { BarChart } from "./BarChart";
Chart.register(CategoryScale);
const VisualizeData = ({ expenseData }: VisualizeDataProps) => {
  const [toogleChart, setToogleChart] = useState<string>("PIECHART");
  const data1 = {
    labels: [...months],
    datasets: [
      {
        label: "User Expenses",
        data: expenseData,
        backgroundColor: [...bgcolors],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="mt-5 flex flex-col space-y-4">
      <ClipSpinner isLoading={!expenseData} />
      <div className="m-3 flex mb-4">
        <select
          className="m-3 p-3 rounded-lg bg-white text-black border-2 border-black hover:border-black"
          value={toogleChart}
          onChange={(e) => setToogleChart(e.target.value)}
        >
          <option value="PIECHART">PieChart</option>
          <option value="BARCHART">BarChart</option>
        </select>
      </div>
      <div className="flex items-center justify-center w-[75%] mt-2">
        {toogleChart === 'PIECHART' ? (
          <PieChart chartData={data1} />
        ) : (
          <BarChart chartData={data1} />
        )}
      </div>
      <button className="mx-auto py-2 px-10 rounded-lg bg-blue-500 text-white">
        <Link to="/line-graph">See Growth</Link>
      </button>
    </div>
  );
};
type VisualizeDataProps = {
  expenseData?: Array<number>;
};
export default VisualizeData;
