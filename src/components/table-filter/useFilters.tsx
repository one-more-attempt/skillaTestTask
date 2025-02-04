import { CallsTypeParamsEnum } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { filterSliceData } from "../../store/selector";
import { filterSliceActions } from "../../store/slices/filters-slice";
import { getFormatedDate, SubtractByDateType } from "../../utils/time-formater";
import { DateRangeContent } from "../dropdowns/dropdown-reusable/custom-menu-items/date-range/date-range";
import { ReactComponent as Calendar } from "../../icons/filters/calendar.svg";
import { MenuItem } from "../dropdowns/dropdown-reusable/types";

export const useFilters = () => {
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

  const applyDateFilter = ({ type, val }: SubtractByDateType) => {
    dispatch(
      filterSliceActions.setFilter({
        ...filters,
        date_start: getFormatedDate.subtractByDateType({ type, val }),
        date_end: getFormatedDate.currentDate(),
      })
    );
  };

  const applyDateRangeFilter = (startDate: string, endDate: string) => {
    dispatch(
      filterSliceActions.setFilter({
        ...filters,
        date_start: startDate,
        date_end: endDate,
      })
    );
  };
  const dateFilterMenuItems: MenuItem[] = [
    {
      id: 0,
      label: "3 дня",
      icon: <Calendar />,
      onClick: () => applyDateFilter({ type: "days", val: 3 }),
    },
    {
      id: 1,
      label: "Неделя",
      icon: <Calendar />,
      onClick: () => applyDateFilter({ type: "week" }),
    },
    {
      id: 2,
      label: "Месяц",
      icon: <Calendar />,
      onClick: () => applyDateFilter({ type: "month" }),
    },
    {
      id: 3,
      label: "Год",
      icon: <Calendar />,
      onClick: () => applyDateFilter({ type: "year" }),
    },
    {
      id: 4,
      label: "Диапазон",
      icon: <Calendar />,
      customContent: <DateRangeContent />,
    },
  ];

  const callTypeFilterItems = [
    { id: 0, label: "Все типы", onClick: selectAllCallTypes },
    { id: 1, label: "Входящие", onClick: selectIncomingCallTypes },
    {
      id: 2,
      label: "Исходящие",
      onClick: selectOutgoingCallTypes,
    },
  ];

  return {
    callTypeFilterItems,
    dateFilterMenuItems,
    isDefaultSort,
    handleResetFilters,
    applyDateRangeFilter,
  };
};
