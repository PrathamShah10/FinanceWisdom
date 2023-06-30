import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSignedUserDetailsAction } from "../../redux/action/user";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ISignInDetails } from "../../interface/user";
function CustomerLogin() {
  const [signInData, setSignInData] = useState<ISignInDetails>({});
  const dispatch = useAppDispatch();
  const { user, isUserDataPending } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isCustomer === true) {
      navigate("/home-user");
    }
  }, [navigate, user]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getSignedUserDetailsAction(signInData));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value }: handleChangeProp = e.target;
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
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="relative top-0">
        {isUserDataPending ? <h1>loading...</h1> : ""}
      </div>
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Customer Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-800">
              Username
            </label>
            <input
              type="string"
              name="username"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-800">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomerLogin;
