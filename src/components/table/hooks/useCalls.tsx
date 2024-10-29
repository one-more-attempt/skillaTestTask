import { useEffect } from "react";
import { useGetCallsMutation } from "../../../api/endpoints";

export const useCalls = () => {
  const [getCallsTrigger, { data: callsListData }] = useGetCallsMutation();
  useEffect(() => {
    getCallsTrigger();
  }, []);
  return { callsListData };
};
