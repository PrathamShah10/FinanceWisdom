import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { getAllUserData } from "../redux/action/user";
import { ICustomer } from "../interface/user";
import Chat from "./Chat/Chat";
const BuisnessHome = () => {
  const [isChat, setIsChat] = useState<string | null>(null);
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
    <div>
      {isChat ? (
        <Chat customerId={isChat} />
      ) : (
        <div>
          <h2>Buisness Home</h2>
          {user?.customers?.map((customer: ICustomer, i: number) => {
            return (
              <div
                key={i}
                className="p-4 cursor-pointer w-[20%] rounded-lg bg-pink-300 mb-2"
                onClick={() => {
                  customer?._id && setIsChat(customer._id);
                }}
              >
                {customer.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BuisnessHome;
