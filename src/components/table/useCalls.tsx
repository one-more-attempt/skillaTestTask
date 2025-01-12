import { useEffect } from "react";
import { useGetCallsMutation } from "../../api/endpoints";
import { useAppSelector } from "../../store/redux-hooks";
import { filterSliceData } from "../../store/selector";

export const useCalls = () => {
  const { filters } = useAppSelector(filterSliceData);
  const [getCallsTrigger, { data: callsListData }] = useGetCallsMutation();
  useEffect(() => {
    getCallsTrigger(filters);
  }, []);

  useEffect(() => {
    getCallsTrigger(filters);
  }, [filters]);


  return { callsListData };
};
