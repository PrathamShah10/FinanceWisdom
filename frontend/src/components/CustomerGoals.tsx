import React, { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/redux";
import { useQuery, useMutation } from "@apollo/client";
import { FiPlus, FiTrash } from "react-icons/fi";
import { GET_ALL_GOALS } from "../queries";
import { CHANGE_GOALS } from "../mutations";

function CustomerGoals() {
  const [goals, setGoals] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState<string>("");
  const { user } = useAppSelector((state) => state.user);
  const { data } = useQuery(GET_ALL_GOALS, {
    variables: {
      id: user?._id,
    },
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    if (data) setGoals(data.getGoals);
  }, [data]);
  const [changeGoals] = useMutation(CHANGE_GOALS);
  const handleAddGoal = async () => {
    if (newGoal.trim() !== "") {
      const { data } = await changeGoals({
        variables: {
          goalDetails: {
            userid: user?._id,
            isAdd: true,
            goal: newGoal,
          },
        },
      });
      setGoals(data.changeGoals);
      setNewGoal("");
    }
  };

  const handleDeleteGoal = async (index: number) => {
    const { data } = await changeGoals({
      variables: {
        goalDetails: {
          userid: user?._id,
          isAdd: false,
          goal: goals[index],
        },
      },
    });
    setGoals(data.changeGoals);
  };

  return (
    <div className="min-h-screen bg-transparent py-10">
      <div className="max-w-md mx-auto">
        <h1 className="text-blue-600 text-2xl font-bold mb-4 text-center">
          Your Financial Goals
        </h1>
        <div className="mb-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Enter a financial goal"
            className="w-3/4 px-3 py-2 border rounded-l focus:outline-none"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
          <button
            onClick={handleAddGoal}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          >
            <FiPlus size={20} />
          </button>
        </div>
        <ul>
          {goals.map((goal, index) => (
            <li
              key={index}
              className="bg-blue-100 text-blue-800 p-2 mb-2 rounded-lg flex items-center justify-between"
            >
              <span>{goal}</span>
              <button
                onClick={() => handleDeleteGoal(index)}
                className="text-red-500 hover:text-red-600"
              >
                <FiTrash size={18} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CustomerGoals;
