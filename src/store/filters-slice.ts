import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type FilterStateType = {
  callTypes: string;
};

const initialState: FilterStateType = {
  callTypes: "",
};

export const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setCallTypesFilter: (state, action: PayloadAction<string>) => {
      state.callTypes = action.payload;
    },
    setInitial: () => initialState,
  },
});

export const filterSliceReducer = filterSlice.reducer;
export const filterSliceActions = filterSlice.actions;
