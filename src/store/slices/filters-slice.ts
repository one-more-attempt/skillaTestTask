import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CallListSearchParams } from "../../api/api-url";

export type FilterStateType = {
  isDefaultSort: boolean;
  filters: CallListSearchParams;
};

const initialState: FilterStateType = {
  isDefaultSort: true,
  filters: {
    in_out: undefined,
    sort_by: undefined,
    order: undefined,
  },
};

export const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<CallListSearchParams>) => {
      state.filters = action.payload;
    },
    setDefaultSort: () => initialState,
  },
});

export const filterSliceReducer = filterSlice.reducer;
export const filterSliceActions = filterSlice.actions;
