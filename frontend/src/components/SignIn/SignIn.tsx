import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { CustomerIcon, FinancialAdvisorIcon } from "../common/icons/Icons";
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
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="max-w-3xl w-full p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Login With</h2>
        <p className="text-lg text-gray-600 mb-8">
          Choose the account type that best fits you and access your
          personalized experience.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <Link to="/buisness-login">
            <div className="flex items-center justify-center bg-indigo-500 text-white py-4 px-6 rounded-lg cursor-pointer hover:bg-indigo-600">
              {FinancialAdvisorIcon("w-8 h-8 mr-2")}
              <span className="text-lg font-semibold">Financial Advisor</span>
            </div>
          </Link>
          <Link to="/customer-login">
            <div className="flex items-center justify-center bg-purple-500 text-white py-4 px-6 rounded-lg cursor-pointer hover:bg-purple-600">
              {CustomerIcon("w-8 h-8 mr-2")}
              <span className="text-lg font-semibold">Customer</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
