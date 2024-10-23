import { FC } from "react";
import noAvatarIcon from "../../icons/no-avatar-icon.svg";
import styles from "./avatar.module.scss";

type Props = {
  imageURL?: string;
};

export const Avatar: FC<Props> = ({ imageURL }: Props) => {
  return (
    <>
      <div className={imageURL ? styles.avatar : styles.noAvatar}>
        <img src={imageURL ? imageURL : noAvatarIcon} alt="employee-avatar" />
      </div>
    </>
  );
};
