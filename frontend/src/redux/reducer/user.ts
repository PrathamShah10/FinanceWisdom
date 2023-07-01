import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState, IDataVisualize } from "../../interface/user";
const initialState: IUserState = {
  user: undefined,
  visuals: undefined,
  isUserDataPending: false,
};
export const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<IUser | undefined>) => {
      state.user = payload;
    },
    setUserVisuals: (state, { payload }: PayloadAction<IDataVisualize | undefined>) => {
      state.visuals = payload;
    },
    setIsUserDataPending: (state, { payload }: PayloadAction<boolean>) => {
      state.isUserDataPending = payload;
    },
  },
});

export const {
  setUserData,
  setUserVisuals,
  setIsUserDataPending,
} = userSlicer.actions;

export default userSlicer.reducer;
