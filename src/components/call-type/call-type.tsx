import { FC } from "react";
import { ReactComponent as IncomingCallIcon } from "../../icons/calls/incoming-call.svg";
import { ReactComponent as OutgoingCallIcon } from "../../icons/calls/outgoing-call.svg";
import { ReactComponent as MissedCallIcon } from "../../icons/calls/missed-call.svg";
import { ReactComponent as FailedCallIcon } from "../../icons/calls/failed-call.svg";
import { CallTypeEnum } from "../../constants";

type Props = {
  type: CallTypeEnum;
};
export const CallTypeIcons: FC<Props> = ({ type }: Props) => {
  const imgSrc = {
    [CallTypeEnum.Incoming]: <IncomingCallIcon />,
    [CallTypeEnum.Outgoing]: <OutgoingCallIcon />,
    [CallTypeEnum.Failed]: <FailedCallIcon />,
    [CallTypeEnum.Missed]: <MissedCallIcon />,
  };
  return imgSrc[type];
};
