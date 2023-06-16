import { useQuery } from "@apollo/client";
import React from "react";
import { GET_USER_DETAILS } from "../queries";

const Profile = () => {
  const userString = localStorage.getItem("User");
  const user = userString ? JSON.parse(userString) : null;
  const userid = user?._id;
  const { loading, error, data } = useQuery(GET_USER_DETAILS, {
    variables: {
      _id: userid,
    },
  });
  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>error</h1>;
  return (
    <div>
      <div>
        <div className="pic">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-1ls-t9kJh2d1Ma4v39c1SbC00tq6N6Jukx6i4fCqSm2J2ZTY2x0ktpfpU5ttMQlkdTQ&usqp=CAU"
            alt=""
          />
        </div>
        <div className="info">
          <p>name: {data?.user.name}</p>
          <p>age: {data?.user.age} </p>
          <div className="flex flex-col justify-center items-start">
            My Quotes: 
            {data?.user.quote.map((userQuote: any, i: number) => {
            return(
                <div>
                    {userQuote.description}
                </div>
            )
          })}
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default Profile;
