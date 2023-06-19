import { GET_USER_DETAILS } from "../../queries";
import { AppDispatch } from "..";
import { client } from "../../index";
import { setUserData, setIsUserDataPending } from "../reducer/user";
import { IUser } from "../../interface/user";

export const getUserDetailsAction = (userid: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setIsUserDataPending(true));
    client.query({
      query: GET_USER_DETAILS,
      variables: {
        _id: userid,
      }
    })
      .then((response) => {
        const userData: IUser = {
          name: response.data.user.name,
          age: response.data.user.age,
          quote: response.data.user.quote,
        };
        dispatch(setUserData(userData));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setIsUserDataPending(false));
      });
  };
};
