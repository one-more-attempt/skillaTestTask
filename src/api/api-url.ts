import { API_URL } from "../constants";
import { GetCallRecordParams } from "../types/api-types";

export type CallListSearchParams = {
  in_out?: "0" | "1";
  sort_by?: "date" | "duration";
  order?: "ASC" | "DESC";
};

export const API = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  getCalls: (params: CallListSearchParams | void) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        value ?? searchParams.append(key, value);
      });
    }
    const queryString = searchParams.toString()
      ? `?${searchParams.toString()}`
      : "";
    return `${API_URL.GetList}${queryString}`;
  },
  getCallRecord: (params: GetCallRecordParams): string => {
    const searchParams = `?${new URLSearchParams(params).toString()}`;
    return `${API_URL.GetList}${searchParams}`;
  },
};
