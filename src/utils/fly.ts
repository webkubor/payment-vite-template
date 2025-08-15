import fly from "flyio";
import { getBaseApiUrl } from "./url";
import { getLocalLang } from "@/i18n/config";

fly.config.baseURL = getBaseApiUrl()

fly.interceptors.request.use((request) => {
  request.headers.Accept = "application/json";
  request.headers["Accept-Language"] = getLocalLang()
  return request;
});

fly.interceptors.response.use(
  (response) => {
    let res = response.data;
    if (res.code === 100) {
      return Promise.reject(res);
    }
    if (res.code === -1) {
      if (res.msg) {
        window.$message?.error(res.msg);
      }
      return Promise.reject(res);
    }

    if (res.code === 200) {
      return Promise.resolve(res);
    }
    if (res.msg === 'SUCCESS') {
      return Promise.resolve(res.data);
    } else {
      if (res.msg) {
        window.$message?.error(res.msg);
      }
      return Promise.reject(res);
    }
  },

  (err) => {
    if (err.message) {
      const hiddenErrors = ["Network Error"];
      const isHiddenError = hiddenErrors.some((msg) =>
        err.message.toLowerCase().includes(msg)
      );
      if (isHiddenError) {
        console.warn("Suppressed network error:", err.message);
        return;
      }
      window.$message?.error(err.message);
    }
    return Promise.reject(err);
  }
);

export default fly;
