import React, { useEffect } from "react";
import { getUserDetailsAction } from "../redux/action/user";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IQuote } from "../interface/user";
const Profile = () => {
  const dispatch = useAppDispatch();
  const userString = localStorage.getItem("User");
  const userVal = userString ? JSON.parse(userString) : null;
  const userid = userVal?._id;
  const { user, isUserDataPending } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserDetailsAction(userid));
  }, [dispatch, userid]);
  if (isUserDataPending) {
    return <h1>Loading Profile...</h1>;
  }
  return (
    <div>
      <div className="flex">
        <div className="pic">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-1ls-t9kJh2d1Ma4v39c1SbC00tq6N6Jukx6i4fCqSm2J2ZTY2x0ktpfpU5ttMQlkdTQ&usqp=CAU"
            alt=""
            className="w-24 h-24 rounded-full"
          />
        </div>
        <div className="info ml-4">
          <p className="text-xl font-bold">name: {user?.name}</p>
          <p className="text-xl">age: {user?.age}</p>
          <div className="flex flex-col justify-center items-start mt-4">
            <p className="text-lg font-bold">My Quotes:</p>
            {user?.quote?.map((userQuote: IQuote, i: number) => (
              <div key={i} className="mt-2">
                {userQuote.description}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
