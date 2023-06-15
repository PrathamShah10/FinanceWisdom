import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { SIGNIN_USER } from "../mutations";
const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [signInUser, {loading, error, data}] = useMutation(SIGNIN_USER);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInUser({
      variables: {
        signDetails: formData,
      }
    })
  };
  if(data) {
    localStorage.setItem('token', data?.signInUser.token);
  }
  if (error) {
    return <h1>error</h1>;
  }
  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <form
        className="p-4 flex flex-col gap-y-4 border-solid border-2 border-gray-200 rounded-lg"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="p-2 border-solid border-2 border-gray-200 rounded-lg"
          name="username"
          onChange={handleChange}
          placeholder="username"
        />
        <input
          type="password"
          className="p-2 border-solid border-2 border-gray-200 rounded-lg"
          name="password"
          onChange={handleChange}
          placeholder="password"
        />
        <button className="p-2.5 bg-purple-200 rounded-lg" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;
