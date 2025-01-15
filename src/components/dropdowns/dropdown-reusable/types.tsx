import { FC, ReactElement } from "react";

export type CustomContentProps = {
  onClick?: () => void;
};

export type CustomContent = FC<CustomContentProps>;

export type MenuItem = {
  id: number;
  label: string;
  onClick?: () => void;
  customContent?: ReactElement<CustomContentProps>;
};
