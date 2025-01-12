import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CallListSearchParams } from "../../types/api-types";
import { CallsOrderParamsEnum, CallsSortParamsEnum } from "../../constants";
import moment from "moment";
import { getFormatedDate } from "../../utils/time-formater";

export type FilterStateType = {
  isDefaultSort: boolean;
  filters: CallListSearchParams;
};

const initialState: FilterStateType = {
  isDefaultSort: true,
  filters: {
    in_out: undefined,
    sort_by: CallsSortParamsEnum.Date,
    order: CallsOrderParamsEnum.DESC,
    date_start: getFormatedDate.byDateType({ type: "days", val: 2 }),
    date_end: getFormatedDate.currentDate(),
    limit: "100",
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
