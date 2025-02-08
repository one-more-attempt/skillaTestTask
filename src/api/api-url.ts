import { APIEndpointEnum } from "../constants";
import { CallListSearchParams, GetCallRecordParams } from "../types/api-types";

export const API_URL = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  getCalls: (params: CallListSearchParams) => {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      const value = (params as Record<string, string | number>)[key];
      if (value !== undefined) {
        searchParams.append(key, `${value}`);
      }
    }
    return `${APIEndpointEnum.GetList}?${searchParams.toString()}`;
  },
  getCallRecord: (params: GetCallRecordParams): string => {
    const searchParams = `?${new URLSearchParams(params).toString()}`;
    return `${APIEndpointEnum.GetRecord}${searchParams}`;
  },
};
