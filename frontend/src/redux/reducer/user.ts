import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState } from "../../interface/user";
const initialState: IUserState = {
  user: undefined,
  isUserDataPending: false,
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
    }
  },
});

export const {
    setUserData,
    setIsUserDataPending,
} = userSlicer.actions;

export default userSlicer.reducer;
