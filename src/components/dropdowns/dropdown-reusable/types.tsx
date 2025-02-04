import { FC, ReactElement, ReactNode,  } from "react";

export type CustomContentProps = {
  onClick?: () => void;
};

export type CustomContent = FC<CustomContentProps>;

export type MenuItem = {
  id: number;
  label: string;
  icon?: ReactNode ;
  onClick?: () => void;
  customContent?: ReactElement<CustomContentProps>;
};
