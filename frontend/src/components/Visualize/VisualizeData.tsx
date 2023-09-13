import React from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";
import { months } from "../../constants/month";
import { bgcolors } from "../../constants/colors";
import { CategoryScale } from "chart.js";
import { Line, Pie, Bar } from "react-chartjs-2";
import ClipSpinner from "../common/ClipSpinner";
Chart.register(CategoryScale);
const VisualizeData = ({
  expenseData,
  chart,
  budgetData,
}: VisualizeDataProps) => {
  console.log('expdatameissuehaikya?', expenseData);
  const data1 = {
    labels: [...months],
    datasets: [
      {
        label: "Expenses",
        data: expenseData,
        borderColor: "rgb(34, 139, 34)",
        backgroundColor: [...bgcolors],
        pointRadius: 2.2,
        pointHoverRadius: 4.5,
        borderWidth: 1,
      },
      {
        label: "Budget",
        data: budgetData,
        fill: false,
        borderColor: "rgb(34, 139, 34)",
        backgroundColor: [...bgcolors],
        pointRadius: 2.2,
        pointHoverRadius: 4.5,
        borderWidth: 1,
      },
    ],
  };
  const renderGraph = () => {
    // Define a common set of options for all charts to control their dimensions

    switch (chart) {
      case "PIECHART":
        return (
          <div className="h-[400px] w-[600px]">
            <Pie
              data={data1}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "User Stats",
                  },
                },
              }}
            />
          </div>
        );
      case "BARCHART":
        return (
          <div className="h-[400px] w-[600px]">
            <Bar
              data={data1}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        );
      case "LINECHART":
        return (
          <div className="h-[400px] w-[600px]">
            <Line
              data={data1}
              options={{
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
              }}
            />
          </div>
        );
    }
  };
  return (
    <div className="mt-5 flex flex-col space-y-4">
      <ClipSpinner isLoading={!expenseData} />
      <div className="flex items-center justify-center mx-auto mt-2 h-[500px]">
        {renderGraph()}
      </div>
      <div className="flex items-center justify-center mt-2">
        <Link
          to="/update-manualdata"
          className="m-3 px-4 py-2 rounded-lg bg-white to-purple-600 text-black border-2 border-white-200 hover:border-gray-300"
        >
          Update Data
        </Link>
      </div>
    </div>
  );
};

type VisualizeDataProps = {
  expenseData?: Array<number>;
  chart?: string;
  budgetData?: Array<number>;
};

export default VisualizeData;
