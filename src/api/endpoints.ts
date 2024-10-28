import { Calls, GetCallRecordParams } from "../types/api-types";
import { skillaAPI } from "./api";
import { API } from "./api-url";

const getCalls = skillaAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCalls: builder.mutation<Calls, void>({
      query: () => ({
        url: API.getCalls,
        method: "POST",
      }),
    }),
  }),
});

export const getCallRecord = skillaAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCallRecord: builder.mutation<string, GetCallRecordParams>({
      query: (getCallRecordParams) => ({
        url: API.getCallRecord(getCallRecordParams),
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
