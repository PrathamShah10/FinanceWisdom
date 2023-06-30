import React, { useState } from "react";
import { SIGNUP_USER } from "../../mutations";
import { useMutation } from "@apollo/client";
const CustomerSignUp = () => {
  const [registrationData, setRegistrationData] = useState({});
  const [signUpUser, { data, loading, error }] = useMutation(SIGNUP_USER);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpUser({
      variables: {
        newUserDetails: registrationData,
      },
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value }: handleChangeProp = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  type handleChangeProp = {
    name: string;
    value: string;
  };
  if (error) {
    return <h1>Error</h1>;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="relative top-0">
        {data ? (
          loading ? (
            <h2 className="bg-red-200 w-full">Registering...</h2>
          ) : (
            <h2 className="bg-green-200 w-full">Registered Successfully</h2>
          )
        ) : (
          ""
        )}
      </div>
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Customer Register</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-800">
              Name
            </label>
            <input
              type="string"
              name="name"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your Name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-800">
              Select BuisnessMan
            </label>
            <input
              type="string"
              name="buisnessMan"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your Select BuisnessMan"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-800">
              username
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
              name="password"
              type="password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerSignUp;
