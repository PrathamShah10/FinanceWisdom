import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { SIGNUP_USER } from "../mutations";
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
    <div className="h-screen flex items-center justify-center">
      {data?.addUser && <div className="absolute top-[20px] text-2xl">Welcome {data.addUser.name} !!!</div>}
      <form
        className="p-4 flex flex-col gap-y-4 border-solid border-2 border-gray-200 rounded-lg"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="p-2 border-solid border-2 border-gray-200 rounded-lg"
          name="name"
          onChange={handleChange}
          placeholder="name"
        />
        <input
          type="number"
          className="p-2 border-solid border-2 border-gray-200 rounded-lg"
          name="age"
          onChange={handleChange}
          placeholder="age"
        />
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
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
