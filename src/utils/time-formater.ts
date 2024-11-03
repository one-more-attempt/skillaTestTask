import moment from "moment";

export const timeFormat = {
  secondsToMinSec: (timeValue: number | string) =>
    moment
      .utc(moment.duration(timeValue, "seconds").asMilliseconds())
      .format("m:ss"),
};
