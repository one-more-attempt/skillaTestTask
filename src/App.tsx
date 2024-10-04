import { useGetCallsMutation, useGetCallRecordMutation } from "./api/endpoints";

export const useGetData = () => {
  const [
    getCallsTrigger,
    { isLoading: isCallsListLoading, data: callsListData },
  ] = useGetCallsMutation();
  const [
    getCallRecordTrigger,
    {
      isLoading: isGetCallRecordLoading,
      isError: isGetCallRecordError,
      data: callRecordData,
    },
  ] = useGetCallRecordMutation();

  const handleLoadAudio = async () => {
    getCallRecordTrigger();
  };
  return {
    handleLoadAudio,
    isGetCallRecordLoading,
    isGetCallRecordError,
    callRecordData,
  };
};

export const App = () => {
  const {
    handleLoadAudio,
    isGetCallRecordLoading,
    isGetCallRecordError,
    callRecordData,
  } = useGetData();
  return (
    <>
      <div>
        <button onClick={handleLoadAudio} disabled={isGetCallRecordLoading}>
          {isGetCallRecordLoading ? "Загрузка..." : "Загрузить аудио"}
        </button>
        {isGetCallRecordError && <p>Ошибка при загрузке аудио</p>}
        {callRecordData && (
          <audio controls>
            <source src={callRecordData} type="audio/mpeg" />
            Ваш браузер не поддерживает элемент <code>audio</code>.
          </audio>
        )}
      </div>
    </>
  );
};
