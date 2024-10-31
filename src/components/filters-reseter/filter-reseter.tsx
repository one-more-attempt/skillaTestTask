import { FC } from "react";
import { ReactComponent as ResetFiltersIcon } from "../../icons/filters/reset-filters-icon.svg";
import styles from "./filter-reseter.module.scss";

type Props = {
  onClick: () => void;
};

export const FilterReseter: FC<Props> = ({ onClick }: Props) => {
  return (
    <div>
      <span>Сбросить фильтры </span>
      <button onClick={onClick} className={styles.resetBtn}>
        <ResetFiltersIcon />
      </button>
    </div>
  );
};
