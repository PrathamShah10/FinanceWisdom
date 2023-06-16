import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_QUOTE } from "../mutations";
const CreateQuote = () => {
  const [quote, setQuote] = useState<string>("");
  const [CreateQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
    refetchQueries: ["ExampleQuery", "UserDetails"],
  });
  const handleCreate = () => {
    CreateQuote({
      variables: {
        name: quote,
      },
    });
  };
  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>error</h1>;
  return (
    <div className="h-screen flex flex-col gap-y-2 justify-center items-center">
      <div>
        {data ? (
          <div className="m-4 p-4 bg-green-500 rounded-lg">
            Quote Added: {data.createQuote.description}{" "}
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="enter quote"
          className="p-2 rounded-lg border-solid border-2 border-gray-300"
        />
      </div>
      <button className="p-2.5 bg-purple-200 rounded-lg" onClick={handleCreate}>
        Create Quote
      </button>
    </div>
  );
};

export default CreateQuote;
