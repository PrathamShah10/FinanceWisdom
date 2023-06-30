import React, { useState, useEffect } from "react";
import { months } from "../constants/month";
import { IUserVisuals, IDataVisualize } from "../interface/user";
import VisualizeData from "../components/Visualize/VisualizeData";
const UserHome = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("January");
  const [inputData, setInputData] = useState<IUserVisuals>({});
  const [visualData, setVisualData] = useState<IDataVisualize>({
    expenses: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    savings: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });
  const handleChange = (value: string, type: string) => {
    const numericValue = parseInt(value);
    if (type === "expenses") {
      const expenseIndex = inputData?.expenses?.findIndex((obj) =>
        obj.hasOwnProperty(selectedMonth)
      );
      const dummyInputData: IUserVisuals = inputData;
      if (expenseIndex === -1 || expenseIndex === undefined) {
        if (dummyInputData.expenses) {
          dummyInputData.expenses.push({ [selectedMonth]: numericValue });
        } else {
          dummyInputData.expenses = [{ [selectedMonth]: numericValue }];
        }
      } else {
        if (!dummyInputData.expenses) return;
        const dummy = dummyInputData.expenses[expenseIndex];
        if (dummy && dummy[selectedMonth] !== undefined) {
          dummy[selectedMonth] = numericValue;
        }
        dummyInputData.expenses[expenseIndex] = dummy;
      }
      setInputData(dummyInputData);
    } else {
      const expenseIndex = inputData?.savings?.findIndex((obj) =>
        obj.hasOwnProperty(selectedMonth)
      );
      const dummyInputData: IUserVisuals = inputData;
      if (expenseIndex === -1 || expenseIndex === undefined) {
        if (dummyInputData.savings) {
          dummyInputData.savings.push({ [selectedMonth]: numericValue });
        } else {
          dummyInputData.savings = [{ [selectedMonth]: numericValue }];
        }
      } else {
        if (!dummyInputData.savings) return;
        const dummy = dummyInputData.savings[expenseIndex];
        if (dummy && dummy[selectedMonth] !== undefined) {
          dummy[selectedMonth] = numericValue;
        }
        dummyInputData.savings[expenseIndex] = dummy;
      }
      setInputData(dummyInputData);
    }
  };

  const handleSubmit = () => {
    console.log("data:", inputData);
    const expensesNumeric: Array<number> = months.map((month) => {
      const expenseIndex = inputData?.expenses?.findIndex((obj) =>
        obj.hasOwnProperty(month)
      );
      if (expenseIndex === undefined || expenseIndex === -1) {
        return 0;
      } else {
        if (inputData?.expenses)
          return inputData?.expenses[expenseIndex][month];
        else return 0;
      }
    });

    const savingsNumeric: Array<number> = months.map((month) => {
      const expenseIndex = inputData?.savings?.findIndex((obj) =>
        obj.hasOwnProperty(month)
      );
      if (expenseIndex === undefined || expenseIndex === -1) {
        return 0;
      } else {
        if (inputData?.savings) return inputData?.savings[expenseIndex][month];
        else return 0;
      }
    });

    console.log(expensesNumeric, savingsNumeric);
    expensesNumeric &&
      savingsNumeric &&
      setVisualData({ expenses: expensesNumeric, savings: savingsNumeric });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-row items-center justify-center">
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
              onChange={(e) => handleChange(e.target.value, "expenses")}
              // value={expenseValue[selectedMonth]}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="savings" className="block mb-1 font-medium">
              Savings:
            </label>
            <input
              type="text"
              onChange={(e) => handleChange(e.target.value, "savings")}
              // value={savingValue[selectedMonth]}
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
          expenseData={visualData.expenses}
          savingsData={visualData.savings}
        />
      </div>
    </div>
  );
};

export default UserHome;
