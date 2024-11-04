import {
  CallsOrderParamsEnum,
  CallsSortParamsEnum,
  CallStatusEnum,
  CallsTypeParamsEnum,
  TableRowItemType,
} from "../constants";

export type CallListSearchParams = {
  in_out?: CallsTypeParamsEnum;
  sort_by?: CallsSortParamsEnum;
  order?: CallsOrderParamsEnum;
  date_start?: string;
  date_end?: string;
  limit: number;
};

export type Call = {
  id: number;
  time: number;
  date: string;
  date_notime: string;
  in_out: CallsTypeParamsEnum;
  status: CallStatusEnum;
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

export type CallData = {
  type: TableRowItemType.Call;
  data: Call;
};

export type DateSeparator = {
  type: TableRowItemType.Date;
  data: {
    date: string;
    count: number;
  };
};

export type GroupedCallsByDate = {
  [date: string]: { calls: Call[]; count: number };
};

export type TableRowData = CallData | DateSeparator;

export type GetCallRecordParams = {
  record: string;
  partnership_id: string;
};
