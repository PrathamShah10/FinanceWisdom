import React from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
function App() {
  return (
    <>
      <SignIn />
      <SignUp />
      <Profile />
    </>
  );
}

export default App;
