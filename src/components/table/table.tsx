import { FC, useEffect } from "react";
import {
  useGetCallRecordMutation,
  useGetCallsMutation,
} from "../../api/endpoints";
import { TableFilter } from "../table-filter/table-filter";
import { TableHeader } from "../table-header/table-header";
import { TableRow } from "../table-row/table-row";
import styles from "./table.module.scss";

export const Table: FC = () => {
  const [getCallsTrigger, { data: callsListData }] = useGetCallsMutation();
  useEffect(() => {
    getCallsTrigger();
  }, []);
  console.log(callsListData);

  useEffect(() => {}, []);
  return (
    <div className={styles.mainWrapper}>
      <TableFilter />
      <div className={styles.tableContent}>
        <TableHeader />
        {callsListData?.results.map((item) => (
          <TableRow callData={item} />
        ))}
      </div>
    </div>
  );
};
