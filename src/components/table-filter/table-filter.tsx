import { Dropdown } from "../dropdowns/dropdown-reusable/dropdown";
import { FilterReseter } from "../filters-reseter/filter-reseter";
import styles from "./table-filter.module.scss";
import { FC } from "react";
import { useFilters } from "./useFilters";

export const TableFilter: FC = () => {
  const {
    callTypeFilterItems,
    dateFilterMenuItems,
    isDefaultSort,
    handleResetFilters,
  } = useFilters();

  return (
    <div className={styles.filterRow}>
      <div className={styles.callTypes}>
        <Dropdown items={callTypeFilterItems} />
        {!isDefaultSort && <FilterReseter onClick={handleResetFilters} />}
      </div>
      <Dropdown items={dateFilterMenuItems} alignRight />
    </div>
  );
};
