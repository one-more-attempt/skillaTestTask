import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base-query/base-query";

export const skillaAPI = createApi({
  reducerPath: "skillaAPI",
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});
