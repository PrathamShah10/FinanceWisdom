import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IUser,
  IUserState,
  IDataVisualize,
  IChats,
} from "../../interface/user";
const initialState: IUserState = {
  user: undefined,
  visuals: undefined,
  isUserDataPending: false,
  chats: undefined,
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
    setUserVisuals: (
      state,
      { payload }: PayloadAction<IDataVisualize | undefined>
    ) => {
      state.visuals = payload;
    },
    setAllData: (state, { payload }: PayloadAction<IUserState>) => {
      state.user = payload.user;
      state.visuals = payload.visuals;
      state.chats = payload.chats;
    },
    setIsUserDataPending: (state, { payload }: PayloadAction<boolean>) => {
      state.isUserDataPending = payload;
    },
  },
});

export const {
  setUserData,
  setChats,
  setUserVisuals,
  setAllData,
  setIsUserDataPending,
} = userSlicer.actions;

export default userSlicer.reducer;
