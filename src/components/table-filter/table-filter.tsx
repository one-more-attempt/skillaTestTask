import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { filterSliceData } from "../../store/selector";
import { filterSliceActions } from "../../store/slices/filters-slice";
import { TypeDropdown } from "../dropdowns/type-dropdown/type-dropdown";
import { FilterReseter } from "../filters-reseter/filter-reseter";
import styles from "./table-filter.module.scss";
import { FC } from "react";

export const TableFilter: FC = () => {
  const dispatch = useAppDispatch();
  const { isDefaultSort } = useAppSelector(filterSliceData);

  const handleAllClick = () => {};
  // dispatch(filterSliceActions.setFilter({ in_out: "" }));
  const handleIncomingClick = () => {
    // dispatch(filterSliceActions.setFilter({ in_out: "1" }));
  };
  const handleOutgoingClick = () => {
    // dispatch(filterSliceActions.setFilter({ in_out: "0" }));
  };
  const handleResetFilters = () => {};
  // dispatch(filterSliceActions.setDefaultSort());

  const menuItems = [
    { id: "all", label: "Все типы", onClick: handleAllClick },
    { id: "incoming", label: "Входящие", onClick: handleIncomingClick },
    { id: "outgoing", label: "Исходящие", onClick: handleOutgoingClick },
  ];

  return (
    <div className={styles.filterRow}>
      <TypeDropdown items={menuItems} />
      {!isDefaultSort && <FilterReseter onClick={handleResetFilters} />}
    </div>
  );
};
