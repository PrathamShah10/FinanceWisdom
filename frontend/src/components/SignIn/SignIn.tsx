import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { getAllUserData } from "../../redux/action/user";
const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const userData = localStorage.getItem("user");
      if (userData) {
        const { _id, isCustomer } = JSON.parse(userData);
        dispatch(getAllUserData(_id, isCustomer));
        if (isCustomer) {
          navigate("/home-user");
        } else {
          navigate("/home-buisness");
        }
      }
    }
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
        <div className="mb-4">
          <Link to="/buisness-login">
            <button
              type="button"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mb-2"
            >
              Sign In as Businessmen
            </button>
          </Link>
          <Link to="/customer-login">
            <button
              type="button"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Sign In as Customer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
