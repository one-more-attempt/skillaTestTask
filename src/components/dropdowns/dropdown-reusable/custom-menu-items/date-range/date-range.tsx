import { useRef, useState } from "react";
import { ReactComponent as Calendar } from "../../../../../icons/filters/calendar.svg";
import { CustomContent } from "../../types";
import { useFilters } from "../../../../table-filter/useFilters";
import styles from "./date-range.module.scss";
import { getFormatedDate } from "../../../../../utils/time-formater";

export const DateRangeContent: CustomContent = ({ onClick }) => {
  const { applyDateRangeFilter } = useFilters();
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });
  const defaultDate = "__.__.____";
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.dateWrapper}
        onClick={() => startDateRef.current?.showPicker()}
      >
        <input
          ref={startDateRef}
          className={styles.hiddenInput}
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
        />
        <span className={styles.displayDate}>
          {formData.startDate
            ? getFormatedDate.calendar(formData.startDate)
            : defaultDate}
        </span>
      </div>
      <span className={styles.divider}>-</span>
      <div
        className={styles.dateWrapper}
        onClick={() => endDateRef.current?.showPicker()}
      >
        <input
          ref={endDateRef}
          className={styles.hiddenInput}
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
        />
        <span className={styles.displayDate}>
          {formData.endDate
            ? getFormatedDate.calendar(formData.endDate)
            : defaultDate}
        </span>
      </div>

      <button
        className={styles.applyBtn}
        onClick={() => {
          onClick && onClick();
          applyDateRangeFilter(formData.startDate, formData.endDate);
        }}
      >
        <Calendar />
      </button>
    </div>
  );
};
