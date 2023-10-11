import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { getAllChats, getAllUserData } from "../redux/action/user";
import { setCustomerId } from "../redux/reducer/user";
import { ICustomer } from "../interface/user";
const BuisnessHome = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const { _id, isCustomer } = JSON.parse(userData);
      dispatch(getAllUserData(_id, isCustomer));
      if (user?._id) dispatch(getAllChats(user?._id));
    }
  }, [dispatch, user?._id]);

  return (
    <div className="mt-5 flex flex-col items-center min-h-screen bg-transparent">
      <div className=" p-6 bg-white rounded-lg w-[80%]">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">
          Welcome, Financial Advisor!
        </h2>
        <p className="text-center text-gray-700 mb-4">
          As a valued financial advisor on our platform, you play a crucial role
          in guiding your customers towards financial prosperity. Establish
          meaningful connections by understanding their unique financial needs
          and aspirations. Leverage our cutting-edge tools and features to offer
          tailored solutions that align with their goals. Your expertise is the
          key to unlocking financial success for your customers. Utilize our
          platform to stay informed about market trends, access comprehensive
          financial data, and provide insightful recommendations. Whether you're
          a seasoned professional or just starting in the field, our
          user-friendly interface and robust support system ensure a seamless
          experience. Join a community of dedicated financial advisors committed
          to making a positive impact. As you embark on this journey, we're here
          to support you every step of the way. Connect with your customers,
          build lasting relationships, and be a guiding light on their financial
          path.
        </p>

        <div className="mx-auto max-w-md flex flex-col justify-center items-center">
          {user?.customers?.map((customer: ICustomer, i: number) => (
            <Link
              key={i}
              to={`/view-customer/${customer?._id}`}
              className="block w-full"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer rounded-lg bg-blue-200 text-gray-700 mb-2 hover:bg-blue-300"
                onClick={() => {
                  customer?._id && dispatch(setCustomerId(customer?._id));
                }}
              >
                <span className="text-lg font-semibold">{customer.name}</span>
                <span className="bg-gray-200 px-3 py-1 rounded-lg text-gray-700 text-sm">
                  View Details
                </span>
              </div>
            </Link>
          ))}
        </div>

        {user?.customers?.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No customers found. Start connecting with customers to provide
            financial guidance.
          </p>
        )}
      </div>
    </div>
  );
};

export default BuisnessHome;
