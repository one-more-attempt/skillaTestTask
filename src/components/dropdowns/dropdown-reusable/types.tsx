import { FC, ReactElement } from "react";

export type CustomContent = FC<{ onClick?: () => void }>;

export type MenuItem = {
  id: number;
  label: string;
  onClick: () => void;
  customContent?: ReactElement<{ onClick?: () => void }>;
};