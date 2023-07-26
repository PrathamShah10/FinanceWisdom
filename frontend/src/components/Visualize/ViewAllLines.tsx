import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { months } from "../../constants/month";
import { useAppSelector } from "../../hooks/redux";
const ViewAllLines = () => {
  const [toogleChart, setToogleChart] = useState<string>("EXPENSE");
  const { visuals } = useAppSelector((state) => state.user);
  const expenseData = visuals?.expenses;
  const expenseBudget = visuals?.budgetExp;
  const savingsBudget = visuals?.budgetSave;
  const savingData = visuals?.savings;
  const expenseGraphData = {
    datasets: [
      {
        label: "Expenses",
        data: expenseData?.map((expense, index) => ({
          x: months[index],
          y: expense,
        })),
        fill: false,
        borderColor: "rgb(205, 92, 92)",
        pointRadius: 2.2,
        pointHoverRadius: 4.5,
      },
      {
        label: "Budget",
        data: expenseBudget?.map((expense, index) => ({
          x: months[index],
          y: expense,
        })),
        fill: false,
        borderColor: "rgb(34, 139, 34)",
        pointRadius: 2.2,
        pointHoverRadius: 4.5,
      },
    ],
  };
  const savingGraphData = {
    datasets: [
      {
        label: "Savings",
        data: savingData?.map((saving, index) => ({
          x: months[index],
          y: saving,
        })),
        fill: false,
        borderColor: "rgb(205, 92, 92)",
        pointRadius: 2.2,
        pointHoverRadius: 4.5,
      },
      {
        label: "Budget",
        data: savingsBudget?.map((expense, index) => ({
          x: months[index],
          y: expense,
        })),
        fill: false,
        borderColor: "rgb(34, 139, 34)",
        pointRadius: 2.2,
        pointHoverRadius: 4.5,
      },
    ],
  };
  const LineOptions = {
    scales: {
      x: {
        type: "category",
        labels: months,
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 5,
        },
      },
    },
  } as any;
  return (
    <div className="mt-5 flex flex-col space-y-4">
      <div className="flex mb-4">
        <select
          className="m-3 p-3 rounded-lg bg-white text-black border-2 border-black hover:border-black"
          value={toogleChart}
          onChange={(e) => setToogleChart(e.target.value)}
        >
          <option value="EXPENSE">EXPENSE</option>
          <option value="SAVINGS">SAVINGS</option>
        </select>
      </div>
      <div className="mx-auto chart-container flex items-center justify-center w-[45%] mt-2">
        {toogleChart === 'EXPENSE' ? (
          <Line data={expenseGraphData} options={LineOptions} />
        ) : (
          <Line data={savingGraphData} options={LineOptions} />
        )}
      </div>
    </div>
  );
};

export default ViewAllLines;
