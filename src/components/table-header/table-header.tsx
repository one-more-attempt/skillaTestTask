import styles from "./table-header.module.scss";
import { ReactComponent as ArrowDown } from "../../icons/filters/arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../icons/filters/arrow-up.svg";
import { FC } from "react";
import { filterSliceData } from "../../store/selector";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";

type Props = {};

export const TableHeader: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { isDefaultSort } = useAppSelector(filterSliceData);

  return (
    <div className={styles.row}>
      <div className={styles.callType}>
        <span>Тип</span>
      </div>
      <div className={styles.time}>
        <span>Время</span>
        {!isDefaultSort && <ArrowDown />}
      </div>
      <div className={styles.employee}>Сотрудник</div>
      <span className={styles.call}>Звонок</span>
      <span className={styles.source}>Источник</span>
      <div className={styles.rating}>
        <span>Оценка</span>
      </div>
      <div className={styles.duration}>
        <span>Длительность</span>
        {!isDefaultSort && <ArrowDown />}
      </div>
    </div>
  );
};
