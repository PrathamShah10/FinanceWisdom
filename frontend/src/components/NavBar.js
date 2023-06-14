import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="flex space-x-2 items-center justify-between">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
      <Link to="/createQuote">Create Quote</Link>
      </div>
      <div>
        <Link to="/login">SignIn</Link>
      </div>
      <div>
        <Link to="/register">SignUp</Link>
      </div>
      <div>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
};

export default NavBar;
