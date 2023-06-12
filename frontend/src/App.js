import React, { useState, useEffect } from "react";
const App = () => {
  const [data, setData] = useState("");
  const getData = () => {
    setTimeout(() => {
      setData("dummy data");
    }, 5000);
  };

  const displayData = () => {
    setTimeout(() => {
      console.log("data hai: ", data);
    }, 2000);
  };
  useEffect(() => {
    getData();
    displayData();
  }, []);
  return <div>hello</div>;
};

export default App;
