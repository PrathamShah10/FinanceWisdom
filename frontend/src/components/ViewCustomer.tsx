import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { months } from "../constants/month";
import { GET_CUSTOMER_DATA } from "../queries";
import { Line } from "react-chartjs-2";
import ClipSpinner from "./common/ClipSpinner";
import { ChatIcon } from "./common/icons/Icons";
const ViewCustomer = () => {
  const { customerId } = useParams();
  const { data, loading, error } = useQuery(GET_CUSTOMER_DATA, {
    variables: {
      _id: customerId,
    },
  });
  const expenseData = data?.getCustomerData?.expenses;
  const savingsData = data?.getCustomerData?.savings;
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
        <div className="fixed bottom-[3rem] right-[3rem] p-4 border-[2px] border-black rounded-full">
          <ChatIcon />
        </div>
      </Link>
      <div>
        <button className="bg-blue-500 rounded-lg p-4">
          <Link to={`/set-budget/${customerId}`}>Set finanical budget</Link>
        </button>
      </div>
    </div>
  );
};
export default ViewCustomer;
