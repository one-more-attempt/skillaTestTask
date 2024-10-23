import styles from "./table-filter.module.scss";
import dropdownIcon from "../../icons/filter/dropdown.svg";
import arrowLeft from "../../icons/filter/arrow-left.svg";
import arrowRight from "../../icons/filter/arrow-right.svg";
import calendar from "../../icons/filter/calendar.svg";

export const TableFilter = () => (
  <div className={styles.filterRow}>
    <div className={styles.typeFilterContainer}>
      <span>Все типы</span>
      <img src={dropdownIcon} alt="dropdown-icon" />
    </div>
    <div className={styles.dateFilterContainer}>
      <img src={arrowLeft} alt="dropdown-icon" />
      <div className={styles.calendar}>
        <img src={calendar} alt="calendar-icon" />
        <span> Дата</span>
      </div>
      <img src={arrowRight} alt="dropdown-icon" />
    </div>
  </div>
);
