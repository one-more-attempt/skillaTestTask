import { FC } from "react";
import styles from "./rating.module.scss";
import cn from "classnames";

type Props = {
  type: "perfect" | "good" | "bad" | "error";
};

export const Rating: FC<Props> = ({ type }: Props) => {
  const ratingTypes = {
    perfect: "Отлично",
    good: "Хорошо",
    bad: "Плохо",
    error: "Скрипт не использован",
  };
  const ratingStyle = cn(styles.mainRatingWrapper, {
    [styles.perfect]: type === "perfect",
    [styles.bad]: type === "bad",
    [styles.good]: type === "good",
    [styles.error]: type === "error",
  });
  return <div className={ratingStyle}>{ratingTypes[type]}</div>;
};
