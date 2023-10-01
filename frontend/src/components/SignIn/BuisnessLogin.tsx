import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSignedBuisnessDetailsAction } from "../../redux/action/user";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ISignInDetails } from "../../interface/user";
import ClipSpinner from "../common/ClipSpinner";
import { Link } from 'react-router-dom';
function BuisnessLogin() {
  const [signInData, setSignInData] = useState<ISignInDetails>({});
  const dispatch = useAppDispatch();
  const { user, isUserDataPending } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isCustomer === false) {
      navigate("/home-buisness");
    }
  }, [navigate, user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getSignedBuisnessDetailsAction(signInData));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: handleChangeProp = e.target;
    setSignInData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  type handleChangeProp = {
    name: string;
    value: string;
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-indigo-600 text-white py-4 px-6">
          <h2 className="text-3xl font-extrabold text-white">Financial Advisor Login</h2>
          <p className="mt-2 text-white">Sign in to your account.</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            {!isUserDataPending ? (
              "Sign In"
            ) : (
              <ClipSpinner isLoading={isUserDataPending} />
            )}
          </button>
        </form>
        <p className="text-gray-600 text-sm text-center mb-3">
          Don't have an account?{" "}
          <Link
            to="/buisness-register"
            className="text-indigo-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default BuisnessLogin;
