import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base-query";

export const skillaAPI = createApi({
  reducerPath: "skillaAPI",
  baseQuery: baseQuery,
  tagTypes: [],
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
