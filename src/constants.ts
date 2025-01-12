export enum APIEndpointEnum {
  GetList = "getList",
  GetRecord = "getRecord",
}

export enum CallStatusEnum {
  Success = "Дозвонился",
  Failed = "Не дозвонился",
}

export enum CallTypeEnum {
  Incoming = "incoming",
  Outgoing = "outgoing",
  Missed = "missed",
  Failed = "failed",
}

export enum CallRatingEnum {
  Perfect = "Отлично",
  Good = "Хорошо",
  Bad = "Плохо",
  Error = "Скрипт не использован",
}

export enum DatesEnum {
  Today = "Сегодня",
  Yesterday = "Вчера",
}

export enum TableRowItemType {
  Date = "date",
  Call = "call",
}

//filters params
export enum CallsTypeParamsEnum {
  Incoming = 1,
  Outgoing = 0,
}

export enum CallsSortParamsEnum {
  Date = "date",
  Duration = "duration",
}

export enum CallsOrderParamsEnum {
  ASC = "ASC",
  DESC = "DESC",
}
