import { Calls, GetCallRecordParams } from "../types/api-types";
import { skillaAPI } from "./api";
import { API, CallListSearchParams } from "./api-url";

const getCalls = skillaAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCalls: builder.mutation<Calls, CallListSearchParams | void>({
      query: (params) => ({
        url: API.getCalls(params),
        method: "POST",
      }),
    }),
  }),
});

const getCallRecord = skillaAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCallRecord: builder.mutation<string, GetCallRecordParams>({
      query: (params) => ({
        url: API.getCallRecord(params),
        method: "POST",
        responseHandler: async (response) => {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          return url;
        },
      }),
    }),
  }),
});

export const { useGetCallsMutation } = getCalls;
export const { useGetCallRecordMutation } = getCallRecord;
