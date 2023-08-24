import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import VisualizeData from "./VisualizeData";
import { useQuery } from "@apollo/client";
import { GET_VISUAL_DATA } from "../../queries";
import { setVisuals } from "../../redux/reducer/visual";
const Visualize = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data } = useQuery(GET_VISUAL_DATA, {
    variables: {
      _id: user?._id,
    }
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setVisuals(data?.getAllUserData?.visuals));
  }, [dispatch, data]);
  const visuals = useAppSelector((state) => state.visual);
  let initialCategory = 'general';
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
          return <option key={i} value={ele.category}>{ele.category}</option>;
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
