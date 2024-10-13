import { ApiInstance, getApiConfig } from "./axios";
import { ACCOUNT_URL } from "./url";

export const accountService = {
  getAccount(id: string) {
    const config = getApiConfig();
    return ApiInstance.get(`${ACCOUNT_URL.BASE}/${id}`, config);
  },
  search(request: RequestInterfaces.ICommonSearchRequest) {
    return ApiInstance.post(ACCOUNT_URL.SEARCH, request, getApiConfig());
  },
};
