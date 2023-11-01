import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_GOALS, GET_ALL_INVESTS } from "../queries";
import { useAppSelector } from "../hooks/redux";
import { IInvestment } from "../interface/user";
const GiveGoalInsight = () => {
  const { customerId } = useAppSelector((state) => state.user);
  const [goalData, setGoalData] = useState<Array<string>>([]);
  const [investData, setInvestData] = useState<Array<IInvestment>>([]);

  const { data } = useQuery(GET_ALL_GOALS, {
    variables: {
      id: customerId,
    },
    fetchPolicy: "network-only",
  });

  const { data: investmentData } = useQuery(GET_ALL_INVESTS, {
    variables: {
      id: customerId,
    },
  });

  useEffect(() => {
    setGoalData(data?.getGoals);
    setInvestData(investmentData?.getInvestments);
  }, [data?.getGoals, investmentData?.getInvestments]);

  return (
    <div className="bg-transparent p-6 rounded-lg shadow-md">
      <div className="mb-8">
        <h2 className="text-blue-600 font-semibold mb-4">Financial Goals</h2>
        <div className="space-y-4">
          {goalData?.map((goal: string, index: number) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              <p className="text-xl font-semibold mb-2">{goal}</p>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-lg font-bold mt-8 mb-4">Investment List</h2>
      <ul>
        {investData?.map((inv, index) => (
          <li key={index} className="mb-2">
            {inv.type} - {inv.period} - {inv.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GiveGoalInsight;
