import { API_URL } from "../constants";
import { CallListSearchParams, GetCallRecordParams } from "../types/api-types";

export const API = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  getCalls: (params: CallListSearchParams) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value);
    });
    // console.log("searchParams", searchParams.toString());

    return `${API_URL.GetList}?date_start=2024-11-01
&date_end=2024-11-04&sort_by=date&order=DESC&limit=200`;
  },

  getCallRecord: (params: GetCallRecordParams): string => {
    const searchParams = `?${new URLSearchParams(params).toString()}`;
    return `${API_URL.GetRecord}${searchParams}`;
  },
};
