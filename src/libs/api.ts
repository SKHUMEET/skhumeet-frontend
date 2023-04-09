import { storageConstants } from "@/types";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

// const config: AxiosRequestConfig = { baseURL: "" };

export const instance = axios.create();

// Request interceptor
const interceptorRequestFulfilled = (config: AxiosRequestConfig) => {
  let TOKEN =
    typeof window !== "undefined"
      ? localStorage.getItem(storageConstants.accessToken)
      : "";
  if (TOKEN) {
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      } as AxiosRequestHeaders,
    };
  } else {
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
      } as AxiosRequestHeaders,
    };
  }
};

instance.interceptors.request.use(interceptorRequestFulfilled);

// Response interceptor
const responseInterceptorFulfilled = (res: AxiosResponse) => {
  if (200 <= res.status && res.status < 300) return res;

  return Promise.reject(...res.data);
};

const responseInterceptorRejected = (error: AxiosError) => {
  console.log("error", error);
  // const errorStatus = error.response?.status;
  // const errorUrl = error.response?.config.url;
  // console.log(error.response);
  // alert(errorMsg);
  // if (window.confirm(errorMsg) === true) {
  // window.location.replace("/");
  // }
  // return new Error(error.response?.data?.message ?? error);
  return error;
};

instance.interceptors.response.use(
  responseInterceptorFulfilled,
  responseInterceptorRejected
);

export function get<T>(...args: Parameters<typeof instance.get>) {
  return instance.get<T, T>(...args);
}

export function post<T>(...args: Parameters<typeof instance.post>) {
  return instance.post<T, T>(...args);
}

export function put<T>(...args: Parameters<typeof instance.put>) {
  return instance.put<T, T>(...args);
}

export function del<T>(...args: Parameters<typeof instance.delete>) {
  return instance.delete<T, T>(...args);
}
