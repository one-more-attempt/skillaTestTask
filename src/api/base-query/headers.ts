const API_TOKEN = process.env.REACT_APP_API_TEST_TOKEN;

export const prepareHeaders = (headers: Headers) => {
  headers.set("Authorization", `Bearer ${API_TOKEN}`);
  return headers;
};
