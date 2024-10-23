import moment from "moment";
import {
  CallRatingValues,
  CallStatusValues,
  CallTypeValues,
} from "../../constants";
import { Call } from "../../types/api-types";

export const useNormalizeCallData = (callData: Call) => {
  const {
    time,
    date,
    in_out,
    status,
    from_number,
    to_number,
    person_avatar: avatar,
    source,
  } = callData;
  const callDuration =
    status === CallStatusValues.Success
      ? moment
          .utc(moment.duration(time, "seconds").asMilliseconds())
          .format("m:ss")
      : "";
  const callTime = moment(date).format("HH:mm");
  let callType: CallTypeValues;
  if (in_out === 1) {
    //incoming call
    status === CallStatusValues.Success
      ? (callType = CallTypeValues.Incoming)
      : (callType = CallTypeValues.Missed);
  } else {
    //outgoing call
    status === CallStatusValues.Success
      ? (callType = CallTypeValues.Outgoing)
      : (callType = CallTypeValues.Failed);
  }
  //incoming or outgoing number
  const callNumber = in_out === 1 ? from_number : to_number;
  //has no rating value in the API, so it is randomly generated to match the design of the Figma layout
  const posibleRatingTypes = Object.values(CallRatingValues);
  const rating =
    posibleRatingTypes[Math.floor(Math.random() * posibleRatingTypes.length)];
  return {
    callType,
    callNumber,
    callTime,
    callDuration,
    rating,
    source,
    avatar,
  };
};
