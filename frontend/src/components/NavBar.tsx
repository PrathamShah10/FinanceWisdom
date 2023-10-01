import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { resetUserState } from "../redux/reducer/user";
import { resetVisuals } from "../redux/reducer/visual";
import CustomerNavigations from "./CustomerNavigations";
import AdvsiorNavigations from "./AdvsiorNavigations";
const NavBar = () => {
  const [selectedField, setSelectedField] = useState<string>("Home");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  let user = null;
  if (userData) {
    user = JSON.parse(userData);
  }
  const { user: userDetails } = useAppSelector((state) => state.user);
  return (
    <nav>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link to={user?.isCustomer ? "/home-user" : "/home-buisness"}>
            <div
              className={`text-[25px] text-gray-800 hover:text-blue-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium cursor-pointer `}
            >
              FinanceWisdom
            </div>
          </Link>
        </div>
        {userDetails && (
          <div className="ml-auto">
            <span>{userDetails.name} | </span>
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                dispatch(resetUserState());
                dispatch(resetVisuals());
                navigate("/");
              }}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
      <div className="mx-[10px] flex items-center justify-between p-2 border border-gray-500 rounded-md">
        <div className="hidden md:block">
          <div
            className={`${token ? "" : "hidden"} flex items-baseline space-x-4`}
          >
            <Link
              to={user?.isCustomer ? "/home-user" : "/home-buisness"}
              onClick={() => setSelectedField("Home")}
            >
              <div
                className={`text-gray-800 hover:text-blue-600  px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  selectedField === "Home"
                    ? "underline underline-offset-8 decoration-4"
                    : ""
                }`}
              >
                Home
              </div>
            </Link>
            <Link
              to="/video-call"
              onClick={() => setSelectedField("VideoCall")}
            >
              <div
                className={`text-gray-800 hover:text-blue-600  px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  selectedField === "VideoCall"
                    ? "underline underline-offset-8 decoration-4"
                    : ""
                }`}
              >
                Video Call
              </div>
            </Link>
            {user?.isCustomer && (
              <CustomerNavigations
                selected={selectedField}
                setSelection={setSelectedField}
              />
            )}
            {!user?.isCustomer && (
              <AdvsiorNavigations
                selected={selectedField}
                setSelection={setSelectedField}
              />
            )}
          </div>
        </div>
        <div
          className={`${
            token ? "hidden" : ""
          } flex items-center justify-end space-x-2`}
        >
          <Link to="/" onClick={() => setSelectedField("SignIn")}>
            <div
              className={`text-gray-800 hover:text-blue-600  px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                selectedField === "SignIn"
                  ? "underline underline-offset-8 decoration-4"
                  : ""
              }`}
            >
              SignIn
            </div>
          </Link>
          <Link to="/register" onClick={() => setSelectedField("Register")}>
            <div
              className={`text-gray-800 hover:text-blue-600  px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                selectedField === "Register"
                  ? "underline underline-offset-8 decoration-4"
                  : ""
              }`}
            >
              Register
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
