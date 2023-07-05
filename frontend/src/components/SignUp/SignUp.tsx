import React from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        <div className="mb-4">
          <Link to="/buisness-register">
            <button
              type="button"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mb-2"
            >
              Register as Businessmen
            </button>
          </Link>
          <Link to="/customer-register">
            <button
              type="button"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Register as Customer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
