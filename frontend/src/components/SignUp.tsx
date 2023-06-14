import React, { useState } from "react";
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <form className="p-4 flex flex-col gap-y-4 border-solid border-2 border-gray-200 rounded-lg"
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
        <button
          className="p-2.5 bg-purple-200 rounded-lg"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
