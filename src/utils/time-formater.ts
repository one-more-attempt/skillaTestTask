import moment from "moment";

export const timeFormat = {
  secondsToMinSec: (timeValue: number | string) =>
    moment
      .utc(moment.duration(timeValue, "seconds").asMilliseconds())
      .format("m:ss"),
};

export type SubtractByDateType = {
  type: "days" | "week" | "month" | "year";
  val?: number;
};
export const getFormatedDate = {
  currentDate: () => moment().format("YYYY-MM-DD"),
  format: (arg: string) => moment(arg).format("YYYY-MM-DD"),
  subtractByDateType: ({ type, val }: SubtractByDateType) =>
    moment()
      .subtract(val ?? 1, type)
      .format("YYYY-MM-DD"),
};
