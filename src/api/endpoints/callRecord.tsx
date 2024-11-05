import { GetCallRecordParams } from "../../types/api-types";
import { skillaAPI } from "../api";
import { API_URL } from "../api-url";

export const getCallRecord = skillaAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCallRecord: builder.mutation<string, GetCallRecordParams>({
      query: (params) => ({
        url: API_URL.getCallRecord(params),
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
