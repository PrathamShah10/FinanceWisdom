import { GET_USER_DETAILS, GET_ALL_QUOTES } from "../../queries";
import { CREATE_QUOTE } from "../../mutations";
import { AppDispatch } from "..";
import { client } from "../../index";
import {
  setUserData,
  setIsUserDataPending,
  setQuoteData,
  setIsUserQuotePending,
  setQuotesData,
} from "../reducer/user";
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
        fetchPolicy: 'network-only',
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
        fetchPolicy: 'network-only',
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

export const getAllQuotesAction = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setIsUserQuotePending(true));
    client
      .query({
        query: GET_ALL_QUOTES,
        fetchPolicy: 'network-only',
      })
      .then((response) => {
        const quotesData: IQuote[] = response.data.quotes.map((quote: any) => {
          const quoteData: IQuote = {
            description: quote.description,
            by: quote.by.name,
          };
          return (quoteData);
        });
        dispatch(setQuotesData(quotesData));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setIsUserQuotePending(false));
      });
  };
};
