import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { months } from "../constants/month";
import { GET_CUSTOMER_DATA } from "../queries";
import { Line } from "react-chartjs-2";
import ClipSpinner from "./common/ClipSpinner";
import { useAppSelector } from "../hooks/redux";
function ViewCustomer() {
  const { customerId } = useAppSelector((state) => state.user);
  const { data, loading, error } = useQuery(GET_CUSTOMER_DATA, {
    variables: {
      _id: customerId,
    },
  });
  const expenseData = data?.getCustomerData.expenses;
  const savingsData = data?.getCustomerData.savings;
  const expenseGraphData = {
    datasets: [
      {
        label: "Expenses",
        data: expenseData?.map((expense: any, index: number) => ({
          x: months[index],
          y: expense,
        })),
        fill: false,
        borderColor: "rgb(205, 92, 92)",
        pointRadius: 4,
        pointHoverRadius: 7,
      },
    ],
  };
  const savingGraphData = {
    datasets: [
      {
        label: "Savings",
        data: savingsData?.map((saving: any, index: number) => ({
          x: months[index],
          y: saving,
        })),
        fill: false,
        borderColor: "rgb(34, 139, 34)",
        pointRadius: 4,
        pointHoverRadius: 7,
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
  if (error) return <h1>error</h1>;
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <ClipSpinner isLoading={loading} />
      <div className="mt-8 flex flex-col justify-center items-center space-y-4">
        <div className=" h-[250px] ">
          <Line data={expenseGraphData} options={LineOptions} />
        </div>
        <div className=" h-[250px] ">
          <Line data={savingGraphData} options={LineOptions} />
        </div>
      </div>
      <Link to={`/chat/${customerId}`}>
        <div className="fixed bottom-[3rem] right-[3rem] p-4 border-[2px] border-black rounded-full bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-gray-600 hover:text-gray-900"
          >
            <path d="M21 3H3C2.47 3 2 3.47 2 4V16C2 16.53 2.47 17 3 17H8L12 21V17H21C21.53 17 22 16.53 22 16V4C22 3.47 21.53 3 21 3Z" />
          </svg>
        </div>
      </Link>
      <div>
        <button className="bg-blue-500 rounded-lg p-4">
          <Link to="/set-budget">Set finanical budget</Link>
        </button>
      </div>
    </div>
  );
}
export default ViewCustomer;
