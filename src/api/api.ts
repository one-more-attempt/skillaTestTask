import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { API_URL } from "./api-url";

const API_TOKEN = process.env.REACT_APP_API_TEST_TOKEN;

const prepareHeaders = (headers: Headers) => {
  headers.set("Authorization", `Bearer ${API_TOKEN}`);
  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL.baseURL,
  prepareHeaders: prepareHeaders,
});

export const skillaAPI = createApi({
  reducerPath: "skillaAPI",
  baseQuery: baseQuery,
  tagTypes: [],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 10,
  endpoints: () => ({}),
});
