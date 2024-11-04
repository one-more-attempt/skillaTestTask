import moment from "moment";
import { APIEndpointEnum } from "../constants";
import { CallListSearchParams, GetCallRecordParams } from "../types/api-types";

export const API_URL = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  getCalls: (params: CallListSearchParams) => {
    const {date_start, date_end, sort_by, limit} = params;
    // const searchParams = new URLSearchParams();
    // Object.entries(params).forEach(([key, value]) => {
    //   searchParams.append(key, value);
    // });
    return `${APIEndpointEnum.GetList}?date_start=${date_start}
&date_end=${date_end}&sort_by=${sort_by}&order=${params.order}&limit=${limit}`;
  },

  getCallRecord: (params: GetCallRecordParams): string => {
    const searchParams = `?${new URLSearchParams(params).toString()}`;
    return `${APIEndpointEnum.GetRecord}${searchParams}`;
  },
};
