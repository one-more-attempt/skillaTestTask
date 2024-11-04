import styles from "./date-separator.module.scss";
type Props = {
  data: {
    date: string;
    count: number;
  };
};

export const DateSeparator = ({ data: { date, count } }: Props) => {
  return (
    <div className={styles.dateSeparator} key={date}>
      <span>{date}</span>
      <sup className={styles.counter}>{count}</sup>
    </div>
  );
};
