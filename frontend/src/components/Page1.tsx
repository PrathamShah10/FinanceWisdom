import React, { useEffect } from "react";
const Page1 = () => {
  useEffect(() => {
    window.onbeforeunload = () => {
      // The user is about to leave the page
      // Perform any necessary actions here
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default Page1;
