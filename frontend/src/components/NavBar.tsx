import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { setUserData } from "../redux/reducer/user";
const NavBar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  let user = null;
  if (userData) {
    user = JSON.parse(userData);
  }
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div
                className={`${
                  token ? "" : "hidden"
                } ml-10 flex items-baseline space-x-4`}
              >
                <Link to={user?.isCustomer ? "/home-user" : "/home-buisness"}>
                  <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                    Home
                  </div>
                </Link>
                <Link to="/video-call">
                  <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                    Video Call
                  </div>
                </Link>
                {user?.isCustomer && (
                  <>
                    <Link to={`/chat/${undefined}`}>
                      <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                        Chat
                      </div>
                    </Link>

                    <Link to={`/news`}>
                      <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                        News
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={`hidden ${token ? "md:block" : ""}`}>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="ml-3 relative">
                <div>
                  <button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    <img
                      onMouseEnter={() => setShowLogout(true)}
                      onMouseLeave={() =>
                        setTimeout(() => {
                          setShowLogout(false);
                        }, 2000)
                      }
                      className="h-8 w-8 rounded-full"
                      src="https://source.unsplash.com/random"
                      alt="User avatar"
                    />
                  </button>
                </div>
                {showLogout && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <Link to="/">
                        <div
                          className="text-gray-300 bg-red-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                          onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            dispatch(setUserData(undefined));
                            navigate("/");
                          }}
                        >
                          Logout
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className={`${
              token ? "hidden" : ""
            } flex items-center justify-end space-x-2`}
          >
            <Link to="/">
              <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                SignIn
              </div>
            </Link>
            <Link to="/register">
              <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                Register
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
