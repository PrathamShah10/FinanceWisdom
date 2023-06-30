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
  isUserDataPending: boolean;
}
interface IUserVisualConfig {
  [key: string]: number;
}
interface IUserVisuals {
  expenses?: Array<IUserVisualConfig>;
  savings?: Array<IUserVisualConfig>;
}
interface IDataVisualize {
  expenses: Array<number>;
  savings: Array<number>;
}
export type { ISignInDetails, IUser, IUserState, IUserVisuals, IDataVisualize };
