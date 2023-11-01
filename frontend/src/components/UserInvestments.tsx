import React, { FC, useState, useEffect } from "react";
import Modal from "./Modal";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_INVESTMENTS } from "../mutations";
import { GET_ALL_INVESTS } from "../queries";
import { useAppSelector } from "../hooks/redux";
interface Investment {
  type: string;
  description: string;
  period: string;
  amount: string;
}

const UserInvestments: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const [changeInvests] = useMutation(ADD_INVESTMENTS);
  const [investment, setInvestment] = useState<Investment>({
    type: "",
    period: "",
    description: "",
    amount: "",
  });
  const { data } = useQuery(GET_ALL_INVESTS, {
    variables: {
      id: user?._id,
    },
  });

  useEffect(() => {
    // Use useEffect to setInvests when data changes (component first mounts or data updates)
    if (data && data.getInvestments) {
        setInvestments(data.getInvestments);
    }
  }, [data]);

  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInvestment((prevInvestment) => ({ ...prevInvestment, [name]: value }));
  };

  const handleAddInvestment = async () => {
    console.log('fds', {...investment})
    const { data } = await changeInvests({
        variables: {
          investDetails: {
            ...investment,
            customer: user?._id,
            isAdd: true,
          },
        },
      });
      setInvestment({ type: "", period: "", amount: "", description: "" });
      setInvestments(data.addInvestment);
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Investment Manager</h1>

      <h2 className="text-lg font-bold mt-8 mb-4">Investment List</h2>
      <ul>
        {investments.map((inv, index) => (
          <li key={index} className="mb-2">
            {inv.type} - {inv.period} - {inv.amount}
          </li>
        ))}
      </ul>

      <button
        onClick={openModal}
        className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Add Investment
      </button>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <div>
          <h2>Add Investment</h2>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Investment Type
          </label>
          <select
            name="type"
            value={investment.type}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3"
          >
            <option value="">Select Type</option>
            <option value="Stocks">Stocks</option>
            <option value="Bonds">Bonds</option>
            <option value="RealEstate">Real Estate</option>
            <option value="MutualFunds">Mutual Funds</option>
            <option value="Cryptocurrency">Cryptocurrency</option>
            <option value="Commodities">Commodities</option>
            <option value="SavingsAccounts">Savings Accounts</option>
            <option value="Other">Other</option>
          </select>

          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={investment.description}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3"
            placeholder="e.g., 5 years"
          />

          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
            Investment Period
          </label>
          <input
            type="text"
            name="period"
            value={investment.period}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3"
            placeholder="e.g., 5 years"
          />

          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
            Amount Paid
          </label>
          <input
            type="text"
            name="amount"
            value={investment.amount}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3"
            placeholder="Enter amount"
          />

          <button
            onClick={handleAddInvestment}
            className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Add Investment
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserInvestments;
