import React, { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/redux";
import { useQuery } from "@apollo/client";
import { GET_ALL_INVESTS } from "../queries";
import { IInvestment } from "../interface/user";

const ViewInvestments = () => {
  const [invests, setInvests] = useState<Array<IInvestment>>([]);
  const { user } = useAppSelector((state) => state.user);
  const { data } = useQuery(GET_ALL_INVESTS, {
    variables: {
      id: user?._id,
    },
  });

  useEffect(() => {
    // Use useEffect to setInvests when data changes (component first mounts or data updates)
    if (data && data.getInvestments) {
      setInvests(data.getInvestments);
    }
  }, [data]);

  return (
    <div className="bg-transparent min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Suggested Investments</h2>
      {invests.length === 0 ? (
        <p className="text-gray-600">You have no investments yet.</p>
      ) : (
        <div>
          {invests.map((investment: IInvestment, index: number) => (
            <div
              key={index}
              className="border rounded-lg p-4 mb-4 bg-white shadow"
            >
              <h3 className="text-xl font-semibold">{investment.Itype}</h3>
              <div className="text-gray-600">Amount: ₹{investment.amount}</div>
              <div className="text-gray-600">
                Duration: {investment.duration} months
              </div>
              <div className="text-gray-600">
                Expected Return: ₹{investment.returns}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewInvestments;
