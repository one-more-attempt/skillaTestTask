export type AudioPlayerProps = {
  playerData: {
    isRecordDownloaded: boolean;
    recordDataLocalURL?: string;
    deleteRecordFromCache: () => void;
    downloadRecord: () => void;
  };
};
