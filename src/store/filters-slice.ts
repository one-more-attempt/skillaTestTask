import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type FilterStateType = {
  recordLocalURL: string;
};

const initialState: FilterStateType = {
  recordLocalURL: "",
};

export const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setRecordURL: (state, action: PayloadAction<string>) => {
      state.recordLocalURL = action.payload;
    },
    clearRecordLocalURL: () => initialState,
  },
});

export const filterSliceReducer = filterSlice.reducer;
export const filterSliceActions = filterSlice.actions;
