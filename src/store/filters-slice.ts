import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type FilterStateType = {
  isDefaultSort: boolean;
};

const initialState: FilterStateType = {
  isDefaultSort: true,
};

export const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setisDefault: (state, action: PayloadAction<boolean>) => {
      state.isDefaultSort = action.payload;
    },
    setInitial: () => initialState,
  },
});

export const filterSliceReducer = filterSlice.reducer;
export const filterSliceActions = filterSlice.actions;
