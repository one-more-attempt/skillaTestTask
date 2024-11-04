import moment from "moment";
import { DatesEnum, TableRowItemType } from "../constants";
import {
  CallData,
  CallListSearchParams,
  Calls,
  DateSeparator,
  GetCallRecordParams,
  GroupedCallsByDate,
  TableRowData,

} from "../types/api-types";
import { skillaAPI } from "./api";
import { API_URL } from "./api-url";

const getCalls = skillaAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCalls: builder.mutation<TableRowData[], CallListSearchParams>({
      query: (params) => ({
        url: API_URL.getCalls(params),
        method: "POST",
      }),
      transformResponse: (response: Calls): TableRowData[] => {
        //temporary result
        const groupedCallsByDate: GroupedCallsByDate = {};
        //special format for some dates (today/yesterday)
        const today = moment().format("D MMMM");
        const yesterday = moment().subtract(1, "days").format("D MMMM");

        response.results.forEach((call) => {
          //date format for other dates
          const callDate = moment(call.date_notime).format("D MMMM");
          let displayDate: string;
          switch (callDate) {
            case today:
              displayDate = DatesEnum.Today;
              break;
            case yesterday:
              displayDate = DatesEnum.Yesterday;
              break;
            default:
              displayDate = callDate;
          }
          //initialize new date object if still don't have it
          if (!groupedCallsByDate[displayDate]) {
            groupedCallsByDate[displayDate] = { calls: [], count: 0 };
          }
          //calls counter for each date
          groupedCallsByDate[displayDate].calls.push(call);
          groupedCallsByDate[displayDate].count += 1;
        });

        //final result for view
        const result: TableRowData[] = Object.entries(
          groupedCallsByDate
        ).flatMap(([date, { count, calls }]) => [
          {
            type: TableRowItemType.Date,
            data: { date, count },
          } as DateSeparator,
          ...calls.map(
            (call) => ({ type: TableRowItemType.Call, data: call } as CallData)
          ),
        ]);
        return result;
      },
    }),
  }),
});

const getCallRecord = skillaAPI.injectEndpoints({
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

export const { useGetCallsMutation } = getCalls;
export const { useGetCallRecordMutation } = getCallRecord;
