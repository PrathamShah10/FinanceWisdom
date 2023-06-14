import React, { useState } from "react";
const CreateQuote = () => {
  const [quote, setQuote] = useState<string>("");
    return (
    <div className="h-screen flex flex-col gap-y-2 justify-center items-center">
      <div>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="enter quote"
          className="p-2 rounded-lg border-solid border-2 border-gray-300"
        />
      </div>
      <button className="p-2.5 bg-purple-200 rounded-lg">Create Quote</button>
    </div>
  );
};

export default CreateQuote;
