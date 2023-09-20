import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataVisualize, IVisualState } from "../../interface/user";
import { initalVisualData } from "../../components/common/InitialVisualData";
const initialState: IVisualState[] = [
  {
    expenses: initalVisualData,
    category: "general",
    budgetExp: undefined,
  },
];
export const visualSlicer = createSlice({
  name: "visual",
  initialState,
  reducers: {
    setVisuals: (state, { payload }: PayloadAction<Array<IDataVisualize>>) => {
      // state = payload;
      return payload;
    },
    setUserVisuals: (
      state,
      { payload }: PayloadAction<IDataVisualize | undefined>
    ) => {
      const category = payload?.category;
      const index = state.findIndex((item) => item.category === category);
      if (index !== -1 && payload) {
        // Return a new state array with the updated item
        return [...state.slice(0, index), payload, ...state.slice(index + 1)];
      }
      return state;
    },
    resetVisuals: (state) => {
      return [];
    },
  },
});

export const { setUserVisuals, setVisuals, resetVisuals } = visualSlicer.actions;

export default visualSlicer.reducer;
