// import React, { useState } from "react";
// import axios from "axios";
const Opencheck = () => {
  // const [response, setResponse] = useState("");
  // const makeAPIRequest = async () => {
  //   try {
  //     const apiKey = "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";

  //     const client = axios.create({
  //       headers: {
  //         Authorization: "Bearer " + apiKey,
  //       },
  //     });

  //     const params = {
  //       prompt: "give some financial advise realted to fixed depoist",
  //       model: "text-davinci-003",
  //       max_tokens: 10,
  //       temperature: 0,
  //     };

  //     client
  //       .post("https://api.openai.com/v1/completions", params)
  //       .then((result) => {
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (error) {
  //     console.error("Error making API request:", error);
  //   }
  // };
  return (
    <div>
      {/* want it?
      <button onClick={makeAPIRequest}>ha bhai</button>
      <p>{response}</p> */}
    </div>
  );
};

export default Opencheck;
