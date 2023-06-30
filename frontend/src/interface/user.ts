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
export type { ISignInDetails, IUser, IUserState };
