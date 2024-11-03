import moment from "moment";
import { Dates } from "../constants";
import {
  CallListSearchParams,
  Calls,
  GetCallRecordParams,
  GroupedCall,
} from "../types/api-types";
import { skillaAPI } from "./api";
import { API } from "./api-url";

const getCalls = skillaAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCalls: builder.mutation<GroupedCall[], CallListSearchParams>({
      query: (params) => ({
        url: API.getCalls(params),
        method: "POST",
      }),
      transformResponse: (response: Calls): GroupedCall[] => {
        const grouped: { [date: string]: GroupedCall } = {};
        const localeToday = moment().format("D MMMM YYYY");
        const localeYesterday = moment()
          .subtract(1, "days")
          .format("D MMMM YYYY");

        response.results.forEach((call) => {
          const callDate = moment(call.date_notime).format("D MMMM YYYY");
          let displayDate: string;

          switch (callDate) {
            case localeToday:
              displayDate = Dates.Today;
              break;
            case localeYesterday:
              displayDate = Dates.Yesterday;
              break;
            default:
              displayDate = callDate;
          }

          // initialize new date
          if (!grouped[displayDate]) {
            grouped[displayDate] = { date: displayDate, calls: [], count: 0 };
          }

          // calls counter
          grouped[displayDate].calls.push(call);
          grouped[displayDate].count += 1;
        });

        // transform to array
        return Object.values(grouped);
      },
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
