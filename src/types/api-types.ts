import { CallStatusValues } from "../constants";

export type Call = {
  id: number;
  time: number;
  date: string;
  date_notime: string;
  in_out: 0 | 1;
  status: CallStatusValues;
  from_number: string;
  source: string;
  to_number: string;
  person_avatar: string;
  record: string;
  partnership_id: string;
};

export type Calls = {
  results: Call[];
  total_rows: string;
};

export type GroupedCall = {
  date: string;
  count: number;
  calls: Call[];
};

export type GetCallRecordParams = {
  record: string;
  partnership_id: string;
};

export type CallListSearchParams = {
  in_out?: "0" | "1" | "";
  sort_by?: "date" | "duration";
  order?: "ASC" | "DESC";
  date_start?: string;
  date_end?: string;
};
