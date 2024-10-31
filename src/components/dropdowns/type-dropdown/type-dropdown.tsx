import { FC, useState } from "react";
import styles from "./type-dropdown.module.scss";
import { ReactComponent as ArrowUp } from "../../../icons/filters/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../../icons/filters/arrow-down.svg";
import classNames from "classnames";
type TypeDropdownMenuItem = {
  id: string;
  label: string;
  onClick: () => void;
};

type Props = {
  items: TypeDropdownMenuItem[];
};

export const TypeDropdown: FC<Props> = ({ items }) => {
  const defaultItemId = items[0].id;
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState(defaultItemId);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (item: TypeDropdownMenuItem) => {
    item.onClick();
    setActiveItemId(item.id);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      <button
        onClick={toggleDropdown}
        className={classNames(styles.dropdownTitle, {
          [styles.dropdownItemActive]: activeItemId !== defaultItemId,
        })}
      >
        {items.find((item) => item.id === activeItemId)?.label}
        {isOpen ? (
          <ArrowUp className={classNames(styles.arrowIcon, styles.active)} />
        ) : (
          <ArrowDown className={styles.arrowIcon} />
        )}
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={classNames(styles.dropdownItem, {
                [styles.dropdownItemActive]: activeItemId === item.id,
              })}
            >
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
