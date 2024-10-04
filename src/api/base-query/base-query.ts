import { prepareHeaders } from "./headers";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { API } from "../api-url";

export const baseQuery = fetchBaseQuery({
  baseUrl: API.baseURL,
  prepareHeaders: prepareHeaders,
});
