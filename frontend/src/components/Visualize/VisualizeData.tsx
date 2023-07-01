import React from "react";
import Chart from "chart.js/auto";
import { months } from "../../constants/month";
import { bgcolors } from "../../constants/colors";
import { CategoryScale } from "chart.js";
import PieChart from "./PieChart";
// import { BarChart } from "./BarChart";
Chart.register(CategoryScale);
const VisualizeData = ({ expenseData, savingsData }: VisualizeDataProps) => {
  if (!expenseData || !savingsData) return <h1>loading...</h1>;
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
    <>
      <PieChart chartData={data1} />
      <PieChart chartData={data2} />
    </>
  );
};
type VisualizeDataProps = {
  expenseData?: Array<number>;
  savingsData?: Array<number>;
};
export default VisualizeData;
