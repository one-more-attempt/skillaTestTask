import { FC, ReactElement } from "react";

export type CustomContent = FC<{ onClick?: () => void }>;

export type MenuItem = {
  id: string;
  label?: string;
  onClick?: () => void;
  customContent?: ReactElement<{ onClick?: () => void }>;
};