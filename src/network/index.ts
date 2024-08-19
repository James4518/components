import { BASE_URL, TIME_OUT } from "./request/config";
import { hyRequest } from "./request";
import cache from "@/utils/cache";
const hyrequest = new hyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptor: {
    requestInterceptor: (config) => {
      const token = cache.getCache("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    responseInterceptor: (config) => {
      return config;
    }
  }
});
export default hyrequest;
