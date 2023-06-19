import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState, IQuote } from "../../interface/user";
import produce from "immer";
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
    setIsUserDataPending: (state, { payload }: PayloadAction<boolean>) => {
      state.isUserDataPending = payload;
    },
    setQuoteData: (state, { payload }: PayloadAction<IQuote>) => {
      state.user = produce(state.user, (draftState: IUser) => {
        draftState?.quote?.push(payload);
      });
    },
    setIsUserQuotePending: (state, { payload }: PayloadAction<boolean>) => {
      state.isUserQuotePending = payload;
    },
    setQuotesData: (state, { payload }: PayloadAction<Array<IQuote>>) => {
      state.user = {
        ...state.user,
        quote: payload,
      };
    },
  },
});

export const {
  setUserData,
  setIsUserDataPending,
  setQuoteData,
  setIsUserQuotePending,
  setQuotesData,
} = userSlicer.actions;

export default userSlicer.reducer;
