import { Rating } from "../rating/rating";
import { CallTypeIcons } from "../call-type/call-type";
import { Avatar } from "../avatar/avatar";
import { FC, useEffect, useRef, useState } from "react";
import { Call } from "../../types/api-types";
import { useCallData } from "../../hooks/useCallData";
import styles from "./table-row.module.scss";
import cn from "classnames";
import moment from "moment";

import { ReactComponent as PlayerCloseIcon } from "../../icons/player/close-button.svg";
import { ReactComponent as PlayerPlayIcon } from "../../icons/player/play-button.svg";
import { ReactComponent as PlayerPauseIcon } from "../../icons/player/pause-button.svg";
import { ReactComponent as PlayerDownloadIcon } from "../../icons/player/download-button.svg";

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
    isRecordDownloaded,
    recordDataLocalURL,
    downloadRecord,
    deleteRecordFromCache,
  } = useCallData(callData);

  const [isRowFocused, setIsRowFocused] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState("");
  const [audioProgressPercentage, setAudioProgressPercentage] = useState(0);
  const [progressBarTooltip, setProgressBarTooltip] = useState({
    visible: false,
    time: "",
    position: 0,
    alignRight: false,
  });

  const isRecordMetadataLoadedHandler = () => {
    if (audioRef.current) {
      setAudioDuration(audioRef.current.duration);
    }
  };
  const recordTimeUpdateHandler = () => {
    const audio = audioRef.current;
    if (audio) {
      setAudioProgressPercentage((audio.currentTime / audio.duration) * 100);
      const newTimeValue = moment
        .utc(moment.duration(audio.currentTime, "seconds").asMilliseconds())
        .format("m:ss");
      setAudioCurrentTime(newTimeValue);
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
      setAudioProgressPercentage((newTime / audio.duration) * 100);
    }
  };

  const showProgressBarTimeTooltip = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const progressBar = progressBarRef.current;
    if (progressBar && isRecordDownloaded) {
      const rect = progressBar.getBoundingClientRect();
      const hoverPosition = event.clientX - rect.left;
      const hoverTime = (hoverPosition / rect.width) * audioDuration;
      const formatedTime = moment
        .utc(
          moment
            .duration(hoverTime >= 0 ? hoverTime : 0, "seconds")
            .asMilliseconds()
        )
        .format("m:ss");
      const isRightSide = hoverPosition < rect.width / 2;
      setProgressBarTooltip({
        visible: true,
        time: formatedTime,
        position: hoverPosition,
        alignRight: isRightSide,
      });
    }
  };

  const hideProgressBarTimeTooltip = () => {
    setProgressBarTooltip((prev) => ({ ...prev, visible: false }));
  };

  const recordPlayPauseHandler = async () => {
    const audio = audioRef.current;
    if (audio && recordDataLocalURL) {
      try {
        if (audio.paused) {
          await audio.play();
          setIsAudioPlaying(true);
        } else {
          audio.pause();
          setIsAudioPlaying(false);
        }
      } catch (error) {
        console.error("Audio play error:", error);
      }
    }
  };

  const closeRecordHandler = () => {
    deleteRecordFromCache();
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudioProgressPercentage(0);
      setIsAudioPlaying(false);
      setAudioCurrentTime("");
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
        <span>{!(isRowFocused || isRecordDownloaded) ? callDuration : ""}</span>
        {record && (isRowFocused || isRecordDownloaded) && (
          <div
            className={cn(styles.playerContainer, {
              [styles.pined]: isRecordDownloaded,
            })}
          >
            <audio
              ref={audioRef}
              src={recordDataLocalURL}
              onLoadedMetadata={isRecordMetadataLoadedHandler}
              onTimeUpdate={recordTimeUpdateHandler}
              onEnded={() => {
                setIsAudioPlaying(false);
              }}
            />

            <span className={styles.playerTime}>
              {audioCurrentTime && isRecordDownloaded ? audioCurrentTime : ""}
            </span>
            <button
              className={styles.playPauseBtn}
              onClick={recordPlayPauseHandler}
              disabled={!isRecordDownloaded}
            >
              {isAudioPlaying ? <PlayerPauseIcon /> : <PlayerPlayIcon />}
            </button>

            <div
              className={styles.progressBar}
              ref={progressBarRef}
              onClick={progressBarTimeSeekHandler}
              onMouseMove={showProgressBarTimeTooltip}
              onMouseLeave={hideProgressBarTimeTooltip}
            >
              <div
                className={styles.progress}
                style={{ width: `${audioProgressPercentage}%` }}
              ></div>
              {progressBarTooltip.visible && (
                <div
                  className={cn(styles.tooltip, {
                    [styles.rightAlign]: progressBarTooltip.alignRight,
                    [styles.leftAlign]: !progressBarTooltip.alignRight,
                  })}
                  style={{
                    left: `${progressBarTooltip.position}px`,
                  }}
                >
                  {progressBarTooltip.time}
                </div>
              )}
            </div>

            <button
              onClick={downloadRecord}
              className={styles.downloadBtn}
              disabled={isRecordDownloaded}
            >
              <PlayerDownloadIcon />
            </button>

            <button
              className={styles.closeBtn}
              disabled={!isRecordDownloaded}
              onClick={closeRecordHandler}
            >
              <PlayerCloseIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
