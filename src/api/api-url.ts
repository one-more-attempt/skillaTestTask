export const API = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  getCalls: "getList",
  getCallRecord: (
    recordId: string = "MToxMDA2NzYxNToxNDMwMDM3NzExNzow",
    partnership_id: string = "578"
  ) => `getRecord?record=${recordId}&partnership_id=${partnership_id}`,
};
