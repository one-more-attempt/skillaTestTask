import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CallListSearchParams } from "../../types/api-types";
import moment from "moment";
import { CallsOrderParamsEnum, CallsSortParamsEnum } from "../../constants";

export type FilterStateType = {
  isDefaultSort: boolean;
  filters: CallListSearchParams;
};

const currentDate = moment().format("YYYY-MM-DD");
const threeDaysEarlierDate = moment().subtract(3, "days").format("YYYY-MM-DD");
const initialState: FilterStateType = {
  isDefaultSort: true,
  filters: {
    in_out: undefined,
    sort_by: CallsSortParamsEnum.Date,
    order: CallsOrderParamsEnum.DESC,
    date_start: threeDaysEarlierDate,
    date_end: currentDate,
    limit: "200",
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
