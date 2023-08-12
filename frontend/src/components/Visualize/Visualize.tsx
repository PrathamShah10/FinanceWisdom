import React, { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import VisualizeData from "./VisualizeData";
const Visualize = () => {
  const { visuals } = useAppSelector((state) => state.user);
  const [category, setCategory] = useState<string>(
    (visuals && visuals[0].category) || ""
  );
  let categorialVisualsIndex = 0;
  if (visuals) {
    categorialVisualsIndex = visuals.findIndex(
      (item) => item.category === category
    );
  }
  return (
    <>
      <select
        className="m-3 p-3 rounded-lg bg-white text-black mr-4 border-2 border-black hover:border-black"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {visuals?.map((ele: any, i: number) => {
          return <option value={ele.category}>{ele.category}</option>;
        })}
      </select>
      <VisualizeData
        expenseData={
          visuals ? visuals[categorialVisualsIndex]?.expenses : undefined
        }
        savingsData={
          visuals ? visuals[categorialVisualsIndex]?.savings : undefined
        }
      />
    </>
  );
};

export default Visualize;
