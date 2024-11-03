import { useEffect } from "react";
import { useGetCallsMutation } from "../../api/endpoints";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { filterSliceData } from "../../store/selector";

export const useCalls = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(filterSliceData);
  const [getCallsTrigger, { data: callsListData }] = useGetCallsMutation();
  useEffect(() => {
    getCallsTrigger(filters);
  }, []);
  return { callsListData };
};
