import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CallListSearchParams } from "../../types/api-types";

export type FilterStateType = {
  isDefaultSort: boolean;
  filters: CallListSearchParams;
};

const initialState: FilterStateType = {
  isDefaultSort: true,
  filters: {
    in_out: "",
    sort_by: "date",
    order: "DESC",
    date_start: "",
    date_end: "",
  },
};

export const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<CallListSearchParams>) => {
      state.filters = action.payload;
      state.isDefaultSort =
        JSON.stringify(state.filters) === JSON.stringify(initialState.filters);
    },
    setDefaultSort: () => initialState,
  },
});

export const filterSliceReducer = filterSlice.reducer;
export const filterSliceActions = filterSlice.actions;
