import { Rating } from "../rating/rating";
import { CallTypeIcons } from "../call-type/call-type";
import { Avatar } from "../avatar/avatar";
import { FC } from "react";
import { Call } from "../../types/api-types";
import { useNormalizeCallData } from "./useNormalizeCallData";
import styles from "./table-row.module.scss";

type Props = {
  callData: Call;
};

export const TableRow: FC<Props> = ({ callData }: Props) => {
  const {
    callType,
    callTime,
    avatar,
    callNumber,
    source,
    rating,
    callDuration,
  } = useNormalizeCallData(callData);
  return (
    <div className={styles.row}>
      <div className={styles.callType}>
        <CallTypeIcons type={callType} />
      </div>
      <span className={styles.time}>{callTime}</span>
      <div className={styles.employee}>
        <Avatar imageURL={avatar} />
      </div>
      <span className={styles.call}>{callNumber}</span>
      <span className={styles.source}>{source}</span>
      <div className={styles.rating}>
        <Rating type={rating} />
      </div>
      <span className={styles.duration}>{callDuration}</span>
    </div>
  );
};
