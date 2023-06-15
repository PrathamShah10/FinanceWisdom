import React from "react";
import { Link, useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return (
    <div className="flex space-x-2 items-center justify-between">
      {token ? (
        <>
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/createQuote">Create Quote</Link>
          </div>
          <div>
            <Link to="/profile">Profile</Link>
          </div>
          <div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link to="/login">SignIn</Link>
          </div>
          <div>
            <Link to="/register">SignUp</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
