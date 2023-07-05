import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SIGNUP_USER } from "../../mutations";
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [signUpUser, { data, loading, error }] = useMutation(SIGNUP_USER);
  if (error) {
    return <h1>error</h1>;
  }
  if (loading) {
    return <h1>loading...</h1>;
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value }: handleChangeProp = e.target;
    if (name === "age") {
      value = parseInt(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  type handleChangeProp = {
    name: string;
    value: string | number;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpUser({
      variables: {
        newUserDetails: formData,
      },
    });
  };
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
