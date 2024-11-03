import moment from "moment";
import {
  CallRatingValues,
  CallStatusValues,
  CallTypeValues,
} from "../../constants";
import { Call } from "../../types/api-types";
import { useMemo, useState } from "react";
import { useGetCallRecordMutation } from "../../api/endpoints";
import { timeFormat } from "../../utils/time-formater";

export const useCall = (callData: Call) => {
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
  const [isRowFocused, setIsRowFocused] = useState(false);
  const [
    getRecordTrigger,
    {
      data: recordDataLocalURL,
      reset: resetGetRecordMutationCache,
      isSuccess: isRecordDownloaded,
    },
  ] = useGetCallRecordMutation();
  const deleteRecordFromCache = () => {
    resetGetRecordMutationCache();
  };
  const focusRow = () => setIsRowFocused(true);
  const unfocusRow = () => setIsRowFocused(false);
  const downloadRecord = () => {
    if (record && partnership_id) {
      getRecordTrigger({ record, partnership_id });
    }
  };
  const callDuration =
    status === CallStatusValues.Success ? timeFormat.secondsToMinSec(time) : "";
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
  const isPlayerVisible = !!record && (isRowFocused || isRecordDownloaded);
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
    isPlayerVisible,
    downloadRecord,
    deleteRecordFromCache,
    focusRow,
    unfocusRow,
  };
};
