import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMER_DATA } from "../queries";
import ClipSpinner from "./common/ClipSpinner";
import { ChatIcon } from "./common/icons/Icons";
import VisualizeData from "./Visualize/VisualizeData";
const ViewCustomer = () => {
  const { customerId } = useParams();
  const [toogleChart, setToogleChart] = useState<string>("PIECHART");
  const { data, loading, error } = useQuery(GET_CUSTOMER_DATA, {
    variables: {
      _id: customerId,
    },
    fetchPolicy: "network-only",
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
  const budgetExpenseData =
    data?.getCustomerData[categoricalDataIndex]?.budgetExp;
  if (error) return <h1>error</h1>;
  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      {loading && <ClipSpinner isLoading={loading} />}
      <div className="flex mb-4">
        <select
          className="m-3 px-4 py-2 rounded-lg bg-white-200 to-purple-600 text-black border-2 border-white-200 hover:border-gray-300"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {data?.getCustomerData?.map((ele: any, i: number) => {
            return (
              <option value={ele.category} key={i}>
                {ele.category}
              </option>
            );
          })}
        </select>

        <select
          className="m-3 px-4 py-2 rounded-lg bg-white-200 to-purple-600 text-black border-2 border-white-200 hover:border-gray-300"
          value={toogleChart}
          onChange={(e) => setToogleChart(e.target.value)}
        >
          <option value="PIECHART" className="bg-white text-black">
            PieChart
          </option>
          <option value="BARCHART" className="bg-white text-black">
            BarChart
          </option>
          <option value="LINECHART" className="bg-white text-black">
            LineChart
          </option>
        </select>
      </div>
      <div className="mt-8 flex flex-col justify-center items-center space-y-4">
        <div className="h-[300px] w-full md:w-2/3 lg:w-1/2">
          <VisualizeData
            expenseData={expenseData}
            budgetData={budgetExpenseData}
            chart={toogleChart}
            isFA={true}
          />
        </div>
      </div>
      <Link to={`/chat/${customerId}`}>
        <div className="fixed bottom-8 right-8 p-4 bg-white border-2 border-black rounded-full shadow-md">
          <ChatIcon />
        </div>
      </Link>
      <div className="mx-auto mt-auto px-4 pb-8">
        <Link to={`/update-advisor-manualdata`}>
          <button className="m-3 px-4 py-2 rounded-lg bg-white to-purple-600 text-black border-2 border-white-200 hover:border-gray-300">
            Set Financial Budget
          </button>
        </Link>
        <Link to={`/goals`}>
          <button className="m-3 px-4 py-2 rounded-lg bg-white to-purple-600 text-black border-2 border-white-200 hover:border-gray-300">
            View Customer Goals
          </button>
        </Link>
        <Link to={`/generate-report`}>
          <button className="m-3 px-4 py-2 rounded-lg bg-white to-purple-600 text-black border-2 border-white-200 hover:border-gray-300">
            Generate Report
          </button>
        </Link>
      </div>
    </div>
  );
};
export default ViewCustomer;
