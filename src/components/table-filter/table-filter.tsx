import { TypeDropdown } from "../dropdowns/type-dropdown/type-dropdown";
import { FilterReseter } from "../filters-reseter/filter-reseter";
import styles from "./table-filter.module.scss";
import { FC } from "react";

export const TableFilter: FC = () => {
  const handleAllClick = () => console.log("Выбрано: Все типыs");
  const handleIncomingClick = () => console.log("Выбрано: Входящие");
  const handleOutgoingClick = () => console.log("Выбрано: Исходящие");

  const menuItems = [
    { id: "all", label: "Все типы", onClick: handleAllClick },
    { id: "incoming", label: "Входящие", onClick: handleIncomingClick },
    { id: "outgoing", label: "Исходящие", onClick: handleOutgoingClick },
  ];

  return (
    <div className={styles.filterRow}>
      <TypeDropdown items={menuItems} />
      <FilterReseter onClick={() => {}} />
    </div>
  );
};
