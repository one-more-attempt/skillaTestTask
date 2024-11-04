import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { API_URL } from "./api-url";

const API_TOKEN = process.env.REACT_APP_API_TEST_TOKEN;

export const prepareHeaders = (headers: Headers) => {
  headers.set("Authorization", `Bearer ${API_TOKEN}`);
  return headers;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL.baseURL,
  prepareHeaders: prepareHeaders,
});
