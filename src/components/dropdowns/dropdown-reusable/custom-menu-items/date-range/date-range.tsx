import { ReactComponent as Calendar } from "../../../../icons/dropdowns/calendar.svg";
import { CustomContent } from "../../types";

export const DateRangeContent: CustomContent = ({ onClick }) => (
  <div>
    <input type="date" />
    <span> - </span>
    <input type="date" />
    <button onClick={onClick}>
      <Calendar />
    </button>
  </div>
);
