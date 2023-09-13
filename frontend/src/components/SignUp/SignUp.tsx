import React from "react";
import { Link } from "react-router-dom";
import { CustomerIcon, FinancialAdvisorIcon } from "../common/icons/Icons";
const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-3xl w-full p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Get Started</h2>
        <p className="text-lg text-gray-600 mb-8">
          Choose the account type that best fits you and access your
          personalized experience.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <Link to="/buisness-register">
            <div className="flex items-center justify-center bg-indigo-500 text-white py-4 px-6 rounded-lg cursor-pointer hover:bg-indigo-600">
              {FinancialAdvisorIcon("w-8 h-8 mr-2")}
              <span className="text-lg font-semibold">Financial Advisor</span>
            </div>
          </Link>
          <Link to="/customer-register">
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

export default SignUp;
