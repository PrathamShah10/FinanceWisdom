interface ISignInDetails {
  username?: string;
  password?: string;
}
interface IUser {
  name?: string;
  email?: string;
  username?: string;
  _id?: string;
  customers?: Array<ICustomer>;
  buisnessMan?: IBuisnessMan;
  isCustomer?: boolean;
}
interface IBuisnessMan {
  _id?: string;
  name?: string;
  email?: string;
  username?: string;
}
interface ICustomer {
  _id?: string;
  name: string;
  email?: string;
  username?: string;
}
interface IUserState {
  user?: IUser;
  isUserDataPending?: boolean;
  customerId?: string;
  chats?: Array<IChats>;
}
interface IUserVisualInput {
  expenses?: number;
  budExp?: number;
}
interface IDataVisualize {
  _id?: string;
  by?: any;
  expenses: Array<number>;
  budgetExp?: Array<number>;
  category: string;
}
interface IChats {
  sender: string;
  receiver: string;
  message: string;
}
interface IVisualState {
  expenses: Array<number>;
  budgetExp?: Array<number>;
  category: string;
}
interface IInvestment {
  Itype?: string;
  amount?: string;
  duration?: string;
  returns?: string;
}
export type {
  ISignInDetails,
  ICustomer,
  IUser,
  IUserState,
  IUserVisualInput,
  IDataVisualize,
  IChats,
  IVisualState,
  IInvestment,
};
