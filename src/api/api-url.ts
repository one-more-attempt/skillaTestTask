import { GetCallRecordParams } from "../types/api-types";

export const API = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  getCalls: "getList",
  getCallRecord: ({ record, partnership_id }: GetCallRecordParams): string =>
    `getRecord?record=${record}&partnership_id=${partnership_id}`,
};
