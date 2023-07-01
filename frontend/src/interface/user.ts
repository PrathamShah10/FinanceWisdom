interface ISignInDetails {
  username?: string;
  password?: string;
}
interface IUser {
  name?: string;
  email?: string;
  username?: string;
  _id?: string;
  customers?: ICustomers;
  buisnessMan?: IBuisnessMan;
  isCustomer?: boolean;
}
interface IBuisnessMan {
  name?: string;
  email?: string;
  username?: string;
}
interface ICustomers {
  name: string;
  email?: string;
  username?: string;
}
interface IUserState {
  user?: IUser;
  visuals?: IDataVisualize;
  isUserDataPending: boolean;
}
interface IUserVisualInput {
  expenses?: number;
  savings?: number;
}
interface IDataVisualize {
  expenses: Array<number>;
  savings: Array<number>;
}
export type { ISignInDetails, IUser, IUserState, IUserVisualInput, IDataVisualize };
