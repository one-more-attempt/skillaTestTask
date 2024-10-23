import { FC } from "react";
import incomingCallIcon from "../../icons/calls/incoming-call.svg";
import outgoingCallIcon from "../../icons/calls/outgoing-call.svg";
import missedCallIcon from "../../icons/calls/missed-call.svg";
import failedCallIcon from "../../icons/calls/failed-call.svg";
import { CallTypeValues } from "../../constants";

type Props = {
  type: CallTypeValues;
};
export const CallTypeIcons: FC<Props> = ({ type }: Props) => {
  const imgSrc = {
    [CallTypeValues.Incoming]: incomingCallIcon,
    [CallTypeValues.Outgoing]: outgoingCallIcon,
    [CallTypeValues.Failed]: failedCallIcon,
    [CallTypeValues.Missed]: missedCallIcon,
  };
  return <img src={imgSrc[type]} alt={`${type}-call-icon`} />;
};
