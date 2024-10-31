import { cloneElement, FC, useState } from "react";
import styles from ".//dropdown.module.scss";
import classNames from "classnames";
import { MenuItem } from "./types";
import { ReactComponent as ArrowUp } from "../../icons/dropdown/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../icons/dropdown/arrow-down.svg";

export type DropdownProps = {
  items: MenuItem[];
  defaultLabel: string;
};
export const  Dropdown: FC<DropdownProps> = ({ items, defaultLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const renderMenuItem = (item: MenuItem, onClick?: () => void) => {
    const onClickCustomContent = () => {
      if (onClick) {
        onClick();
      }
      setActiveItemId(item.id);
    };
    const onClickDefaultContent = () => {
      setActiveItemId(item.id);
    };
    const menuContent = item.customContent ? (
      cloneElement(item.customContent, {
        onClick: onClickCustomContent,
      })
    ) : (
      <span>{item.label}</span>
    );
    return (
      <div
        key={item.id}
        onClick={() => !item.customContent && onClickDefaultContent()}
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
          {activeItemId
            ? items.find((item) => item.id === activeItemId)?.label ||
              defaultLabel
            : defaultLabel}
        </span>
        {isOpen ? (
          <ArrowUp className={styles.arrowUp} />
        ) : (
          <ArrowDown className={styles.arrowDown} />
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {items.map((item) => renderMenuItem(item))}
        </div>
      )}
    </div>
  );
};
