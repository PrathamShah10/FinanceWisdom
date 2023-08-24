import React, { useEffect, useState } from "react";
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
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    setCategory(data?.getCustomerData[0]?.category);
  }, [data]);
  const [category, setCategory] = useState<string>(
    data?.getCustomerData[0]?.category || ""
  );
  let categoricalDataIndex = 0;
  if (data?.getCustomerData) {
    categoricalDataIndex = data?.getCustomerData?.findIndex(
      (item: any) => item.category === category
    );
  }
  const expenseData = data?.getCustomerData[categoricalDataIndex]?.expenses;
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
      {loading && <ClipSpinner isLoading={loading} />}
      <div className="flex mb-4">
        <select
          className="m-3 p-3 rounded-lg bg-white text-black border-2 border-black hover:border-black"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {data?.getCustomerData?.map((ele: any, i: number) => {
            return <option value={ele.category} key={i}>{ele.category}</option>;
          })}
        </select>
      </div>
      <div className="mt-8 flex flex-col justify-center items-center space-y-4">
        <div className="h-[300px] w-full md:w-2/3 lg:w-1/2">
          <Line data={expenseGraphData} options={LineOptions} />
        </div>
      </div>
      <Link to={`/chat/${customerId}`}>
        <div className="fixed bottom-8 right-8 p-4 bg-white border-2 border-black rounded-full shadow-md">
          <ChatIcon />
        </div>
      </Link>
      <div className="mx-auto mt-auto px-4 pb-8">
        <button className="mt-3 px-10 bg-blue-500 text-white rounded-lg py-4">
          <Link to={`/set-budget/${customerId}`}>Set Financial Budget</Link>
        </button>
      </div>
    </div>
  );
};
export default ViewCustomer;
