import React from "react";
import { ApolloError, useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../queries";
const ShowQuotes = () => {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);
  if (loading) return <h1>loading</h1>;
  if (error) {
    return (
      <h1 className="whitespace-normal overflow-auto">
        error: {(error as ApolloError).message}
      </h1>
    );
  }
  return (
    <div className="h-screen bg-gray-200">
      <div className="flex flex-col justify-center items-center">
        {data.quotes.map((quote: any, i: number) => {
          return (
            <div
              className="bg-yellow-400 min-w-[70%] min-h-[70px] p-4 rounded-lg my-4"
              key={i}
            >
              <p className="text-gray-900 text-lg font-bold mb-2">
                {quote.description}
              </p>
              <p className="text-gray-600"> ~by: {quote.by.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowQuotes;
