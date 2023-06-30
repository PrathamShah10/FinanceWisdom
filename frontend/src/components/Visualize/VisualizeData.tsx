import React from "react";
import Chart from "chart.js/auto";
import { months } from "../../constants/month";
import { CategoryScale } from "chart.js";
import PieChart from "./PieChart";
import { BarChart } from "./BarChart";
Chart.register(CategoryScale);
const VisualizeData = ({ expenseData, savingsData }: VisualizeDataProps) => {
  const data1 = {
    labels: [...months],
    datasets: [
      {
        label: "User Expenses",
        data: expenseData,
        backgroundColor: [
          "rgba(215, 255, 65, 0.1)",
          "rgba(5, 255, 155, 0.6)",
          "rgba(255, 155, 200, 0.9)",
          "rgba(0, 0, 255, 0.4)",
          "rgba(255, 0, 0, 0.7)",
          "rgba(255, 255, 0, 0.3)",
          "rgba(128, 0, 128, 0.5)",
          "rgba(0, 128, 0, 0.8)",
          "rgba(0, 255, 255, 0.2)",
          "rgba(255, 128, 0, 0.6)",
          "rgba(128, 128, 128, 0.9)",
          "rgba(255, 0, 255, 0.1)",
        ],
        borderWidth: 1.5,
      },
    ],
  };
  const data2 = {
    labels: [...months],
    datasets: [
      {
        label: "User Savings",
        data: savingsData,
        backgroundColor: [
          "rgba(215, 255, 65, 0.1)",
          "rgba(5, 255, 155, 0.6)",
          "rgba(255, 155, 200, 0.9)",
          "rgba(0, 0, 255, 0.4)",
          "rgba(255, 0, 0, 0.7)",
          "rgba(255, 255, 0, 0.3)",
          "rgba(128, 0, 128, 0.5)",
          "rgba(0, 128, 0, 0.8)",
          "rgba(0, 255, 255, 0.2)",
          "rgba(255, 128, 0, 0.6)",
          "rgba(128, 128, 128, 0.9)",
          "rgba(255, 0, 255, 0.1)",
        ],
        borderWidth: 1.5,
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
  expenseData: Array<number>;
  savingsData: Array<number>;
};
export default VisualizeData;
