import { FC } from "react";
import { TableFilter } from "../table-filter/table-filter";
import { TableHeader } from "../table-header/table-header";
import { TableRow } from "../table-row/table-row";
import styles from "./table.module.scss";
import { useCalls } from "./useCalls";

export const Table: FC = () => {
  const { callsListData } = useCalls();

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
