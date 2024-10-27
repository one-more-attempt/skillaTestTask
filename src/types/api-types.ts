import { CallStatusValues } from "../constants";

export type Call = {
  id: number;
  time: number;
  date: string;
  in_out: 0 | 1;
  status: CallStatusValues;
  from_number: string;
  source: string;
  to_number: string;
  person_avatar: string;
  record: string;
};

export type Calls = {
  results: Call[];
  total_rows: string;
};
