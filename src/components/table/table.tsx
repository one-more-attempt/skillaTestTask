import { FC } from "react";
import { TableFilter } from "../table-filter/table-filter";
import { TableHeader } from "../table-header/table-header";
import { TableRow } from "../table-row/table-row";
import styles from "./table.module.scss";
import { useCalls } from "./useCalls";

export const Table: FC = () => {
  const { callsListData } = useCalls();
  console.log(callsListData);

  return (
    <div className={styles.mainWrapper}>
      <TableFilter />
      <div className={styles.tableContent}>
        <TableHeader />
        {callsListData?.flatMap(({ date, calls, count }) => [
          <div className={styles.dateSeparator} key={date}>
            <span>{date}</span>
            <sup className={styles.counter}>{count}</sup>
          </div>,
          ...calls.map((call) => <TableRow callData={call} />),
        ])}
      </div>
    </div>
  );
};
