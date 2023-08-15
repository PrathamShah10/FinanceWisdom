import React, { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import VisualizeData from "./VisualizeData";
const Visualize = () => {
  const { visuals } = useAppSelector((state) => state.user);
  let initialCategory = "";
  if (visuals && visuals.length > 0) {
    initialCategory = visuals[0].category;
  }
  const [category, setCategory] = useState<string>(initialCategory);
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
      {visuals ? (
        <VisualizeData
          expenseData={
            visuals ? visuals[categorialVisualsIndex]?.expenses : undefined
          }
        />
      ) : (
        "no data to display"
      )}
    </>
  );
};

export default Visualize;
