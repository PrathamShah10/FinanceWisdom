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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">My Customers</h2>
        {user?.customers?.map((customer: ICustomer, i: number) => (
          <Link to={`/view-customer/${customer?._id}`}>
            <div
              key={i}
              className="flex items-center justify-between p-4 cursor-pointer rounded-lg bg-pink-300 mb-2 hover:bg-pink-400"
              onClick={() => {
                // customer?._id && setCustomer(customer._id);
                customer?._id && dispatch(setCustomerId(customer?._id));
                // setSelected(true);
              }}
            >
              <span className="text-lg text-white">{customer.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BuisnessHome;
