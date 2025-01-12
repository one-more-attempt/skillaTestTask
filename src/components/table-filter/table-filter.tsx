import moment from "moment";
import { CallsTypeParamsEnum } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { filterSliceData } from "../../store/selector";
import { filterSliceActions } from "../../store/slices/filters-slice";
import { DateRangeContent } from "../dropdowns/dropdown-reusable/custom-menu-items/date-range/date-range";
import { Dropdown } from "../dropdowns/dropdown-reusable/dropdown";
import { FilterReseter } from "../filters-reseter/filter-reseter";
import styles from "./table-filter.module.scss";
import { FC } from "react";
import { FormatByDateType, getFormatedDate } from "../../utils/time-formater";

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

  const callTypeFilterItems = [
    { id: 0, label: "Все типы", onClick: selectAllCallTypes },
    { id: 1, label: "Входящие", onClick: selectIncomingCallTypes },
    {
      id: 2,
      label: "Исходящие",
      onClick: selectOutgoingCallTypes,
    },
  ];

  ////////////////////////////////////////////////////////////////////////////////
  const applyDateFilter = ({ type, val }: FormatByDateType) => {
    dispatch(
      filterSliceActions.setFilter({
        ...filters,
        date_start: getFormatedDate.byDateType({ type, val }),
        date_end: getFormatedDate.currentDate(),
      })
    );
  };

  const dateFilterMenuItems = [
    {
      id: 0,
      label: "3 дня",
      onClick: () => applyDateFilter({ type: "days", val: 3 }),
    },
    {
      id: 1,
      label: "Неделя",
      onClick: () => applyDateFilter({ type: "week" }),
    },
    {
      id: 2,
      label: "Месяц",
      onClick: () => applyDateFilter({ type: "month" }),
    },
    {
      id: 3,
      label: "Год",
      onClick: () => applyDateFilter({ type: "year" }),
    },
    {
      id: 4,
      label: "Указать диапазон",
      onClick: () => {
        console.log("работает но нет доступа в компонент DateRangeContent");
      },
      customContent: <DateRangeContent />,
    },
  ];

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
