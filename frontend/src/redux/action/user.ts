import { GET_USER_DETAILS } from "../../queries";
import { CREATE_QUOTE } from "../../mutations";
import { AppDispatch } from "..";
import { client } from "../../index";
import { setUserData, setIsUserDataPending, setQuoteData, setIsUserQuotePending } from "../reducer/user";
import { IUser, IQuote } from "../../interface/user";

export const getUserDetailsAction = (userid: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setIsUserDataPending(true));
    client
      .query({
        query: GET_USER_DETAILS,
        variables: {
          _id: userid,
        },
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

export const generateQuoteAction = (name: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setIsUserQuotePending(true));
    client
      .mutate({
        mutation: CREATE_QUOTE,
        variables: {
          name,
        },
      })
      .then((response) => {
        const quoteData: IQuote = {
          description: response.data.createQuote.description,
        };
        dispatch(setQuoteData(quoteData));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setIsUserQuotePending(false));
      });
  };
};
