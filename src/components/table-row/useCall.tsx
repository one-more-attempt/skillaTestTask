import { CallViewItem } from "../../types/api-types";
import { useState } from "react";
import { useGetCallRecordMutation } from "../../api/endpoints";

export const useCall = (callData: CallViewItem) => {
  const {
    record,
    partnership_id,
    callType,
    callNumber,
    callDuration,
    callTime,
    rating,
    source,
    avatar,
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
  const isPlayerVisible = !!record && (isRowFocused || isRecordDownloaded);
  return {
    callType,
    callNumber,
    callTime,
    callDuration,
    rating,
    source,
    avatar,
    recordDataLocalURL,
    isRecordDownloaded,
    isPlayerVisible,
    downloadRecord,
    deleteRecordFromCache,
    focusRow,
    unfocusRow,
  };
};
