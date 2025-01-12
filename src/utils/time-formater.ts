import moment from "moment";


export const timeFormat = {
  secondsToMinSec: (timeValue: number | string) =>
    moment
      .utc(moment.duration(timeValue, "seconds").asMilliseconds())
      .format("m:ss"),
};

export type FormatByDateType = {
  type: "days" | "week" | "month" | "year";
  val?: number;
};
export const getFormatedDate = {
  currentDate: () => moment().format("YYYY-MM-DD"),
  byDateType: ({ type, val }: FormatByDateType) => 
    moment().subtract(val ?? 1, type).format("YYYY-MM-DD"),
};
