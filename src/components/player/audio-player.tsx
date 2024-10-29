import { FC, useRef, useState } from "react";
import { timeFormat } from "../../helpers/time-formater";
import { ReactComponent as PlayerCloseIcon } from "../../icons/player/close-button.svg";
import { ReactComponent as PlayerPlayIcon } from "../../icons/player/play-button.svg";
import { ReactComponent as PlayerPauseIcon } from "../../icons/player/pause-button.svg";
import { ReactComponent as PlayerDownloadIcon } from "../../icons/player/download-button.svg";
import styles from "./player.module.scss";

type Props = {
  playerData: {
    isRecordDownloaded: boolean;
    recordDataLocalURL?: string;
    deleteRecordFromCache: () => void;
    downloadRecord: () => void;
  };
};

export const AudioPlayer: FC<Props> = ({
  playerData: {
    isRecordDownloaded,
    recordDataLocalURL,
    deleteRecordFromCache,
    downloadRecord,
  },
}: Props) => {
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
    const audio = audioRef.current;
    if (audio) {
      setAudioDuration(audio.duration);
      setAudioCurrentTime(timeFormat.secondsToMinSec(audio.currentTime));
    }
  };
  const recordTimeUpdateHandler = () => {
    const audio = audioRef.current;
    if (audio) {
      setAudioProgressPercentage((audio.currentTime / audio.duration) * 100);
      setAudioCurrentTime(timeFormat.secondsToMinSec(audio.currentTime));
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
      let hoverTime = (hoverPosition / rect.width) * audioDuration;
      const formatedTime = timeFormat.secondsToMinSec(
        hoverTime >= 0 ? hoverTime : 0
      );
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
  const stopAudio = () => {
    setIsAudioPlaying(false);
  };

  return (
    <div className={styles.playerContainer}>
      <audio
        ref={audioRef}
        src={recordDataLocalURL}
        onLoadedMetadata={isRecordMetadataLoadedHandler}
        onTimeUpdate={recordTimeUpdateHandler}
        onEnded={stopAudio}
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
            className={`${styles.tooltip} ${progressBarTooltip.alignRight?styles.rightAlign:styles.leftAlign}`}
            style={{left: `${progressBarTooltip.position}px`}}
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
  );
};
