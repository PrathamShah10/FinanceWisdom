// import React, { useState } from "react";
// import { Line } from "react-chartjs-2";
// import { months } from "../../constants/month";
// import { useAppSelector } from "../../hooks/redux";
const ViewAllLines = () => {
  // const  visuals = useAppSelector((state) => state.visual);
  // let initialCategory = "";
  // if (visuals && visuals.length > 0) {
  //   initialCategory = visuals[0].category;
  // }
  // const [category, setCategory] = useState<string>(initialCategory);
  // let expenseDataIndex = 0;
  // if (visuals) {
  //   expenseDataIndex = visuals.findIndex((item) => item.category === category);
  // }
  // const expenseGraphData = {
  //   datasets: [
  //     {
  //       label: "Expenses",
  //       data:
  //         visuals &&
  //         visuals[expenseDataIndex]?.expenses?.map((expense, index) => ({
  //           x: months[index],
  //           y: expense,
  //         })),
  //       fill: false,
  //       borderColor: "rgb(205, 92, 92)",
  //       pointRadius: 2.2,
  //       pointHoverRadius: 4.5,
  //     },
  //     {
  //       label: "Budget",
  //       data:
  //         visuals &&
  //         visuals[expenseDataIndex]?.budgetExp?.map((expense, index) => ({
  //           x: months[index],
  //           y: expense,
  //         })),
  //       fill: false,
  //       borderColor: "rgb(34, 139, 34)",
  //       pointRadius: 2.2,
  //       pointHoverRadius: 4.5,
  //     },
  //   ],
  // };
  // const LineOptions = {
  //   scales: {
  //     x: {
  //       type: "category",
  //       labels: months,
  //     },
  //     y: {
  //       beginAtZero: true,
  //       ticks: {
  //         precision: 5,
  //       },
  //     },
  //   },
  // } as any;
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col space-y-4">
      {/* <div className="flex mb-4">
        <select
          className="m-3 px-4 py-2 rounded-lg bg-white-200 to-purple-600 text-black border-2 border-white-200 hover:border-gray-300"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {visuals?.map((ele: any, i: number) => {
            return <option key={i} value={ele.category}>{ele.category}</option>;
          })}
        </select>
      </div>
      <div className="mx-auto chart-container flex items-center justify-center w-[45%] mt-2">
        <Line data={expenseGraphData} options={LineOptions} />
      </div> */}
    </div>
  );
};

export default ViewAllLines;
