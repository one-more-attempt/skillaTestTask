import { FC } from "react";
import { TableFilter } from "../table-filter/table-filter";
import { TableHeader } from "../table-header/table-header";
import { CallRow } from "../table-row/table-row";
import styles from "./table.module.scss";
import { useCalls } from "./useCalls";
import { TableRowItemType } from "../../constants";
import { DateSeparator } from "../date-separator/date-separator";

export const Table: FC = () => {
  const { callsListData } = useCalls();

  return (
    <div className={styles.mainWrapper}>
      <TableFilter />
      <div className={styles.tableContent}>
        <TableHeader />
        {callsListData?.flatMap((item) =>
          item.type === TableRowItemType.Date ? (
            <DateSeparator data={item.data} />
          ) : (
            <CallRow data={item.data} />
          )
        )}
      </div>
    </div>
  );
};
