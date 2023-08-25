import React from "react";
import Chart from "chart.js/auto";
import { months } from "../../constants/month";
import { bgcolors } from "../../constants/colors";
import { CategoryScale } from "chart.js";
import PieChart from "./PieChart";
import { BarChart } from "./BarChart";
import ClipSpinner from "../common/ClipSpinner";
Chart.register(CategoryScale);
const VisualizeData = ({ expenseData, chart }: VisualizeDataProps) => {
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
 
       
      
      <div className="flex items-center justify-center w-[75%] mt-2">
        {chart === "PIECHART" ? (
          <PieChart chartData={data1} />
        ) : (
          <BarChart chartData={data1} />
        )}
      </div>
    </div>
  );
};
type VisualizeDataProps = {
  expenseData?: Array<number>;
  chart?: string;
};
export default VisualizeData;
