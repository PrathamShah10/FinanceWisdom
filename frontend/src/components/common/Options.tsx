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
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center">
  <h2 className="text-3xl font-semibold mb-8">{title}</h2>
  <div className="grid grid-cols-2 gap-6 max-w-4xl w-full">
    <Link to={link1}>
      <div className="bg-indigo-500 text-white p-6 rounded-md shadow-md hover:bg-indigo-600 transition-colors flex items-center justify-center">
        <button
          type="button"
          className="text-white py-2 px-4 rounded-md focus:outline-none transition-colors w-full"
          onClick={() => {
            if (onHandleClick) {
              onHandleClick(heading1);
            }
          }}
        >
          {heading1}
        </button>
      </div>
    </Link>
    <Link to={link2}>
      <div className="bg-green-500 text-white p-6 rounded-md shadow-md hover:bg-green-600 transition-colors flex items-center justify-center">
        <button
          type="button"
          className="text-white py-2 px-4 rounded-md focus:outline-none transition-colors w-full"
          onClick={() => {
            if (onHandleClick) {
              onHandleClick(heading2);
            }
          }}
        >
          {heading2}
        </button>
      </div>
    </Link>
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
