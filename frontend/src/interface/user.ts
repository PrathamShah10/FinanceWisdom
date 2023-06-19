interface ILoginUserData {
  token: string;
  userDetails: IUser;
}
interface IUser {
    name: string;
    age: string;
    quote?: Array<IQuote>;
    _id?: string;
}
interface IUserState {
  user?: IUser,
  isUserDataPending: boolean,
}
interface IQuote {
    description: string;
}
interface IUserLoginState {
  user?: ILoginUserData;
  isUserDataPending: boolean;
}
export type { ILoginUserData, IUser, IUserState, IQuote, IUserLoginState };