import React, { useState } from "react";
import { IInvestment } from "../interface/user";
import { useMutation } from "@apollo/client";
import { ADD_INVESTMENTS } from "../mutations";
function InvestmentList({ invests, customerId }: InvestmentListProps) {
  const [investments, setInvestments] = useState<Array<IInvestment>>(invests);
  const [newInvestment, setNewInvestment] = useState<IInvestment>({
    Itype: "",
    amount: "",
    duration: "",
    returns: "",
  });
  const [changeInvests] = useMutation(ADD_INVESTMENTS);
  const handleAddInvestment = async () => {
    if (
      newInvestment?.Itype?.trim() !== "" &&
      newInvestment?.amount?.trim() !== "" &&
      newInvestment?.duration?.trim() !== "" &&
      newInvestment?.returns?.trim() !== ""
    ) {
      const { data } = await changeInvests({
        variables: {
          investDetails: {
            ...newInvestment,
          customer: customerId,
          isAdd: true,
          }
        },
      });
      setInvestments(data.addInvestment)
      setNewInvestment({
        Itype: "",
        amount: "",
        duration: "",
        returns: "",
      });
    }
  };

  const handleDeleteInvestment = async (index: number) => {
    const { data } = await changeInvests({
      variables: {
        investDetails: {
          ...investments[index],
        customer: customerId,
        isAdd: false,
        }
      },
    });
    // console.log('deleting data vai', data);
    // const updatedInvestments = [...investments];
    // updatedInvestments.splice(index, 1);
    setInvestments(data?.addInvestment);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white p-4 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Investment List</h1>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Investment Name"
            className="w-full px-3 py-2 border rounded mb-2"
            value={newInvestment.Itype}
            onChange={(e) =>
              setNewInvestment({ ...newInvestment, Itype: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Amount"
            className="w-full px-3 py-2 border rounded mb-2"
            value={newInvestment.amount}
            onChange={(e) =>
              setNewInvestment({ ...newInvestment, amount: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Duration"
            className="w-full px-3 py-2 border rounded mb-2"
            value={newInvestment.duration}
            onChange={(e) =>
              setNewInvestment({ ...newInvestment, duration: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Expected Return"
            className="w-full px-3 py-2 border rounded mb-4"
            value={newInvestment.returns}
            onChange={(e) =>
              setNewInvestment({
                ...newInvestment,
                returns: e.target.value,
              })
            }
          />
          <button
            onClick={handleAddInvestment}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Investment
          </button>
        </div>
        <ul className="space-y-2">
          {investments?.map((investment, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 rounded p-2"
            >
              <div>
                <strong>{investment.Itype}</strong>
                <div>Amount: {investment.amount}</div>
                <div>Duration: {investment.duration}</div>
                <div>Expected Return: {investment.returns}</div>
              </div>
              <button
                onClick={() => handleDeleteInvestment(index)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type InvestmentListProps = {
  invests: Array<IInvestment>;
  customerId?: string;
};

export default InvestmentList;
