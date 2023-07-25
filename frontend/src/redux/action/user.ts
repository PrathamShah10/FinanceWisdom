import {
  ADD_MESSAGES,
  SIGNIN_BUISNESSMAN,
  SIGNIN_USER,
  UPDATE_USERVISUAL,
} from "../../mutations";
import { AppDispatch } from "..";
import { client } from "../../index";
import {
  setUserData,
  setUserVisuals,
  setIsUserDataPending,
  setChats,
  setAllData,
} from "../reducer/user";
import { ISignInDetails, IUser, IChats } from "../../interface/user";
import {
  GET_ALL_BUISNESS_DATA,
  GET_ALL_CHATS,
  GET_ALL_USER_DATA,
} from "../../queries";

export const getSignedBuisnessDetailsAction = (signDetails: ISignInDetails) => {
  return (dispatch: AppDispatch) => {
    dispatch(setIsUserDataPending(true));
    client
      .mutate({
        mutation: SIGNIN_BUISNESSMAN,
        variables: {
          signDetails: signDetails,
        },
        fetchPolicy: "network-only",
      })
      .then((response) => {
        const res = response.data.signInBuisness;
        localStorage.setItem("token", res.token);
        const { name, email, _id, customers } = res.userDetails;
        const customersFilter = customers.map((customer: any) => {
          const { __typename, ...data } = customer;
          return data;
        });
        const isCustomer = res.isCustomer;
        localStorage.setItem("user", JSON.stringify({ _id, isCustomer }));
        const userData: IUser = {
          name,
          email,
          _id,
          customers: customersFilter,
          isCustomer,
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
export const getSignedUserDetailsAction = (signDetails: ISignInDetails) => {
  return (dispatch: AppDispatch) => {
    dispatch(setIsUserDataPending(true));
    client
      .mutate({
        mutation: SIGNIN_USER,
        variables: {
          signDetails: signDetails,
        },
        fetchPolicy: "network-only",
      })
      .then((response) => {
        const res = response.data.signInUser;
        localStorage.setItem("token", res.token);
        const { name, email, _id, buisnessMan } = res.userDetails;
        const isCustomer = res.isCustomer;
        localStorage.setItem("user", JSON.stringify({ _id, isCustomer }));
        const userData: IUser = {
          name,
          email,
          _id,
          isCustomer,
          buisnessMan,
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

export const setUserVisualsAction = (economicDetails: EconomicsInput) => {
  return (dispatch: AppDispatch) => {
    dispatch(setIsUserDataPending(true));
    client
      .mutate({
        mutation: UPDATE_USERVISUAL,
        variables: {
          economicDetails: economicDetails,
        },
        fetchPolicy: "network-only",
      })
      .then((response) => {
        const res = response.data.updateEconomics;
        dispatch(
          setUserVisuals({ expenses: res.expenses, savings: res.savings })
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setIsUserDataPending(false));
      });
  };
};

export const setChatsAction = (messageDetails: MessageInput) => {
  return (dispatch: AppDispatch) => {
    dispatch(setIsUserDataPending(true));
    client
      .mutate({
        mutation: ADD_MESSAGES,
        variables: {
          messageDetails: messageDetails,
        },
        fetchPolicy: "network-only",
      })
      .then((response) => {
        const res: IChats[] = response.data.addMessage;
        const filteredData = res.filter(
          (item) =>
            (item.sender === messageDetails.sender ||
              item.sender === messageDetails.reciever) &&
            (item.reciever === messageDetails.reciever ||
              item.reciever === messageDetails.sender)
        );
        dispatch(setChats(filteredData));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setIsUserDataPending(false));
      });
  };
};
export const getAllChats = (_id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setIsUserDataPending(true));
    client
      .query({
        query: GET_ALL_CHATS,
        variables: {
          _id,
        },
        fetchPolicy: "network-only",
      })
      .then((response) => {
        const res: IChats[] = response.data.getAllChats;
        dispatch(setChats(res));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setIsUserDataPending(false));
      });
  };
};

export const getAllUserData = (_id: string, isCustomer: boolean) => {
  return (dispatch: AppDispatch) => {
    dispatch(setIsUserDataPending(true));
    client
      .query({
        query: isCustomer ? GET_ALL_USER_DATA : GET_ALL_BUISNESS_DATA,
        variables: {
          _id,
        },
        fetchPolicy: "network-only",
      })
      .then((response) => {
        if (isCustomer) {
          const res = response.data.getAllUserData;
          dispatch(setAllData(res));
        } else {
          dispatch(setAllData(response.data.getAllBusinessData));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setIsUserDataPending(false));
      });
  };
};
type EconomicsInput = {
  _id: string;
  expenses?: Array<number>;
  savings?: Array<number>;
  budgetExp?: Array<number>;
  budgetSave?: Array<number>;
  isBuisness?: boolean;
};
type MessageInput = {
  sender?: string;
  reciever?: string;
  message?: string;
  //messages
};
