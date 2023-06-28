import React, { useEffect } from "react";
import { getAllQuotesAction } from "../redux/action/user";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IQuote } from "../interface/user";
const ShowQuotes = () => {
  const dispatch = useAppDispatch();
  const { user, isUserDataPending } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllQuotesAction());
  }, [dispatch]);
  if (isUserDataPending) {
    return <h1>laoding quotes...</h1>;
  }
  return (
    <div className="h-screen bg-gray-200">
      <div className="flex flex-col justify-center items-center">
        {user?.quote?.map((quote: IQuote, i: number) => {
          return (
            <div
              className="bg-yellow-400 min-w-[70%] min-h-[70px] p-4 rounded-lg my-4"
              key={i}
            >
              <p className="text-gray-900 text-lg font-bold mb-2">
                {quote.description}
              </p>
              <p className="text-gray-600"> ~by: {quote.by}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowQuotes;
