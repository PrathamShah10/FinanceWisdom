import { SIGNIN_BUISNESSMAN, SIGNIN_USER } from '../../mutations';
import { AppDispatch } from "..";
import { client } from "../../index";
import {
  setUserData,
  setIsUserDataPending,
} from "../reducer/user";
import { ISignInDetails, IUser } from "../../interface/user";

export const getSignedBuisnessDetailsAction = (signDetails: ISignInDetails) => {
  return (dispatch: AppDispatch) => {
    dispatch(setIsUserDataPending(true));
    client
      .mutate({
        mutation: SIGNIN_BUISNESSMAN,
        variables: {
          signDetails: signDetails,
        },
        fetchPolicy: 'network-only',
      })
      .then((response) => {
        console.log('res', response);
        const res = response.data.signInBuisness;
        localStorage.setItem('token', res.token);
        const {name, email, _id, customers} = res.userDetails;
        const customersFilter = customers.map((customer: any) => {
          const {__typename, ...data } = customer;
          return data;
        }) 
        const isCustomer = res.isCustomer;
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
        fetchPolicy: 'network-only',
      })
      .then((response) => {
        const res = response.data.signInUser;
        localStorage.setItem('token', res.token);
        const {name, email, _id, buisnessMan } = res.userDetails;
        const isCustomer = res.isCustomer;
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