import { DateRangeContent } from "./custom-menu-items/date-range/date-range";
import { Dropdown } from "./dropdown";
import styles from "./table-filter.module.scss";
import { FC } from "react";


const UsageInApp: FC = () => {
  const handleAllClick = () => {
    console.log("Выбрано: Все типы");
  };

  const handleIncomingClick = () => {
    console.log("Выбрано: Входящие");
  };

  const handleOutgoingClick = () => {
    console.log("Выбрано: Исходящие");
  };

  const handleDateRangeClick = () => {
    console.log("Дата диапазон установлен");
  };

  const menuItems = [
    { id: "all", label: "Все типы", onClick: handleAllClick },
    { id: "incoming", label: "Входящие", onClick: handleIncomingClick },
    {
      id: "outgoing",
      label: "Исходящие",
      onClick: handleOutgoingClick,
    },
    {
      id: "date-range",
      customContent: <DateRangeContent onClick={handleDateRangeClick} />,
    },
  ];

  return (
    <div className={styles.filterRow}>
      <Dropdown items={menuItems} defaultLabel="Выберите тип" />
    </div>
  );
};
