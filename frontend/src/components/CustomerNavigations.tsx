import React from "react";
import { Link } from "react-router-dom";
function CustomerNavigations({
  selected,
  setSelection,
}: ICustomerNavigationsProps) {
  return (
    <>
      <Link to={`/chat/${undefined}`} onClick={() => setSelection("Chat")}>
        <div
          className={`text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
            selected === "Chat"
              ? "underline underline-offset-8 decoration-4"
              : ""
          }`}
        >
          Chat
        </div>
      </Link>

      <Link to={`/news`} onClick={() => setSelection("News")}>
        <div
          className={`text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
            selected === "News"
              ? "underline underline-offset-8 decoration-4"
              : ""
          }`}
        >
          News
        </div>
      </Link>

      <Link to={`/set-goals`} onClick={() => setSelection("Goals")}>
        <div
          className={`text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
            selected === "Goals"
              ? "underline underline-offset-8 decoration-4"
              : ""
          }`}
        >
          Goals
        </div>
      </Link>

      <Link
        to={`/view-investments`}
        onClick={() => setSelection("Investments")}
      >
        <div
          className={`text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
            selected === "Investments"
              ? "underline underline-offset-8 decoration-4"
              : ""
          }`}
        >
          Investments
        </div>
      </Link>
    </>
  );
}
type ICustomerNavigationsProps = {
  selected?: string;
  setSelection?: any;
};
export default CustomerNavigations;
