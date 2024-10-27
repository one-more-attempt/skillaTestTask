import moment from "moment";
import {
  CallRatingValues,
  CallStatusValues,
  CallTypeValues,
} from "../constants";
import { Call } from "../types/api-types";
import { useMemo, useState } from "react";
import { useGetCallRecordMutation } from "../api/endpoints";

export const useCallData = (callData: Call) => {
  const {
    time,
    date,
    in_out,
    status,
    from_number,
    to_number,
    person_avatar: avatar,
    source,
    record,
  } = callData;
  const [getCallRecordTrigger, { data: callRecordData }] =
    useGetCallRecordMutation();
  const [isDownloaded, setisDownloaded] = useState(false);

  const deleteRecordFromCache = () => {
    // setisDownloaded(false);
    //clear data from storage
  };
  const downloadCallRecord = () => {
    //if successfully downloaded
    getCallRecordTrigger().then((res) => setisDownloaded(true));
  };
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
  const rating = useMemo(
    () =>
      posibleRatingTypes[Math.floor(Math.random() * posibleRatingTypes.length)],
    []
  );

  return {
    callType,
    callNumber,
    callTime,
    callDuration,
    rating,
    source,
    avatar,
    record,
    callRecordData,
    downloadCallRecord,
    isDownloaded,
    setisDownloaded,
    deleteRecordFromCache
  };
};
