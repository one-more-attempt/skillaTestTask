import { FC } from "react";
import styles from "./rating.module.scss";
import classNames from "classnames";
import { CallRatingEnum } from "../../constants";

type Props = {
  type: CallRatingEnum;
};

export const Rating: FC<Props> = ({ type }: Props) => {
  const ratingStyle = classNames(styles.mainRatingWrapper, {
    [styles.perfect]: type === CallRatingEnum.Perfect,
    [styles.bad]: type === CallRatingEnum.Bad,
    [styles.good]: type === CallRatingEnum.Good,
    [styles.error]: type === CallRatingEnum.Error,
  });

  return (
    <div className={ratingStyle}>
      <span>{type}</span>
    </div>
  );
};
