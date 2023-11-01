import React from "react";
import { Link } from "react-router-dom";
function Homeuser() {
  return (
    <div className="bg-transparent border min-h-screen flex flex-col items-center justify-center">
      <div className="text-center max-w-[80%]">
        <h1 className="text-5xl font-bold mb-6 text-blue-600">
          Welcome to Your Financial Hub
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Transform your financial future with our comprehensive platform.
          Efficiently manage your day-to-day expenses, set achievable long-term
          goals, explore strategic investments, and connect seamlessly with your
          dedicated personal financial advisor for expert guidance. At Financial
          Hub, we empower you with tools to make informed decisions and achieve
          financial success. Stay up-to-date with the latest financial news,
          visualize your spending patterns, and engage in meaningful
          conversations with your advisor through chat or schedule a
          personalized video call. Ready to embark on your journey to financial
          wellness? Let's get started!
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/update-manualdata"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full transition duration-300"
          >
            Enter Expenses
          </Link>
          <Link
            to="/visualize"
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full transition duration-300"
          >
            Visualize Expenses
          </Link>
          <Link
            to="/set-goals"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full transition duration-300"
          >
            View Goals
          </Link>
          <Link
            to="/user-investments"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-full transition duration-300"
          >
            Explore Investments
          </Link>
          <Link
            to="/news"
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full transition duration-300"
          >
            Financial News
          </Link>
        </div>
        <p className="mt-8 text-2xl">
          <strong>
            Ready to make informed decisions? Connect with your personal
            financial advisor for expert guidance.
          </strong>
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Link
            to={`/chat/${undefined}`}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full transition duration-300"
          >
            Chat with Advisor
          </Link>
          <Link
            to={`/video-call`}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full transition duration-300"
          >
            Schedule Video Call
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homeuser;
