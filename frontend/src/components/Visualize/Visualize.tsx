import React from "react";
import { useAppSelector } from "../../hooks/redux";
import VisualizeData from "./VisualizeData";
const Visualize = () => {
  const { visuals } = useAppSelector((state) => state.user);
  return (
      <VisualizeData
        expenseData={visuals?.expenses}
        savingsData={visuals?.savings}
      />
  );
};

export default Visualize;
