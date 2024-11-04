import { FC } from "react";
import incomingCallIcon from "../../icons/calls/incoming-call.svg";
import outgoingCallIcon from "../../icons/calls/outgoing-call.svg";
import missedCallIcon from "../../icons/calls/missed-call.svg";
import failedCallIcon from "../../icons/calls/failed-call.svg";
import { CallTypeEnum } from "../../constants";

type Props = {
  type: CallTypeEnum;
};
export const CallTypeIcons: FC<Props> = ({ type }: Props) => {
  const imgSrc = {
    [CallTypeEnum.Incoming]: incomingCallIcon,
    [CallTypeEnum.Outgoing]: outgoingCallIcon,
    [CallTypeEnum.Failed]: failedCallIcon,
    [CallTypeEnum.Missed]: missedCallIcon,
  };
  return <img src={imgSrc[type]} alt={`${type}-call-icon`} />;
};
