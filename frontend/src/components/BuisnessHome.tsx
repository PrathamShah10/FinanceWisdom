import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { getAllUserData } from "../redux/action/user";
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
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
    <div className="max-w-md p-6 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">
        My Customers
      </h2>
      {user?.customers?.map((customer: ICustomer, i: number) => (
        <Link
          key={i}
          to={`/view-customer/${customer?._id}`}
          className="block w-full"
        >
          <div
            className="flex items-center justify-between p-4 cursor-pointer rounded-lg bg-blue-200 text-gray-700 mb-2 hover:bg-blue-300"
            onClick={() => {
              // customer?._id && setCustomer(customer._id);
              customer?._id && dispatch(setCustomerId(customer?._id));
              // setSelected(true);
            }}
          >
            <span className="text-lg font-semibold">{customer.name}</span>
            <span className="bg-gray-200 px-3 py-1 rounded-lg text-gray-700 text-sm">
              View Details
            </span>
          </div>
        </Link>
      ))}
      {user?.customers?.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No customers found.</p>
      )}
    </div>
  </div>
  
  );
};

export default BuisnessHome;
