import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IUser,
  IUserState,
  IChats,
} from "../../interface/user";
const initialState: IUserState = {
  user: undefined,
  isUserDataPending: false,
  chats: undefined,
  customerId: undefined,
};
export const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<IUser | undefined>) => {
      state.user = payload;
    },
    setChats: (state, { payload }: PayloadAction<Array<IChats>>) => {
      state.chats = payload;
    },
    setAllData: (state, { payload }: PayloadAction<IUserState>) => {
      state.user = payload.user;
      state.chats = payload.chats;
    },
    setIsUserDataPending: (state, { payload }: PayloadAction<boolean>) => {
      state.isUserDataPending = payload;
    },
    setCustomerId: (state, { payload }: PayloadAction<string>) => {
      state.customerId = payload;
    },
  },
});

export const {
  setUserData,
  setChats,
  setAllData,
  setIsUserDataPending,
  setCustomerId,
} = userSlicer.actions;

export default userSlicer.reducer;
