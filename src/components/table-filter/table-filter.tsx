import { CallsTypeParamsEnum, CallTypeEnum } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { filterSliceData } from "../../store/selector";
import { filterSliceActions } from "../../store/slices/filters-slice";
import { DateRangeContent } from "../dropdowns/dropdown-reusable/custom-menu-items/date-range/date-range";
import { Dropdown } from "../dropdowns/dropdown-reusable/dropdown";
import { TypeDropdown } from "../dropdowns/type-dropdown/type-dropdown";
import { FilterReseter } from "../filters-reseter/filter-reseter";
import styles from "./table-filter.module.scss";
import { FC } from "react";

export const TableFilter: FC = () => {
  const dispatch = useAppDispatch();
  const { isDefaultSort, filters } = useAppSelector(filterSliceData);

  const selectAllCallTypes = () =>
    dispatch(filterSliceActions.setFilter({ ...filters, in_out: undefined }));
  const handleResetFilters = () =>
    dispatch(filterSliceActions.setDefaultSort());

  const selectIncomingCallTypes = () => {
    dispatch(
      filterSliceActions.setFilter({
        ...filters,
        in_out: CallsTypeParamsEnum.Incoming,
      })
    );
  };
  const selectOutgoingCallTypes = () => {
    dispatch(
      filterSliceActions.setFilter({
        ...filters,
        in_out: CallsTypeParamsEnum.Outgoing,
      })
    );
  };

  const menuItems = [
    { id: 0, label: "Все типы", onClick: selectAllCallTypes },
    { id: 1, label: "Входящие", onClick: selectIncomingCallTypes },
    {
      id: 2,
      label: "Исходящие",
      onClick: selectOutgoingCallTypes,
    },
  ];

  return (
    <div className={styles.filterRow}>
      <Dropdown items={menuItems} />
      {!isDefaultSort && <FilterReseter onClick={handleResetFilters} />}
    </div>
  );
};
