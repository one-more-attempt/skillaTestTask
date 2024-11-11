import moment from "moment";
import { CallDataView, CallListSearchParams, Calls, CallViewSeparator, GroupedCallsByDate, TableRowData } from "../../types/api-types";
import { skillaAPI } from "../api";
import { API_URL } from "../api-url";
import { CallRatingEnum, CallStatusEnum, CallsTypeParamsEnum, CallTypeEnum, DatesEnum, TableRowItemType } from "../../constants";
import { timeFormat } from "../../utils/time-formater";

export const getCalls = skillaAPI.injectEndpoints({
    endpoints: (builder) => ({
      getCalls: builder.mutation<TableRowData[], CallListSearchParams>({
        query: (params) => ({
          url: API_URL.getCalls(params),
          method: "POST",
        }),
        transformResponse: (response: Calls): TableRowData[] => {
          const groupedCallsByDate: GroupedCallsByDate = {};
          const today = moment().format("D MMMM");
          const yesterday = moment().subtract(1, "days").format("D MMMM");
  
          //grouping by each day
          response.results.forEach((call) => {
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
            const callDuration =
              call.status === CallStatusEnum.Success
                ? timeFormat.secondsToMinSec(call.time)
                : "";
            const callTime = moment(call.date).format("HH:mm");
            let callType: CallTypeEnum;
            if (call.in_out === CallsTypeParamsEnum.Incoming) {
              callType =
                call.status === CallStatusEnum.Success
                  ? CallTypeEnum.Incoming
                  : CallTypeEnum.Missed;
            } else {
              callType =
                call.status === CallStatusEnum.Success
                  ? CallTypeEnum.Outgoing
                  : CallTypeEnum.Failed;
            }
            const callNumber =
              call.in_out === CallsTypeParamsEnum.Incoming
                ? call.from_number
                : call.to_number;
            const possibleRatingTypes = Object.values(CallRatingEnum);
            const rating =
              possibleRatingTypes[
                Math.floor(Math.random() * possibleRatingTypes.length)
              ];
            if (!groupedCallsByDate[displayDate]) {
              groupedCallsByDate[displayDate] = { calls: [], count: 0 };
            }
            groupedCallsByDate[displayDate].calls.push({
              id: call.id,
              source: call.source,
              avatar: call.person_avatar,
              record: call.record,
              callDuration,
              callTime,
              callType,
              callNumber,
              rating,
              partnership_id: call.partnership_id,
            });
            groupedCallsByDate[displayDate].count += 1;
          });
  
          const transformedResult: TableRowData[] = Object.entries(
            groupedCallsByDate
          ).flatMap(([date, { count, calls }]) => [
            {
              type: TableRowItemType.Date,
              data: { date, count },
            } as CallViewSeparator,
            ...calls.map(
              (call) =>
                ({ type: TableRowItemType.Call, data: call } as CallDataView)
            ),
          ]);
  
          return transformedResult;
        },
      }),
    }),
  });
  