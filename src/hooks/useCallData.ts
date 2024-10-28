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
    partnership_id,
  } = callData;
  const [
    getRecordTrigger,
    {
      data: recordDataLocalURL,
      reset: resetGetRecordMutationCache,
      isSuccess: isRecordDownloaded,
    },
  ] = useGetCallRecordMutation();
  // const [isRecordDownloaded, setIsRecordDownloaded] = useState(false);

  const deleteRecordFromCache = () => {
    resetGetRecordMutationCache();
    //clear data from storage
    // setIsRecordDownloaded(false);
  };
  const downloadRecord = () => {
    if (record && partnership_id) {
      getRecordTrigger({ record, partnership_id });
    }
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
    recordDataLocalURL,
    isRecordDownloaded,
    downloadRecord,
    deleteRecordFromCache,
  };
};
