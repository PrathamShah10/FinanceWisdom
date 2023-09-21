import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import VisualizeData from "./VisualizeData";
import { useQuery } from "@apollo/client";
import { GET_VISUAL_DATA } from "../../queries";
import { setVisuals } from "../../redux/reducer/visual";
const Visualize = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const visuals = useAppSelector((state) => state.visual);

  const { data } = useQuery(GET_VISUAL_DATA, {
    variables: {
      _id: user?._id,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    console.log("useEffect visualize.tsx");
    if (data) dispatch(setVisuals(data?.getAllUserData?.visuals));
  }, [data, dispatch]);

  const [toogleChart, setToogleChart] = useState<string>("PIECHART");
  const [category, setCategory] = useState<string>("NULL");
  const [categorialVisualsIndex, setCategorialVisualsIndex] =
    useState<number>(0);

  useEffect(() => {
    if (category !== "NULL") {
      setCategorialVisualsIndex(
        visuals?.findIndex((item) => item.category === category)
      );
    }
    console.log("now the catis", category);
  }, [category, visuals]);

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="flex">
        <select
          className="m-3 px-4 py-2 rounded-lg bg-white-200 to-purple-600 text-black border-2 border-white-200 hover:border-gray-300"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {visuals?.map((ele: any, i: number) => {
            return (
              <option key={i} value={ele.category}>
                {ele.category}
              </option>
            );
          })}
        </select>

        <select
          className="m-3 px-4 py-2 rounded-lg bg-white-200 to-purple-600 text-black border-2 border-white-200 hover:border-gray-300"
          value={toogleChart}
          onChange={(e) => setToogleChart(e.target.value)}
        >
          <option value="PIECHART" className="bg-white text-black">
            PieChart
          </option>
          <option value="BARCHART" className="bg-white text-black">
            BarChart
          </option>
          <option value="LINECHART" className="bg-white text-black">
            LineChart
          </option>
        </select>
      </div>
      {user?._id && visuals ? (
        <VisualizeData
          expenseData={
            visuals ? visuals[categorialVisualsIndex]?.expenses : undefined
          }
          budgetData={
            visuals ? visuals[categorialVisualsIndex]?.budgetExp : undefined
          }
          chart={toogleChart}
        />
      ) : (
        "no data to display"
      )}
    </div>
  );
};

export default Visualize;
