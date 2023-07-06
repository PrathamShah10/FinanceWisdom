import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setUserVisualsAction, getAllUserData } from "../redux/action/user";
import { months } from "../constants/month";
import { IUserVisualInput, IDataVisualize } from "../interface/user";
import VisualizeData from "../components/Visualize/VisualizeData";
const UserHome = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("January");
  const [inputData, setInputData] = useState<IUserVisualInput>({});
  const dispatch = useAppDispatch();
  const { user, visuals } = useAppSelector((state) => state.user);
  const [visualData, setVisualData] = useState<IDataVisualize>(
    visuals || {
      expenses: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      savings: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }
  );
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const { _id, isCustomer } = JSON.parse(userData);
      dispatch(getAllUserData(_id, isCustomer));
    }
  }, [dispatch]);
  const handleSubmit = () => {
    const changeExpensedData = months.map((month: string, i: number) => {
      if (month === selectedMonth) {
        return inputData.expenses || 0;
      } else {
        return visualData.expenses[i];
      }
    });
    const changedSavingsData = months.map((month: string, i: number) => {
      if (month === selectedMonth) {
        return inputData.savings || 0;
      } else {
        return visualData.savings[i];
      }
    });
    if (user?._id) {
      dispatch(
        setUserVisualsAction({
          expenses: changeExpensedData,
          savings: changedSavingsData,
          _id: user?._id,
        })
      );
    }
    setVisualData({
      expenses: changeExpensedData,
      savings: changedSavingsData,
    });
  };
  const getMonthIndex = (month: string) => {
    return months.findIndex((item) => item === month);
  };
  const expenseData = visuals?.expenses;
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
        pointRadius: 4,
        pointHoverRadius: 7,
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
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="mt-4 flex flex-row items-center justify-center">
        <div className="left w-[50%]">
          <div className="w-full h-full max-w-md p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Enter Your Expenses
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
                defaultValue={visualData.expenses[getMonthIndex(selectedMonth)]}
                onChange={(e) =>
                  setInputData((prev) => ({
                    ...prev,
                    expenses: parseInt(e.target.value),
                  }))
                }
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="savings" className="block mb-1 font-medium">
                Savings:
              </label>
              <input
                type="text"
                defaultValue={visualData.savings[getMonthIndex(selectedMonth)]}
                onChange={(e) =>
                  setInputData((prev) => ({
                    ...prev,
                    savings: parseInt(e.target.value),
                  }))
                }
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <button
              className="block w-full p-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="right">
          <VisualizeData
            expenseData={visuals?.expenses}
            savingsData={visuals?.savings}
          />
        </div>

        <Link to={`/chat/${undefined}`}>
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
      </div>

      <div className="mt-8 flex flex-col justify-center items-center space-y-4">
        <div className=" h-[250px] ">
          <Line data={expenseGraphData} options={LineOptions} />
        </div>
        <div className=" h-[250px] ">
          <Line data={savingGraphData} options={LineOptions} />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
