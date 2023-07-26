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
const VisualizeData = ({ expenseData, savingsData }: VisualizeDataProps) => {
  const [stat, setStat] = useState<string>("expenses");
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
  const data2 = {
    labels: [...months],
    datasets: [
      {
        label: "User Savings",
        data: savingsData,
        backgroundColor: [...bgcolors],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="mt-5 flex flex-col space-y-4">
      <ClipSpinner isLoading={!expenseData || !savingsData} />
      <div className="m-3 flex mb-4">
        <select
          className="m-3 p-3 rounded-lg bg-white text-black mr-4 border-2 border-black hover:border-black"
          value={stat}
          onChange={(e) => setStat(e.target.value)}
        >
          <option value="expenses">Expenses</option>
          <option value="savings">Savings</option>
        </select>
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
          <PieChart chartData={stat === 'expenses' ? data1 : data2} />
        ) : (
          <BarChart chartData={stat === 'expenses' ? data1 : data2} />
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
  savingsData?: Array<number>;
};
export default VisualizeData;
