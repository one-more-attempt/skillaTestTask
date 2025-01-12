import styles from "./table-header.module.scss";
import { ReactComponent as ArrowDown } from "../../icons/filters/arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../icons/filters/arrow-up.svg";
import { FC } from "react";
import { filterSliceData } from "../../store/selector";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import classNames from "classnames";
import { CallsOrderParamsEnum, CallsSortParamsEnum } from "../../constants";
import { filterSliceActions } from "../../store/slices/filters-slice";

type Props = {};

export const TableHeader: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const {
    isDefaultSort,
    filters,
    filters: { sort_by, order },
  } = useAppSelector(filterSliceData);

  const setSortByDate = () => {
    dispatch(
      filterSliceActions.setFilter({
        ...filters,
        sort_by: CallsSortParamsEnum.Date,
        order:
          order === CallsOrderParamsEnum.DESC
            ? CallsOrderParamsEnum.ASC
            : CallsOrderParamsEnum.DESC,
      })
    );
  };
  const setSortByDuration = () => {
    dispatch(
      filterSliceActions.setFilter({
        ...filters,
        sort_by: CallsSortParamsEnum.Duration,
        order:
          order === CallsOrderParamsEnum.DESC
            ? CallsOrderParamsEnum.ASC
            : CallsOrderParamsEnum.DESC,
      })
    );
  };
  return (
    <div className={styles.row}>
      <div className={styles.callType}>
        <span>Тип</span>
      </div>
      <div
        onClick={setSortByDate}
        className={classNames(styles.time, {
          [styles.active]: sort_by === CallsSortParamsEnum.Date,
        })}
      >
        <span>Время</span>
        {sort_by === CallsSortParamsEnum.Date &&
        order === CallsOrderParamsEnum.DESC ? (
          <ArrowDown />
        ) : (
          <ArrowUp />
        )}
      </div>
      <div className={styles.employee}>Сотрудник</div>
      <span className={styles.call}>Звонок</span>
      <span className={styles.source}>Источник</span>
      <div className={styles.rating}>
        <span>Оценка</span>
      </div>
      <div
        onClick={setSortByDuration}
        className={classNames(styles.duration, {
          [styles.active]: sort_by === CallsSortParamsEnum.Duration,
        })}
      >
        <span>Длительность</span>

        <ArrowUp />
      </div>
    </div>
  );
};
