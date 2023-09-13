import React from "react";
// import { Line } from "react-chartjs-2";
// import { months } from "../../constants/month";
// import { useAppSelector } from "../../hooks/redux";
const ViewGrowth = () => {
  // const { visuals } = useAppSelector((state) => state.user);
  // const expenseData = visuals?.expenses;
  // const savingData = visuals?.savings;
  // const expenseGraphData = {
  //   datasets: [
  //     {
  //       label: "Expenses",
  //       data: expenseData?.map((expense, index) => ({
  //         x: months[index],
  //         y: expense,
  //       })),
  //       fill: false,
  //       borderColor: "rgb(205, 92, 92)",
  //       pointRadius: 4,
  //       pointHoverRadius: 7,
  //     },
  //   ],
  // };
  // const savingGraphData = {
  //   datasets: [
  //     {
  //       label: "Savings",
  //       data: savingData?.map((saving, index) => ({
  //         x: months[index],
  //         y: saving,
  //       })),
  //       fill: false,
  //       borderColor: "rgb(34, 139, 34)",
  //       pointRadius: 4,
  //       pointHoverRadius: 7,
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
    <div className="min-h-screen bg-gray-100 flex flex-row items-center justify-center">
      {/* <div className="flex flex-col space-y-4">
        <h2 className="mb-3 flex justify-center items-center text-center font-bold">
          My Growth
        </h2>
        <div>
          <Line data={expenseGraphData} options={LineOptions} />
        </div>
        <div>
          <Line data={savingGraphData} options={LineOptions} />
        </div>
      </div> */}
    </div>
  );
};

export default ViewGrowth;
