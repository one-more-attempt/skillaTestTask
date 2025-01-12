import {
  CallRatingEnum,
  CallsOrderParamsEnum,
  CallsSortParamsEnum,
  CallStatusEnum,
  CallsTypeParamsEnum,
  CallTypeEnum,
  TableRowItemType,
} from "../constants";

export type CallListSearchParams = {
  in_out?: CallsTypeParamsEnum;
  sort_by?: CallsSortParamsEnum;
  order?: CallsOrderParamsEnum;
  date_start?: string;
  date_end?: string;
  limit?: string;
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

export type CallViewItem = {
  id: number;
  callDuration: string;
  callTime: string;
  callType: CallTypeEnum;
  callNumber: string;
  rating: CallRatingEnum;
  record: string;
  source:string;
  avatar:string;
  partnership_id: string;
};

export type CallDataView = {
  type: TableRowItemType.Call;
  data: CallViewItem;
};

export type CallViewSeparator = {
  type: TableRowItemType.Date;
  data: {
    date: string;
    count: number;
  };
};

export type GroupedCallsByDate = {
  [date: string]: { calls: CallViewItem[]; count: number };
};

export type TableRowData = CallDataView | CallViewSeparator;

export type GetCallRecordParams = {
  record: string;
  partnership_id: string;
};
