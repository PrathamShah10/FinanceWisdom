import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState, IQuote } from "../../interface/user";
const initialState: IUserState = {
  user: undefined,
  isUserDataPending: false,
  isUserQuotePending: false,
};
export const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<IUser>) => {
        state.user = payload;
    },
    setIsUserDataPending: (state, {payload}: PayloadAction<boolean>) => {
        state.isUserDataPending = payload;
    },
    setQuoteData: (state, {payload}: PayloadAction<IQuote>) => {
      state.user = {
        ...state.user,
        quote: [
          ...(state.user?.quote || []),
          payload,
        ],
      }
    },
    setIsUserQuotePending: (state, {payload}: PayloadAction<boolean>) => {
      state.isUserQuotePending = payload;
    },
  },
});

export const {
    setUserData,
    setIsUserDataPending,
    setQuoteData,
    setIsUserQuotePending,
} = userSlicer.actions;

export default userSlicer.reducer;
