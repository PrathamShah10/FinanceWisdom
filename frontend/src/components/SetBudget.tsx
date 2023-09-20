import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { useQuery } from "@apollo/client";
import { months } from "../constants/month";
import { GET_CUSTOMER_DATA } from "../queries";
import { IUserVisualInput } from "../interface/user";
import { setUserVisualsAction } from "../redux/action/user";
import ClipSpinner from "./common/ClipSpinner";
const SetBudget = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("January");
  const [inputData, setInputData] = useState<IUserVisualInput>({});
  const [category, setCategory] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const { customerId } = useAppSelector((state) => state.user);
  const { data } = useQuery(GET_CUSTOMER_DATA, {
    variables: {
      _id: customerId,
    },
    fetchPolicy: "network-only",
  });
  let visuals = useAppSelector((state) => state.visual);
  if (!visuals) {
    visuals = data?.getCustomerData;
  }
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    setShowLoader(true);
    setTimeout(() => {
      let categoryVisualsExpenses: number[] = months.map((_, i: number) => {
        return 0;
      });
      if (visuals) {
        const categoryIndex = visuals.findIndex(
          (item: any) => item.category === category
        );
        if (categoryIndex !== -1) {
          categoryVisualsExpenses = visuals[categoryIndex].budgetExp || [];
        }
      }
      const changeExpensedData = months.map((month: string, i: number) => {
        if (month === selectedMonth) {
          return inputData.budExp || 0;
        } else {
          return categoryVisualsExpenses[i] || 0;
        }
      });
      if (customerId) {
        dispatch(
          setUserVisualsAction({
            budgetExp: changeExpensedData,
            _id: customerId,
            category,
          })
        );
      }
      setShowLoader(false);
    }, 2000);
  };
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center">
      <div className="w-[70%] flex flex-row items-center justify-center">
        <div className="w-full h-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Enter Budget Plan
          </h2>

          <div className="mb-4">
            <label htmlFor="month" className="block mb-1 font-medium">
              Select Month:
            </label>
            <select
              id="month"
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              onChange={(e) =>
                setSelectedMonth((e.target as HTMLSelectElement).value)
              }
            >
              {months.map((month: string, i: number) => {
                return (
                  <option key={i} value={month}>
                    {month}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="expense" className="block mb-1 font-medium">
              Expense:
            </label>
            <input
              type="text"
              onChange={(e) =>
                setInputData((prev) => ({
                  ...prev,
                  budExp: parseInt(e.target.value),
                }))
              }
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block mb-1 font-medium">
              Category:
            </label>
            <input
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <button
            className="block w-full p-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
            onClick={handleSubmit}
            disabled={showLoader}
          >
            {showLoader ? <ClipSpinner isLoading={showLoader} /> : "Submit"}
          </button>
          <p className="py-2 text-gray-600 text-sm text-center">
            want to enter via excel?{" "}
            <Link
              to="/update-advisor-exceldata"
              className="text-indigo-600 hover:underline"
            >
              Click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetBudget;
