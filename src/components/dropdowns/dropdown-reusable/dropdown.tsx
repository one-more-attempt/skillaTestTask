import { cloneElement, FC, useState } from "react";
import styles from ".//dropdown.module.scss";
import classNames from "classnames";
import { MenuItem } from "./types";
import { ReactComponent as ArrowUp } from "../../../icons/filters/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../../icons/filters/arrow-down.svg";

export type DropdownProps = {
  items: MenuItem[];
};

export const Dropdown: FC<DropdownProps> = ({ items }) => {
  const defaultLabel = items[0].id;
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState(defaultLabel);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const renderMenuItemView = (item: MenuItem) => {
    const handleClick = () => {
      item.onClick?.();
      setActiveItemId(item.id);
    };

    const menuContent = item.customContent ? (
      cloneElement(item.customContent, {
        onClick: handleClick,
      })
    ) : (
      <span>{item.label}</span>
    );

    return (
      <div
        key={item.id}
        onClick={!item.customContent ? handleClick : undefined}
        className={classNames(styles.dropdownItem, {
          [styles.dropdownItemActive]: activeItemId === item.id,
        })}
      >
        {menuContent}
      </div>
    );
  };

  return (
    <div className={styles.dropdownContainer}>
      <button onClick={toggleDropdown} className={styles.dropdownTitle}>
        <span>
          {items.find((item) => item.id === activeItemId)?.label ||
            defaultLabel}
        </span>
        {isOpen ? (
          <ArrowUp className={classNames(styles.arrowIcon, styles.active)} />
        ) : (
          <ArrowDown className={styles.arrowIcon} />
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {items.map((item) => renderMenuItemView(item))}
        </div>
      )}
    </div>
  );
};
