import { Rating } from "../rating/rating";
import { CallTypeIcons } from "../call-type/call-type";
import { Avatar } from "../avatar/avatar";
import { FC } from "react";
import { Call } from "../../types/api-types";
import { useCall } from "./useCall";
import styles from "./table-row.module.scss";
import { AudioPlayer } from "../player/audio-player";

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
    isRecordDownloaded,
    isPlayerVisible,
    callDuration,
    recordDataLocalURL,
    downloadRecord,
    deleteRecordFromCache,
    focusRow,
    unfocusRow,
  } = useCall(callData);

  return (
    <div
      className={styles.row}
      onMouseEnter={focusRow}
      onMouseLeave={unfocusRow}
    >
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
      <div className={styles.duration}>
        <span>{!isPlayerVisible ? callDuration : ""}</span>
        {isPlayerVisible && (
          <AudioPlayer
            playerData={{
              isRecordDownloaded,
              recordDataLocalURL,
              deleteRecordFromCache,
              downloadRecord,
            }}
          />
        )}
      </div>
    </div>
  );
};
