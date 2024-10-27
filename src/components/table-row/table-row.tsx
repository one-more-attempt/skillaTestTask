import { Rating } from "../rating/rating";
import { CallTypeIcons } from "../call-type/call-type";
import { Avatar } from "../avatar/avatar";
import { FC, useEffect, useRef, useState } from "react";
import { Call } from "../../types/api-types";
import { useCallData } from "../../hooks/useCallData";
import styles from "./table-row.module.scss";
import cn from "classnames";
import moment from "moment";

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
    record,
    isDownloaded,
    callRecordData,
    downloadCallRecord,
    setisDownloaded,
    deleteRecordFromCache,
  } = useCallData(callData);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [tooltip, setTooltip] = useState({
    visible: false,
    time: "",
    position: 0,
    alignRight: false,
  });
  const [isRowFocused, setIsRowFocused] = useState(false);

  const isRecordMetadataLoadedHandler = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  const recordTimeUpdateHandler = () => {
    if (audioRef.current) {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    }
  };
  const progressBarTimeSeekHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const audio = audioRef.current;
    const progressBar = progressBarRef.current;
    if (audio && progressBar) {
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = event.clientX - rect.left;
      const newTime = (clickPosition / rect.width) * audio.duration;
      audio.currentTime = newTime;
      setProgress((newTime / audio.duration) * 100);
    }
  };

  const showProgressBarTimeTooltip = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const progressBar = progressBarRef.current;
    if (progressBar && isDownloaded) {
      const rect = progressBar.getBoundingClientRect();
      const hoverPosition = event.clientX - rect.left;
      const hoverTime = (hoverPosition / rect.width) * duration;
      const formatedTime = moment
        .utc(
          moment
            .duration(hoverTime >= 0 ? hoverTime : 0, "seconds")
            .asMilliseconds()
        )
        .format("m:ss");

      const isRightSide = hoverPosition < rect.width / 2;
      console.log(hoverTime);

      setTooltip({
        visible: true,
        time: formatedTime,
        position: hoverPosition,
        alignRight: isRightSide,
      });
    }
  };

  const hideProgressBarTimeTooltip = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };
  const recordPlayPauseHandler = async () => {
    const audio = audioRef.current;
    if (audio && callRecordData) {
      try {
        if (audio.paused) {
          await audio.play();
        } else {
          audio.pause();
        }
      } catch (error) {
        console.error("Audio play error:", error);
      }
    }
  };

  return (
    <div
      className={styles.row}
      onMouseEnter={() => setIsRowFocused(true)}
      onMouseLeave={() => {
        setIsRowFocused(false);
      }}
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
        <span>{isRowFocused ? "" : callDuration}</span>
        {record && (isRowFocused || isDownloaded) && (
          <div
            className={cn(styles.playerContainer, {
              [styles.pined]: isDownloaded,
            })}
          >
            <audio
              ref={audioRef}
              src={callRecordData}
              onLoadedMetadata={isRecordMetadataLoadedHandler}
              onTimeUpdate={recordTimeUpdateHandler}
            />

            <span className={styles.playerTime}>
              {isRowFocused ? callDuration : ""}
            </span>
            <button
              className={styles.playPauseBtn}
              onClick={recordPlayPauseHandler}
            ></button>

            <div
              className={styles.progressBar}
              ref={progressBarRef}
              onClick={progressBarTimeSeekHandler}
              onMouseMove={showProgressBarTimeTooltip}
              onMouseLeave={hideProgressBarTimeTooltip}
            >
              <div
                className={styles.progress}
                style={{ width: `${progress}%` }}
              >
                sd
              </div>
              {tooltip.visible && (
                <div
                  className={cn(styles.tooltip, {
                    [styles.rightAlign]: tooltip.alignRight,
                    [styles.leftAlign]: !tooltip.alignRight,
                  })}
                  style={{
                    left: `${tooltip.position}px`,
                  }}
                >
                  {tooltip.time}
                </div>
              )}
            </div>

            <button onClick={downloadCallRecord} className={styles.downloadBtn}>
              Download
            </button>

            <button className={styles.closeBtn}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};
