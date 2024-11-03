import { FC } from "react";
import { ReactComponent as PlayerCloseIcon } from "../../icons/player/close-button.svg";
import { ReactComponent as PlayerPlayIcon } from "../../icons/player/play-button.svg";
import { ReactComponent as PlayerPauseIcon } from "../../icons/player/pause-button.svg";
import { ReactComponent as PlayerDownloadIcon } from "../../icons/player/download-button.svg";
import { AudioPlayerProps } from "./audio-player-types";
import styles from "./audio-player.module.scss";
import { useAudioPlayer } from "./useAudioPlayer";

export const AudioPlayer: FC<AudioPlayerProps> = (
  playerData: AudioPlayerProps
) => {
  const {
    audioRef,
    progressBarRef,
    isAudioPlaying,
    audioCurrentTime,
    recordDataLocalURL,
    isRecordDownloaded,
    audioProgressPercentage,
    progressBarTooltip,
    downloadRecord,
    closeRecordHandler,
    isRecordMetadataLoadedHandler,
    recordTimeUpdateHandler,
    stopAudio,
    recordPlayPauseHandler,
    hideProgressBarTimeTooltip,
    progressBarTimeSeekHandler,
    showProgressBarTimeTooltip,
  } = useAudioPlayer(playerData);

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
            className={`${styles.tooltip} ${
              progressBarTooltip.alignRight
                ? styles.rightAlign
                : styles.leftAlign
            }`}
            style={{ left: `${progressBarTooltip.position}px` }}
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
