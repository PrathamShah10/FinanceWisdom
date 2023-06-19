import React from "react";
import { Link, useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return (
    <div className="p-4 bg-[#F08080] flex space-x-2 items-center justify-between">
      {token ? (
        <>
          <div>
            <Link to="/" className="text-[#000080]">
              Home
            </Link>
          </div>
          <div>
            <Link to="/createQuote" className="text-[#000080]">
              Create Quote
            </Link>
          </div>
          <div>
            <Link to="/profile" className="text-[#000080]">
              Profile
            </Link>
          </div>
          <div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("User");
                navigate("/login");
              }}
              className="bg-white px-4 py-2 font-bold rounded-lg text-red-600"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link to="/login" className="text-[#000080]">
              SignIn
            </Link>
          </div>
          <div>
            <Link to="/register" className="text-[#000080]">
              SignUp
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
