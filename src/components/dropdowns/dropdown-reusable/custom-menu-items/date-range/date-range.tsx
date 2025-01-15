import { useState } from "react";
import { ReactComponent as Calendar } from "../../../../../icons/filters/calendar.svg";
import { CustomContent } from "../../types";
import { getFormatedDate } from "../../../../../utils/time-formater";
import { useFilters } from "../../../../table-filter/useFilters";

export const DateRangeContent: CustomContent = () => {
  const { applyDateRangeFilter } = useFilters();
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleInputChange}
      />
      <span> - </span>
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleInputChange}
      />
      <button
        onClick={() =>
          applyDateRangeFilter(formData.startDate, formData.endDate)
        }
      >
        <Calendar />
      </button>
    </div>
  );
};
