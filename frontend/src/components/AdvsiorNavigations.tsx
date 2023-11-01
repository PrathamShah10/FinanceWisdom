import React from "react";
import { Link } from "react-router-dom";
function AdvsiorNavigations({
  selected,
  setSelection,
}: IAdvsiorNavigationsProps) {
  return (
    <>
      <Link to={`/notifications`} onClick={() => setSelection("Notifications")}>
        <div
          className={`text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
            selected === "Notifications"
              ? "underline underline-offset-8 decoration-4"
              : ""
          }`}
        >
          Notifications
        </div>
      </Link>
    </>
  );
}
type IAdvsiorNavigationsProps = {
  selected?: string;
  setSelection?: any;
};
export default AdvsiorNavigations;
