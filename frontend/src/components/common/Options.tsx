import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { getAllUserData } from "../../redux/action/user";
import { Link } from "react-router-dom";
const Options = ({
  title,
  heading1,
  heading2,
  link1,
  link2,
  onHandleClick,
  isCustomerStart = false,
}: OptionsProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isCustomerStart) {
      const userData = localStorage.getItem("user");
      if (userData) {
        const { _id, isCustomer } = JSON.parse(userData);
        dispatch(getAllUserData(_id, isCustomer));
      }
    }
  }, [dispatch, isCustomerStart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        <div className="mb-4">
          <Link to={link1}>
            <button
              type="button"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mb-2"
              onClick={() => {
                if (onHandleClick) {
                  onHandleClick(heading1);
                }
              }}
            >
              {heading1}
            </button>
          </Link>
          <Link to={link2}>
            <button
              type="button"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              onClick={() => {
                if (onHandleClick) {
                  onHandleClick(heading2);
                }
              }}
            >
              {heading2}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
type OptionsProps = {
  title: string;
  heading1: string;
  heading2: string;
  link1: string;
  link2: string;
  onHandleClick?: (a: string) => void;
  isCustomerStart?: boolean;
};
export default Options;
