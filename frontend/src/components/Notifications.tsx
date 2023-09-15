import React from "react";
import { useQuery } from "@apollo/client";
import { useAppSelector } from "../hooks/redux";
import { GET_ALL_NOTIFICATIONS } from "../queries";
function Notifications() {
  const { user } = useAppSelector((state) => state.user);
  const { data } = useQuery(GET_ALL_NOTIFICATIONS, {
    variables: {
      id: user?._id,
    },
  });
  return (
    <div className="min-h-screen bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          {data?.getAllNotifications?.map((notification: string, i: number) => {
            return (
              <div key={i} className="bg-white p-4 rounded-lg shadow-md">
                {notification}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
