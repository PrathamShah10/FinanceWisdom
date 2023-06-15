import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../queries";
const ShowQuotes = () => {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);
  if (loading) return <h1>loading</h1>;
  if (error) {
    console.log("err", error);
    return <h1>error</h1>;
  }
  console.log(data.quotes);
  return (
    <div className="h-screen bg-black">
      {data.quotes.map((quote: any, i: number) => {
        return (
          <div className="bg-white" key={i}>
            {quote.description} by: {quote.by.name}
          </div>
        );
      })}
    </div>
  );
};

export default ShowQuotes;