import { FC } from "react";
import styles from "./rating.module.scss";
import cn from "classnames";
import { CallRatingValues } from "../../constants";

type Props = {
  type: CallRatingValues;
};

export const Rating: FC<Props> = ({ type }: Props) => {
  const ratingStyle = cn(styles.mainRatingWrapper, {
    [styles.perfect]: type === CallRatingValues.Perfect,
    [styles.bad]: type === CallRatingValues.Bad,
    [styles.good]: type === CallRatingValues.Good,
    [styles.error]: type === CallRatingValues.Error,
  });

  return (
    <div className={ratingStyle}>
      <span>{type}</span>
    </div>
  );
};
